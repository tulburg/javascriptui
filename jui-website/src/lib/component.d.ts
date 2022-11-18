import { ElementEvent, Attributes, Properties, StyleProperties } from 'types';
export interface ELEMENT extends Attributes<ELEMENT>, Properties<ELEMENT> {
  onCreate(): void;
  onDestroy(): void;
}
export interface Style extends Properties<Style> {
}
export declare class ELEMENT {
  $level: number;
  $children: ELEMENT[];
  $tagName: string;
  $root: ELEMENT;
  $events: any;
  $className: string;
  $style: Style[];
  $pseudo: {
    [key: string]: StyleProperties;
  }[];
  $media: {
    [key: string]: StyleProperties | string;
  }[];
  $global: {
    [key: string]: StyleProperties;
  }[];
  $hostComponent: string;
  $node: Element;
  $rules: CSSStyleRule[];
  name: string;
  $tag: string;
  $size: Number[];
  constructor(tagName?: string);
  addChild(...children: ELEMENT[]): ELEMENT;
  removeChild(child: ELEMENT): ELEMENT;
  remove(): void;
  removeChildren(): void;
  replaceChild(child: ELEMENT, newChild: ELEMENT): this;
  removeEventListener(type: string, listener?: () => void): void;
  node(): Element;
  parent(): ELEMENT;
  children(): (ELEMENT | string)[];
  on(fns: ElementEvent | {
    [key: string]: (e?: Event) => void;
  }): ELEMENT;
  dispatch(event: string): this;
  text(string?: string): ELEMENT;
  style(...styles: Style[]): any;
  removeStyle(...styles: Style[]): void;
  media(props: {
    [key: string]: StyleProperties & {
      pseudo?: {
        [key: string]: StyleProperties;
      };
      global?: {
        [key: string]: StyleProperties;
      };
    };
  }): this;
  animate(callback: () => void): any;
  addClassName(name: string): ELEMENT;
  removeClassName(classname?: string): ELEMENT;
  tag(tag?: string): ELEMENT | string;
  child(predicate: {
    [key: string]: any;
  }): ELEMENT;
  removeAllClassName(): ELEMENT;
  replaceTextTag(text: string, tagObject: {
    [key: string]: any;
  }): ELEMENT;
  pseudo(props: {
    [key: string]: StyleProperties;
  }): this;
  global(props: {
    [key: string]: StyleProperties;
  }): this;
}
export declare class Component extends ELEMENT {
  $nid: string;
  $level: number;
  $events: {
    [key: string]: ((..._: any) => any)[];
  }[];
  $loadQueue: Function[];
  constructor(...args: any[]);
}
export declare class PageComponent extends Component {
  constructor();
  get route(): any;
}
export declare class Button extends ELEMENT {
  constructor();
}
export declare class A extends ELEMENT {
  constructor();
}
export declare class Abbr extends ELEMENT {
  constructor();
}
export declare class Applet extends ELEMENT {
  constructor();
}
export declare class Area extends ELEMENT {
  constructor();
}
export declare class Article extends ELEMENT {
  constructor();
}
export declare class Aside extends ELEMENT {
  constructor();
}
export declare class Audio extends ELEMENT {
  constructor();
}
export declare class Base extends ELEMENT {
  constructor();
}
export declare class BaseFont extends ELEMENT {
  constructor();
}
export declare class BDO extends ELEMENT {
  constructor();
}
export declare class BlockQuote extends ELEMENT {
  constructor();
}
export declare class Body extends ELEMENT {
  constructor();
}
export declare class BR extends ELEMENT {
  constructor();
}
export declare class Canvas extends ELEMENT {
  constructor();
}
export declare class Caption extends ELEMENT {
  constructor();
}
export declare class Code extends ELEMENT {
  constructor();
}
export declare class Col extends ELEMENT {
  constructor();
}
export declare class ColGroup extends ELEMENT {
  constructor();
}
export declare class Data extends ELEMENT {
  constructor();
}
export declare class Details extends ELEMENT {
  constructor();
}
export declare class DFN extends ELEMENT {
  constructor();
}
export declare class Dialog extends ELEMENT {
  constructor();
}
export declare class DIR extends ELEMENT {
  constructor();
}
export declare class Div extends ELEMENT {
  constructor();
}
export declare class DL extends ELEMENT {
  constructor();
}
export declare class EM extends ELEMENT {
  constructor();
}
export declare class Embed extends ELEMENT {
  constructor();
}
export declare class FieldSet extends ELEMENT {
  constructor();
}
export declare class FigCaption extends ELEMENT {
  constructor();
}
export declare class Figure extends ELEMENT {
  constructor();
}
export declare class Font extends ELEMENT {
  constructor();
}
export declare class Footer extends ELEMENT {
  constructor();
}
export declare class Form extends ELEMENT {
  constructor();
}
export declare class Del extends ELEMENT {
  constructor();
}
export declare class Frame extends ELEMENT {
  constructor();
}
export declare class FrameSet extends ELEMENT {
  constructor();
}
export declare class H1 extends ELEMENT {
  constructor();
}
export declare class H2 extends ELEMENT {
  constructor();
}
export declare class H3 extends ELEMENT {
  constructor();
}
export declare class H4 extends ELEMENT {
  constructor();
}
export declare class H5 extends ELEMENT {
  constructor();
}
export declare class H6 extends ELEMENT {
  constructor();
}
export declare class Head extends ELEMENT {
  constructor();
}
export declare class Header extends ELEMENT {
  constructor();
}
export declare class HR extends ELEMENT {
  constructor();
}
export declare class HTML extends ELEMENT {
  constructor();
}
export declare class IFrame extends ELEMENT {
  constructor();
}
export declare class Image extends ELEMENT {
  constructor();
}
export declare class IMG extends ELEMENT {
  constructor();
}
export declare class Ins extends ELEMENT {
  constructor();
}
export declare class IsIndex extends ELEMENT {
  constructor();
}
export declare class Label extends ELEMENT {
  constructor();
}
export declare class Legend extends ELEMENT {
  constructor();
}
export declare class LI extends ELEMENT {
  constructor();
}
export declare class Main extends ELEMENT {
  constructor();
}
export declare class Map extends ELEMENT {
  constructor();
}
export declare class Mark extends ELEMENT {
  constructor();
}
export declare class Menu extends ELEMENT {
  constructor();
}
export declare class Meta extends ELEMENT {
  constructor();
}
export declare class Meter extends ELEMENT {
  constructor();
}
export declare class Nav extends ELEMENT {
  constructor();
}
export declare class ObjectElement extends ELEMENT {
  constructor();
}
export declare class OL extends ELEMENT {
  constructor();
}
export declare class OptGroup extends ELEMENT {
  constructor();
}
export declare class Option extends ELEMENT {
  constructor();
}
export declare class Output extends ELEMENT {
  constructor();
}
export declare class P extends ELEMENT {
  constructor();
}
export declare class Param extends ELEMENT {
  constructor();
}
export declare class Path extends ELEMENT {
  constructor();
}
export declare class Pre extends ELEMENT {
  constructor();
}
export declare class Progress extends ELEMENT {
  constructor();
}
export declare class Q extends ELEMENT {
  constructor();
}
export declare class Script extends ELEMENT {
  constructor();
}
export declare class Section extends ELEMENT {
  constructor();
}
export declare class Select extends ELEMENT {
  constructor();
}
export declare class Slot extends ELEMENT {
  constructor();
}
export declare class Source extends ELEMENT {
  constructor();
}
export declare class Span extends ELEMENT {
  constructor();
}
export declare class Strong extends ELEMENT {
  constructor();
}
export declare class Summary extends ELEMENT {
  constructor();
}
export declare class Table extends ELEMENT {
  constructor();
}
export declare class TBody extends ELEMENT {
  constructor();
}
export declare class TD extends ELEMENT {
  constructor();
}
export declare class Textarea extends ELEMENT {
  constructor();
}
export declare class TFoot extends ELEMENT {
  constructor();
}
export declare class TH extends ELEMENT {
  constructor();
}
export declare class THead extends ELEMENT {
  constructor();
}
export declare class Time extends ELEMENT {
  constructor();
}
export declare class TR extends ELEMENT {
  constructor();
}
export declare class Track extends ELEMENT {
  constructor();
}
export declare class UL extends ELEMENT {
  constructor();
}
export declare class Video extends ELEMENT {
  constructor();
}
export declare class Container extends Div {
}
export declare class Link extends A {
}
export declare class Input extends ELEMENT {
  $value?: any;
  constructor();
  track?(obj: any): void;
  value: (v?: string | number) => any;
}
export declare class SVG extends ELEMENT {
  constructor();
}
export declare class Animation {
  $className: string;
  name: string;
  $rule: CSSStyleRule;
  constructor(props: {
    [key: string]: StyleProperties;
  } & {
    'from'?: StyleProperties;
  } & {
    'to'?: StyleProperties;
  });
}
export declare class Style {
  $className: string;
  $rules: CSSStyleRule[];
  constructor(props: StyleProperties);
  global(props: {
    [key: string]: StyleProperties;
  }): this;
  pseudo(props: {
    [key: string]: StyleProperties;
  }): this;
}

