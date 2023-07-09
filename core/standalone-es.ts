export {
  ELEMENT,
  Component,
  PageComponent,
  Button,
  Container,
  Link,
  Input,
  SVG,
  Animation,
  Style,
  A, Abbr, Applet, Area, Article, Aside,
  Audio, Base, BaseFont, BDO, BlockQuote,
  Body, BR, Canvas, Caption, Code, Col,
  ColGroup, Data, Details, DFN, Dialog,
  DIR, Div, DL, EM, Embed, FieldSet,
  FigCaption, Figure, Font, Footer,
  Form, Del, Frame, FrameSet, H1, H2,
  H3, H4, H5, H6, Head, Header, HR, HTML,
  IFrame, Image, IMG, Ins, IsIndex,
  Label, Legend, LI, Main, Map,
  Mark, Menu, Meta, Meter, Nav,
  ObjectElement, OL, OptGroup,
  Option, Output, P, Param, Path,
  Pre, Progress, Q, Script, Section,
  Select, Slot, Source, Span,
  Strong, Summary, Table, TBody,
  TD, Textarea, TFoot, TH, THead,
  Time, TR, Track, UL, Video
} from './lib/components';

import Props from './lib/props';
import { Component, ELEMENT, Style } from './lib/components';
import UI from './lib/ui';

declare let window: any;

window.Config = {
  styleDebug: false
}

export default class Standalone extends UI {
  standalone = true;
  loadQueue: { [key: string]: Function[] } = {} as any;
  serving = 'main-component__standalone';
  served = false;
  constructor(selector: string | Element, root: any, args?: any, theme?: any) {
    super(undefined);

    if (window.Router) this.router = window.Router;

    if (theme) this.writeGlobals(theme);

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
        if (this.serving) return this;
        const value = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        if (arguments.length > 0) {
          this.$rules = this.$rules || [];
          if (this.$rules.length > 0) {
            try {
              const parsedValue = window.UI.parseStyleValue(value);
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
    if (this.sheet.cssRules.length === 1) this.writeGlobals(Config.theme || {});
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
        if (this.serving) return this;
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


    this.loadQueue[this.serving] = [];
    const oldUI = window.UI;
    window.UI = this;
    const oldNative = window.__native_load_queue;
    window.__native_load_queue = [];
    const component = new root(args);
    ((<any>(typeof selector === 'string' ? document.querySelector(selector) : selector)).appendChild(this.createElement(component)));
    const w: any = window;
    if (w.__native_load_queue && w.__native_load_queue.length > 0) {
      w.__native_load_queue.forEach((i: Function) => i());
    }
    w.__native_load_queue = oldNative;
    console.log(this.sheet, this.loadQueue);
    if (this.serving) {
      queueMicrotask(() => {
        this.loadQueue[this.serving].forEach((i: any) => Function.prototype.call.apply(i));
        this.loadQueue[this.serving] = [];
      });
    }
    setTimeout(() => {
      this.loadQueue[this.serving].forEach((i: any) => Function.prototype.call.apply(i));
      this.loadQueue[this.serving] = [];
    }, 500);
    // this.served = true;

    window.UI = oldUI;
  }
}

