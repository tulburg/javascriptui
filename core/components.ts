import Parser from './parser';
import {
  RxElement, ElementEvent, NativeLock, StyleProperties, FlexAlignment, FlexAlignmentItem, ConfigType,
  GlobalValues, Color, BorderStyle, BorderWidth, CSSImage, Space, Break, Number
} from './types';
import NativeClass from './native';
import {createRules} from './styles';

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']','').toLowerCase();
const Native = function() : NativeClass {  return (<any>window).Native || undefined };
function protoSet(base: any, chain: any, value: any) {
  if(base.hasOwnProperty(chain[0]) && chain.length > 1) {
    const newBase = base[chain[0]];
    chain.shift();
    protoSet(newBase, chain, value);
  }else {
    base[chain[0]] = value;
  }
}

export class $RxElement {

  $level = 1;
  $children: $RxElement[] = [];
  $tagName = '$RxElement';
  $root: $RxElement = undefined;
  $events: any = undefined;
  $className: string = undefined;
  $styles: Style[] = [];
  $pseudo: {[key: string]: StyleProperties}[] = [];
  $medias: {[key: string]: StyleProperties | string}[] = [];
  $global: {[key: string]: StyleProperties}[] = [];

  // -- Render properties
  $hostComponent: string = (<any>window).Native.serving;
  $node: Element;
  // $styles: CSSStyleRule[] = [];
  $rules: CSSStyleRule[] = [];

  name = this.constructor.name;
  $tag: string;
  $size: Number[];
  // get name() { return this.constructor.name };

  constructor(tagName?: string) {
    this.$tagName = tagName || this.$tagName;
    this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substr(2, 9);
  }

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
        children[i].$root = this;
        if(this.$node) this.$node.append(Native().createElement(children[i]));
      }
      return this;
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
      this.$children.splice(this.$children.indexOf(child), 1);
      // this.$children = this.$children.filter(i => i !== null``);
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
      // const event: any = {};
      // event[fn] = (<any>fns)[fn];
      if(type((<any>fns)[fn]) !== 'function') throw `${(<any>fns)[fn]} is not a function`;
      // console.log(Function.prototype.bind.apply(fns[fn], this), this);
      if(type(this.$events) !== 'array') console.trace(this, this.$events);
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

  styles(...styles: Style[]): any {
    if(arguments.length == 0) return <any>this.$styles;
    for(let i = 0; i < styles.length; i++) {
      if(styles[i].$className) {
        this.$className += ' ' + styles[i].$className;
        this.$styles.push(styles[i]);
      }
    }
    return this;
  }

  removeStyle(...styles: Style[]): void {
    if(arguments.length == 0) throw 'Remove style: 0 arguments passed. Min. of 1 expected';
    for(let i = 0; i < styles.length; i++) {
      this.$styles = this.$styles.filter(s => s.$className === styles[i].$className);
      this.$className.replace(' ' + styles[i].$className, '');
    }
  }

  medias(props: {[key: string]: StyleProperties}) {
    this.$medias.push(props);
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

  // functions

  $render() {
    return Parser.render(this);
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

  global(props: {[key: string]: StyleProperties}) {
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

  alignContent: (_?: FlexAlignment) => $RxElement
  alignItems: (_?: FlexAlignmentItem) => $RxElement
  alignSelf: (_?: FlexAlignmentItem) => $RxElement
  animation: (_?: string) => $RxElement
  animationDelay: (_?: string | string[]) => $RxElement
  animationDirection: (_?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string | string[] | GlobalValues) => $RxElement
  animationDuration: (_?: string | string[] | GlobalValues) => $RxElement
  animationFillMode: (_?: 'none' | 'forwards' | 'backwards' | 'both' | string | string[] | GlobalValues) => $RxElement
  animationIterationCount: (_?: 'infinite' | string | string[] | GlobalValues) => $RxElement
  animationName: (_?: 'none' | '-specific' | 'sliding-vertically' | 'sliding' | string | string[] | GlobalValues) => $RxElement
  animationPlayState: (_?: 'running' | 'paused' | string | string[] | GlobalValues) =>$RxElement
  animationTimingFunction: (_?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' |  string | string[] | GlobalValues) => $RxElement
  backfaceVisibility: (_?: 'visible' | 'hidden' | string | string[] | GlobalValues) => $RxElement
  background: (_?: string | string[] | GlobalValues) => $RxElement
  backgroundAttachment: (_?: 'scroll' | 'fixed' | 'local' | string | string[] | GlobalValues) => $RxElement
  backgroundClip: (_?: 'border-box' | 'padding-box' | 'content-box' | 'text' | string | string[] | GlobalValues) => $RxElement
  backgroundColor: (_?: Color) => $RxElement
  backgroundImage: (_?: CSSImage) => $RxElement
  backgroundOrigin: (_?: 'border-box' | 'padding-box' | 'content-box' | string | string[] | GlobalValues) => $RxElement
  backgroundPosition: (_?: 'top' | 'bottom' | 'left' | 'right' | 'center' | string | number | string[] | number[] | GlobalValues) => $RxElement
  backgroundPositionX: (_?: 'left' | 'center' | 'right' | string | number | string[] | GlobalValues) => $RxElement
  backgroundPositionY: (_?: 'top' | 'center' | 'bottom' | string | number | string[] | GlobalValues) => $RxElement
  backgroundRepeat: (_?: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | string | string[] | GlobalValues) => $RxElement
  backgroundSize: (_?: 'cover' | 'contain' | string | number | string[] | number[] | GlobalValues) => $RxElement
  border: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => $RxElement
  borderBottom: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => $RxElement
  borderBottomColor: (_?: Color) => $RxElement
  borderBottomLeftRadius: (_?: string | number | string[] | number[] | GlobalValues) => $RxElement
  borderBottomRightRadius: (_?: string | number | string[] | number[] | GlobalValues) => $RxElement
  borderBottomStyle: (_?: BorderStyle) => $RxElement
  borderBottomWidth: (_?: BorderWidth) => $RxElement
  borderCollapse: (_?: 'collapse' | 'separate' | string | GlobalValues) => $RxElement
  borderColor: (_?: Color) => $RxElement
  borderImage: (_?: 'url()' | 'linear-gradient()' | string | string[] | GlobalValues) => $RxElement
  borderImageOutset: (_?: number | number[] | GlobalValues) => $RxElement
  borderImageRepeat: (_?: 'stretch' | 'repeat' | 'round' | 'space' | string | string[] | GlobalValues) => $RxElement
  borderImageSlice: (_?: 'fill' | string | number | string[] | number[] | GlobalValues) => $RxElement
  borderImageSource: (_?: CSSImage) => $RxElement
  borderImageWidth: (_?: 'auto' | string | number | string[] | number[] | GlobalValues) => $RxElement
  borderLeft: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => $RxElement
  borderLeftColor: (_?: Color) => $RxElement
  borderLeftStyle: (_?: BorderStyle) => $RxElement
  borderLeftWidth: (_?: BorderWidth) => $RxElement
  borderRadius: (_?: string | number | string[] | number[] | GlobalValues) => $RxElement
  borderRight: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => $RxElement
  borderRightColor: (_?: Color) => $RxElement
  borderRightStyle: (_?: BorderStyle) => $RxElement
  borderRightWidth: (_?: BorderWidth) => $RxElement
  borderSpacing: (_?: number | number[] | GlobalValues) => $RxElement
  borderStyle: (_?: BorderStyle) => $RxElement
  borderTop: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => $RxElement
  borderTopColor: (_?: Color) => $RxElement
  borderTopLeftRadius: (_?: string | number | string[] | number[] | GlobalValues) => $RxElement
  borderTopRightRadius: (_?: string | number | string[] | number[] | GlobalValues) => $RxElement
  borderTopStyle: (_?: BorderStyle) => $RxElement
  borderTopWidth: (_?: BorderWidth) => $RxElement
  borderWidth: (_?: BorderWidth) => $RxElement
  bottom: (_?: Space) => $RxElement
  boxDecorationBreak: (_?: 'slice' | 'clone' | string | GlobalValues) => $RxElement
  boxShadow: (_?: 'none' | string | string[] | GlobalValues) => $RxElement
  boxSizing: (_?: 'border-box' | 'content-box' | GlobalValues) => $RxElement
  breakAfter: (_?: Break) => $RxElement
  breakBefore: (_?: Break) => $RxElement
  breakInside: (_?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region' | GlobalValues) => $RxElement
  captionSide: (_?: 'top' | 'bottom' | 'left' | 'right' | 'top-outside' | 'bottom-outside' | GlobalValues) => $RxElement
  caretColor: (_?: 'auto' | Color) => $RxElement
  clear: (_?: 'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end' | GlobalValues) => $RxElement
  clip: (_?: 'rect()' | 'auto' | string | GlobalValues) => $RxElement
  color: (_?: Color) => $RxElement
  columnCount: (_?: 'auto' | string | number | GlobalValues) => $RxElement
  columnFill: (_?: 'auto' | 'balance' | 'balance-all' | GlobalValues) => $RxElement
  columnGap: (_?: 'normal' | string | number | GlobalValues) => $RxElement
  columnRule: (_?: BorderStyle | BorderWidth | string | number | number[]) => $RxElement
  columnRuleColor: (_?: Color) => $RxElement
  columnRuleStyle: (_?: BorderStyle) => $RxElement
  columnRuleWidth: (_?: BorderWidth) => $RxElement
  columnSpan: (_?: 'none' | 'all' | GlobalValues) => $RxElement
  columnWidth: (_?: 'auto' | string | number | GlobalValues) => $RxElement
  columns: (_?: 'auto' | string | number | string[] | GlobalValues) => $RxElement
  content: (_?:  'none' | 'normal' | 'attr()' | 'open-quote | close-quote' | 'no-open-quote | no-close-quote' | string | string[] | GlobalValues) => $RxElement
  counterIncrement: (_?: 'none' | string | number | string[] | GlobalValues) => $RxElement
  counterReset: (_?: 'none' | string | number | string[] | GlobalValues) => $RxElement
  counterSet: (_?: 'none' | string | number | string[] | GlobalValues) => $RxElement
  cursor: (_?: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' |
    'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' |
    's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' |
    'zoom-in' | 'zoom-out' | 'url()' | string | GlobalValues) => $RxElement
  direction: (_?: 'ltr' | 'rtl' | GlobalValues) => $RxElement
  display: (_?: 'block' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' | 'list-item' | 'table-row-group' | 'table-header-group' |
    'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' |
    'ruby-text-container' | 'contents' | 'none' | 'inline-block' | 'inline-list-item' | 'inline-table' | 'inline-flex' | 'inline-grid' | string | string[] | GlobalValues) => $RxElement
  emptyCells: (_?: 'show' | 'hide' | GlobalValues) => $RxElement
  filter: (_?: 'url()' | 'blur()' | 'brightness()' | 'contrast()' | 'drop-shadow()' | 'grayscale()' | 'hue-rotate()' | 'invert()' | 'opacity()' | 'saturate()' |
    'sepia()' | 'none' | string | GlobalValues) => $RxElement
  flex: (_?: 'auto' | 'inital' | 'none' | string | number | number[] | GlobalValues) => $RxElement
  flexBasis: (_?: 'fill' | 'max-content' | 'min-content' | 'fit-content' | 'content' | string | number | GlobalValues) => $RxElement
  flexDirection: (_?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | GlobalValues) => $RxElement
  flexFlow: (_?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'nowrap' | 'wrap' | 'wrap-reverse' | string | string[] | GlobalValues) => $RxElement
  flexGrow: (_?: string | GlobalValues) => $RxElement
  flexShrink: (_?: string | GlobalValues) => $RxElement
  flexWrap: (_?: 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalValues) => $RxElement
  float: (_?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end' | GlobalValues) => $RxElement
  font: (_?: 'caption' | 'icon' | 'menu' | 'message-box' | 'small-caption' | 'status-bar' | StyleProperties['fontFamily'] | StyleProperties['fontSize'] | StyleProperties['fontStretch'] |
    StyleProperties['fontStyle'] | StyleProperties['fontVariant'] | StyleProperties['fontWeight'] | StyleProperties['lineHeight']| string | string[] | GlobalValues) => $RxElement
  fontFamily: (_?: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | string | string[] | GlobalValues) => $RxElement
  fontFeatureSettings: (_?: 'normal' | 'smcp' | 'swsh' | string | GlobalValues) => $RxElement
  fontKerning: (_?: 'auto' | 'normal' | 'none') => $RxElement
  fontLanguageOverride: (_?: 'normal' | string | GlobalValues) => $RxElement
  fontSize: (_?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | string | number | GlobalValues) => $RxElement
  fontSizeAdjust: (_?: 'none' | string | GlobalValues) => $RxElement
  fontSmooth: (_?: 'auto' | 'never' | 'always' | number | string | StyleProperties['fontSize']) => $RxElement
  fontStretch: (_?: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | string | GlobalValues) => $RxElement
  fontStyle: (_?: 'normal' | 'italic' | 'oblique' | string | string[]) => $RxElement
  fontSynthesis: (_?: 'none' | StyleProperties['fontWeight'] | StyleProperties['fontStyle'] | string) => $RxElement
  fontVariant: (_?: 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' | 'no-historical-ligatures' | 'contextual' | 'no-contextual' |
    'stylistic()' | 'historical-forms' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' |
    'titling-caps' | 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' |
    'full-width' | 'proportional-width' | 'ruby' | string) => $RxElement
  fontVariantAlternates: (_?: 'normal' | 'historical-forms' | 'stylistic()' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | string | GlobalValues) => $RxElement
  fontVariantCaps: (_?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | GlobalValues) => $RxElement
  fontVariantEastAsian: (_?: 'normal' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' | 'full-width' | 'proportional-width' | 'ruby' | string | GlobalValues) => $RxElement
  fontVariantLigatures: (_?: 'normal' | 'none' | 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' |
    'no-historical-ligatures' | 'contextual' | 'no-contextual' | GlobalValues) => $RxElement
  fontVariantNumeric: (_?: 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | string | GlobalValues) => $RxElement
  fontVariantPosition: (_?: 'normal' | 'sub' | 'super' | GlobalValues) => $RxElement
  fontWeight: (_?: 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | GlobalValues) => $RxElement
  gap: (_?: number | number[] | string | string[] | GlobalValues) => $RxElement
  grid: (_?: StyleProperties['gridTemplate'] | StyleProperties['gridTemplateRows'] | StyleProperties['gridAutoFlow'] | StyleProperties['gridAutoColumns'] | StyleProperties['gridTemplateAreas'] |
    StyleProperties['gridColumnGap'] | string | GlobalValues) => $RxElement
  gridArea: (_?: 'auto' | 'span' | string | GlobalValues) => $RxElement
  gridAutoColumns: (_?: 'auto' | 'max-content' | 'min-content' | 'minmax()' | 'fit-content()' | string | number | GlobalValues) => $RxElement
  gridAutoFlow: (_?: 'row' | 'column' | 'dense' | 'row dense' | 'column desne' | GlobalValues) => $RxElement
  gridColumn: (_?: StyleProperties['gridArea']) => $RxElement
  gridColumnEnd: (_?: StyleProperties['gridArea']) => $RxElement
  gridColumnGap: (_?: StyleProperties['columnGap']) => $RxElement
  gridColumnStart: (_?: StyleProperties['gridArea']) => $RxElement
  gridGap: (_?: Number | number[]) => $RxElement
  gridRow: (_?: Number | number[]) => $RxElement
  gridRowEnd: (_?: StyleProperties['gridArea']) => $RxElement
  gridRowStart: (_?: StyleProperties['gridArea']) => $RxElement
  gridTemplate: (_?: 'none' | string | GlobalValues) => $RxElement
  gridTemplateAreas: (_?: StyleProperties['gridTemplate']) => $RxElement
  gridTemplateColumns: (_?: 'subgrid' | 'masonry' | 'minmax()' | 'fit-content()' | 'repeat()' | string | StyleProperties['gridTemplate']) => $RxElement
  gridTemplateRows: (_?: StyleProperties['gridTemplateColumns']) => $RxElement
  hangingPunctuation: (_?: 'none' | 'first' | 'last' | 'force-end' | 'allow-end' | string | string[] | GlobalValues) => $RxElement
  height: (_?: Number) => $RxElement
  hyphens: (_?: 'none' | 'manual' | 'auto' | GlobalValues) => $RxElement
  isolation: (_?: 'auto' | 'isolate' | GlobalValues) => $RxElement
  inset: (_?: 'auto' | string | number | string[] | number[] | GlobalValues) => $RxElement
  insetBottom: (_?: StyleProperties['inset']) => $RxElement
  insetLeft: (_?: StyleProperties['inset']) => $RxElement
  insetRight: (_?: StyleProperties['inset']) => $RxElement
  insetTop: (_?: StyleProperties['inset']) => $RxElement
  justifyContent: (_?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | FlexAlignment | 'safe center' | 'unsafe center' | GlobalValues) => $RxElement
  justifySelf: (_?: FlexAlignmentItem | FlexAlignment) => $RxElement
  justifyItems: (_?: FlexAlignment | FlexAlignmentItem | 'legacy right' | 'legacy left' | 'legacy center' | GlobalValues) => $RxElement
  left: (_?: Number) => $RxElement
  letterSpacing: (_?: Number) => $RxElement
  lineBreak: (_?: 'auto' | 'loose' | 'normal' | 'strict' | 'anywhere' | GlobalValues) => $RxElement
  lineHeight: (_?: Number) => $RxElement
  listStyle: (_?: StyleProperties['listStyleType'] | StyleProperties['listStyleImage'] | StyleProperties['listStylePosition']) => $RxElement
  listStyleImage: (_?: 'none' | 'url()' | GlobalValues) => $RxElement
  listStylePosition: (_?: 'inside' | 'outside' | GlobalValues) => $RxElement
  listStyleType: (_?: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'georgian' | 'trad-chinese-informal' | 'kannada' | '-' | '@<<custom>>' | GlobalValues) => $RxElement
  margin: (_?: Number | string | number | string[] | number[]) => $RxElement
  marginBottom: (_?: Number | string | number) => $RxElement
  marginLeft: (_?: StyleProperties['marginBottom']) => $RxElement
  marginRight: (_?: StyleProperties['marginBottom']) => $RxElement
  marginTop: (_?: StyleProperties['marginBottom']) => $RxElement
  maxHeight: (_?: 'none' | 'max-content' | 'min-content' | 'fit-content()' | Number) => $RxElement
  maxWidth: (_?: StyleProperties['maxHeight']) => $RxElement
  minHeight: (_?: StyleProperties['maxHeight']) => $RxElement
  minWidth: (_?: StyleProperties['maxHeight']) => $RxElement
  mixBlendMode: (_?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' |
    'exclusion' | 'hue' | 'saturation' | 'color' | 'liminosity' | GlobalValues) => $RxElement
  objectFit: (_?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down') => $RxElement
  objectPosition: (_?: 'top' | 'left' | 'right' | 'bottom' | string | number | string[] | number[] | GlobalValues) => $RxElement
  opacity: (_?: string | GlobalValues) => $RxElement
  order: (_?: string | GlobalValues) => $RxElement
  orphans: (_?: string | GlobalValues) => $RxElement
  outline: (_?: StyleProperties['outlineColor'] | StyleProperties['outlineStyle'] | StyleProperties['outlineWidth']) => $RxElement
  outlineColor: (_?: Color | 'invert') => $RxElement
  outlineOffset: (_?: string | number | GlobalValues) => $RxElement
  outlineStyle: (_?: BorderStyle) => $RxElement
  outlineWidth: (_?: BorderWidth) => $RxElement
  overflow: (_?: StyleProperties['overflowX'] | StyleProperties['overflowY']) => $RxElement
  overflowBlock: (_?: 'visible' | 'hidden' | 'scroll' | 'auto' | GlobalValues) => $RxElement
  overflowHidden: (_?: StyleProperties['overflowBlock']) => $RxElement
  overflowWrap: (_?: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => $RxElement
  overflowX: (_?: 'clip' | StyleProperties['overflowBlock']) => $RxElement
  overflowY: (_?: 'clip' | StyleProperties['overflowBlock']) => $RxElement
  padding: (_?: Number | string | number | string[] | number[] | GlobalValues) => $RxElement
  paddingBottom: (_?: Number) => $RxElement
  paddingLeft: (_?: Number) => $RxElement
  paddingRight: (_?: Number) => $RxElement
  paddingTop: (_?: Number) => $RxElement
  pageBreakAfter: (_?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso' | GlobalValues) => $RxElement
  pageBreakBefore: (_?: StyleProperties['pageBreakAfter']) => $RxElement
  pageBreakInside: (_?: 'auto' | 'avoid' | GlobalValues) => $RxElement
  perspective: (_?: 'none' | Number) => $RxElement
  perspectiveOrigin: (_?: 'center' | 'top' | 'bottom' | 'right' | string | GlobalValues) => $RxElement
  pointerEvents: (_?: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | GlobalValues) => $RxElement
  position: (_?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky') => $RxElement | any
  preserveAspectRatio: (_?: 'none' | 'xMinYMin' | 'xMidYMin' | 'xMaxYMin' | 'xMinMid' | 'xMidYMid' | 'xMaxYMid' | 'xMinYMax' | 'xMidYMax' | 'xMaxYMax' | 'meet' | 'slice') => $RxElement
  quotes: (_?: 'none' | 'initial' | 'auto' | string | GlobalValues) => $RxElement
  resize: (_?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | GlobalValues) => $RxElement
  right: (_?: Number) => $RxElement
  scrollBehavior: (_?: 'auto' | 'smooth' | GlobalValues) => $RxElement
  tabSize: (_?: Number) => $RxElement
  tableLayout: (_?: 'auto' | 'fixed' | GlobalValues) => $RxElement
  textAlign: (_?: 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'start' | 'end' | 'match-parent' | string | GlobalValues) => $RxElement
  textAlignLast: (_?: 'auto' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | string | GlobalValues) => $RxElement
  textCombineUpright: (_?: 'none' | 'all' | 'digits' | GlobalValues) => $RxElement
  textDecoration: (_?: StyleProperties['textDecorationLine'] | StyleProperties['textDecorationColor'] | StyleProperties['textDecorationStyle'] |
    StyleProperties['textDecorationThickness']) => $RxElement
  textDecorationColor: (_?: Color) => $RxElement
  textDecorationLine: (_?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink' | string | GlobalValues) => $RxElement
  textDecorationStyle: (_?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | GlobalValues ) => $RxElement
  textDecorationThickness: (_?: 'auto' | 'from-font' | number | string | GlobalValues) => $RxElement
  textFillColor: (_?: Color) => $RxElement
  textIndent: (_?: 'each-line' | 'hanging' | number | string | GlobalValues) => $RxElement
  textJustify: (_?: 'none' | 'auto' | 'inter-word' | 'inter-character' | 'distribute') => $RxElement
  textOrientation: (_?: 'mixed' | 'upright' | 'sideways-right' | 'sideways' | 'use-glyph-orientation' | GlobalValues) => $RxElement
  textOverflow: (_?: 'clip' | 'ellipsis' | '-' | GlobalValues) => $RxElement
  textShadow: (_?: StyleProperties['boxShadow']) => $RxElement
  textTransform: (_?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana' | GlobalValues) => $RxElement
  textUnderlinePosition: (_?: 'auto' | 'under' | 'left' | 'right' | string | GlobalValues) => $RxElement
  top: (_?: Number) => $RxElement
  transform: (_?: 'none' | 'matrix()' | 'matrix3d()' | 'perspective()' | 'rotate()' | 'rotate3d()' | 'rotateX()' | 'rotateY()' | 'rotateZ()' | 'translate()' |
    'translate3d()' | 'translateX()' | 'translateY()' | 'translateZ()' | 'scale()' | 'scale3d()' | 'scaleX()' | 'scaleY()' | 'scaleZ()' | 'skew()' |
    'skewX()' | 'skewY()' | string | GlobalValues) => $RxElement
  transformOrigin: (_?: 'center' | 'top' | 'right' | 'left' | 'bottom' | string | number | string[] | number[]) => $RxElement
  transformStyle: (_?: 'flat' | 'preserve-3d' | GlobalValues) => $RxElement
  transition: (_?: StyleProperties['transitionDelay'] | StyleProperties['transitionDuration'] | StyleProperties['transitionProperty'] | StyleProperties['transitionTimingFunction']) => $RxElement
  transitionDelay: (_?: string | string[] | GlobalValues) => $RxElement
  transitionDuration: (_?: number | string | GlobalValues) => $RxElement
  transitionProperty: (_?: StyleProperties['animationName']) => $RxElement
  transitionTimingFunction: (_?: StyleProperties['animationTimingFunction']) => $RxElement
  unicodeBidi: (_?: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext' | GlobalValues) => $RxElement
  userSelect: (_?: 'none' | 'auto' | 'text' | 'contain' | 'all' | 'element' | GlobalValues) => $RxElement
  verticalAlign: (_?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | number | string | GlobalValues) => $RxElement
  visibility: (_?: 'visible' | 'hidden' | 'collapse' | GlobalValues) => $RxElement
  webkitBackgroundClip: (_?: 'text' | StyleProperties['boxSizing']) => $RxElement
  webkitTextFillColor: (_?: Color) => $RxElement
  whiteSpace: (_?: 'normal' | 'nowrap' | 'wrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces' | GlobalValues) => $RxElement
  width: (_?: Number) => $RxElement
  wordBreak: (_?: 'normal' | 'break-all' | 'keep-all' | 'break-word' | GlobalValues) => $RxElement
  wordSpacing: (_?: 'normal' | number | string | GlobalValues) => $RxElement
  wordWrap: (_?: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => $RxElement
  writingMode: (_?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | GlobalValues) => $RxElement

  zIndex: (_?: string | GlobalValues) => $RxElement
  // custom specials
  cornerRadius: (_?: StyleProperties['borderRadius']) => $RxElement

  // attributes
  abbr: (_?: string | number | string[] | number[]) => $RxElement
  accept: (_?: string) => $RxElement
  acceptCharset: (_?: string | number | string[] | number[]) => $RxElement
  accessKey: (_?: string | number | string[] | number[]) => $RxElement
  action: (_?: string | number | string[] | number[]) => $RxElement
  alink: (_?: string | number | string[] | number[]) => $RxElement
  allow: (_?: string | number | string[] | number[]) => $RxElement
  allowFullscreen: (_?: string | number | string[] | number[]) => $RxElement
  allowPaymentRequest: (_?: string | number | string[] | number[]) => $RxElement
  allowUserMedia: (_?: string | number | string[] | number[]) => $RxElement
  alt: (_?: string | number | string[] | number[]) => $RxElement
  archive: (_?: string | number | string[] | number[]) => $RxElement
  as: (_?: string | number | string[] | number[]) => $RxElement
  async: (_?: string | number | string[] | number[]) => $RxElement
  attrHeight: (_?: string | number | string[] | number[]) => $RxElement
  attrWidth: (_?: string | number | string[] | number[]) => $RxElement
  autoCapitalize: (_?: string | number | string[] | number[]) => $RxElement
  autoComplete: (_?: string | number | string[] | number[]) => $RxElement
  autoFocus: (_?: string | number | string[] | number[]) => $RxElement
  autoPlay: (_?: string | number | string[] | number[]) => $RxElement
  axis: (_?: string | number | string[] | number[]) => $RxElement
  capture: (_?: 'user' | 'environment') => $RxElement
  cellPadding: (_?: string | number | string[] | number[]) => $RxElement
  cellSpacing: (_?: string | number | string[] | number[]) => $RxElement
  char: (_?: string | number | string[] | number[]) => $RxElement
  charOff: (_?: string | number | string[] | number[]) => $RxElement
  charset: (_?: string | number | string[] | number[]) => $RxElement
  checked: (_?: string | number | string[] | number[]) => $RxElement
  cite: (_?: string | number | string[] | number[]) => $RxElement
  classId: (_?: string | number | string[] | number[]) => $RxElement
  className: (_?: string | number | string[] | number[]) => $RxElement
  clearAttr: (_?: string | number | string[] | number[]) => $RxElement
  code: (_?: string | number | string[] | number[]) => $RxElement
  codeBase: (_?: string | number | string[] | number[]) => $RxElement
  codeType: (_?: string | number | string[] | number[]) => $RxElement
  cols: (_?: string | number | string[] | number[]) => $RxElement
  colSpan: (_?: string | number | string[] | number[]) => $RxElement
  compact: (_?: string | number | string[] | number[]) => $RxElement
  contentEditable: (_?: string | number | string[] | number[]) => $RxElement
  controls: (_?: string | number | string[] | number[]) => $RxElement
  coords: (_?: string | number | string[] | number[]) => $RxElement
  crossOrigin: (_?: string | number | string[] | number[]) => $RxElement
  d: (_?: string) => $RxElement
  data: (_?: string | number | string[] | number[]) => $RxElement
  datetime: (_?: string | number | string[] | number[]) => $RxElement
  declare: (_?: string | number | string[] | number[]) => $RxElement
  decoding: (_?: string | number | string[] | number[]) => $RxElement
  dir: (_?: string | number | string[] | number[]) => $RxElement
  dirname: (_?: string | number | string[] | number[]) => $RxElement
  disabled: (_?: string | number | string[] | number[]) => $RxElement
  download: (_?: string | number | string[] | number[]) => $RxElement
  draggable: (_?: string | number | string[] | number[]) => $RxElement
  enctype: (_?: string | number | string[] | number[]) => $RxElement
  enterKeyHint: (_?: string | number | string[] | number[]) => $RxElement
  fill: (_?: string) => $RxElement
  form: (_?: string | number | string[] | number[]) => $RxElement
  formAction: (_?: string | number | string[] | number[]) => $RxElement
  formEnctype: (_?: string | number | string[] | number[]) => $RxElement
  formMethod: (_?: string | number | string[] | number[]) => $RxElement
  formNoValidate: (_?: string | number | string[] | number[]) => $RxElement
  formTarget: (_?: string | number | string[] | number[]) => $RxElement
  frame: (_?: string | number | string[] | number[]) => $RxElement
  frameBorder: (_?: string | number | string[] | number[]) => $RxElement
  headers: (_?: string | number | string[] | number[]) => $RxElement
  hidden: (_?: string | number | string[] | number[]) => $RxElement
  high: (_?: string | number | string[] | number[]) => $RxElement
  href: (_?: string | number | string[] | number[]) => $RxElement
  hrefLang: (_?: string | number | string[] | number[]) => $RxElement
  hSpace: (_?: string | number | string[] | number[]) => $RxElement
  id: (_?: string | number | string[] | number[]) => $RxElement
  imageSizes: (_?: string | number | string[] | number[]) => $RxElement
  imageSrcSet: (_?: string | number | string[] | number[]) => $RxElement
  inputMode: (_?: string | number | string[] | number[]) => $RxElement
  integrity: (_?: string | number | string[] | number[]) => $RxElement
  is: (_?: string | number | string[] | number[]) => $RxElement
  isMap: (_?: string | number | string[] | number[]) => $RxElement
  itemId: (_?: string | number | string[] | number[]) => $RxElement
  itemProp: (_?: string | number | string[] | number[]) => $RxElement
  itemRef: (_?: string | number | string[] | number[]) => $RxElement
  itemScope: (_?: string | number | string[] | number[]) => $RxElement
  itemType: (_?: string | number | string[] | number[]) => $RxElement
  kind: (_?: string | number | string[] | number[]) => $RxElement
  label: (_?: string | number | string[] | number[]) => $RxElement
  lang: (_?: string | number | string[] | number[]) => $RxElement
  link: (_?: string | number | string[] | number[]) => $RxElement
  list: (_?: string | number | string[] | number[]) => $RxElement
  longDesc: (_?: string | number | string[] | number[]) => $RxElement
  loop: (_?: string | number | string[] | number[]) => $RxElement
  low: (_?: string | number | string[] | number[]) => $RxElement
  marginHeight: (_?: string | number | string[] | number[]) => $RxElement
  marginWidth: (_?: string | number | string[] | number[]) => $RxElement
  max: (_?: string | number | string[] | number[]) => $RxElement
  maxLength: (_?: string | number | string[] | number[]) => $RxElement
  media: (_?: string | number | string[] | number[]) => $RxElement
  method: (_?: string | number | string[] | number[]) => $RxElement
  min: (_?: string | number | string[] | number[]) => $RxElement
  minLength: (_?: string | number | string[] | number[]) => $RxElement
  multiple: (_?: string | number | string[] | number[]) => $RxElement
  muted: (_?: string | number | string[] | number[]) => $RxElement
  attrName: (_?: string | number | string[] | number[]) => $RxElement
  nonce: (_?: string | number | string[] | number[]) => $RxElement
  noResize: (_?: string | number | string[] | number[]) => $RxElement
  noShade: (_?: string | number | string[] | number[]) => $RxElement
  noValidate: (_?: string | number | string[] | number[]) => $RxElement
  noWrap: (_?: string | number | string[] | number[]) => $RxElement
  object: (_?: string | number | string[] | number[]) => $RxElement
  open: (_?: string | number | string[] | number[]) => $RxElement
  optimum: (_?: string | number | string[] | number[]) => $RxElement
  pattern: (_?: string | number | string[] | number[]) => $RxElement
  ping: (_?: string | number | string[] | number[]) => $RxElement
  placeholder: (_?: string | number | string[] | number[]) => $RxElement
  playsInline: (_?: string | number | string[] | number[]) => $RxElement
  poster: (_?: string | number | string[] | number[]) => $RxElement
  preload: (_?: string | number | string[] | number[]) => $RxElement
  profile: (_?: string | number | string[] | number[]) => $RxElement
  prompt: (_?: string | number | string[] | number[]) => $RxElement
  readOnly: (_?: string | number | string[] | number[]) => $RxElement
  referrerPolicy: (_?: string | number | string[] | number[]) => $RxElement
  rel: (_?: string | number | string[] | number[]) => $RxElement
  required: (_?: string | number | string[] | number[]) => $RxElement
  rev: (_?: string | number | string[] | number[]) => $RxElement
  reversed: (_?: string | number | string[] | number[]) => $RxElement
  rows: (_?: string | number | string[] | number[]) => $RxElement
  rowSpan: (_?: string | number | string[] | number[]) => $RxElement
  rules: (_?: string | number | string[] | number[]) => $RxElement
  sandBox: (_?: string | number | string[] | number[]) => $RxElement
  scope: (_?: string | number | string[] | number[]) => $RxElement
  scrolling: (_?: string | number | string[] | number[]) => $RxElement
  selected: (_?: string | number | string[] | number[]) => $RxElement
  shape: (_?: string | number | string[] | number[]) => $RxElement
  sizes: (_?: string | number | string[] | number[]) => $RxElement
  slot: (_?: string | number | string[] | number[]) => $RxElement
  span: (_?: string | number | string[] | number[]) => $RxElement
  spellCheck: (_?: string | number | string[] | number[]) => $RxElement
  src: (_?: string | number | string[] | number[]) => $RxElement
  srcDoc: (_?: string | number | string[] | number[]) => $RxElement
  srcSet: (_?: string | number | string[] | number[]) => $RxElement
  standBy: (_?: string | number | string[] | number[]) => $RxElement
  start: (_?: string | number | string[] | number[]) => $RxElement
  step: (_?: string | number | string[] | number[]) => $RxElement
  summary: (_?: string | number | string[] | number[]) => $RxElement
  tabIndex: (_?: string | number | string[] | number[]) => $RxElement
  target: (_?: string | number | string[] | number[]) => $RxElement
  title: (_?: string | number | string[] | number[]) => $RxElement
  attrTransform: (_?: string) => $RxElement
  translate: (_?: string | number | string[] | number[]) => $RxElement
  type: (_?: string | number | string[] | number[]) => $RxElement
  typeMustMatch: (_?: string | number | string[] | number[]) => $RxElement
  useMap: (_?: string | number | string[] | number[]) => $RxElement
  vAlign: (_?: string | number | string[] | number[]) => $RxElement
  value? = (_?: string | number | string[] | number[]): $RxElement => { return this as $RxElement; }
  valueType: (_?: string | number | string[] | number[]) => $RxElement
  viewBox: (_?: string) => $RxElement
  vLink: (_?: string | number | string[] | number[]) => $RxElement
  vSpace: (_?: string | number | string[] | number[]) => $RxElement
  wrap: (_?: string | number | string[] | number[]) => $RxElement
  xmlns: (_?: string) => $RxElement
  attrDefault: (_?: string | number | string[] | number[]) => $RxElement
  attrFor: (_?: string | number | string[] | number[]) => $RxElement
  for: (_?: string | number) => $RxElement
  default: (_?: string | number) => $RxElement

  // Pseudo functions
  globalStyle: (_: {[key: string]: StyleProperties}) => $RxElement
  pseudoActive: (_: StyleProperties) => $RxElement
  pseudoChecked: (_: StyleProperties) => $RxElement
  pseudoDisabled: (_: StyleProperties) => $RxElement
  pseudoEmpty: (_: StyleProperties) => $RxElement
  pseudoEnabled: (_: StyleProperties) => $RxElement
  pseudoFirstOfType: (_: StyleProperties) => $RxElement
  pseudoFocus: (_: StyleProperties) => $RxElement
  pseudoHover: (_: StyleProperties) => $RxElement
  pseudoInRange: (_: StyleProperties) => $RxElement
  pseudoInvalid: (_: StyleProperties) => $RxElement
  pseudoLang: (_: StyleProperties) => $RxElement
  pseudoLastChild: (_: StyleProperties) => $RxElement
  pseudoLastOfType: (_: StyleProperties) => $RxElement
  pseudoLink: (_: StyleProperties) => $RxElement
  pseudoNot: (_: StyleProperties) => $RxElement
  pseudoNthChild: (_: StyleProperties) => $RxElement
  pseudoNthLastChild: (_: StyleProperties) => $RxElement
  pseudoNthLastOfType: (_: StyleProperties) => $RxElement
  pseudoNthOfType: (_: StyleProperties) => $RxElement
  pseudoOnlyOfType: (_: StyleProperties) => $RxElement
  pseudoOnlyChild: (_: StyleProperties) => $RxElement
  pseudoOptional: (_: StyleProperties) => $RxElement
  pseudoOutOfRange: (_: StyleProperties) => $RxElement
  pseudoReadOnly: (_: StyleProperties) => $RxElement
  pseudoReadWrite: (_: StyleProperties) => $RxElement
  pseudoRequired: (_: StyleProperties) => $RxElement
  pseudoRoot: (_: StyleProperties) => $RxElement
  pseudoTarget: (_: StyleProperties) => $RxElement
  pseudoValid: (_: StyleProperties) => $RxElement
  pseudoVisited: (_: StyleProperties) => $RxElement

  pseudoBefore: (_: StyleProperties) => $RxElement
  pseudoAfter: (_: StyleProperties) => $RxElement
  pseudoSelection: (_: StyleProperties) => $RxElement
  pseudoFirstLetter: (_: StyleProperties) => $RxElement
  pseudoFirstLine: (_: StyleProperties) => $RxElement

  hover: (_: StyleProperties) => $RxElement

  addClassName(name: string): $RxElement {
    if(this.$node) {
      if(!this.$node.classList || !this.$node.classList.contains(name)) {
        this.$node.classList.add(name);
      }
    }else {
      if(!this.$className.match(name)) {
        this.$className = this.$className + ' ' + name;
      }
    }
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
    }else this.$className = this.$className.replace(/ .+/, '');
    return this;
  }

  removeClassName(classname?: string): $RxElement {
    if(this.$node) {
      this.$node.classList.remove(classname);
    }else if(this.$className.match(classname)) {
      this.$className = this.$className.replace(' '+classname, '');
    }
    return this;
  }

  replaceTextTag(text: string, tagObject: {[key: string]: any }): $RxElement {
    const all = text.match(/\${\w+(\(.*\))?\}?/g);
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

  size(): Number[] | Number
  size(_: Number[] | Number): $RxElement
  size(_?: Number[] | Number): $RxElement | Number[] | Number {
    if(arguments.length > 0) {
      const v: Number[] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
      this.height(v[1]).width(v[0]);
      this.$size = v;
      return this;
    }
    return this.$size;
  }
}

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

  get route() {
    if(!Native().components[this.name][this.$nid]) {
      throw new Error('Get route: Component doesn\'t exist or has been destroy');
    }
    return Native().components[this.name][this.$nid].route;
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

export class Button extends $RxElement {
  constructor() {
    super('button');
    this.text('Button');
  }
}

export class Container extends $RxElement {

  constructor() { super('div'); }

  host?(routes: ConfigType.Route[]) {
    if(this.$children.length > 0) {
      throw new Error('Host container must be empty!');
    }
    let check = 0, against: ConfigType.Route[];
    const current = Native().router.current;
    if(current.hosting && current.hosting.length > 0) {
      against = current.hosting;
    }else against = current.subs;
    routes.forEach((route: ConfigType.Route) => {
      check += against.some(i => i.path === route.path) ? 1 : 0;
    });
    if(check === routes.length) Native().router.host(this, routes);
    else throw new Error(`Host: You have (${routes.length - check}) unregistered routes. Please register on the config file before hosting`);
    return this;
  }
}
'A,Abbr,Applet,Area,Article,Aside,Audio,Base,BaseFont,BDO,BlockQuote,Body,BR,Canvas,Caption,Code,Col,ColGroup,Data,Details,DFN,Dialog,DIR,Div,DL,EM,Embed,FieldSet,FigCaption,Figure,Font,Footer,Form,Del,Frame,FrameSet,H1,H2,H3,H4,H5,H6,Head,Header,HR,HTML,IFrame,Image,IMG,Ins,IsIndex,Label,Link,Legend,LI,Main,Map,Mark,Menu,Meta,Meter,Nav,ObjectElement,OL,OptGroup,Option,Output,P,Param,Path,Pre,Progress,Q,Script,Section,Select,Slot,Source,Span,Strong,Summary,Table,TBody,TD,Textarea,TFoot,TH,THead,Time,TR,Track,UL,Video'.split(',').forEach(i => module.exports[i] = class extends $RxElement { constructor(){ super(i)} });
export class Input extends $RxElement {

  $model?: NativeLock;
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
    this.xmlns('http://www.w3.org/2000/svg');
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

  alignContent: (_: FlexAlignment) => Style
  alignItems: (_: FlexAlignmentItem) => Style
  alignSelf: (_: FlexAlignmentItem) => Style
  animation: (_: string) => Style
  animationDelay: (_: string | string[]) => Style
  animationDirection: (_: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string | string[] | GlobalValues) => Style
  animationDuration: (_: string | string[] | GlobalValues) => Style
  animationFillMode: (_: 'none' | 'forwards' | 'backwards' | 'both' | string | string[] | GlobalValues) => Style
  animationIterationCount: (_: 'infinite' | string | string[] | GlobalValues) => Style
  animationName: (_: 'none' | '-specific' | 'sliding-vertically' | 'sliding' | string | string[] | GlobalValues) => Style
  animationPlayState: (_: 'running' | 'paused' | string | string[] | GlobalValues) => Style
  animationTimingFunction: (_: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' |  string | string[] | GlobalValues) => Style
  backfaceVisibility: (_: 'visible' | 'hidden' | string | string[] | GlobalValues) => Style
  background: (_: string | string[] | GlobalValues) => Style
  backgroundAttachment: (_: 'scroll' | 'fixed' | 'local' | string | string[] | GlobalValues) => Style
  backgroundClip: (_: 'border-box' | 'padding-box' | 'content-box' | 'text' | string | string[] | GlobalValues) => Style
  backgroundColor: (_: Color) => Style
  backgroundImage: (_: CSSImage) => Style
  backgroundOrigin: (_: 'border-box' | 'padding-box' | 'content-box' | string | string[] | GlobalValues) => Style
  backgroundPosition: (_: 'top' | 'bottom' | 'left' | 'right' | 'center' | string | number | string[] | number[] | GlobalValues) => Style
  backgroundPositionX: (_: 'left' | 'center' | 'right' | string | number | string[] | GlobalValues) => Style
  backgroundPositionY: (_: 'top' | 'center' | 'bottom' | string | number | string[] | GlobalValues) => Style
  backgroundRepeat: (_: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | string | string[] | GlobalValues) => Style
  backgroundSize: (_: 'cover' | 'contain' | string | number | string[] | number[] | GlobalValues) => Style
  border: (_: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => Style
  borderBottom: (_: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => Style
  borderBottomColor: (_: Color) => Style
  borderBottomLeftRadius: (_: string | number | string[] | number[] | GlobalValues) => Style
  borderBottomRightRadius: (_: string | number | string[] | number[] | GlobalValues) => Style
  borderBottomStyle: (_: BorderStyle) => Style
  borderBottomWidth: (_: BorderWidth) => Style
  borderCollapse: (_: 'collapse' | 'separate' | string | GlobalValues) => Style
  borderColor: (_: Color) => Style
  borderImage: (_: 'url()' | 'linear-gradient()' | string | string[] | GlobalValues) => Style
  borderImageOutset: (_: number | number[] | GlobalValues) => Style
  borderImageRepeat: (_: 'stretch' | 'repeat' | 'round' | 'space' | string | string[] | GlobalValues) => Style
  borderImageSlice: (_: 'fill' | string | number | string[] | number[] | GlobalValues) => Style
  borderImageSource: (_: CSSImage) => Style
  borderImageWidth: (_: 'auto' | string | number | string[] | number[] | GlobalValues) => Style
  borderLeft: (_: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => Style
  borderLeftColor: (_: Color) => Style
  borderLeftStyle: (_: BorderStyle) => Style
  borderLeftWidth: (_: BorderWidth) => Style
  borderRadius: (_: string | number | string[] | number[] | GlobalValues) => Style
  borderRight: (_: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => Style
  borderRightColor: (_: Color) => Style
  borderRightStyle: (_: BorderStyle) => Style
  borderRightWidth: (_: BorderWidth) => Style
  borderSpacing: (_: number | number[] | GlobalValues) => Style
  borderStyle: (_: BorderStyle) => Style
  borderTop: (_: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => Style
  borderTopColor: (_: Color) => Style
  borderTopLeftRadius: (_: string | number | string[] | number[] | GlobalValues) => Style
  borderTopRightRadius: (_: string | number | string[] | number[] | GlobalValues) => Style
  borderTopStyle: (_: BorderStyle) => Style
  borderTopWidth: (_: BorderWidth) => Style
  borderWidth: (_: BorderWidth) => Style
  bottom: (_: Space) => Style
  boxDecorationBreak: (_: 'slice' | 'clone' | string | GlobalValues) => Style
  boxShadow: (_: 'none' | string | string[] | GlobalValues) => Style
  boxSizing: (_: 'border-box' | 'content-box' | GlobalValues) => Style
  breakAfter: (_: Break) => Style
  breakBefore: (_: Break) => Style
  breakInside: (_: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region' | GlobalValues) => Style
  captionSide: (_: 'top' | 'bottom' | 'left' | 'right' | 'top-outside' | 'bottom-outside' | GlobalValues) => Style
  caretColor: (_: 'auto' | Color) => Style
  clear: (_: 'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end' | GlobalValues) => Style
  clip: (_: 'rect()' | 'auto' | string | GlobalValues) => Style
  color: (_: Color) => Style
  columnCount: (_: 'auto' | string | number | GlobalValues) => Style
  columnFill: (_: 'auto' | 'balance' | 'balance-all' | GlobalValues) => Style
  columnGap: (_: 'normal' | string | number | GlobalValues) => Style
  columnRule: (_: BorderStyle | BorderWidth | string | number | number[]) => Style
  columnRuleColor: (_: Color) => Style
  columnRuleStyle: (_: BorderStyle) => Style
  columnRuleWidth: (_: BorderWidth) => Style
  columnSpan: (_: 'none' | 'all' | GlobalValues) => Style
  columnWidth: (_: 'auto' | string | number | GlobalValues) => Style
  columns: (_: 'auto' | string | number | string[] | GlobalValues) => Style
  content: (_:  'none' | 'normal' | 'attr()' | 'open-quote | close-quote' | 'no-open-quote | no-close-quote' | string | string[] | GlobalValues) => Style
  counterIncrement: (_: 'none' | string | number | string[] | GlobalValues) => Style
  counterReset: (_: 'none' | string | number | string[] | GlobalValues) => Style
  counterSet: (_: 'none' | string | number | string[] | GlobalValues) => Style
  cursor: (_: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' |
    'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' |
    's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' |
    'zoom-in' | 'zoom-out' | 'url()' | string | GlobalValues) => Style
  direction: (_: 'ltr' | 'rtl' | GlobalValues) => Style
  display: (_: 'block' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' | 'list-item' | 'table-row-group' | 'table-header-group' |
    'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' |
    'ruby-text-container' | 'contents' | 'none' | 'inline-block' | 'inline-list-item' | 'inline-table' | 'inline-flex' | 'inline-grid' | string | string[] | GlobalValues) => Style
  emptyCells: (_: 'show' | 'hide' | GlobalValues) => Style
  filter: (_: 'url()' | 'blur()' | 'brightness()' | 'contrast()' | 'drop-shadow()' | 'grayscale()' | 'hue-rotate()' | 'invert()' | 'opacity()' | 'saturate()' |
    'sepia()' | 'none' | string | GlobalValues) => Style
  flex: (_: 'auto' | 'inital' | 'none' | string | number | number[] | GlobalValues) => Style
  flexBasis: (_: 'fill' | 'max-content' | 'min-content' | 'fit-content' | 'content' | string | number | GlobalValues) => Style
  flexDirection: (_: 'row' | 'row-reverse' | 'column' | 'column-reverse' | GlobalValues) => Style
  flexFlow: (_: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'nowrap' | 'wrap' | 'wrap-reverse' | string | string[] | GlobalValues) => Style
  flexGrow: (_: string | GlobalValues) => Style
  flexShrink: (_: string | GlobalValues) => Style
  flexWrap: (_: 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalValues) => Style
  float: (_: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end' | GlobalValues) => Style
  font: (_: 'caption' | 'icon' | 'menu' | 'message-box' | 'small-caption' | 'status-bar' | StyleProperties['fontFamily'] | StyleProperties['fontSize'] | StyleProperties['fontStretch'] |
    StyleProperties['fontStyle'] | StyleProperties['fontVariant'] | StyleProperties['fontWeight'] | StyleProperties['lineHeight']| string | string[] | GlobalValues) => Style
  fontFamily: (_: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | string | string[] | GlobalValues) => Style
  fontFeatureSettings: (_: 'normal' | 'smcp' | 'swsh' | string | GlobalValues) => Style
  fontKerning: (_: 'auto' | 'normal' | 'none') => Style
  fontLanguageOverride: (_: 'normal' | string | GlobalValues) => Style
  fontSize: (_: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | string | number | GlobalValues) => Style
  fontSizeAdjust: (_: 'none' | string | GlobalValues) => Style
  fontSmooth: (_: 'auto' | 'never' | 'always' | number | string | StyleProperties['fontSize']) => Style
  fontStretch: (_: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | string | GlobalValues) => Style
  fontStyle: (_: 'normal' | 'italic' | 'oblique' | string | string[]) => Style
  fontSynthesis: (_: 'none' | StyleProperties['fontWeight'] | StyleProperties['fontStyle'] | string) => Style
  fontVariant: (_: 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' | 'no-historical-ligatures' | 'contextual' | 'no-contextual' |
    'stylistic()' | 'historical-forms' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' |
    'titling-caps' | 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' |
    'full-width' | 'proportional-width' | 'ruby' | string) => Style
  fontVariantAlternates: (_: 'normal' | 'historical-forms' | 'stylistic()' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | string | GlobalValues) => Style
  fontVariantCaps: (_: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | GlobalValues) => Style
  fontVariantEastAsian: (_: 'normal' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' | 'full-width' | 'proportional-width' | 'ruby' | string | GlobalValues) => Style
  fontVariantLigatures: (_: 'normal' | 'none' | 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' |
    'no-historical-ligatures' | 'contextual' | 'no-contextual' | GlobalValues) => Style
  fontVariantNumeric: (_: 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | string | GlobalValues) => Style
  fontVariantPosition: (_: 'normal' | 'sub' | 'super' | GlobalValues) => Style
  fontWeight: (_: 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | GlobalValues) => Style
  gap: (_: number | number[] | string | string[] | GlobalValues) => Style
  grid: (_: StyleProperties['gridTemplate'] | StyleProperties['gridTemplateRows'] | StyleProperties['gridAutoFlow'] | StyleProperties['gridAutoColumns'] | StyleProperties['gridTemplateAreas'] |
    StyleProperties['gridColumnGap'] | string | GlobalValues) => Style
  gridArea: (_: 'auto' | 'span' | string | GlobalValues) => Style
  gridAutoColumns: (_: 'auto' | 'max-content' | 'min-content' | 'minmax()' | 'fit-content()' | string | number | GlobalValues) => Style
  gridAutoFlow: (_: 'row' | 'column' | 'dense' | 'row dense' | 'column desne' | GlobalValues) => Style
  gridColumn: (_: StyleProperties['gridArea']) => Style
  gridColumnEnd: (_: StyleProperties['gridArea']) => Style
  gridColumnGap: (_: StyleProperties['columnGap']) => Style
  gridColumnStart: (_: StyleProperties['gridArea']) => Style
  gridGap: (_: Number | number[]) => Style
  gridRow: (_: Number | number[]) => Style
  gridRowEnd: (_: StyleProperties['gridArea']) => Style
  gridRowStart: (_: StyleProperties['gridArea']) => Style
  gridTemplate: (_: 'none' | string | GlobalValues) => Style
  gridTemplateAreas: (_: StyleProperties['gridTemplate']) => Style
  gridTemplateColumns: (_: 'subgrid' | 'masonry' | 'minmax()' | 'fit-content()' | 'repeat()' | string | StyleProperties['gridTemplate']) => Style
  gridTemplateRows: (_: StyleProperties['gridTemplateColumns']) => Style
  hangingPunctuation: (_: 'none' | 'first' | 'last' | 'force-end' | 'allow-end' | string | string[] | GlobalValues) => Style
  height: (_: Number) => Style
  hyphens: (_: 'none' | 'manual' | 'auto' | GlobalValues) => Style
  isolation: (_: 'auto' | 'isolate' | GlobalValues) => Style
  inset: (_: 'auto' | string | number | string[] | number[] | GlobalValues) => Style
  insetBottom: (_: StyleProperties['inset']) => Style
  insetLeft: (_: StyleProperties['inset']) => Style
  insetRight: (_: StyleProperties['inset']) => Style
  insetTop: (_: StyleProperties['inset']) => Style
  justifyContent: (_: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | FlexAlignment | 'safe center' | 'unsafe center' | GlobalValues) => Style
  justifySelf: (_: FlexAlignmentItem | FlexAlignment) => Style
  justifyItems: (_: FlexAlignment | FlexAlignmentItem | 'legacy right' | 'legacy left' | 'legacy center' | GlobalValues) => Style
  left: (_: Number) => Style
  letterSpacing: (_: Number) => Style
  lineBreak: (_: 'auto' | 'loose' | 'normal' | 'strict' | 'anywhere' | GlobalValues) => Style
  lineHeight: (_: Number) => Style
  listStyle: (_: StyleProperties['listStyleType'] | StyleProperties['listStyleImage'] | StyleProperties['listStylePosition']) => Style
  listStyleImage: (_: 'none' | 'url()' | GlobalValues) => Style
  listStylePosition: (_: 'inside' | 'outside' | GlobalValues) => Style
  listStyleType: (_: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'georgian' | 'trad-chinese-informal' | 'kannada' | '-' | '@<<custom>>' | GlobalValues) => Style
  margin: (_: Number | string | number | string[] | number[]) => Style
  marginBottom: (_: Number | string | number) => Style
  marginLeft: (_: StyleProperties['marginBottom']) => Style
  marginRight: (_: StyleProperties['marginBottom']) => Style
  marginTop: (_: StyleProperties['marginBottom']) => Style
  maxHeight: (_: 'none' | 'max-content' | 'min-content' | 'fit-content()' | Number) => Style
  maxWidth: (_: StyleProperties['maxHeight']) => Style
  minHeight: (_: StyleProperties['maxHeight']) => Style
  minWidth: (_: StyleProperties['maxHeight']) => Style
  mixBlendMode: (_: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' |
    'exclusion' | 'hue' | 'saturation' | 'color' | 'liminosity' | GlobalValues) => Style
  objectFit: (_: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down') => Style
  objectPosition: (_: 'top' | 'left' | 'right' | 'bottom' | string | number | string[] | number[] | GlobalValues) => Style
  opacity: (_: string | GlobalValues) => Style
  order: (_: string | GlobalValues) => Style
  orphans: (_: string | GlobalValues) => Style
  outline: (_: StyleProperties['outlineColor'] | StyleProperties['outlineStyle'] | StyleProperties['outlineWidth']) => Style
  outlineColor: (_: Color | 'invert') => Style
  outlineOffset: (_: string | number | GlobalValues) => Style
  outlineStyle: (_: BorderStyle) => Style
  outlineWidth: (_: BorderWidth) => Style
  overflow: (_: StyleProperties['overflowX'] | StyleProperties['overflowY']) => Style
  overflowBlock: (_: 'visible' | 'hidden' | 'scroll' | 'auto' | GlobalValues) => Style
  overflowHidden: (_: StyleProperties['overflowBlock']) => Style
  overflowWrap: (_: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => Style
  overflowX: (_: 'clip' | StyleProperties['overflowBlock']) => Style
  overflowY: (_: 'clip' | StyleProperties['overflowBlock']) => Style
  padding: (_: Number | string | number | string[] | number[] | GlobalValues) => Style
  paddingBottom: (_: Number) => Style
  paddingLeft: (_: Number) => Style
  paddingRight: (_: Number) => Style
  paddingTop: (_: Number) => Style
  pageBreakAfter: (_: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso' | GlobalValues) => Style
  pageBreakBefore: (_: StyleProperties['pageBreakAfter']) => Style
  pageBreakInside: (_: 'auto' | 'avoid' | GlobalValues) => Style
  perspective: (_: 'none' | Number) => Style
  perspectiveOrigin: (_: 'center' | 'top' | 'bottom' | 'right' | string | GlobalValues) => Style
  pointerEvents: (_: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | GlobalValues) => Style
  position: (_: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky') => Style
  quotes: (_: 'none' | 'initial' | 'auto' | string | GlobalValues) => Style
  resize: (_: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | GlobalValues) => Style
  right: (_: Number) => Style
  scrollBehavior: (_: 'auto' | 'smooth' | GlobalValues) => Style
  tabSize: (_: Number) => Style
  tableLayout: (_: 'auto' | 'fixed' | GlobalValues) => Style
  textAlign: (_: 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'start' | 'end' | 'match-parent' | string | GlobalValues) => Style
  textAlignLast: (_: 'auto' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | string | GlobalValues) => Style
  textCombineUpright: (_: 'none' | 'all' | 'digits' | GlobalValues) => Style
  textDecoration: (_: StyleProperties['textDecorationLine'] | StyleProperties['textDecorationColor'] | StyleProperties['textDecorationStyle'] |
    StyleProperties['textDecorationThickness']) => Style
  textDecorationColor: (_: Color) => Style
  textDecorationLine: (_: 'none' | 'underline' | 'overline' | 'line-through' | 'blink' | string | GlobalValues) => Style
  textDecorationStyle: (_: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | GlobalValues ) => Style
  textDecorationThickness: (_: 'auto' | 'from-font' | number | string | GlobalValues) => Style
  textIndent: (_: 'each-line' | 'hanging' | number | string | GlobalValues) => Style
  textJustify: (_: 'none' | 'auto' | 'inter-word' | 'inter-character' | 'distribute') => Style
  textOrientation: (_: 'mixed' | 'upright' | 'sideways-right' | 'sideways' | 'use-glyph-orientation' | GlobalValues) => Style
  textOverflow: (_: 'clip' | 'ellipsis' | '-' | GlobalValues) => Style
  textShadow: (_: StyleProperties['boxShadow']) => Style
  textTransform: (_: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana' | GlobalValues) => Style
  textUnderlinePosition: (_: 'auto' | 'under' | 'left' | 'right' | string | GlobalValues) => Style
  top: (_: Number) => Style
  transform: (_: 'none' | 'matrix()' | 'matrix3d()' | 'perspective()' | 'rotate()' | 'rotate3d()' | 'rotateX()' | 'rotateY()' | 'rotateZ()' | 'translate()' |
    'translate3d()' | 'translateX()' | 'translateY()' | 'translateZ()' | 'scale()' | 'scale3d()' | 'scaleX()' | 'scaleY()' | 'scaleZ()' | 'skew()' |
    'skewX()' | 'skewY()' | string | GlobalValues) => Style
  transformOrigin: (_: 'center' | 'top' | 'right' | 'left' | 'bottom' | string | number | string[] | number[]) => Style
  transformStyle: (_: 'flat' | 'preserve-3d' | GlobalValues) => Style
  transition: (_: StyleProperties['transitionDelay'] | StyleProperties['transitionDuration'] | StyleProperties['transitionProperty'] | StyleProperties['transitionTimingFunction']) => Style
  transitionDelay: (_: string | string[] | GlobalValues) => Style
  transitionDuration: (_: number | string | GlobalValues) => Style
  transitionProperty: (_: StyleProperties['animationName']) => Style
  transitionTimingFunction: (_: StyleProperties['animationTimingFunction']) => Style
  unicodeBidi: (_: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext' | GlobalValues) => Style
  userSelect: (_: 'none' | 'auto' | 'text' | 'contain' | 'all' | 'element' | GlobalValues) => Style
  verticalAlign: (_: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | number | string | GlobalValues) => Style
  visibility: (_: 'visible' | 'hidden' | 'collapse' | GlobalValues) => Style
  whiteSpace: (_: 'normal' | 'nowrap' | 'wrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces' | GlobalValues) => Style
  width: (_: Number) => Style
  wordBreak: (_: 'normal' | 'break-all' | 'keep-all' | 'break-word' | GlobalValues) => Style
  wordSpacing: (_: 'normal' | number | string | GlobalValues) => Style
  wordWrap: (_: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => Style
  writingMode: (_: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | GlobalValues) => Style

  zIndex: (_: string | GlobalValues) => Style
  // custom specials
  cornerRadius: (_: StyleProperties['borderRadius']) => Style

  // Pseudo functions
  globalStyle(_: {[key: string]: StyleProperties}): Style { return this }
  pseudoActive: (_: StyleProperties) => Style
  pseudoChecked: (_: StyleProperties) => Style
  pseudoDisabled: (_: StyleProperties) => Style
  pseudoEmpty: (_: StyleProperties) => Style
  pseudoEnabled: (_: StyleProperties) => Style
  pseudoFirstOfType: (_: StyleProperties) => Style
  pseudoFocus: (_: StyleProperties) => Style
  pseudoHover: (_: StyleProperties) => Style
  pseudoInRange: (_: StyleProperties) => Style
  pseudoInvalid: (_: StyleProperties) => Style
  pseudoLang: (_: StyleProperties) => Style
  pseudoLastChild: (_: StyleProperties) => Style
  pseudoLastOfType: (_: StyleProperties) => Style
  pseudoLink: (_: StyleProperties) => Style
  pseudoNot: (_: StyleProperties) => Style
  pseudoNthChild: (_: StyleProperties) => Style
  pseudoNthLastChild: (_: StyleProperties) => Style
  pseudoNthLastOfType: (_: StyleProperties) => Style
  pseudoNthOfType: (_: StyleProperties) => Style
  pseudoOnlyOfType: (_: StyleProperties) => Style
  pseudoOnlyChild: (_: StyleProperties) => Style
  pseudoOptional: (_: StyleProperties) => Style
  pseudoOutOfRange: (_: StyleProperties) => Style
  pseudoReadOnly: (_: StyleProperties) => Style
  pseudoReadWrite: (_: StyleProperties) => Style
  pseudoRequired: (_: StyleProperties) => Style
  pseudoRoot: (_: StyleProperties) => Style
  pseudoTarget: (_: StyleProperties) => Style
  pseudoValid: (_: StyleProperties) => Style
  pseudoVisited: (_: StyleProperties) => Style

  pseudoBefore = (_: StyleProperties): Style => {
    return this;
  }
  pseudoAfter: (_: StyleProperties) => Style
  pseudoSelection: (_: StyleProperties) => Style
  pseudoFirstLetter: (_: StyleProperties) => Style
  pseudoFirstLine: (_: StyleProperties) => Style

  hover: (_: StyleProperties) => Style
}

declare module "components" {
  export class A extends $RxElement {}
  export class Abbr extends $RxElement {}
  export class Applet extends $RxElement {}
  export class Area extends $RxElement {}
  export class Article extends $RxElement {}
  export class Aside extends $RxElement {}
  export class Audio extends $RxElement {}
  export class Base extends $RxElement {}
  export class BaseFont extends $RxElement {}
  export class BDO extends $RxElement {}
  export class BlockQuote extends $RxElement {}
  export class Body extends $RxElement {}
  export class BR extends $RxElement {}
  export class Canvas extends $RxElement {}
  export class Caption extends $RxElement {}
  export class Code extends $RxElement {}
  export class Col extends $RxElement {}
  export class ColGroup extends $RxElement {}
  export class Data extends $RxElement {}
  export class Details extends $RxElement {}
  export class DFN extends $RxElement {}
  export class Dialog extends $RxElement {}
  export class DIR extends $RxElement {}
  export class Div extends $RxElement {}
  export class DL extends $RxElement {}
  export class EM extends $RxElement {}
  export class Embed extends $RxElement {}
  export class FieldSet extends $RxElement {}
  export class FigCaption extends $RxElement {}
  export class Figure extends $RxElement {}
  export class Font extends $RxElement {}
  export class Footer extends $RxElement {}
  export class Form extends $RxElement {}
  export class Del extends $RxElement {}
  export class Frame extends $RxElement {}
  export class FrameSet extends $RxElement {}
  export class H1 extends $RxElement {}
  export class H2 extends $RxElement {}
  export class H3 extends $RxElement {}
  export class H4 extends $RxElement {}
  export class H5 extends $RxElement {}
  export class H6 extends $RxElement {}
  export class Head extends $RxElement {}
  export class Header extends $RxElement {}
  export class HR extends $RxElement {}
  export class HTML extends $RxElement {}
  export class IFrame extends $RxElement {}
  export class Image extends $RxElement {}
  export class IMG extends $RxElement {}
  export class Ins extends $RxElement {}
  export class IsIndex extends $RxElement {}
  export class Label extends $RxElement {}
  export class Link extends $RxElement {}
  export class Legend extends $RxElement {}
  export class LI extends $RxElement {}
  export class Main extends $RxElement {}
  export class Map extends $RxElement {}
  export class Mark extends $RxElement {}
  export class Menu extends $RxElement {}
  export class Meta extends $RxElement {}
  export class Meter extends $RxElement {}
  export class Nav extends $RxElement {}
  export class ObjectElement extends $RxElement {}
  export class OL extends $RxElement {}
  export class OptGroup extends $RxElement {}
  export class Option extends $RxElement {}
  export class Output extends $RxElement {}
  export class P extends $RxElement {}
  export class Param extends $RxElement {}
  export class Path extends $RxElement {}
  export class Pre extends $RxElement {}
  export class Progress extends $RxElement {}
  export class Q extends $RxElement {}
  export class Script extends $RxElement {}
  export class Section extends $RxElement {}
  export class Select extends $RxElement {}
  export class Slot extends $RxElement {}
  export class Source extends $RxElement {}
  export class Span extends $RxElement {}
  export class Strong extends $RxElement {}
  export class Summary extends $RxElement {}
  export class Table extends $RxElement {}
  export class TBody extends $RxElement {}
  export class TD extends $RxElement {}
  export class Textarea extends $RxElement {}
  export class TFoot extends $RxElement {}
  export class TH extends $RxElement {}
  export class THead extends $RxElement {}
  export class Time extends $RxElement {}
  export class TR extends $RxElement {}
  export class Track extends $RxElement {}
  export class UL extends $RxElement {}
  export class Video extends $RxElement {}
}

