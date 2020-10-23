import Config from '../src/config';
import Props from './props';
import { Component, Style, $RxElement } from './components';
import {TConfig} from './types';
import Native from './native';

export default class Router {

  routes: TConfig.Route[] = Config.routes as any;
  current: TConfig.Route; 
  get window() : any {
    if (typeof self !== 'undefined') { return self; } 
    if (typeof window !== 'undefined') { return window; } 
    if (typeof global !== 'undefined') { return global; } 
    throw new Error('unable to locate global object');
  };
  
  constructor() {

    // window.Bus = window.Bus || new Bus();
    this.window.Config = Config;
    new Native(this);
    this.window.Native.writeGlobals(Config.theme || {});

    const props = Object.getOwnPropertyNames(Props.props);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i], caller = Props.props[prop]; let fn: Function;
      if(typeof caller === 'function') {
        fn = new Function(
          prop, `return function() {
            if(arguments.length > 0) {
              Object.defineProperty(this, '${prop}', {
                value: '',
                writable: true,
                enumerable: true,
                configurable: true
              });
              this['${prop}'] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
            }else return this.${prop};
            return this;
          }`
        )();
      }else {
        const split = caller.split('.'),
        key = split[0], name = split[1];
        fn = new Function(
          prop, `return function() {
            if(arguments.length > 0) {
              Object.defineProperty(this, '${prop}', {
                value: '',
                writable: true,
                enumerable: true,
                configurable: true
              });
              if('${key}' === 'css') {
                this.$rules = this.$rules || [];
                if(this.$rules.length > 0) {
                  this.$rules[0].style.setProperty('${name}', arguments.length === 1 ? arguments[0] : Array.from(arguments));
                }
              }
              if('${key}' === 'attr') {
                const node = this.node();
                if(node) {
                  node.setAttribute('${name}', arguments.length === 1 ? arguments[0] : Array.from(arguments));
                }
              }
              this['${prop}'] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
            }else return this.${prop};
            return this;
          }`
        )();
      }
      (<any>$RxElement.prototype)[prop.slice(1)] = fn;
      (<any>Component.prototype)[prop.slice(1)] = fn;
      if(typeof caller !== 'function' && caller.split('.')[0] === 'css') {
        (<any>Style.prototype)[prop.slice(1)] = fn;
      }
    } 
    window.onpopstate = (e: any) => {
      if(e.state) {
        // let loaded = false;
        for (let i = 0; i < this.routes.length; i++) {
          const route = this.routes[i];
          const data = this.pathData(route);
          if (data) {
            this.current = route;
            this.current.data = data.data;
            this.window.Native.load('#app', route);
            // loaded = true;
          }
        }
      }
      this.loadSubs(this.current.subs);
    }
    let loaded = false;
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const data = this.pathData(route);
      if (data) {
        this.current = route;
        this.current.subs = [];
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
            this.current.subs = [];
            this.window.Native.load('#app', this.routes[i]);
          }
        }
      }
    }
  }

  host(host: Element, routes: TConfig.Route) {
    this.current.subs = this.current.subs || [];
    this.current.subs.push({ host: host, routes: routes } as any);
  }

  loadSubs(subs: TConfig.Route[]) {
    for(let i = 0; i < subs.length; i++) {
      const routes: any = subs[i].routes;
      for(let j = 0; j < routes.length; j++) {
        const route = routes[j];
        const data = this.pathData(route, true);
        if (data) {
          Object.assign(this.current.data, data.data);
          (<any>window).Native.load('.' + (<any>subs[i]).host.className, route, true);
        }
      }
    }
  }

  go (path: string) {
    window.history.pushState(Object.create(this.current), '', path);
    let loaded = false;
    for (let i = 0; i < this.routes.length; i++) {
      const route = this.routes[i];
      const data = this.pathData(route);
      if (data) {
        this.current = route;
        this.current.data = data.data;
        loaded = true;
        (<any>window).Native.load('#app', route);
      }
    }
    if(!loaded) {
      this.loadSubs(this.current.subs);
    }
  }

  pathData(route: TConfig.Route, sub: boolean = false) {
    let path = (sub) ? this.current.path + route.path : route.path;
    let current = window.location.pathname;
    if(current[current.length - 1] == '/') current = current.substring(0, current.length - 1);
    if(path[path.length - 1] == '/') path = path.substring(0, path.length - 1);

    const variables: any = {};
    path.split('/').map((i, index) => {
      if(i.indexOf(':') > -1) {
        variables[index] = i.slice(1);
      }
    });

    if(route.path == current) {
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
}
