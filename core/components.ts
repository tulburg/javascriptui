import Parser from './parser';
import {RxElement, ElementEvent} from './types';

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']','').toLowerCase();

export class $RxElement {

  $level = 1;
  $children: RxElement[] = [];
  $tagName = '$RxElement';
  $root: RxElement = undefined;
  $events: any = undefined;
  $className: string = undefined;
  $styles: Style[] = [];

  // -- Render properties
  // $hostComponent = Native.serving;
  $node: Element;
  // $styles: CSSStyleRule[] = [];
  $rules: CSSStyleRule[] = [];

  name = this.constructor.name;
  // get name() { return this.constructor.name };

  constructor(tagName?: string) {
    this.$tagName = tagName || this.$tagName;
    this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substr(2, 9);
  }

  addChild(...children: RxElement[]): RxElement {
    if(children[0] instanceof Array) {
      throw `Cannot addChild: ${children[0]} is not valid RxElement`;
    }
    if(this.$children) {
      for(let i = 0; i < children.length; i++) {
        if(children[i].$root !== undefined) {
          throw `Cannot addChild: ${children[i].name} is already attached`;
        }
        this.$children.push(children[i]);
        children[i].$root = this;
      }
      return this;
    }else {
      throw `Cannot addChild: ${this.name} does not accept children`;
    } 
  }

  removeChild(child: RxElement): RxElement {
    if(this.$children.indexOf(child) > -1) {
      this.$children.splice(this.$children.indexOf(child), 1);
      this.$children = this.$children.filter(i => i !== undefined);
      child.$root = undefined;
      return this;
    }else {
      throw `Cannot removeChild: ${child.name} is not a child of ${this.name}`;
    }
  }

  replaceChild(child: RxElement, newChild: RxElement) {
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
  }
  
  parent(): RxElement { return this.$root; }
  children(): (RxElement | string)[] { return this.$children; }

  on(fns: ElementEvent | {[key: string]: () => void}): RxElement {
    this.$events = this.$events || [];
    for(const fn in fns) {
      const event: any = {};
      event[fn] = (<any>fns)[fn];
      if(type((<any>fns)[fn]) !== 'function') throw `${(<any>fns)[fn]} is not a function`;
      // console.log(Function.prototype.bind.apply(fns[fn], this), this);
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

  bind(object: any): RxElement {
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

  text(string: string): RxElement {
    if(string != undefined) {
      if(typeof this.$children[0] == 'string') this.$children.splice(0, 1, string as any);
      else this.$children.unshift(string as any);
      return this;
    }
    if(Object.prototype.toString.call(this.$children[0]) === '[object String]') {
      return this.$children[0];
    }
    return;
  }

  styles(...styles: Style[]): RxElement | Style[] {
    if(arguments.length == 0) return this.$styles;
    for(let i = 0; i < styles.length; i++) {
      if(styles[i].className) {
        this.$className += ' ' + styles[i].className;
        this.$styles.push(styles[i]);
      }
    }
    return this;
  }

  removeStyle(...styles: Style[]): void {
    if(arguments.length == 0) throw 'Remove style: 0 arguments passed. Min. of 1 expected';
    for(let i = 0; i < styles.length; i++) {
      this.$styles = this.$styles.filter(s => s.className === styles[i].className);
      this.$className.replace(' ' + styles[i].className, '');
    }
  }

  // functions

  $render() {
    return Parser.render(this);
  }

  alignContent: (_: string | number | string[] | number[]) => RxElement
  alignItems: (_: string | number | string[] | number[]) => RxElement
  alignSelf: (_: string | number | string[] | number[]) => RxElement
  animationDelay: (_: string | number | string[] | number[]) => RxElement
  animationDirection: (_: string | number | string[] | number[]) => RxElement
  animationDuration: (_: string | number | string[] | number[]) => RxElement
  animationFillMode: (_: string | number | string[] | number[]) => RxElement
  animationIterationCount: (_: string | number | string[] | number[]) => RxElement
  animationName: (_: string | number | string[] | number[]) => RxElement
  animationPlayState: (_: string | number | string[] | number[]) => RxElement
  animationTimingFunction: (_: string | number | string[] | number[]) => RxElement
  backfaceVisibility: (_: string | number | string[] | number[]) => RxElement
  background: (_: string | number | string[] | number[]) => RxElement
  backgroundAttachment: (_: string | number | string[] | number[]) => RxElement
  backgroundClip: (_: string | number | string[] | number[]) => RxElement
  backgroundColor: (_: string | number | string[] | number[]) => RxElement
  backgroundImage: (_: string | number | string[] | number[]) => RxElement
  backgroundOrigin: (_: string | number | string[] | number[]) => RxElement
  backgroundPosition: (_: string | number | string[] | number[]) => RxElement
  backgroundRepeat: (_: string | number | string[] | number[]) => RxElement
  backgroundSize: (_: string | number | string[] | number[]) => RxElement
  border: (_: string | number | string[] | number[]) => RxElement
  borderBottom: (_: string | number | string[] | number[]) => RxElement
  borderBottomColor: (_: string | number | string[] | number[]) => RxElement
  borderBottomLeftRadius: (_: string | number | string[] | number[]) => RxElement
  borderBottomRightRadius: (_: string | number | string[] | number[]) => RxElement
  borderBottomStyle: (_: string | number | string[] | number[]) => RxElement
  borderBottomWidth: (_: string | number | string[] | number[]) => RxElement
  borderCollapse: (_: string | number | string[] | number[]) => RxElement
  borderColor: (_: string | number | string[] | number[]) => RxElement
  borderImage: (_: string | number | string[] | number[]) => RxElement
  borderImageOutset: (_: string | number | string[] | number[]) => RxElement
  borderImageRepeat: (_: string | number | string[] | number[]) => RxElement
  borderImageWidth: (_: string | number | string[] | number[]) => RxElement
  borderLeft: (_: string | number | string[] | number[]) => RxElement
  borderLeftColor: (_: string | number | string[] | number[]) => RxElement
  borderLeftStyle: (_: string | number | string[] | number[]) => RxElement
  borderLeftWidth: (_: string | number | string[] | number[]) => RxElement
  borderRadius: (_: string | number | string[] | number[]) => RxElement
  borderRight: (_: string | number | string[] | number[]) => RxElement
  borderRightColor: (_: string | number | string[] | number[]) => RxElement
  borderRightStyle: (_: string | number | string[] | number[]) => RxElement
  borderRightWidth: (_: string | number | string[] | number[]) => RxElement
  borderSpacing: (_: string | number | string[] | number[]) => RxElement
  borderStyle: (_: string | number | string[] | number[]) => RxElement
  borderTop: (_: string | number | string[] | number[]) => RxElement
  borderTopColor: (_: string | number | string[] | number[]) => RxElement
  borderTopLeftRadius: (_: string | number | string[] | number[]) => RxElement
  borderTopRightRadius: (_: string | number | string[] | number[]) => RxElement
  borderTopStyle: (_: string | number | string[] | number[]) => RxElement
  borderTopWidth: (_: string | number | string[] | number[]) => RxElement
  borderWidth: (_: string | number | string[] | number[]) => RxElement
  bottom: (_: string | number | string[] | number[]) => RxElement
  boxDecorationBreak: (_: string | number | string[] | number[]) => RxElement
  boxShadow: (_: string | number | string[] | number[]) => RxElement
  boxSizing: (_: string | number | string[] | number[]) => RxElement
  breakAfter: (_: string | number | string[] | number[]) => RxElement
  breakBefore: (_: string | number | string[] | number[]) => RxElement
  breakInside: (_: string | number | string[] | number[]) => RxElement
  captionSide: (_: string | number | string[] | number[]) => RxElement
  caretColor: (_: string | number | string[] | number[]) => RxElement
  clear: (_: string | number | string[] | number[]) => RxElement
  clip: (_: string | number | string[] | number[]) => RxElement
  color: (_: string | number | string[] | number[]) => RxElement
  columnCount: (_: string | number | string[] | number[]) => RxElement
  columnFill: (_: string | number | string[] | number[]) => RxElement
  columnGap: (_: string | number | string[] | number[]) => RxElement
  columnRule: (_: string | number | string[] | number[]) => RxElement
  columnRuleColor: (_: string | number | string[] | number[]) => RxElement
  columnRuleStyle: (_: string | number | string[] | number[]) => RxElement
  columnRuleWidth: (_: string | number | string[] | number[]) => RxElement
  columnSpan: (_: string | number | string[] | number[]) => RxElement
  columnWidth: (_: string | number | string[] | number[]) => RxElement
  columns: (_: string | number | string[] | number[]) => RxElement
  content: (_: string | number | string[] | number[]) => RxElement
  counterIncrement: (_: string | number | string[] | number[]) => RxElement
  counterReset: (_: string | number | string[] | number[]) => RxElement
  cursor: (_: string | number | string[] | number[]) => RxElement
  direction: (_: string | number | string[] | number[]) => RxElement
  display: (_: string | number | string[] | number[]) => RxElement
  emptyCells: (_: string | number | string[] | number[]) => RxElement
  filter: (_: string | number | string[] | number[]) => RxElement
  flex: (_: string | number | string[] | number[]) => RxElement
  flexBasis: (_: string | number | string[] | number[]) => RxElement
  flexDirection: (_: string | number | string[] | number[]) => RxElement
  flexFlow: (_: string | number | string[] | number[]) => RxElement
  flexGrow: (_: string | number | string[] | number[]) => RxElement
  flexShrink: (_: string | number | string[] | number[]) => RxElement
  flexWrap: (_: string | number | string[] | number[]) => RxElement
  float: (_: string | number | string[] | number[]) => RxElement
  font: (_: string | number | string[] | number[]) => RxElement
  fontFamily: (_: string | number | string[] | number[]) => RxElement
  fontFeatureSettings: (_: string | number | string[] | number[]) => RxElement
  fontKerning: (_: string | number | string[] | number[]) => RxElement
  fontLanguageOverride: (_: string | number | string[] | number[]) => RxElement
  fontSize: (_: string | number | string[] | number[]) => RxElement
  fontSizeAdjust: (_: string | number | string[] | number[]) => RxElement
  fontStretch: (_: string | number | string[] | number[]) => RxElement
  fontStyle: (_: string | number | string[] | number[]) => RxElement
  fontSynthesis: (_: string | number | string[] | number[]) => RxElement
  fontVariant: (_: string | number | string[] | number[]) => RxElement
  fontVariantAlternates: (_: string | number | string[] | number[]) => RxElement
  fontVariantCaps: (_: string | number | string[] | number[]) => RxElement
  fontVariantEastAsian: (_: string | number | string[] | number[]) => RxElement
  fontVariantLigatures: (_: string | number | string[] | number[]) => RxElement
  fontVariantNumeric: (_: string | number | string[] | number[]) => RxElement
  fontVariantPosition: (_: string | number | string[] | number[]) => RxElement
  fontWeight: (_: string | number | string[] | number[]) => RxElement
  grid: (_: string | number | string[] | number[]) => RxElement
  gridArea: (_: string | number | string[] | number[]) => RxElement
  gridAutoColumns: (_: string | number | string[] | number[]) => RxElement
  gridAutoFlow: (_: string | number | string[] | number[]) => RxElement
  gridColumn: (_: string | number | string[] | number[]) => RxElement
  gridColumnEnd: (_: string | number | string[] | number[]) => RxElement
  gridColumnGap: (_: string | number | string[] | number[]) => RxElement
  gridColumnStart: (_: string | number | string[] | number[]) => RxElement
  gridGap: (_: string | number | string[] | number[]) => RxElement
  gridRow: (_: string | number | string[] | number[]) => RxElement
  gridRowEnd: (_: string | number | string[] | number[]) => RxElement
  gridRowStart: (_: string | number | string[] | number[]) => RxElement
  gridTemplate: (_: string | number | string[] | number[]) => RxElement
  gridTemplateAreas: (_: string | number | string[] | number[]) => RxElement
  gridTemplateColumns: (_: string | number | string[] | number[]) => RxElement
  gridTemplateRows: (_: string | number | string[] | number[]) => RxElement
  hangingPunctuation: (_: string | number | string[] | number[]) => RxElement
  height: (_: string | number | string[] | number[]) => RxElement
  hyphens: (_: string | number | string[] | number[]) => RxElement
  isolation: (_: string | number | string[] | number[]) => RxElement
  inset: (_: string | number | string[] | number[]) => RxElement
  insetBottom: (_: string | number | string[] | number[]) => RxElement
  insetLeft: (_: string | number | string[] | number[]) => RxElement
  insetRight: (_: string | number | string[] | number[]) => RxElement
  insetTop: (_: string | number | string[] | number[]) => RxElement
  justifyContent: (_: string | number | string[] | number[]) => RxElement
  justifySelf: (_: string | number | string[] | number[]) => RxElement
  justifyItems: (_: string | number | string[] | number[]) => RxElement
  left: (_: string | number | string[] | number[]) => RxElement
  letterSpacing: (_: string | number | string[] | number[]) => RxElement
  lineBreak: (_: string | number | string[] | number[]) => RxElement
  lineHeight: (_: string | number | string[] | number[]) => RxElement
  lineStyle: (_: string | number | string[] | number[]) => RxElement
  lineStyleImage: (_: string | number | string[] | number[]) => RxElement
  lineStylePosition: (_: string | number | string[] | number[]) => RxElement
  lineStyleType: (_: string | number | string[] | number[]) => RxElement
  margin: (_: string | number | string[] | number[]) => RxElement
  marginBottom: (_: string | number | string[] | number[]) => RxElement
  marginLeft: (_: string | number | string[] | number[]) => RxElement
  marginRight: (_: string | number | string[] | number[]) => RxElement
  marginTop: (_: string | number | string[] | number[]) => RxElement
  maxHeight: (_: string | number | string[] | number[]) => RxElement
  maxWidth: (_: string | number | string[] | number[]) => RxElement
  minHeight: (_: string | number | string[] | number[]) => RxElement
  minWidth: (_: string | number | string[] | number[]) => RxElement
  mixBlendMode: (_: string | number | string[] | number[]) => RxElement
  objectFit: (_: string | number | string[] | number[]) => RxElement
  objectPosition: (_: string | number | string[] | number[]) => RxElement
  opacity: (_: string | number | string[] | number[]) => RxElement
  order: (_: string | number | string[] | number[]) => RxElement
  orphans: (_: string | number | string[] | number[]) => RxElement
  outline: (_: string | number | string[] | number[]) => RxElement
  outlineColor: (_: string | number | string[] | number[]) => RxElement
  outlineOffset: (_: string | number | string[] | number[]) => RxElement
  outlineStyle: (_: string | number | string[] | number[]) => RxElement
  outlineWidth: (_: string | number | string[] | number[]) => RxElement
  overflow: (_: string | number | string[] | number[]) => RxElement
  overflowWrap: (_: string | number | string[] | number[]) => RxElement
  overflowX: (_: string | number | string[] | number[]) => RxElement
  overflowY: (_: string | number | string[] | number[]) => RxElement
  padding: (_: string | number | string[] | number[]) => RxElement
  paddingBottom: (_: string | number | string[] | number[]) => RxElement
  paddingLeft: (_: string | number | string[] | number[]) => RxElement
  paddingRight: (_: string | number | string[] | number[]) => RxElement
  paddingTop: (_: string | number | string[] | number[]) => RxElement
  pageBreakAfter: (_: string | number | string[] | number[]) => RxElement
  pageBreakBefore: (_: string | number | string[] | number[]) => RxElement
  pageBreakInside: (_: string | number | string[] | number[]) => RxElement
  perspective: (_: string | number | string[] | number[]) => RxElement
  perspectiveOrigin: (_: string | number | string[] | number[]) => RxElement
  pointerEvents: (_: string | number | string[] | number[]) => RxElement
  position: (_: string | number | string[] | number[]) => RxElement
  quotes: (_: string | number | string[] | number[]) => RxElement
  resize: (_: string | number | string[] | number[]) => RxElement
  right: (_: string | number | string[] | number[]) => RxElement
  scrollBehavior: (_: string | number | string[] | number[]) => RxElement
  tabSize: (_: string | number | string[] | number[]) => RxElement
  tableLayout: (_: string | number | string[] | number[]) => RxElement
  textAlign: (_: string | number | string[] | number[]) => RxElement
  textAlignLast: (_: string | number | string[] | number[]) => RxElement
  textCombineUpright: (_: string | number | string[] | number[]) => RxElement
  textDecoration: (_: string | number | string[] | number[]) => RxElement
  textDecorationColor: (_: string | number | string[] | number[]) => RxElement
  textDecorationLine: (_: string | number | string[] | number[]) => RxElement
  textDecorationStyle: (_: string | number | string[] | number[]) => RxElement
  textIndent: (_: string | number | string[] | number[]) => RxElement
  textJustify: (_: string | number | string[] | number[]) => RxElement
  textOrientation: (_: string | number | string[] | number[]) => RxElement
  textOverflow: (_: string | number | string[] | number[]) => RxElement
  textShadow: (_: string | number | string[] | number[]) => RxElement
  textTransform: (_: string | number | string[] | number[]) => RxElement
  textUnderlinePosition: (_: string | number | string[] | number[]) => RxElement
  top: (_: string | number | string[] | number[]) => RxElement
  transform: (_: string | number | string[] | number[]) => RxElement
  transformOrigin: (_: string | number | string[] | number[]) => RxElement
  transformStyle: (_: string | number | string[] | number[]) => RxElement
  transition: (_: string | number | string[] | number[]) => RxElement
  transitionDelay: (_: string | number | string[] | number[]) => RxElement
  transitionDuration: (_: string | number | string[] | number[]) => RxElement
  transitionProperty: (_: string | number | string[] | number[]) => RxElement
  transitionTimingFunction: (_: string | number | string[] | number[]) => RxElement
  unicodeBidi: (_: string | number | string[] | number[]) => RxElement
  userSelect: (_: string | number | string[] | number[]) => RxElement
  verticalAlign: (_: string | number | string[] | number[]) => RxElement
  visibility: (_: string | number | string[] | number[]) => RxElement
  whiteSpace: (_: string | number | string[] | number[]) => RxElement
  width: (_: string | number | string[] | number[]) => RxElement
  wordBreak: (_: string | number | string[] | number[]) => RxElement
  wordWrap: (_: string | number | string[] | number[]) => RxElement
  writingMode: (_: string | number | string[] | number[]) => RxElement
  zIndex: (_: string | number | string[] | number[]) => RxElement
  // custom specials
  cornerRadius: (_: string | number | string[] | number[]) => RxElement

  // attributes
  abbr: (_: string | number | string[] | number[]) => RxElement
  acceptCharset: (_: string | number | string[] | number[]) => RxElement
  accessKey: (_: string | number | string[] | number[]) => RxElement
  action: (_: string | number | string[] | number[]) => RxElement
  alink: (_: string | number | string[] | number[]) => RxElement
  allow: (_: string | number | string[] | number[]) => RxElement
  allowFullscreen: (_: string | number | string[] | number[]) => RxElement
  allowPaymentRequest: (_: string | number | string[] | number[]) => RxElement
  allowUserMedia: (_: string | number | string[] | number[]) => RxElement
  alt: (_: string | number | string[] | number[]) => RxElement
  archive: (_: string | number | string[] | number[]) => RxElement
  as: (_: string | number | string[] | number[]) => RxElement
  async: (_: string | number | string[] | number[]) => RxElement
  attrHeight: (_: string | number | string[] | number[]) => RxElement
  attrWidth: (_: string | number | string[] | number[]) => RxElement
  autoCapitalize: (_: string | number | string[] | number[]) => RxElement
  autoComplete: (_: string | number | string[] | number[]) => RxElement
  autoFocus: (_: string | number | string[] | number[]) => RxElement
  autoPlay: (_: string | number | string[] | number[]) => RxElement
  axis: (_: string | number | string[] | number[]) => RxElement
  cellPadding: (_: string | number | string[] | number[]) => RxElement
  cellSpacing: (_: string | number | string[] | number[]) => RxElement
  char: (_: string | number | string[] | number[]) => RxElement
  charOff: (_: string | number | string[] | number[]) => RxElement
  charset: (_: string | number | string[] | number[]) => RxElement
  checked: (_: string | number | string[] | number[]) => RxElement
  cite: (_: string | number | string[] | number[]) => RxElement
  classId: (_: string | number | string[] | number[]) => RxElement
  className: (_: string | number | string[] | number[]) => RxElement
  clearAttr: (_: string | number | string[] | number[]) => RxElement
  code: (_: string | number | string[] | number[]) => RxElement
  codeBase: (_: string | number | string[] | number[]) => RxElement
  codeType: (_: string | number | string[] | number[]) => RxElement
  cols: (_: string | number | string[] | number[]) => RxElement
  colSpan: (_: string | number | string[] | number[]) => RxElement
  compact: (_: string | number | string[] | number[]) => RxElement
  contentEditable: (_: string | number | string[] | number[]) => RxElement
  controls: (_: string | number | string[] | number[]) => RxElement
  coords: (_: string | number | string[] | number[]) => RxElement
  crossOrigin: (_: string | number | string[] | number[]) => RxElement
  data: (_: string | number | string[] | number[]) => RxElement
  datetime: (_: string | number | string[] | number[]) => RxElement
  declare: (_: string | number | string[] | number[]) => RxElement
  decoding: (_: string | number | string[] | number[]) => RxElement
  dir: (_: string | number | string[] | number[]) => RxElement
  dirname: (_: string | number | string[] | number[]) => RxElement
  disabled: (_: string | number | string[] | number[]) => RxElement
  download: (_: string | number | string[] | number[]) => RxElement
  draggable: (_: string | number | string[] | number[]) => RxElement
  enctype: (_: string | number | string[] | number[]) => RxElement
  enterKeyHint: (_: string | number | string[] | number[]) => RxElement
  form: (_: string | number | string[] | number[]) => RxElement
  formAction: (_: string | number | string[] | number[]) => RxElement
  formEnctype: (_: string | number | string[] | number[]) => RxElement
  formMethod: (_: string | number | string[] | number[]) => RxElement
  formNoValidate: (_: string | number | string[] | number[]) => RxElement
  formTarget: (_: string | number | string[] | number[]) => RxElement
  frame: (_: string | number | string[] | number[]) => RxElement
  frameBorder: (_: string | number | string[] | number[]) => RxElement
  headers: (_: string | number | string[] | number[]) => RxElement
  hidden: (_: string | number | string[] | number[]) => RxElement
  high: (_: string | number | string[] | number[]) => RxElement
  href: (_: string | number | string[] | number[]) => RxElement
  hrefLang: (_: string | number | string[] | number[]) => RxElement
  hSpace: (_: string | number | string[] | number[]) => RxElement
  id: (_: string | number | string[] | number[]) => RxElement
  imageSizes: (_: string | number | string[] | number[]) => RxElement
  imageSrcSet: (_: string | number | string[] | number[]) => RxElement
  inputMode: (_: string | number | string[] | number[]) => RxElement
  integrity: (_: string | number | string[] | number[]) => RxElement
  is: (_: string | number | string[] | number[]) => RxElement
  isMap: (_: string | number | string[] | number[]) => RxElement
  itemId: (_: string | number | string[] | number[]) => RxElement
  itemProp: (_: string | number | string[] | number[]) => RxElement
  itemRef: (_: string | number | string[] | number[]) => RxElement
  itemScope: (_: string | number | string[] | number[]) => RxElement
  itemType: (_: string | number | string[] | number[]) => RxElement
  kind: (_: string | number | string[] | number[]) => RxElement
  label: (_: string | number | string[] | number[]) => RxElement
  lang: (_: string | number | string[] | number[]) => RxElement
  link: (_: string | number | string[] | number[]) => RxElement
  list: (_: string | number | string[] | number[]) => RxElement
  longDesc: (_: string | number | string[] | number[]) => RxElement
  loop: (_: string | number | string[] | number[]) => RxElement
  low: (_: string | number | string[] | number[]) => RxElement
  marginHeight: (_: string | number | string[] | number[]) => RxElement
  marginWidth: (_: string | number | string[] | number[]) => RxElement
  max: (_: string | number | string[] | number[]) => RxElement
  maxLength: (_: string | number | string[] | number[]) => RxElement
  media: (_: string | number | string[] | number[]) => RxElement
  method: (_: string | number | string[] | number[]) => RxElement
  min: (_: string | number | string[] | number[]) => RxElement
  minLength: (_: string | number | string[] | number[]) => RxElement
  multiple: (_: string | number | string[] | number[]) => RxElement
  muted: (_: string | number | string[] | number[]) => RxElement
  attrName: (_: string | number | string[] | number[]) => RxElement
  nonce: (_: string | number | string[] | number[]) => RxElement
  noResize: (_: string | number | string[] | number[]) => RxElement
  noShade: (_: string | number | string[] | number[]) => RxElement
  noValidate: (_: string | number | string[] | number[]) => RxElement
  noWrap: (_: string | number | string[] | number[]) => RxElement
  object: (_: string | number | string[] | number[]) => RxElement
  open: (_: string | number | string[] | number[]) => RxElement
  optimum: (_: string | number | string[] | number[]) => RxElement
  pattern: (_: string | number | string[] | number[]) => RxElement
  ping: (_: string | number | string[] | number[]) => RxElement
  placeholder: (_: string | number | string[] | number[]) => RxElement
  playsInline: (_: string | number | string[] | number[]) => RxElement
  poster: (_: string | number | string[] | number[]) => RxElement
  preload: (_: string | number | string[] | number[]) => RxElement
  profile: (_: string | number | string[] | number[]) => RxElement
  prompt: (_: string | number | string[] | number[]) => RxElement
  readOnly: (_: string | number | string[] | number[]) => RxElement
  referrerPolicy: (_: string | number | string[] | number[]) => RxElement
  rel: (_: string | number | string[] | number[]) => RxElement
  required: (_: string | number | string[] | number[]) => RxElement
  rev: (_: string | number | string[] | number[]) => RxElement
  reversed: (_: string | number | string[] | number[]) => RxElement
  rows: (_: string | number | string[] | number[]) => RxElement
  rowSpan: (_: string | number | string[] | number[]) => RxElement
  rules: (_: string | number | string[] | number[]) => RxElement
  sandBox: (_: string | number | string[] | number[]) => RxElement
  scope: (_: string | number | string[] | number[]) => RxElement
  scrolling: (_: string | number | string[] | number[]) => RxElement
  selected: (_: string | number | string[] | number[]) => RxElement
  shape: (_: string | number | string[] | number[]) => RxElement
  sizes: (_: string | number | string[] | number[]) => RxElement
  slot: (_: string | number | string[] | number[]) => RxElement
  span: (_: string | number | string[] | number[]) => RxElement
  spellCheck: (_: string | number | string[] | number[]) => RxElement
  src: (_: string | number | string[] | number[]) => RxElement
  srcDoc: (_: string | number | string[] | number[]) => RxElement
  srcSet: (_: string | number | string[] | number[]) => RxElement
  standBy: (_: string | number | string[] | number[]) => RxElement
  start: (_: string | number | string[] | number[]) => RxElement
  step: (_: string | number | string[] | number[]) => RxElement
  summary: (_: string | number | string[] | number[]) => RxElement
  tabIndex: (_: string | number | string[] | number[]) => RxElement
  target: (_: string | number | string[] | number[]) => RxElement
  title: (_: string | number | string[] | number[]) => RxElement
  translate: (_: string | number | string[] | number[]) => RxElement
  type: (_: string | number | string[] | number[]) => RxElement
  typeMustMatch: (_: string | number | string[] | number[]) => RxElement
  useMap: (_: string | number | string[] | number[]) => RxElement
  vAlign: (_: string | number | string[] | number[]) => RxElement
  value: (_: string | number | string[] | number[]) => RxElement
  valueType: (_: string | number | string[] | number[]) => RxElement
  vLink: (_: string | number | string[] | number[]) => RxElement
  vSpace: (_: string | number | string[] | number[]) => RxElement
  wrap: (_: string | number | string[] | number[]) => RxElement
  attrDefault: (_: string | number | string[] | number[]) => RxElement
  attrFor: (_: string | number | string[] | number[]) => RxElement
}

export class Component extends $RxElement {

  $nid: string; 
  $level = 0;

  constructor(...args: any[]) {
    super('component');
    this.$nid = Math.random().toString(36).substr(2, 9);
    this.$tagName = this.name;
    (<any>window).Native.serving = this.name + "-" + this.$nid;
    (<any>window).Native.components[this.name] = (<any>window).Native.components[this.name] || { structure: this.constructor };
    (<any>window).Native.components[this.name][this.$nid] = { served: false, watchlist: [] };
    (<any>window).Native.components[this.name][this.$nid].args
    = (<any>window).Native.components[this.name][this.$nid].args || args;

    // additional styling (default div styling)?
    this.display('block');
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

export class Style {
  
  $className: string;

  constructor(className: string, parent?: Style) {
    if(parent) {
      Object.assign(parent, this);
    }
    this.$className = className;
  }

  get className() { return this.$className; }
}
