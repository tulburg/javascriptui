import Props from './props';
import { StyleProperties, Attributes, Properties, ElementEvent } from './types';
let createSheet: any;
export const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']', '').toLowerCase();

createSheet = function (data: string[]) {
  const allStyles = document.head.getElementsByTagName('style');
  const id = 'n' + Math.random().toString(36).substring(2, 9);
  const style: any = Array.from(allStyles).find(i => i.id === Native.sheetId);
  if (style) style.disabled = true;
  const newStyle: any = document.createElement('style');
  newStyle.appendChild(document.createTextNode(''));
  newStyle.setAttribute('id', id);
  document.head.appendChild(newStyle);
  for (let i = 0; i < data.length; i++) {
    if (data[i].trim().length > 0 && !data[i].trim().match('{ }')) {
      const rule = data[i].trim();
      try {
        newStyle.sheet.insertRule(rule, newStyle.sheet.cssRules.length);
      } catch (e: any) {
        throw Error('Rule not applied: ' + rule + ' ' + e.message);
      }
    }
  }
  return { sheet: newStyle.sheet, id };
};

class NativeClass {
  sheet: CSSStyleSheet;
  sheetId: string = '';
  serving: string;
  served: boolean;
  loadQueue: { [key: string]: Function[] } = {} as any;
  components: {
    [key: string]: {
      [key: string]: ELEMENT & {
        served: boolean,
        watchlist: {
          prop: string; oldValue: any; function: Function
        }[],
        args: any[],
        instance: ELEMENT,
        rootNode: Element,
      }
    }
  } & {
    structure: Function
  } = {} as any;
  constructor() {
    const { sheet, id } = createSheet([]);
    this.sheet = sheet;
    this.sheetId = id;
  }

  load(selector: string, root: ELEMENT) {
    document.querySelector(selector).appendChild(createElement(root));
    if (this.serving) {
      this.loadQueue[this.serving].forEach(i => Function.prototype.call.apply(i));
      this.loadQueue[this.serving] = [];
    }
  }

  registerTheme(theme: any) {
    const styles: string[] = [];
    const globals = theme.globals || theme.Globals;
    if (globals) {
      for (const key in globals) {
        if (type(globals[key]) === 'object') styles.push(key + ' { ' + Parser.parseNativeStyle(globals[key]) + ' } ');
        else if (type(globals[key]) === 'string') styles.push(key + ' {' + globals[key] + ' } ');
      }
      return createRules(this, styles);
    }
  }
}

const Native = new NativeClass();
(<any>window).Native = Native;
Native.sheet.insertRule('app{}');
// export default Native;

export interface ELEMENT extends Attributes<ELEMENT>, Properties<ELEMENT> {
  onCreate(): void;
  onDestroy(): void;
}
export interface Style extends Properties<Style> {}

export class ELEMENT {
  $level = 1;
  $children: ELEMENT[] = [];
  $tagName = 'ELEMENT';
  $root: ELEMENT = undefined;
  $events: any = undefined;
  $className: string = undefined;
  $styles: Style[] = [];
  $pseudo: { [key: string]: StyleProperties }[] = [];
  $medias: { [key: string]: StyleProperties | string }[] = [];
  $global: { [key: string]: StyleProperties }[] = [];
  $nid: string;

  // -- Render properties
  $hostComponent: string = Native.serving;
  $node: Element;
  // $styles: CSSStyleRule[] = [];
  $rules: CSSStyleRule[] = [];

  name = this.constructor.name;
  $tag: string;
  $size: Number[];
  // get name() { return this.constructor.name };
  //

  constructor(tagName?: string) {
    this.$tagName = tagName || this.$tagName;
    this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substring(2, 9);
  }

  addChild(...children: ELEMENT[]): ELEMENT {
    if (children[0] instanceof Array) {
      throw `Cannot addChild: ${children[0]} is not valid ELEMENT`;
    }
    if (this.$children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === undefined) {
          throw `Cannot addChild: ${children[0]}`;
        }
        if (children[i].$root !== undefined) {
          throw `Cannot addChild: ${children[i].name} is already attached`;
        }
        const nullIndex = this.$children.indexOf(null);
        if (nullIndex > -1) this.$children.splice(nullIndex, 1, children[i])
        else this.$children.push(children[i]);
        children[i].$root = this;
        if (this.$node) this.$node.append(createElement(children[i]));
      }
      return this;
    } else {
      throw `Cannot addChild: ${this.name} does not accept children`;
    }
  }

  removeChild(child: ELEMENT): ELEMENT {
    if (this.$children.indexOf(child) > -1) {
      child.$root = undefined;
      const resetRules = (item: ELEMENT) => {
        item.$rules = []
        if (item.$children.length > 0) item.$children.forEach(i => type(i) === 'object' && resetRules(i));
      }
      resetRules(child);
      this.$children.splice(this.$children.indexOf(child), 1);
      if (this.$node) this.$node.removeChild(child.$node);
      return this;
    } else {
      console.warn(`Cannot removeChild: ${child.name} is not a child of ${this.name}`);
      // throw new Error(`Cannot removeChild: ${child.name} is not a child of ${this.name}`);
    }
  }

  removeChildren(): ELEMENT {
    if (this.$children.length > 0) {
      while (this.$children.length > 0) this.$children.pop()?.remove();
      this.$children = [];
    }
    return this;
  }

  remove() {
    if (this.$root) {
      if (this.$root.$children.indexOf(this) > -1) {
        this.$root.$children.splice(this.$children.indexOf(this), 1);
      }
      this.$root = undefined as any;
    }
    this.$node && this.$node.remove();
  }

  replaceChild(child: ELEMENT, newChild: ELEMENT) {
    if (this.$children.indexOf(child) > -1) {
      if (newChild.$root != undefined) {
        throw `Cannot replaceChild: ${newChild.name} is already attched`;
      }
      this.$children.splice(this.$children.indexOf(child), 1, newChild);
      newChild.$root = this;
      return this;
    } else {
      // child doesnt exist on parent
    }

    if (this.$node) {
      this.$node.removeChild(child.$node);
      this.$node.appendChild(newChild.$node);
    }
  }

  node(): Element { return this.$node; }
  parent(): ELEMENT { return this.$root; }
  children(): (ELEMENT | string)[] { return this.$children; }

  on(fns: ElementEvent | { [key: string]: (e?: Event) => void }): ELEMENT {
    this.$events = this.$events || [];
    for (const fn in fns) {
      // const event: any = {};
      // event[fn] = (<any>fns)[fn];
      if (type((<any>fns)[fn]) !== 'function') throw `${(<any>fns)[fn]} is not a function`;
      // console.log(Function.prototype.bind.apply(fns[fn], this), this);
      if (type(this.$events) !== 'array') console.trace(this, this.$events);
      this.$events.push({
        event: (<any>fns)[fn].bind(this),
        name: fn, object: this
      });
      // Native.bindings[Native.serving.split('-')[1]]
      //   = Native.bindings[Native.serving.split('-')[1]] || [];
      // const binding = Native.bindings[Native.serving.split('-')[1]];
      // binding.push({ event: fns[fn], object: this, name: fn });
      // this.events.push(event);
    }
    return this;
  }

  dispatch(event: string) {
    if (!this.$node) throw `Cannot dispatch, node is not attached`;
    else {
      const e = new Event(event, { bubbles: false });
      this.$node.dispatchEvent(e);
    }
    return this;
  }

  text(string?: string): ELEMENT {
    if (string != undefined) {
      if (typeof this.$children[0] == 'string') this.$children.splice(0, 1, string as any);
      else this.$children.unshift(string as any);
      if (this.$node) (<any>this.$node).innerText = string;
      return this;
    }
    if (Object.prototype.toString.call(this.$children[0]) === '[object String]') {
      return this.$children[0];
    }
    return this;
  }

  styles(...styles: Style[]): any {
    if (arguments.length == 0) return <any>this.$styles;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].$className) {
        this.$className += ' ' + styles[i].$className;
        this.$styles.push(styles[i]);
      }
    }
    return this;
  }

  removeStyle(...styles: Style[]): void {
    if (arguments.length == 0) throw 'Remove style: 0 arguments passed. Min. of 1 expected';
    for (let i = 0; i < styles.length; i++) {
      this.$styles = this.$styles.filter(s => s.$className === styles[i].$className);
      this.$className.replace(' ' + styles[i].$className, '');
    }
  }

  medias(props: { [key: string]: StyleProperties }) {
    this.$medias.push(props);
    const rules: string[] = [], native = Native;
    Object.getOwnPropertyNames(props).forEach((key: string) => {
      let rule = '@media ' + key + '{ ';
      rule += this.$tagName.toLowerCase() + '.' + this.$className.replace(' ', '.') + ' {' + Parser.parseNativeStyle(props[key]) + '} ';
      rule += ' }';
      rules.push(rule);
    });
    native.loadQueue[native.serving].push(() => createRules(this, rules));
    return this;
  }

  animate(callback: () => void): any {
    const work = () => {
      callback();
      requestAnimationFrame(work);
    }
    requestAnimationFrame(work)
    return this
  }

  pseudo(props: { [key: string]: StyleProperties }) {
    this.$pseudo.push(props);
    const rules: string[] = [], native = Native;
    for (const key in props) {
      rules.push('.' + this.$className.replace(' ', '.') + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
    }
    if (!native.served && native.serving === this.$hostComponent) {
      native.loadQueue[native.serving].push(() => createRules(this, rules));
    } else {
      createRules(this, rules)
    }
    return this;
  }

  global(props: { [key: string]: StyleProperties }) {
    this.$global.push(props);
    const rules: string[] = [], native = Native;
    for (const key in props) {
      rules.push('.' + this.$className + ' ' + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
    }
    if (!native.served && native.serving === this.$hostComponent) {
      native.loadQueue[native.serving].push(() => createRules(this, rules));
    } else {
      createRules(this, rules)
    }
    return this;
  }

  addClassName(name: string): ELEMENT {
    if (this.$node) {
      if (!this.$node.classList || !this.$node.classList.contains(name)) {
        this.$node.classList.add(name);
      }
    } else {
      if (!this.$className.match(name)) {
        this.$className = this.$className + ' ' + name;
      }
    }
    return this;
  }

  tag(tag?: string): ELEMENT | string {
    if (tag !== undefined) {
      this.$tag = tag;
      return this;
    }
    return this.$tag;
  }

  child(predicate: { [key: string]: any }): ELEMENT {
    const children = this.$children.filter(child => {
      const keys = window.Object.keys(predicate), check = keys.length;
      let valid = 0;
      keys.forEach(key => {
        if (predicate[key] === (<any>child)['$' + key]) {
          valid += 1;
        }
      });
      if (valid === check) return true;
    });
    return children[0];
  }

  removeAllClassName(): ELEMENT {
    if (this.$node) {
      this.$node.classList.forEach((i, index) => {
        if (index > 0) this.$node.classList.remove(i);
      });
    } else this.$className = this.$className.replace(/ .+/, '');
    return this;
  }

  removeClassName(classname?: string): ELEMENT {
    if (this.$node) {
      this.$node.classList.remove(classname);
    } else if (this.$className.match(classname)) {
      this.$className = this.$className.replace(' ' + classname, '');
    }
    return this;
  }

  replaceTextTag(text: string, tagObject: { [key: string]: any }): ELEMENT {
    const all = text.match(/\${\w+(\(.*\))?\}?/g);
    const children: (ELEMENT | string)[] = [],
      p = (t: string) => {
        all.map((i, inx) => {
          let tag: any = i.replace('${', '').replace('}', ''), args = [];
          const match = tag.match(/(\w+)\(/g);
          if (match) {
            tag = match[0]?.replace('(', '');
            args = i.match(/(\(.*)\)/g).map(i => i.replace('(', '').replace(')', ''));
          }
          children.push(t.slice(0, t.indexOf(i)));
          children.push(tagObject[tag](...args));
          t = t.slice(t.indexOf(i) + i.length);
          if (inx === all.length - 1) {
            if (t.length > 0) children.push(t);
          }
        });
      };
    if (all) {
      p(text);
      children.forEach((child: ELEMENT) => {
        const nullIndex = this.$children.indexOf(null);
        if (nullIndex > -1) this.$children.splice(nullIndex, 1, child)
        else this.$children.push(child);
        (type(child) === 'object') ? child.$root = this : '';
      })
    } else this.$children.push(text as any);
    return this;
  }
}

export const Parser = {
  parseNativeStyle: function (obj: ELEMENT | any) {
    let objStyles = '';
    for (let prop in obj) {
      if (ELEMENT.prototype[prop]) {
        const key = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        objStyles += key + ': '
          + Parser.parseStyleValue(obj[prop]) + '; ';
      } else {
        if (prop.replace('$', '').match('--')) {
          const root = prop.replace('$', '');
          objStyles += `${root}: ${obj[root]}; `;
        } else if (Props.excludes.indexOf(prop.toLowerCase()) < 0 && obj.$level != 0) {
          throw new Error('Invalid css property ' + prop);
        }
      }
    }
    return objStyles;
  },

  parseProperties: function (component: ELEMENT | any, state?: boolean) {
    const properties: any = {};
    let componentStyles = component.$tagName + '.'
      + component.$className.split(' ')[0] + ' { ';
    const props = Object.getOwnPropertyNames(component);
    cssProps = cssProps || altProps;
    all = all || Object.keys(Props.props).concat(Props.excludes);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (all.indexOf(prop) === -1 && cssProps.indexOf(prop.slice(1)) > -1 && prop[0] === '$') {
        let key = prop.slice(1).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        if (key.match(/^webkit-/) || key.match(/^o-/) || key.match(/^ms-/) || key.match(/^moz-/)) {
          key = '-' + key;
        }
        componentStyles += key + ': '
          + Parser.parseStyleValue(component[prop]) + '; ';
      } else if (Props.props[prop] || prop === '$events') {
        if (component[prop] !== undefined) {
          if (prop !== '$events') properties[Props.props[prop].split('.')[1]] = component[prop];
          else properties[prop] = component[prop];
        } else if (Props.excludes.indexOf(prop) < 0 && component.$level !== 0) {
          throw new Error('Invalid property ' + prop);
        }
      }
    }
    if (!state) createRules(component, [componentStyles + '} ']);
    return properties;
  },

  parseStyleValue: function (value: any): any {
    if (value == null) {
      return 'unset';
    } else if (typeof value == 'string') {
      return value;
    } else if (typeof value == 'number') {
      return value + 'px';
    } else if (value instanceof Array) {
      return value.map(v => Parser.parseStyleValue(v)).join(' ');
    }
    return value;
  }
}

export const createRules = function (object: any, rules: string[]) {
  const sheet = Native.sheet;
  rules.forEach(css => {
    try {
      const length = sheet.cssRules.length;
      sheet.insertRule(css, length);
      object.$rules = object.$rules || [];
      object.$rules.unshift(sheet.cssRules[length]);
    } catch (e) {
      throw new Error('Rule not applied: ' + css + e.message);
    }
  });
}

export function createElement(object: ELEMENT, updateState?: any) {
  const graphics = ['svg', 'path'] //... plus more
  const create = (parent: HTMLElement, item: ELEMENT) => {
    const c = graphics.indexOf(item.$tagName) < 0 ? document.createElement(item.$tagName) : document.createElementNS((<any>item).$xmlns || parent.namespaceURI, item.$tagName);
    const parsedProperties = Parser.parseProperties(item, updateState);
    for (const prop in parsedProperties) {
      if (prop == '$events') {
        for (let i = 0; i < parsedProperties[prop].length; i++) {
          const e = parsedProperties[prop][i];
          c.addEventListener(e.name, e.event, { capture: true });
        }
      } else {
        c.setAttribute(prop === 'className' ? 'class' : prop, parsedProperties[prop])
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
      const nid = (newInstance as ELEMENT).$nid;
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

      queueMicrotask(() => {
        if (!updateState) {
          if (newInstance.onCreate) {
            newInstance.onCreate();
            newInstance.dispatch('create');
          }
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
        create(c, <ELEMENT>item.$children[i]);
      }
    }
    return c;
  };
  const result = create(undefined, object);
  return result;
}

export class Component extends ELEMENT {

  $nid: string;
  $level = 0;
  $events: { [key: string]: ((..._: any) => any)[] }[] = [] as any;
  $loadQueue: Function[] = [];

  constructor(...args: any[]) {
    super('component');
    this.$nid = Math.random().toString(36).substr(2, 9);
    this.$tagName = this.name.length > 2 ? this.name : this.name + this.$nid;
    Native.serving = this.name + "-" + this.$nid;
    Native.components[this.name] = Native.components[this.name] || { structure: this.constructor } as any;
    Native.components[this.name][this.$nid] = { served: false, watchlist: [] } as any;
    Native.components[this.name][this.$nid].args
      = Native.components[this.name][this.$nid].args || args;
    Native.loadQueue[Native.serving] = [];
    this.display('block');
  }

  parent() {
    return this.$root;
  }

  children() {
    return this.$children;
  }
}

export class PageComponent extends Component {
  constructor() {
    super();
  }
}

export class Button extends ELEMENT {
  constructor() {
    super('button');
    this.text('Button');
  }
}

export class Container extends ELEMENT {
  constructor() { super('div'); }
}

// 'A,Abbr,Applet,Area,Article,Aside,Audio,Base,BaseFont,BDO,BlockQuote,Body,BR,Canvas,Caption,Code,Col,ColGroup,Data,Details,DFN,Dialog,DIR,Div,DL,EM,Embed,FieldSet,FigCaption,Figure,Font,Footer,Form,Del,Frame,FrameSet,H1,H2,H3,H4,H5,H6,Head,Header,HR,HTML,IFrame,Image,IMG,Ins,IsIndex,Label,Link,Legend,LI,Main,Map,Mark,Menu,Meta,Meter,Nav,ObjectElement,OL,OptGroup,Option,Output,P,Param,Path,Pre,Progress,Q,Script,Section,Select,Slot,Source,Span,Strong,Summary,Table,TBody,TD,Textarea,TFoot,TH,THead,Time,TR,Track,UL,Video'.split(',').forEach(i => module.exports[i] = class extends ELEMENT { constructor() { super(i) } });
export class Input extends ELEMENT {
  $value?: any;
  constructor() { super('input'); }
  value?= (v?: string | number) => {
    if (v !== undefined) {
      if (this.$node) {
        if ((<any>this.$node).type !== 'file') (<any>this.$node).value = v;
        this.$value = v;
      } else this.$value = v;
      return this;
    } else return this.$value;
  }
}

export class SVG extends ELEMENT {
  constructor() {
    super('svg');
    this.attrXmlns('http://www.w3.org/2000/svg');
  }
}

export class Animation {

  $className: string;
  name: string;
  $rule: CSSStyleRule;

  constructor(props: { [key: string]: StyleProperties } & { 'from'?: StyleProperties } & { 'to'?: StyleProperties }) {
    this.$className = this.name = 's' + Math.random().toString(36).substr(2, 9);
    let rule = '@keyframes ' + this.$className + '{ ';
    Object.getOwnPropertyNames(props).forEach((key: string) => {
      rule += key + ' {' + Parser.parseNativeStyle(props[key]) + '} ';
    });
    rule += ' }';
    createRules(this, [rule]);
  }
}

export class Style {

  $className: string;
  $rules: CSSStyleRule[] = [];

  constructor(props: StyleProperties) {
    this.$className = 's' + Math.random().toString(36).substr(2, 9);
    const rules = ['.' + this.$className + '{  }'];
    (<any>window).__native_load_queue = (<any>window).__native_load_queue || [];
    (<any>window).__native_load_queue.push(() => {
      createRules(this, rules);
      Object.getOwnPropertyNames(props).forEach(i => {
        (<any>this)[i]((<any>props)[i]);
      });
    });
  }

  global(props: { [key: string]: StyleProperties }) {
    (<any>window).__native_load_queue = (<any>window).__native_load_queue || [];
    (<any>window).__native_load_queue.push(() => {
      const rules: string[] = [];
      for (const key in props) {
        rules.push('.' + this.$className + ' ' + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
      }
      createRules(this, rules);
    });
    return this;
  }

  pseudo(props: { [key: string]: StyleProperties }) {
    (<any>window).__native_load_queue = (<any>window).__native_load_queue || [];
    (<any>window).__native_load_queue.push(() => {
      const rules: string[] = [];
      for (const key in props) {
        rules.push('.' + this.$className.replace(' ', '.') + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
      }
      createRules(this, rules);
    });
    return this;
  }
}


let all, cssProps;
let altProps = Object.getOwnPropertyNames(document.head.style);
if (altProps.length === 0) altProps = Object.keys((<any>document.head.style).__proto__).filter(i => !i.match('-'))
let propIndex = 0;
while (propIndex < altProps.length - 1) {
  const prop = altProps[propIndex], key = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  const fns = function () {
    Object.defineProperty(this, '$' + prop, {
      writable: true,
      enumerable: true,
      configurable: true
    });
    // if ((<any>Native).serving) return;
    const value = arguments.length === 1 ? arguments[0] : Array.from(arguments);
    if (arguments.length > 0) {
      this.$rules = this.$rules || [];
      if (this.$rules.length > 0) {
        this.$rules[this.$rules.length - 1].style.setProperty(key, Parser.parseStyleValue(value));
      }
      this['$' + prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
    } else return this['$' + prop];
    return this;
  };
  (<any>ELEMENT.prototype)[prop] = fns;
  (<any>Style.prototype)[prop] = fns;
  propIndex++;
}


// if(Native.sheet.cssRules.length === 1) Native.writeGlobals(Config.theme || {});
const props = Object.getOwnPropertyNames(Props.props);
for (let i = 0; i < props.length; i++) {
  const prop = props[i], caller = Props.props[prop]; let fn: Function;
  const split = caller.split('.'),
    key = split[0], name = split[1];
  fn = function () {
    Object.defineProperty(this, prop, {
      writable: true,
      enumerable: true,
      configurable: true
    });
    // if ((<any>Native).serving) return this;
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
  // (<any>Component.prototype)[prop.slice(1)] = fn;
}

export class A extends ELEMENT {
  constructor() { super('a'); }
}

export class Abbr extends ELEMENT {
  constructor() { super('abbr'); }
}

export class Applet extends ELEMENT {
  constructor() { super('applet'); }
}

export class Area extends ELEMENT {
  constructor() { super('area'); }
}

export class Article extends ELEMENT {
  constructor() { super('article'); }
}

export class Aside extends ELEMENT {
  constructor() { super('aside'); }
}

export class Audio extends ELEMENT {
  constructor() { super('audio'); }
}

export class Base extends ELEMENT {
  constructor() { super('base'); }
}

export class BaseFont extends ELEMENT {
  constructor() { super('basefont'); }
}

export class BDO extends ELEMENT {
  constructor() { super('bdo'); }
}

export class BlockQuote extends ELEMENT {
  constructor() { super('blockquote'); }
}

export class Body extends ELEMENT {
  constructor() { super('body'); }
}

export class BR extends ELEMENT {
  constructor() { super('br'); }
}

export class Canvas extends ELEMENT {
  constructor() { super('canvas'); }
}

export class Caption extends ELEMENT {
  constructor() { super('caption'); }
}

export class Code extends ELEMENT {
  constructor() { super('code'); }
}

export class Col extends ELEMENT {
  constructor() { super('col'); }
}

export class ColGroup extends ELEMENT {
  constructor() { super('colgroup'); }
}

export class Data extends ELEMENT {
  constructor() { super('data'); }
}

export class Details extends ELEMENT {
  constructor() { super('details'); }
}

export class DFN extends ELEMENT {
  constructor() { super('dfn'); }
}

export class Dialog extends ELEMENT {
  constructor() { super('dialog'); }
}

export class DIR extends ELEMENT {
  constructor() { super('dir'); }
}

export class Div extends ELEMENT {
  constructor() { super('div'); }
}

export class DL extends ELEMENT {
  constructor() { super('dl'); }
}

export class EM extends ELEMENT {
  constructor() { super('em'); }
}

export class Embed extends ELEMENT {
  constructor() { super('embed'); }
}

export class FieldSet extends ELEMENT {
  constructor() { super('fieldset'); }
}

export class FigCaption extends ELEMENT {
  constructor() { super('figcaption'); }
}

export class Figure extends ELEMENT {
  constructor() { super('figure'); }
}

export class Font extends ELEMENT {
  constructor() { super('font'); }
}

export class Footer extends ELEMENT {
  constructor() { super('footer'); }
}

export class Form extends ELEMENT {
  constructor() { super('form'); }
}

export class Del extends ELEMENT {
  constructor() { super('del'); }
}

export class Frame extends ELEMENT {
  constructor() { super('frame'); }
}

export class FrameSet extends ELEMENT {
  constructor() { super('frameset'); }
}

export class H1 extends ELEMENT {
  constructor() { super('h1'); }
}

export class H2 extends ELEMENT {
  constructor() { super('h2'); }
}

export class H3 extends ELEMENT {
  constructor() { super('h3'); }
}

export class H4 extends ELEMENT {
  constructor() { super('h4'); }
}

export class H5 extends ELEMENT {
  constructor() { super('h5'); }
}

export class H6 extends ELEMENT {
  constructor() { super('h6'); }
}

export class Head extends ELEMENT {
  constructor() { super('head'); }
}

export class Header extends ELEMENT {
  constructor() { super('header'); }
}

export class HR extends ELEMENT {
  constructor() { super('hr'); }
}

export class HTML extends ELEMENT {
  constructor() { super('html'); }
}

export class IFrame extends ELEMENT {
  constructor() { super('iframe'); }
}

export class Image extends ELEMENT {
  constructor() { super('img'); }
}

export class IMG extends ELEMENT {
  constructor() { super('img'); }
}
export class Ins extends ELEMENT {
  constructor() { super('ins'); }
}

export class IsIndex extends ELEMENT {
  constructor() { super('isindex'); }
}

export class Label extends ELEMENT {
  constructor() { super('label'); }
}

export class Legend extends ELEMENT {
  constructor() { super('legend'); }
}

export class LI extends ELEMENT {
  constructor() { super('li'); }
}

export class Main extends ELEMENT {
  constructor() { super('main'); }
}

export class Map extends ELEMENT {
  constructor() { super('map'); }
}

export class Mark extends ELEMENT {
  constructor() { super('mark'); }
}

export class Menu extends ELEMENT {
  constructor() { super('menu'); }
}

export class Meta extends ELEMENT {
  constructor() { super('meta'); }
}

export class Meter extends ELEMENT {
  constructor() { super('meter'); }
}

export class Nav extends ELEMENT {
  constructor() { super('nav'); }
}

export class ObjectElement extends ELEMENT {
  constructor() { super('object'); }
}

export class OL extends ELEMENT {
  constructor() { super('ol'); }
}

export class OptGroup extends ELEMENT {
  constructor() { super('optgroup'); }
}

export class Option extends ELEMENT {
  constructor() { super('option'); }
}

export class Output extends ELEMENT {
  constructor() { super('output'); }
}

export class P extends ELEMENT {
  constructor() { super('p'); }
}

export class Param extends ELEMENT {
  constructor() { super('param'); }
}

export class Path extends ELEMENT {
  constructor() { super('path'); }
}

export class Pre extends ELEMENT {
  constructor() { super('pre'); }
}

export class Progress extends ELEMENT {
  constructor() { super('progress'); }
}

export class Q extends ELEMENT {
  constructor() { super('q'); }
}

export class Script extends ELEMENT {
  constructor() { super('script'); }
}

export class Section extends ELEMENT {
  constructor() { super('section'); }
}

export class Select extends ELEMENT {
  constructor() { super('select'); }
}

export class Slot extends ELEMENT {
  constructor() { super('slot'); }
}

export class Source extends ELEMENT {
  constructor() { super('source'); }
}

export class Span extends ELEMENT {
  constructor() { super('span'); }
}

export class Strong extends ELEMENT {
  constructor() { super('strong'); }
}

export class Summary extends ELEMENT {
  constructor() { super('summary'); }
}

export class Table extends ELEMENT {
  constructor() { super('table'); }
}

export class TBody extends ELEMENT {
  constructor() { super('tbody'); }
}

export class TD extends ELEMENT {
  constructor() { super('td'); }
}

export class Textarea extends ELEMENT {
  constructor() {
    super('textarea');
  }
}

export class TFoot extends ELEMENT {
  constructor() { super('tfoot'); }
}

export class TH extends ELEMENT {
  constructor() { super('th'); }
}

export class THead extends ELEMENT {
  constructor() { super('thead'); }
}

export class Time extends ELEMENT {
  constructor() { super('time'); }
}

export class TR extends ELEMENT {
  constructor() { super('tr'); }
}

export class Track extends ELEMENT {
  constructor() { super('track'); }
}

export class UL extends ELEMENT {
  constructor() { super('ul'); }
}

export class Video extends ELEMENT {
  constructor() {
    super('video');
  }
}
