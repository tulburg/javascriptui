import Config from '@src/config';
import Props from './props';
import { Component, Style, $RxElement, Container } from './components';
import {ConfigType, RxElement} from './types';
import Native from './native';

export default class Router {
  routes: ConfigType.Route[] = Config.routes as ConfigType.Route[];
  current: ConfigType.Route;
  get window() : any {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };
  private events: {name: string, listener: (..._: any[]) => void}[];

  constructor() {

    // window.Bus = window.Bus || new Bus();
    this.window.Config = Config;
    if(Config.theme) this.window.Theme = Config.theme;
    this.window.Router = this;
    new Native(this);
    this.events = [];
    if(this.window.Native.sheet.cssRules.length === 0) this.window.Native.writeGlobals(Config.theme || {});
    const props = Object.getOwnPropertyNames(Props.props);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i], caller = Props.props[prop]; let fn: Function;
      if(typeof caller === 'function') {
        fn = function() {
          if(arguments.length > 0) {
            Object.defineProperty(this, prop, {
              value: '',
              writable: true,
              enumerable: true,
              configurable: true
            });
            this[prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
          }else return this[prop];
          return this;
        }
      }else {
        const split = caller.split('.'),
        key = split[0], name = split[1];
        fn = function() {
          if(arguments.length > 0) {
            Object.defineProperty(this, prop, {
              value: '',
              writable: true,
              enumerable: true,
              configurable: true
            });
            if(key === 'css') {
              this.$rules = this.$rules || [];
              if(this.$rules.length > 0) {
                this.$rules[this.$rules.length - 1].style.setProperty(name, (<any>window).Native.parseStyleValue(arguments.length === 1 ? arguments[0] : Array.from(arguments)));
              }
            }
            if(key === 'attr') {
              if(this.$node) {
                this.$node.setAttribute(name, arguments.length === 1 ? arguments[0] : Array.from(arguments));
              }
            }
            this[prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
          }else return this[prop];
          return this;
        }
      }
      (<any>$RxElement.prototype)[prop.slice(1)] = fn;
      (<any>Component.prototype)[prop.slice(1)] = fn;
      if(typeof caller !== 'function' && caller.split('.')[0] === 'css') {
        (<any>Style.prototype)[prop.slice(1)] = fn;
      }
    }
    if((<any>window).__native_load_queue && (<any>window).__native_load_queue.length > 0) {
      (<any>window).__native_load_queue.forEach((i: Function) => i());
    }

    this.loadRoute();

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
        this.window.Native.load('#app', route);
        loaded = true;
      }
    }
    for (let i = 0; i < this.routes.length; i++) {
      if(!loaded && this.routes[i].subs) {
        for(let j = 0; j < this.routes[i].subs.length; j++) {
          this.current = this.routes[i];
          const data = this.pathData(this.routes[i].subs[j], true);
          if(data) {
            this.current.data = data.data;
            // this.current.subs = [];
            this.window.Native.load('#app', this.current);
            loaded = true;
          }
        }
      }
    }
    if((<any>window).__native_load_complete_queue && (<any>window).__native_load_complete_queue.length > 0) {
      (<any>window).__native_load_complete_queue.forEach((i: Function) => i());
    }
    if(!loaded) {
      console.error(`Path ${location.pathname} not configured`);
      this.window.Native.unload('#app');
    }
  }

  host(host: RxElement, routes: ConfigType.Route[]) {
    this.current.hosting = [];
    routes.forEach(route => {
      (<ConfigType.Route & { hostComponent?: Container }>route).hostComponent = host;
      return route;
    });
    this.current.hosting = this.current.hosting.concat(routes).filter(r => routes.some(i => i.path === r.path));
  }

  loadSubs(routes: (ConfigType.Route & { hostComponent?: Container })[], fromGo?: boolean) {
    let loaded = false;
    for(let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const data = this.pathData(route, true);
      if (data) {
        Object.assign(this.current.data, data.data);
        if(!route.hostComponent) throw new Error('Route not properly hosted');
        (<any>window).Native.load('.' + route.hostComponent.$className, route, true);
        loaded = true;
      }
    }
    if(fromGo && !loaded) {
      console.error('Path not configured');
      this.window.Native.unload('#app');
    }
  }

  go (path: string) {
    if(path === window.location.pathname) return;
    window.history.pushState({'name': 'special'}, '', path);
    this.events.forEach(i => (i.name === 'go') && i.listener(path));
    let loaded = false;
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const data = this.pathData(route);
      if (data) {
        this.current = route;
        // this.current.subs = [];
        this.current.data = data.data;
        this.window.Native.load('#app', route);
        loaded = true;
      }
    }
    if(!loaded && this.current.hosting && this.current.hosting.length > 0) {
      this.loadSubs(this.current.hosting, true);
    }else if(!loaded){
      for (let i = 0; i < this.routes.length; i++) {
        if(!loaded && this.routes[i].subs) {
          for(let j = 0; j < this.routes[i].subs.length; j++) {
            this.current = this.routes[i];
            const data = this.pathData(this.routes[i].subs[j], true);
            if(data) {
              this.current.data = data.data;
              // this.current.subs = [];
              this.window.Native.load('#app', this.current);
              loaded = true;
            }
          }
        }
      }
    }
  }

  pathData(route: ConfigType.Route, sub: boolean = false) {
    let path = (sub && this.current.path !== '/') ? this.current.path + route.path : route.path;
    let current = window.location.pathname;
    if(current[current.length - 1] == '/') current = current.substring(0, current.length - 1);
    if(path[path.length - 1] == '/') path = path.substring(0, path.length - 1);

    const variables: any = {};
    path.split('/').map((i, index) => {
      if(i.indexOf(':') > -1) {
        variables[index] = i.slice(1);
      }
    });

    if(path == current) {
      return { path: current, data: {} };
    }

    if(path.split('/').length == current.split('/').length) {
      const values: any = {};
      current.split('/').map((i, index) => {
        if(variables[index]) values[variables[index]] = i;
      });
      const rebuild = path.split('/').map((i, index) => {
        if(variables[index]) return values[variables[index]];
        return i;
      }).join('/');
      if(rebuild == current) {
        return { path: current, data: values };
      }
    }
    return;
  }

  on(event: 'go' | 'load' | 'unload', listener: (..._: any) => void) {
    this.events.push({ name: event, listener: listener });
  }
}
