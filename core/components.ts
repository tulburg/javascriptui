import Parser from './parser';
import {
  ElementEvent, StyleProperties, Attributes, Properties
} from './types';
import NativeClass from './native';
import {createRules} from './styles';

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']','').toLowerCase();
const Native = function() : NativeClass {  return (<any>window).Native || undefined };

export interface $RxElement extends Attributes<$RxElement>, Properties<$RxElement> {}
export interface Style extends Properties<Style> {}

export class $RxElement {

  $level = 1;
  $children: $RxElement[] = [];
  $tagName = '$RxElement';
  $root: $RxElement = undefined;
  $events: any = undefined;
  $className: string = undefined;
  $style: Style[] = [];
  $pseudo: {[key: string]: StyleProperties}[] = [];
  $media: {[key: string]: StyleProperties | string}[] = [];
  $global: {[key: string]: StyleProperties}[] = [];

  $hostComponent: string = (<any>window).Native.serving;
  $node: Element;
  $rules: CSSStyleRule[] = [];

  name = this.constructor.name;
  $tag: string;
  $size: Number[];

  constructor(tagName?: string) {
    this.$tagName = tagName || this.$tagName;
    this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substr(2, 9);
  }

  onCreate() {}
  onDestroy() {}

  addChild(...children: $RxElement[]): $RxElement {
    if(children[0] instanceof Array) {
      throw `Cannot addChild: ${children[0]} is not valid $RxElement`;
    }
    if(this.$children) {
      for(let i = 0; i < children.length; i++) {
        if(children[i].$root !== undefined) {
          throw `Cannot addChild: ${children[i].name} is already attached`;
        }
        const nullIndex = this.$children.indexOf(null);
        if(nullIndex > -1) this.$children.splice(nullIndex, 1, children[i])
          else this.$children.push(children[i]);
        children[i].$root = this as any;
        if(this.$node) this.$node.append(Native().createElement(children[i]));
      }
      return this as any;
    }else {
      throw `Cannot addChild: ${this.name} does not accept children`;
    }
  }

  removeChild(child: $RxElement): $RxElement {
    if(this.$children.indexOf(child) > -1) {
      child.$root = undefined;
      const resetRules = (item: $RxElement) => {
        item.$rules = []
        if(item.$children.length > 0) item.$children.forEach(i => type(i) === 'object' && resetRules(i));
      }
      resetRules(child);
      this.$node.removeChild(child.node());
      this.$children.splice(this.$children.indexOf(child), 1);
      this.$children = this.$children.filter(i => i !== null);
      return this;
    }else {
      console.warn(`Cannot removeChild: ${child.name} is not a child of ${this.name}`);
      // throw new Error(`Cannot removeChild: ${child.name} is not a child of ${this.name}`);
    }
  }

  removeChildren(): $RxElement {
    if(this.$children.length > 0) {
      this.$children.forEach(child => child && child.$root ? child.$root = undefined : '');
      while(this.$children.length > 0) this.$children.pop();
    }
    return this;
  }

  replaceChild(child: $RxElement, newChild: $RxElement) {
    if(this.$children.indexOf(child) > -1) {
      if(newChild.$root != undefined) {
        throw `Cannot replaceChild: ${newChild.name} is already attched`;
      }
      this.$children.splice(this.$children.indexOf(child), 1, newChild);
      newChild.$root = this;
      return this;
    } else {
      // child doesnt exist on parent
    }

    if(this.$node) {
      this.$node.removeChild(child.$node);
      this.$node.appendChild(newChild.$node);
    }
  }

  node(): Element { return this.$node; }
  parent(): $RxElement { return this.$root; }
  children(): ($RxElement | string)[] { return this.$children; }

  on(fns: ElementEvent | {[key: string]: (e?: Event) => void }): $RxElement {
    this.$events = this.$events || [];
    for(const fn in fns) {
      if(type((<any>fns)[fn]) !== 'function') throw `${(<any>fns)[fn]} is not a function`;
      if(type(this.$events) !== 'array') console.trace(this, this.$events);
      this.$events.push({
        event: (<any>fns)[fn].bind(this),
        name: fn, object: this
      });
    }
    return this;
  }

  dispatch(event: string) {
    if(!this.$node) throw `Cannot dispatch, node is not attached`;
    else {
      const e = new Event(event, { bubbles: false });
      this.$node.dispatchEvent(e);
    }
    return this;
  }

  bind(object: any): $RxElement {
    if((<any>window).Native.serving) {
      const bonds = (<any>window).Native.components[(<any>window).Native.serving].bonds || [];
      if(bonds.indexOf(object) < 0) {
        for(const prop in object) {
          object[prop].source = this;
        }
        bonds.push(object);
      }
      (<any>window).Native.components[(<any>window).Native.serving].bonds = bonds;
    }
    return this;
  }

  text(string?: string): $RxElement {
    if(string != undefined) {
      if(typeof this.$children[0] == 'string') this.$children.splice(0, 1, string as any);
      else this.$children.unshift(string as any);
      if(this.$node) (<any>this.$node).innerText = string;
      return this;
    }
    if(Object.prototype.toString.call(this.$children[0]) === '[object String]') {
      return this.$children[0];
    }
    return this;
  }

  style(...styles: Style[]): any {
    if(arguments.length == 0) return <any>this.$style;
    for(let i = 0; i < styles.length; i++) {
      if(styles[i].$className) {
        this.$className += ' ' + styles[i].$className;
        this.$style.push(styles[i]);
      }
    }
    return this;
  }

  removeStyle(...styles: Style[]): void {
    if(arguments.length == 0) throw 'Remove style: 0 arguments passed. Min. of 1 expected';
    for(let i = 0; i < styles.length; i++) {
      this.$style = this.$style.filter(s => s.$className === styles[i].$className);
      this.$className.replace(' ' + styles[i].$className, '');
    }
  }

  media(props: {[key: string]: StyleProperties}) {
    this.$media.push(props);
    const rules: string[] = [], native = Native();
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

  addClassName(name: string): $RxElement {
    if(this.$node) {
      if(!this.$node.classList || !this.$node.classList.contains(name)) {
        this.$node.classList.add(name);
      }
    }
    if(!this.$className.match(name)) {
      this.$className = this.$className + ' ' + name;
    }
    return this;
  }

  removeClassName(classname?: string): $RxElement {
    if(this.$node) {
      this.$node.classList.remove(classname);
    }
    this.$className = this.$className.replace(' '+classname, '');
    return this;
  }

  tag(tag?: string): $RxElement | string {
    if(tag !== undefined) {
      this.$tag = tag;
      return this;
    }
    return this.$tag;
  }

  child(predicate: {[key: string]: any}): $RxElement {
    const children = this.$children.filter(child => {
      const keys = window.Object.keys(predicate), check = keys.length;
      let valid = 0;
      keys.forEach(key => {
        if(predicate[key] === (<any>child)['$' + key]) {
          valid += 1;
        }
      });
      if(valid === check) return true;
    });
    return children[0];
  }

  removeAllClassName(): $RxElement {
    if(this.$node) {
      this.$node.classList.forEach((i, index) => {
        if(index > 0) this.$node.classList.remove(i);
      });
    }
    this.$className = this.$className.replace(/ .+/, '');
    return this;
  }

  replaceTextTag(text: string, tagObject: {[key: string]: any }): $RxElement {
    console.log(text);
    const all = text.match(/\${\w+(\(.*\))?\}?/g);
    console.log(all);
    const children: ($RxElement | string)[] = [],
    p = (t: string) => {
      all.map((i, inx) => {
        let tag: any = i.replace('${','').replace('}',''), args = [];
        const match = tag.match(/(\w+)\(/g);
        if(match) {
          tag = match[0]?.replace('(','');
          args = i.match(/(\(.*)\)/g).map(i => i.replace('(', '').replace(')', ''));
        }
        children.push(t.slice(0, t.indexOf(i)));
        children.push(tagObject[tag](...args));
        t = t.slice(t.indexOf(i) + i.length);
        if(inx === all.length - 1) {
          if(t.length > 0) children.push(t);
        }
      });
    };
    if(all) {
      p(text);
      children.forEach((child: $RxElement) => {
        const nullIndex = this.$children.indexOf(null);
        if(nullIndex > -1) this.$children.splice(nullIndex, 1, child)
        else this.$children.push(child);
        (type(child) === 'object') ? child.$root = this : '';
      })
    }else this.$children.push(text as any);
    return this;
  }

  pseudo(props: {[key: string]: StyleProperties}) {
    this.$pseudo.push(props);
    const rules: string[] = [], native = Native();
    for(const key in props) {
      rules.push('.' + this.$className.replace(' ', '.') + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
    }
    if(!native.served && native.serving === this.$hostComponent) {
      native.loadQueue[native.serving].push(() => createRules(this, rules));
    }else {
      createRules(this, rules)
    }
    return this;
  }

  globals(props: {[key: string]: StyleProperties}) {
    this.$global.push(props);
    const rules: string[] = [], native = Native();
    for(const key in props) {
      rules.push('.' + this.$className + ' ' + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
    }
    if(!native.served && native.serving === this.$hostComponent) {
      native.loadQueue[native.serving].push(() => createRules(this, rules));
    }else {
      createRules(this, rules)
    }
    return this;
  }

};

export class Component extends $RxElement {

  $nid: string;
  $level = 0;
  $events: {[key: string]: ((..._: any) => any)[] }[] = [] as any;
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
    if(!Native().components[this.name][this.$nid]) {
      throw new Error('Get route: Component doesn\'t exist or has been destroy');
    }
    return Native().components[this.name][this.$nid].route;
  }
}

export class Button extends $RxElement {
  constructor() {
    super('button');
  }
}

export class A extends $RxElement {
  constructor() { super('a'); }
}

export class Abbr extends $RxElement {
  constructor() { super('abbr'); }
}

export class Applet extends $RxElement {
  constructor() { super('applet'); }
}

export class Area extends $RxElement {
  constructor() { super('area'); }
}

export class Article extends $RxElement {
  constructor() { super('article'); }
}

export class Aside extends $RxElement {
  constructor() { super('aside'); }
}

export class Audio extends $RxElement {
  constructor() { super('audio'); }
}

export class Base extends $RxElement {
  constructor() { super('base'); }
}

export class BaseFont extends $RxElement {
  constructor() { super('basefont'); }
}

export class BDO extends $RxElement {
  constructor() { super('bdo'); }
}

export class BlockQuote extends $RxElement {
  constructor() { super('blockquote'); }
}

export class Body extends $RxElement {
  constructor() { super('body'); }
}

export class BR extends $RxElement {
  constructor() { super('br'); }
}

export class Canvas extends $RxElement {
  constructor() { super('canvas'); }
}

export class Caption extends $RxElement {
  constructor() { super('caption'); }
}

export class Code extends $RxElement {
  constructor() { super('code'); }
}

export class Col extends $RxElement {
  constructor() { super('col'); }
}

export class ColGroup extends $RxElement {
  constructor() { super('colgroup'); }
}

export class Data extends $RxElement {
  constructor() { super('data'); }
}

export class Details extends $RxElement {
  constructor() { super('details'); }
}

export class DFN extends $RxElement {
  constructor() { super('dfn'); }
}

export class Dialog extends $RxElement {
  constructor() { super('dialog'); }
}

export class DIR extends $RxElement {
  constructor() { super('dir'); }
}

export class Div extends $RxElement {
  constructor() { super('div'); }
}

export class DL extends $RxElement {
  constructor() { super('dl'); }
}

export class EM extends $RxElement {
  constructor() { super('em'); }
}

export class Embed extends $RxElement {
  constructor() { super('embed'); }
}

export class FieldSet extends $RxElement {
  constructor() { super('fieldset'); }
}

export class FigCaption extends $RxElement {
  constructor() { super('figcaption'); }
}

export class Figure extends $RxElement {
  constructor() { super('figure'); }
}

export class Font extends $RxElement {
  constructor() { super('font'); }
}

export class Footer extends $RxElement {
  constructor() { super('footer'); }
}

export class Form extends $RxElement {
  constructor() { super('form'); }
}

export class Del extends $RxElement {
  constructor() { super('del'); }
}

export class Frame extends $RxElement {
  constructor() { super('frame'); }
}

export class FrameSet extends $RxElement {
  constructor() { super('frameset'); }
}

export class H1 extends $RxElement {
  constructor() { super('h1'); }
}

export class H2 extends $RxElement {
  constructor() { super('h2'); }
}

export class H3 extends $RxElement {
  constructor() { super('h3'); }
}

export class H4 extends $RxElement {
  constructor() { super('h4'); }
}

export class H5 extends $RxElement {
  constructor() { super('h5'); }
}

export class H6 extends $RxElement {
  constructor() { super('h6'); }
}

export class Head extends $RxElement {
  constructor() { super('head'); }
}

export class Header extends $RxElement {
  constructor() { super('header'); }
}

export class HR extends $RxElement {
  constructor() { super('hr'); }
}

export class HTML extends $RxElement {
  constructor() { super('html'); }
}

export class IFrame extends $RxElement {
  constructor() { super('iframe'); }
}

export class Image extends $RxElement {
  constructor() { super('img'); }
}

export class IMG extends $RxElement {
  constructor() { super('img'); }
}
export class Ins extends $RxElement {
  constructor() { super('ins'); }
}

export class IsIndex extends $RxElement {
  constructor() { super('isindex'); }
}

export class Label extends $RxElement {
  constructor() { super('label'); }
}

export class Legend extends $RxElement {
  constructor() { super('legend'); }
}

export class LI extends $RxElement {
  constructor() { super('li'); }
}

export class Main extends $RxElement {
  constructor() { super('main'); }
}

export class Map extends $RxElement {
  constructor() { super('map'); }
}

export class Mark extends $RxElement {
  constructor() { super('mark'); }
}

export class Menu extends $RxElement {
  constructor() { super('menu'); }
}

export class Meta extends $RxElement {
  constructor() { super('meta'); }
}

export class Meter extends $RxElement {
  constructor() { super('meter'); }
}

export class Nav extends $RxElement {
  constructor() { super('nav'); }
}

export class ObjectElement extends $RxElement {
  constructor() { super('object'); }
}

export class OL extends $RxElement {
  constructor() { super('ol'); }
}

export class OptGroup extends $RxElement {
  constructor() { super('optgroup'); }
}

export class Option extends $RxElement {
  constructor() { super('option'); }
}

export class Output extends $RxElement {
  constructor() { super('output'); }
}

export class P extends $RxElement {
  constructor() { super('p'); }
}

export class Param extends $RxElement {
  constructor() { super('param'); }
}

export class Path extends $RxElement {
  constructor() { super('path'); }
}

export class Pre extends $RxElement {
  constructor() { super('pre'); }
}

export class Progress extends $RxElement {
  constructor() { super('progress'); }
}

export class Q extends $RxElement {
  constructor() { super('q'); }
}

export class Script extends $RxElement {
  constructor() { super('script'); }
}

export class Section extends $RxElement {
  constructor() { super('section'); }
}

export class Select extends $RxElement {
  constructor() { super('select'); }
}

export class Slot extends $RxElement {
  constructor() { super('slot'); }
}

export class Source extends $RxElement {
  constructor() { super('source'); }
}

export class Span extends $RxElement {
  constructor() { super('span'); }
}

export class Strong extends $RxElement {
  constructor() { super('strong'); }
}

export class Summary extends $RxElement {
  constructor() { super('summary'); }
}

export class Table extends $RxElement {
  constructor() { super('table'); }
}

export class TBody extends $RxElement {
  constructor() { super('tbody'); }
}

export class TD extends $RxElement {
  constructor() { super('td'); }
}

export class Textarea extends $RxElement {
  constructor() {
    super('textarea');
  }
}

export class TFoot extends $RxElement {
  constructor() { super('tfoot'); }
}

export class TH extends $RxElement {
  constructor() { super('th'); }
}

export class THead extends $RxElement {
  constructor() { super('thead'); }
}

export class Time extends $RxElement {
  constructor() { super('time'); }
}

export class TR extends $RxElement {
  constructor() { super('tr'); }
}

export class Track extends $RxElement {
  constructor() { super('track'); }
}

export class UL extends $RxElement {
  constructor() { super('ul'); }
}

export class Video extends $RxElement {
  constructor() {
    super('video');
  }
}
export class Container extends Div {}
export class Link extends A {}
export class Input extends $RxElement {

  $value?: any;

  constructor() { super('input'); }

  track?(obj: any) {
    obj.watch((v: any) => console.log(v));
    this.on({ input: (e: any) => {
      obj = e.target.value;
    } })
  }

  value? = (v?: string | number) => {
    if(v !== undefined) {
      if(this.$node) {
        if((<any>this.$node).type !== 'file') (<any>this.$node).value = v;
        this.$value = v;
      }else this.$value = v;
      return this;
    }else return this.$value;
  }
}

export class SVG extends $RxElement {
  constructor() {
    super('svg');
    this.attrXmlns('http://www.w3.org/2000/svg');
  }
}

export class Animation {
  $className: string;
  name: string;
  $rule: CSSStyleRule;

  constructor(props: {[key: string]: StyleProperties} & {'from'?: StyleProperties} & {'to'?: StyleProperties}) {
    this.$className = this.name = 's' + Math.random().toString(36).substr(2, 9);
    let rule = '@keyframes ' + this.$className + '{ ';
    Object.getOwnPropertyNames(props).forEach((key: string) => {
      rule +=  key + ' {' + Parser.parseNativeStyle(props[key]) + '} ';
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

  global(props: {[key: string]: StyleProperties}) {
    (<any>window).__native_load_queue = (<any>window).__native_load_queue || [];
    (<any>window).__native_load_queue.push(() => {
      const rules: string[] = [];
      for(const key in props) {
        rules.push('.' + this.$className + ' ' + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
      }
      createRules(this, rules);
    });
    return this;
  }

  pseudo(props: {[key: string]: StyleProperties}) {
    (<any>window).__native_load_queue = (<any>window).__native_load_queue || [];
    (<any>window).__native_load_queue.push(() => {
      const rules: string[] = [];
      for(const key in props) {
        rules.push('.' + this.$className.replace(' ', '.') + key + ' {' + Parser.parseNativeStyle(props[key]) + '} ');
      }
      createRules(this, rules);
    });
    return this;
  }
}


