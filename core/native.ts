import Parser from './parser';
import { createSheet, createRules } from './styles';
import { $RxElement, Component } from './components';
import Router from './router';
import { ConfigType } from './types';

class Native {

  router: Router;
  components: {
    [key: string]: {
      [key: string]: $RxElement & {
        served: boolean,
        watchlist: {
          prop: string; oldValue: any; function: Function
        }[],
        args: any[],
        instance: $RxElement,
        route: ConfigType.Route,
        rootNode: Element,
        sub: ConfigType.Route
      }
    }
  } & {
    structure: Function
  } = {} as any;
  sheet: CSSStyleSheet;
  served: boolean;
  serving: string;
  loadQueue: { [key: string]: Function[] } = {} as any;
  bindings: any = {};
  shadowing = false;
  lock: { key: string, className: string, nid: string, type: 'property' | 'state' };

  constructor(router: Router) {
    (<any>window).Native = this;
    this.components = {} as any;
    this.router = router;
    this.sheet = createSheet([]);
    return this;
  }

  writeGlobals(theme: any) {
    const styles = [];
    const globals = theme.globals || theme.Globals;
    if (globals) {
      for (const key in globals) {
        if (type(globals[key]) === 'object') styles.push(key + ' { ' + Parser.parseNativeStyle(globals[key]) + ' } ');
        else if (type(globals[key]) === 'string') styles.push(key + ' {' + globals[key] + ' } ');
      }
      return createRules(this, styles);
    }
  }

  parseStyleValue(value: any): any {
    if (value == null) {
      return 'unset';
    } else if (typeof value == 'string') {
      return value;
    } else if (typeof value == 'number') {
      return value + 'px';
    } else if (value instanceof Array) {
      return value.map(v => this.parseStyleValue(v)).join(' ');
    }
    return value;
  }

  createElement(object: $RxElement | Component, updateState?: any) {
    const graphics = ['svg', 'path'] //... plus more
    const create = (parent: Element, item: $RxElement) => {
      const c = graphics.indexOf(item.$tagName) < 0 ? document.createElement(item.$tagName) : document.createElementNS((<any>item).$attrXmlns || parent.namespaceURI, item.$tagName);
      const parsedProperties = Parser.parseProperties(item, updateState);
      for (const prop in parsedProperties) {
        if (prop == '$events') {
          for (let i = 0; i < parsedProperties[prop].length; i++) {
            const e = parsedProperties[prop][i];
            c.addEventListener(e.name, e.event, { capture: true });
          }
        } else {
          c.setAttribute(prop, this.parseStyleValue(parsedProperties[prop]))
        }
      }
      item.$node = c;
      if (parent) parent.appendChild(c);
      if (item.$level === 0 && parent != undefined) {
        const oldServing = this.serving;
        const component = item;
        this.components[component.name]
          = this.components[component.name] || { structure: component.constructor } as any;
        const newInstance = item;
        const nid = (newInstance as Component).$nid;
        this.components[component.name][nid].route = this.router.current;
        this.components[component.name][nid].instance = newInstance;
        if (this.bindings[nid]) {
          for (let i = 0; i < this.bindings[nid].length; i++) {
            const event = this.bindings[nid][i];
            const o: any = {};
            o[event.name] = event.event.bind(newInstance);
            event.object.$events.push(o);
            c.addEventListener(event.name, event.event, { capture: true });
            this.bindings[nid].splice(i, 1);
            i--;
          }
          if (this.bindings[nid].length < 1) {
            delete this.bindings[nid];
          }
        }

        queueMicrotask(() => {
          if (this.components[component.name][nid] && this.components[component.name][nid].rootNode == undefined) {
            this.components[component.name][nid].rootNode = item.$node;
          }
        })
        this.serving = oldServing;
        this.components[component.name][nid].served = true;
      }
      queueMicrotask(() => {
        if (item.onCreate) item.onCreate();
        item.dispatch('create');
      });
      for (let i = 0; i < item.$children.length; i++) {
        if (typeof item.$children[i] === 'string') {
          c.appendChild(document.createTextNode(<any>item.$children[i]));
        } else {
          create(c, item.$children[i]);
        }
      }
      return c;
    };
    const result = create(undefined, object);
    return result;
  }

  load(parentSelector: string, route: ConfigType.Route, sub: ConfigType.Route) {
    const parent = document.querySelector(parentSelector);
    const component = route.component;
    this.served = false;
    if (!component) {
      throw new Error('Can\'t find component ' + route.name);
    }
    this.components[component.name] = this.components[component.name] || { structure: component } as any;
    const newInstance: Component = new (<any>route).component();
    const nid = newInstance.$nid;
    if (sub) this.components[component.name][nid].sub = sub;
    this.components[component.name][nid].route = this.router.current;
    this.components[component.name][nid].instance = newInstance;

    if (this.bindings[nid]) {
      for (let i = 0; i < this.bindings[nid].length; i++) {
        const event = this.bindings[nid][i];
        const o: any = {};
        o[event.name] = event.event.bind(newInstance);
        event.object.$events.push(o);
        this.bindings[nid].splice(i, 1);
        i--;
      }
      if (this.bindings[nid].length < 1) {
        delete this.bindings[nid];
      }
    }
    const rootNode = this.createElement(newInstance);// createElement(parsed.tree);
    if (this.components[component.name][nid].rootNode == undefined) {
      this.components[component.name][nid].rootNode = rootNode;
    }
    for (let c = 0; c < parent.childNodes.length; c++) {
      if (parent.childNodes[c].nodeType !== parent.TEXT_NODE) {
        parent.removeChild(parent.childNodes[c]);
      }
    }
    if (parent.childNodes.length > 2) {
      console.warn('Loading a component on a non empty container!');
    }
    parent.appendChild(rootNode);
    queueMicrotask(() => {
      window.onbeforeunload = (e: any) => {
        if (newInstance.onDestroy) newInstance.onDestroy();
        const cascadeDestroy = (c0: $RxElement) => {
          if (c0.$events && c0.$events.find((ev: any) => ev.name === 'destroy')) {
            c0.dispatch('destroy');
          }
          if (c0.$children.length > 0) c0.$children.forEach(child => {
            if (child.$node && child.$node.nodeType !== child.$node.TEXT_NODE) cascadeDestroy(child);
          });
        }
        cascadeDestroy(newInstance);
      }
    });
    if (this.serving) {
      this.loadQueue[this.serving].forEach(i => Function.prototype.call.apply(i));
      this.loadQueue[this.serving] = [];
    }
    this.serving = undefined;
    this.components[component.name][nid].served = true;
    this.served = true;

    if (route.hosting && route.hosting.length > 0) {
      this.router.loadSubs(route.hosting);
    }
  }

  unload(parentSelector: string) {
    const parent = document.querySelector(parentSelector);
    if (parent && parent.childNodes.length > 0) parent.removeChild(parent.childNodes[0]);
  }
}

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']', '').toLowerCase();
export default Native;
export function addLoadQueue(fn: () => void) {
  const w: any = window;
  w.__native_load_queue = w.__native_load_queue || [];
  w.__native_load_queue.push(fn);
}

