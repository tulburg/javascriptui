//@ts-ignore
import Config from '@src/config';
import Props from './props';
import { Component, Style, ELEMENT, Container } from './components';
import { ConfigType } from './types';
import UI from './ui';

export default class Router {
  routes: ConfigType.Route[] = Config.routes as ConfigType.Route[];
  current: ConfigType.Route;
  get window(): any {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };
  private events: { name: string, listener: (..._: any[]) => void }[];

  constructor() {
    this.window.Config = Config;
    if (Config.theme) this.window.Theme = Config.theme;
    this.window.Router = this;
    new UI(this);
    this.events = [];
    this.window.UI.sheet.insertRule('app{}');
    let altProps = Object.getOwnPropertyNames(document.head.style);
    if (altProps.length === 0) altProps = Object.keys((<any>document.head.style).__proto__).filter(i => !i.match('-'))
    let propIndex = 0;
    while (propIndex < altProps.length - 1) {
      const prop = altProps[propIndex], key = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      Object.defineProperty(this, '$' + prop, {
        writable: true,
        enumerable: true,
        configurable: true
      });
      const fns = function () {
        if ((<any>UI).serving) return this;
        const value = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        if (arguments.length > 0) {
          this.$rules = this.$rules || [];
          if (this.$rules.length > 0) {
            try {
              const parsedValue = this.window.UI.parseStyleValue(value);
              this.$rules[this.$rules.length - 1].style.setProperty(
                key,
                parsedValue.indexOf('!') > -1 ? parsedValue.replace(/\!important/g, '') : parsedValue,
                parsedValue.indexOf('!') > -1 ? 'important' : ''
              );
            } catch (e) {
              throw Error('Style not applied: ' + prop + ' ' + e.message);
            }
          }
          this['$' + prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        } else return this['$' + prop];
        return this;
      };
      (<any>ELEMENT.prototype)[prop] = fns;
      (<any>Component.prototype)[prop] = fns;
      (<any>Style.prototype)[prop] = fns;
      propIndex++;
    }
    if (this.window.UI.sheet.cssRules.length === 1) this.window.UI.writeGlobals(Config.theme || {});
    const props = Object.getOwnPropertyNames(Props.props);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i], caller = Props.props[prop]; let fn: Function;
      const split = caller.split('.'),
        key = split[0], name = split[1];
      Object.defineProperty(this, prop, {
        writable: true,
        enumerable: true,
        configurable: true
      });
      fn = function () {
        if ((<any>UI).serving) return this;
        if (arguments.length > 0) {
          if (key === 'attr') {
            if (this.$node) {
              this.$node.setAttribute(name, arguments.length === 1 ? arguments[0] : Array.from(arguments));
            }
          }
          this[prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        } else return this[prop];
        return this;
      };
      (<any>ELEMENT.prototype)[prop.slice(1)] = fn;
      (<any>Component.prototype)[prop.slice(1)] = fn;
    }
    const w: any = window;
    if (w.__native_load_queue && w.__native_load_queue.length > 0) {
      w.__native_load_queue.forEach((i: Function) => i());
    }

    this.loadRoute();
    history.pushState({}, '', location.href);

    window.onpopstate = (_: any) => this.loadRoute();
  }

  private loadRoute() {
    let loaded = false;
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const data = this.pathData(route);
      if (data) {
        this.current = route;
        // this.current.subs = [];
        this.current.data = data.data;
        this.window.UI.load('#app', route);
        loaded = true;
      }
    }
    for (let i = 0; i < this.routes.length; i++) {
      if (!loaded && this.routes[i].subs) {
        for (let j = 0; j < this.routes[i].subs.length; j++) {
          this.current = this.routes[i];
          const data = this.pathData(this.routes[i].subs[j], true);
          if (data) {
            this.current.data = data.data;
            // this.current.subs = [];
            this.window.UI.load('#app', this.current);
            loaded = true;
          }
        }
      }
    }
    const w: any = window;
    if (w.__native_load_queue && w.__native_load_queue.length > 0) {
      w.__native_load_queue.forEach((i: Function) => i());
    }
    if (!loaded) {
      console.error(`Path ${location.pathname} not configured`);
      this.window.UI.unload('#app');
    }
  }

  host(host: ELEMENT, routes: ConfigType.Route[]) {
    this.current.hosting = [];
    routes.forEach(route => {
      (<ConfigType.Route & { hostComponent?: Container }>route).hostComponent = host;
      return route;
    });
    this.current.hosting = this.current.hosting.concat(routes).filter(r => routes.some(i => i.path === r.path));
  }

  loadSubs(routes: (ConfigType.Route & { hostComponent?: Container })[], fromGo?: boolean) {
    let loaded = false;
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const data = this.pathData(route, true);
      if (data) {
        Object.assign(this.current.data, data.data);
        if (!route.hostComponent) throw new Error('Route not properly hosted');
        (<any>window).UI.load('.' + route.hostComponent.$className, route, true);
        loaded = true;
      }
    }
    if (fromGo && !loaded) {
      console.error('Path not configured');
      this.window.UI.unload('#app');
    }
  }

  go(path: string) {
    if (path === window.location.pathname) return;
    if (path.match(/^https?/)) return window.open(path, '_blank');
    window.scrollTo(0, 0);
    window.history.pushState({}, '', location.href);
    let current = this.window.Config.useHash ? window.location.hash.slice(1) : window.location.pathname;
    if (path === current) return;
    this.window.Config.useHash ? location.hash = path : window.history.pushState({}, '', path);
    this.events.forEach(i => (i.name === 'go') && i.listener(path));
    let loaded = false;
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const data = this.pathData(route);
      if (data) {
        this.current = route;
        // this.current.subs = [];
        this.current.data = data.data;
        this.window.UI.load('#app', route);
        loaded = true;
      }
    }
    if (!loaded && this.current.hosting && this.current.hosting.length > 0) {
      this.loadSubs(this.current.hosting, true);
    } else if (!loaded) {
      for (let i = 0; i < this.routes.length; i++) {
        if (!loaded && this.routes[i].subs) {
          for (let j = 0; j < this.routes[i].subs.length; j++) {
            this.current = this.routes[i];
            const data = this.pathData(this.routes[i].subs[j], true);
            if (data) {
              this.current.data = data.data;
              // this.current.subs = [];
              this.window.UI.load('#app', this.current);
              loaded = true;
            }
          }
        }
      }
    }
  }

  pathData(route: ConfigType.Route, sub: boolean = false) {
    let path = (sub && this.current.path !== '/') ? this.current.path + route.path : route.path;
    let current = this.window.Config.useHash ? window.location.hash.slice(1) : window.location.pathname;
    if (current[current.length - 1] == '/') current = current.substring(0, current.length - 1);
    if (path[path.length - 1] == '/') path = path.substring(0, path.length - 1);
    const variables: any = {};
    path.split('/').map((i, index) => {
      if (i.indexOf(':') > -1) {
        variables[index] = i.slice(1);
      }
    });

    if (path == current) {
      return { path: current, data: {} };
    }

    if (path.split('/').length == current.split('/').length) {
      const values: any = {};
      current.split('/').map((i, index) => {
        if (variables[index]) values[variables[index]] = i;
      });
      const rebuild = path.split('/').map((i, index) => {
        if (variables[index]) return values[variables[index]];
        return i;
      }).join('/');
      if (rebuild == current) {
        return { path: current, data: values };
      }
    }
    return;
  }

  on(event: 'go' | 'load' | 'unload', listener: (..._: any) => void) {
    this.events.push({ name: event, listener: listener });
  }
}
