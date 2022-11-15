import {
  ElementEvent, Attributes, Properties, StyleProperties
} from './types';
import { createRules, parseNativeStyle, addLoadQueue } from './utils';

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']', '').toLowerCase();
const Native = function (): any { return (<any>window).Native || undefined };

export interface ELEMENT extends Attributes<ELEMENT>, Properties<ELEMENT> {
  onCreate(): void;
  onDestroy(): void;
}
export interface Style extends Properties<Style> {}

export class ELEMENT {

  $level = 1;
  $children: ELEMENT[] = [];
  $tagName = 'element';
  $root: ELEMENT = undefined;
  $events: any = undefined;
  $className: string = undefined;
  $style: Style[] = [];
  $pseudo: { [key: string]: StyleProperties }[] = [];
  $media: { [key: string]: StyleProperties | string }[] = [];
  $global: { [key: string]: StyleProperties }[] = [];

  $hostComponent: string = Native().serving;
  $node: Element;
  $rules: CSSStyleRule[] = [];

  name = this.constructor.name;
  $tag: string;
  $size: Number[];

  constructor(tagName?: string) {
    this.$tagName = tagName || this.$tagName;
    this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substr(2, 9);
  }

  addChild(...children: ELEMENT[]): ELEMENT {
    if (children[0] instanceof Array) {
      throw `Cannot addChild: ${children[0]} is not valid ELEMENT`;
    }
    if (this.$children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].$root !== undefined) {
          throw `Cannot addChild: ${children[i].name} is already attached`;
        }
        const nullIndex = this.$children.indexOf(null);
        if (nullIndex > -1) this.$children.splice(nullIndex, 1, children[i])
        else this.$children.push(children[i]);
        if (typeof children[i] !== 'string') children[i].$root = this as any;
        if (this.$node) this.$node.append(Native().createElement(children[i]));
      }
      return this as any;
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
      this.$node.removeChild(child.node());
      this.$children.splice(this.$children.indexOf(child), 1);
      this.$children = this.$children.filter(i => i !== null);
      return this;
    } else {
      console.warn(`Cannot removeChild: ${child.name} is not a child of ${this.name}`);
      // throw new Error(`Cannot removeChild: ${child.name} is not a child of ${this.name}`);
    }
  }

  remove() {
    if (this.$root) {
      if (this.$root.$children.indexOf(this) > -1) {
        this.$root.$children.splice(this.$children.indexOf(this), 1);
      }
      this.$root = undefined;
    }
    this.$node && this.$node.remove();
  }

  removeChildren() {
    if (this.$children.length > 0) {
      while (this.$children.length > 0) this.$children.pop().remove();
    }
    this.$children = [];
    console.log(this.$node.childNodes);
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

  removeEventListener(type: string, listener?: () => void) {
    if (this.$node) {
      this.$node.removeEventListener(type, listener || this.$events.find((e: any) => e.name === type).event, { capture: true });
    }
  }

  node(): Element { return this.$node; }
  parent(): ELEMENT { return this.$root; }
  children(): (ELEMENT | string)[] { return this.$children; }

  on(fns: ElementEvent | { [key: string]: (e?: Event) => void }): ELEMENT {
    this.$events = this.$events || [];
    for (const fn in fns) {
      if (type((<any>fns)[fn]) !== 'function') throw `${(<any>fns)[fn]} is not a function`;
      if (type(this.$events) !== 'array') console.trace(this, this.$events);
      this.$events.push({
        event: (<any>fns)[fn].bind(this),
        name: fn, object: this
      });
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

  style(...styles: Style[]): any {
    if (arguments.length == 0) return <any>this.$style;
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].$className) {
        this.$className += ' ' + styles[i].$className;
        this.$style.push(styles[i]);
      }
    }
    return this;
  }

  removeStyle(...styles: Style[]): void {
    if (arguments.length == 0) throw 'Remove style: 0 arguments passed. Min. of 1 expected';
    for (let i = 0; i < styles.length; i++) {
      this.$style = this.$style.filter(s => s.$className === styles[i].$className);
      this.$className.replace(' ' + styles[i].$className, '');
    }
  }

  media(props: {
    [key: string]: StyleProperties & {
      pseudo?: { [key: string]: StyleProperties }
      global?: { [key: string]: StyleProperties }
    }
  }) {
    this.$media.push(props);
    const rules: string[] = [], native = Native();
    Object.getOwnPropertyNames(props).forEach((key: string) => {
      let rule = '@media ' + key + '{ ';
      if (props[key].global) {
        for (const s in <Record<string, any>>props[key].global) {
          rule += '.' + this.$className.replace(/\s/g, '.') + ' ' + s + ' {' + parseNativeStyle(props[key].global[s]) + '} ';
        }
        delete props[key].global;
      }
      if (props[key].pseudo) {
        for (const s in <Record<string, any>>props[key].pseudo) {
          rule += '.' + this.$className.replace(/\s/g, '.') + s + ' {' + parseNativeStyle(props[key].pseudo[s]) + '} ';
        }
        delete props[key].pseudo;
      }
      rule += this.$tagName.toLowerCase() + '.' + this.$className.replace(/\s/g, '.') + ' {' + parseNativeStyle(props[key]) + '} ';
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

  addClassName(name: string): ELEMENT {
    if (this.$node) {
      if (!this.$node.classList || !this.$node.classList.contains(name)) {
        this.$node.classList.add(name);
      }
    }
    if (!this.$className.match(name)) {
      this.$className = this.$className + ' ' + name;
    }
    return this;
  }

  removeClassName(classname?: string): ELEMENT {
    if (this.$node) {
      this.$node.classList.remove(classname);
    }
    this.$className = this.$className.replace(' ' + classname, '');
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
    }
    this.$className = this.$className.replace(/ .+/, '');
    return this;
  }

  replaceTextTag(text: string, tagObject: { [key: string]: any }): ELEMENT {
    const all = text.match(/\$\{\w+(\(.*?\))?\}?/g);
    const children: (ELEMENT | string)[] = [],
      p = (t: string) => {
        all.map((i, inx) => {
          let tag: any = i.replace('${', '').replace('}', ''), args = [];
          const match = tag.match(/(.*)\(/g);
          if (match) {
            tag = match[0]?.replace('(', '');
            args = i.match(/(\(.*)\)/g).map(i => i.replace('(', '').replace(')', ''));
          }
          children.push(t.slice(0, t.indexOf(i)));
          if (!tagObject[tag]) throw "Object tag reference not found";
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

  pseudo(props: { [key: string]: StyleProperties }) {
    this.$pseudo.push(props);
    const rules: string[] = [], native = Native();
    for (const key in props) {
      rules.push('.' + this.$className.replace(/\s/g, '.') + key + ' {' + parseNativeStyle(props[key]) + '} ');
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
    const rules: string[] = [], native = Native();
    for (const key in props) {
      rules.push('.' + this.$className.replace(/\s/g, '.') + ' ' + key + ' {' + parseNativeStyle(props[key]) + '} ');
    }
    if (!native.served && native.serving === this.$hostComponent) {
      native.loadQueue[native.serving].push(() => createRules(this, rules));
    } else {
      createRules(this, rules)
    }
    return this;
  }

};

export class Component extends ELEMENT {

  $nid: string;
  $level = 0;
  $events: { [key: string]: ((..._: any) => any)[] }[] = [] as any;
  $loadQueue: Function[] = [];

  constructor(...args: any[]) {
    super('component');
    this.$nid = Math.random().toString(36).substr(2, 9);
    this.$tagName = this.name.length > 2 ? this.name : this.name + this.$nid;
    Native().serving = this.name + "-" + this.$nid;
    Native().components[this.name] = Native().components[this.name] || { structure: this.constructor } as any;
    Native().components[this.name][this.$nid] = { served: false, watchlist: [] } as any;
    Native().components[this.name][this.$nid].args
      = Native().components[this.name][this.$nid].args || args;
    Native().loadQueue[Native().serving] = [];
    this.display('block');
  }

}

export class PageComponent extends Component {
  constructor() {
    super();
  }

  get route() {
    if (!Native().components[this.name][this.$nid]) {
      throw new Error('Get route: Component doesn\'t exist or has been destroy');
    }
    return Native().components[this.name][this.$nid].route;
  }
}

export class Button extends ELEMENT {
  constructor() {
    super('button');
  }
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
export class Container extends Div {}
export class Link extends A {}
export class Input extends ELEMENT {

  $value?: any;

  constructor() { super('input'); }

  track?(obj: any) {
    obj.watch((v: any) => console.log(v));
    this.on({
      input: (e: any) => {
        obj = e.target.value;
      }
    })
  }

  value = (v?: string | number) => {
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
      rule += key + ' {' + parseNativeStyle(props[key]) + '} ';
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
    const rules = ['.' + this.$className + '{ ' + parseNativeStyle(props) + ' }'];
    addLoadQueue(() => {
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
        rules.push('.' + this.$className + ' ' + key + ' {' + parseNativeStyle(props[key]) + '} ');
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
        rules.push('.' + this.$className.replace(' ', '.') + key + ' {' + parseNativeStyle(props[key]) + '} ');
      }
      createRules(this, rules);
    });
    return this;
  }
}

