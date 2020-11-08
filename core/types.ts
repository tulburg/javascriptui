import {$RxElement, Component, PageComponent} from './components';
import NSRouter from './router';

declare global {
  var Theme: {
    globals: {[key: string]: RxElement},
    colors: {[key: string]: string},
    fonts: {[key: string]: string}
  } & any;
  var Config: {
    routes: Route[]
  }
  var Router: NSRouter
  interface String {
    watch: (_ : (v: any) => void) => void
  }
}


export interface Route {
  path: string;
  component: any;
  name: string;
  subs?: Route[];
  data?: any
}

export interface NativeEventData {
  old?: $RxElement | Component;
  new?: $RxElement | Component;
  oldValue?: any;
  newValue?: any;
  key?: string;
  index?: number;
  count?: number;
}

export interface NativeLock {
  key: string;
  type: 'property' | 'state';
  nid: string;
  className: string;
}


export enum NativeEventType {
  insert = 1,
  update = 2,
  delete = 3,
  replace = 4,
  sort = 5,
  reverse = 6,
  state = 7
}

export namespace TConfig {

  export interface Route {
    path: string;
    component: PageComponent;
    name: string;
    subs?: Route[];
    routes: any;
    data: any;
  }
}

export interface StyleProperties {
  alignContent?: string | number | string[] | number[];
  alignItems?: string | number | string[] | number[];
  alignSelf?: string | number | string[] | number[];
  animationDelay?: string | number | string[] | number[];
  animationDirection?: string | number | string[] | number[];
  animationDuration?: string | number | string[] | number[];
  animationFillMode?: string | number | string[] | number[];
  animationIterationCount?: string | number | string[] | number[];
  animationName?: string | number | string[] | number[];
  animationPlayState?: string | number | string[] | number[];
  animationTimingFunction?: string | number | string[] | number[];
  backfaceVisibility?: string | number | string[] | number[];
  background?: string | number | string[] | number[];
  backgroundAttachment?: string | number | string[] | number[];
  backgroundClip?: string | number | string[] | number[];
  backgroundColor?: string | number | string[] | number[];
  backgroundImage?: string | number | string[] | number[];
  backgroundOrigin?: string | number | string[] | number[];
  backgroundPosition?: string | number | string[] | number[];
  backgroundRepeat?: string | number | string[] | number[];
  backgroundSize?: string | number | string[] | number[];
  border?: string | number | string[] | number[];
  borderBottom?: string | number | string[] | number[];
  borderBottomColor?: string | number | string[] | number[];
  borderBottomLeftRadius?: string | number | string[] | number[];
  borderBottomRightRadius?: string | number | string[] | number[];
  borderBottomStyle?: string | number | string[] | number[];
  borderBottomWidth?: string | number | string[] | number[];
  borderCollapse?: string | number | string[] | number[];
  borderColor?: string | number | string[] | number[];
  borderImage?: string | number | string[] | number[];
  borderImageOutset?: string | number | string[] | number[];
  borderImageRepeat?: string | number | string[] | number[];
  borderImageWidth?: string | number | string[] | number[];
  borderLeft?: string | number | string[] | number[];
  borderLeftColor?: string | number | string[] | number[];
  borderLeftStyle?: string | number | string[] | number[];
  borderLeftWidth?: string | number | string[] | number[];
  borderRadius?: string | number | string[] | number[];
  borderRight?: string | number | string[] | number[];
  borderRightColor?: string | number | string[] | number[];
  borderRightStyle?: string | number | string[] | number[];
  borderRightWidth?: string | number | string[] | number[];
  borderSpacing?: string | number | string[] | number[];
  borderStyle?: string | number | string[] | number[];
  borderTop?: string | number | string[] | number[];
  borderTopColor?: string | number | string[] | number[];
  borderTopLeftRadius?: string | number | string[] | number[];
  borderTopRightRadius?: string | number | string[] | number[];
  borderTopStyle?: string | number | string[] | number[];
  borderTopWidth?: string | number | string[] | number[];
  borderWidth?: string | number | string[] | number[];
  bottom?: string | number | string[] | number[];
  boxDecorationBreak?: string | number | string[] | number[];
  boxShadow?: string | number | string[] | number[];
  boxSizing?: string | number | string[] | number[];
  breakAfter?: string | number | string[] | number[];
  breakBefore?: string | number | string[] | number[];
  breakInside?: string | number | string[] | number[];
  captionSide?: string | number | string[] | number[];
  caretColor?: string | number | string[] | number[];
  clear?: string | number | string[] | number[];
  clip?: string | number | string[] | number[];
  color?: string | number | string[] | number[];
  columnCount?: string | number | string[] | number[];
  columnFill?: string | number | string[] | number[];
  columnGap?: string | number | string[] | number[];
  columnRule?: string | number | string[] | number[];
  columnRuleColor?: string | number | string[] | number[];
  columnRuleStyle?: string | number | string[] | number[];
  columnRuleWidth?: string | number | string[] | number[];
  columnSpan?: string | number | string[] | number[];
  columnWidth?: string | number | string[] | number[];
  columns?: string | number | string[] | number[];
  content?: string | number | string[] | number[];
  counterIncrement?: string | number | string[] | number[];
  counterReset?: string | number | string[] | number[];
  cursor?: string | number | string[] | number[];
  direction?: string | number | string[] | number[];
  display?: string | number | string[] | number[];
  emptyCells?: string | number | string[] | number[];
  filter?: string | number | string[] | number[];
  flex?: string | number | string[] | number[];
  flexBasis?: string | number | string[] | number[];
  flexDirection?: string | number | string[] | number[];
  flexFlow?: string | number | string[] | number[];
  flexGrow?: string | number | string[] | number[];
  flexShrink?: string | number | string[] | number[];
  flexWrap?: string | number | string[] | number[];
  float?: string | number | string[] | number[];
  font?: string | number | string[] | number[];
  fontFamily?: string | number | string[] | number[];
  fontFeatureSettings?: string | number | string[] | number[];
  fontKerning?: string | number | string[] | number[];
  fontLanguageOverride?: string | number | string[] | number[];
  fontSize?: string | number | string[] | number[];
  fontSizeAdjust?: string | number | string[] | number[];
  fontStretch?: string | number | string[] | number[];
  fontStyle?: string | number | string[] | number[];
  fontSynthesis?: string | number | string[] | number[];
  fontVariant?: string | number | string[] | number[];
  fontVariantAlternates?: string | number | string[] | number[];
  fontVariantCaps?: string | number | string[] | number[];
  fontVariantEastAsian?: string | number | string[] | number[];
  fontVariantLigatures?: string | number | string[] | number[];
  fontVariantNumeric?: string | number | string[] | number[];
  fontVariantPosition?: string | number | string[] | number[];
  fontWeight?: string | number | string[] | number[];
  grid?: string | number | string[] | number[];
  gridArea?: string | number | string[] | number[];
  gridAutoColumns?: string | number | string[] | number[];
  gridAutoFlow?: string | number | string[] | number[];
  gridColumn?: string | number | string[] | number[];
  gridColumnEnd?: string | number | string[] | number[];
  gridColumnGap?: string | number | string[] | number[];
  gridColumnStart?: string | number | string[] | number[];
  gridGap?: string | number | string[] | number[];
  gridRow?: string | number | string[] | number[];
  gridRowEnd?: string | number | string[] | number[];
  gridRowStart?: string | number | string[] | number[];
  gridTemplate?: string | number | string[] | number[];
  gridTemplateAreas?: string | number | string[] | number[];
  gridTemplateColumns?: string | number | string[] | number[];
  gridTemplateRows?: string | number | string[] | number[];
  hangingPunctuation?: string | number | string[] | number[];
  height?: string | number | string[] | number[];
  hyphens?: string | number | string[] | number[];
  isolation?: string | number | string[] | number[];
  inset?: string | number | string[] | number[];
  insetBottom?: string | number | string[] | number[];
  insetLeft?: string | number | string[] | number[];
  insetRight?: string | number | string[] | number[];
  insetTop?: string | number | string[] | number[];
  justifyContent?: string | number | string[] | number[];
  justifySelf?: string | number | string[] | number[];
  justifyItems?: string | number | string[] | number[];
  left?: string | number | string[] | number[];
  letterSpacing?: string | number | string[] | number[];
  lineBreak?: string | number | string[] | number[];
  lineHeight?: string | number | string[] | number[];
  lineStyle?: string | number | string[] | number[];
  lineStyleImage?: string | number | string[] | number[];
  lineStylePosition?: string | number | string[] | number[];
  lineStyleType?: string | number | string[] | number[];
  margin?: string | number | string[] | number[];
  marginBottom?: string | number | string[] | number[];
  marginLeft?: string | number | string[] | number[];
  marginRight?: string | number | string[] | number[];
  marginTop?: string | number | string[] | number[];
  maxHeight?: string | number | string[] | number[];
  maxWidth?: string | number | string[] | number[];
  minHeight?: string | number | string[] | number[];
  minWidth?: string | number | string[] | number[];
  mixBlendMode?: string | number | string[] | number[];
  objectFit?: string | number | string[] | number[];
  objectPosition?: string | number | string[] | number[];
  opacity?: string | number | string[] | number[];
  order?: string | number | string[] | number[];
  orphans?: string | number | string[] | number[];
  outline?: string | number | string[] | number[];
  outlineColor?: string | number | string[] | number[];
  outlineOffset?: string | number | string[] | number[];
  outlineStyle?: string | number | string[] | number[];
  outlineWidth?: string | number | string[] | number[];
  overflow?: string | number | string[] | number[];
  overflowWrap?: string | number | string[] | number[];
  overflowX?: string | number | string[] | number[];
  overflowY?: string | number | string[] | number[];
  padding?: string | number | string[] | number[];
  paddingBottom?: string | number | string[] | number[];
  paddingLeft?: string | number | string[] | number[];
  paddingRight?: string | number | string[] | number[];
  paddingTop?: string | number | string[] | number[];
  pageBreakAfter?: string | number | string[] | number[];
  pageBreakBefore?: string | number | string[] | number[];
  pageBreakInside?: string | number | string[] | number[];
  perspective?: string | number | string[] | number[];
  perspectiveOrigin?: string | number | string[] | number[];
  pointerEvents?: string | number | string[] | number[];
  position?: string | number | string[] | number[];
  quotes?: string | number | string[] | number[];
  resize?: string | number | string[] | number[];
  right?: string | number | string[] | number[];
  scrollBehavior?: string | number | string[] | number[];
  tabSize?: string | number | string[] | number[];
  tableLayout?: string | number | string[] | number[];
  textAlign?: string | number | string[] | number[];
  textAlignLast?: string | number | string[] | number[];
  textCombineUpright?: string | number | string[] | number[];
  textDecoration?: string | number | string[] | number[];
  textDecorationColor?: string | number | string[] | number[];
  textDecorationLine?: string | number | string[] | number[];
  textDecorationStyle?: string | number | string[] | number[];
  textIndent?: string | number | string[] | number[];
  textJustify?: string | number | string[] | number[];
  textOrientation?: string | number | string[] | number[];
  textOverflow?: string | number | string[] | number[];
  textShadow?: string | number | string[] | number[];
  textTransform?: string | number | string[] | number[];
  textUnderlinePosition?: string | number | string[] | number[];
  top?: string | number | string[] | number[];
  transform?: string | number | string[] | number[];
  transformOrigin?: string | number | string[] | number[];
  transformStyle?: string | number | string[] | number[];
  transition?: string | number | string[] | number[];
  transitionDelay?: string | number | string[] | number[];
  transitionDuration?: string | number | string[] | number[];
  transitionProperty?: string | number | string[] | number[];
  transitionTimingFunction?: string | number | string[] | number[];
  unicodeBidi?: string | number | string[] | number[];
  userSelect?: string | number | string[] | number[];
  verticalAlign?: string | number | string[] | number[];
  visibility?: string | number | string[] | number[];
  whiteSpace?: string | number | string[] | number[];
  width?: string | number | string[] | number[];
  wordBreak?: string | number | string[] | number[];
  wordWrap?: string | number | string[] | number[];
  writingMode?: string | number | string[] | number[];

  zIndex?: string | number | string[] | number[];
  // custom specials
  cornerRadius?: string | number | string[] | number[];
}

export type RxElement = {

  $nid?: string;
  state?: any;

  onCreate?: Function;
  onUpdate?: Function;

  //input model
  model?: (object: any) => RxElement

  alignContent: (value: string | number | string[] | number[]) => RxElement
  alignItems: (value: string | number | string[] | number[]) => RxElement
  alignSelf: (value: string | number | string[] | number[]) => RxElement
  animationDelay: (value: string | number | string[] | number[]) => RxElement
  animationDirection: (value: string | number | string[] | number[]) => RxElement
  animationDuration: (value: string | number | string[] | number[]) => RxElement
  animationFillMode: (value: string | number | string[] | number[]) => RxElement
  animationIterationCount: (value: string | number | string[] | number[]) => RxElement
  animationName: (value: string | number | string[] | number[]) => RxElement
  animationPlayState: (value: string | number | string[] | number[]) => RxElement
  animationTimingFunction: (value: string | number | string[] | number[]) => RxElement
  backfaceVisibility: (value: string | number | string[] | number[]) => RxElement
  background: (value: string | number | string[] | number[]) => RxElement
  backgroundAttachment: (value: string | number | string[] | number[]) => RxElement
  backgroundClip: (value: string | number | string[] | number[]) => RxElement
  backgroundColor: (value: string | number | string[] | number[]) => RxElement
  backgroundImage: (value: string | number | string[] | number[]) => RxElement
  backgroundOrigin: (value: string | number | string[] | number[]) => RxElement
  backgroundPosition: (value: string | number | string[] | number[]) => RxElement
  backgroundRepeat: (value: string | number | string[] | number[]) => RxElement
  backgroundSize: (value: string | number | string[] | number[]) => RxElement
  border: (value: string | number | string[] | number[]) => RxElement
  borderBottom: (value: string | number | string[] | number[]) => RxElement
  borderBottomColor: (value: string | number | string[] | number[]) => RxElement
  borderBottomLeftRadius: (value: string | number | string[] | number[]) => RxElement
  borderBottomRightRadius: (value: string | number | string[] | number[]) => RxElement
  borderBottomStyle: (value: string | number | string[] | number[]) => RxElement
  borderBottomWidth: (value: string | number | string[] | number[]) => RxElement
  borderCollapse: (value: string | number | string[] | number[]) => RxElement
  borderColor: (value: string | number | string[] | number[]) => RxElement
  borderImage: (value: string | number | string[] | number[]) => RxElement
  borderImageOutset: (value: string | number | string[] | number[]) => RxElement
  borderImageRepeat: (value: string | number | string[] | number[]) => RxElement
  borderImageWidth: (value: string | number | string[] | number[]) => RxElement
  borderLeft: (value: string | number | string[] | number[]) => RxElement
  borderLeftColor: (value: string | number | string[] | number[]) => RxElement
  borderLeftStyle: (value: string | number | string[] | number[]) => RxElement
  borderLeftWidth: (value: string | number | string[] | number[]) => RxElement
  borderRadius: (value: string | number | string[] | number[]) => RxElement
  borderRight: (value: string | number | string[] | number[]) => RxElement
  borderRightColor: (value: string | number | string[] | number[]) => RxElement
  borderRightStyle: (value: string | number | string[] | number[]) => RxElement
  borderRightWidth: (value: string | number | string[] | number[]) => RxElement
  borderSpacing: (value: string | number | string[] | number[]) => RxElement
  borderStyle: (value: string | number | string[] | number[]) => RxElement
  borderTop: (value: string | number | string[] | number[]) => RxElement
  borderTopColor: (value: string | number | string[] | number[]) => RxElement
  borderTopLeftRadius: (value: string | number | string[] | number[]) => RxElement
  borderTopRightRadius: (value: string | number | string[] | number[]) => RxElement
  borderTopStyle: (value: string | number | string[] | number[]) => RxElement
  borderTopWidth: (value: string | number | string[] | number[]) => RxElement
  borderWidth: (value: string | number | string[] | number[]) => RxElement
  bottom: (value: string | number | string[] | number[]) => RxElement
  boxDecorationBreak: (value: string | number | string[] | number[]) => RxElement
  boxShadow: (value: string | number | string[] | number[]) => RxElement
  boxSizing: (value: string | number | string[] | number[]) => RxElement
  breakAfter: (value: string | number | string[] | number[]) => RxElement
  breakBefore: (value: string | number | string[] | number[]) => RxElement
  breakInside: (value: string | number | string[] | number[]) => RxElement
  captionSide: (value: string | number | string[] | number[]) => RxElement
  caretColor: (value: string | number | string[] | number[]) => RxElement
  clear: (value: string | number | string[] | number[]) => RxElement
  clip: (value: string | number | string[] | number[]) => RxElement
  color: (value: string | number | string[] | number[]) => RxElement
  columnCount: (value: string | number | string[] | number[]) => RxElement
  columnFill: (value: string | number | string[] | number[]) => RxElement
  columnGap: (value: string | number | string[] | number[]) => RxElement
  columnRule: (value: string | number | string[] | number[]) => RxElement
  columnRuleColor: (value: string | number | string[] | number[]) => RxElement
  columnRuleStyle: (value: string | number | string[] | number[]) => RxElement
  columnRuleWidth: (value: string | number | string[] | number[]) => RxElement
  columnSpan: (value: string | number | string[] | number[]) => RxElement
  columnWidth: (value: string | number | string[] | number[]) => RxElement
  columns: (value: string | number | string[] | number[]) => RxElement
  content: (value: string | number | string[] | number[]) => RxElement
  counterIncrement: (value: string | number | string[] | number[]) => RxElement
  counterReset: (value: string | number | string[] | number[]) => RxElement
  cursor: (value: string | number | string[] | number[]) => RxElement
  direction: (value: string | number | string[] | number[]) => RxElement
  display: (value: string | number | string[] | number[]) => RxElement
  emptyCells: (value: string | number | string[] | number[]) => RxElement
  filter: (value: string | number | string[] | number[]) => RxElement
  flex: (value: string | number | string[] | number[]) => RxElement
  flexBasis: (value: string | number | string[] | number[]) => RxElement
  flexDirection: (value: string | number | string[] | number[]) => RxElement
  flexFlow: (value: string | number | string[] | number[]) => RxElement
  flexGrow: (value: string | number | string[] | number[]) => RxElement
  flexShrink: (value: string | number | string[] | number[]) => RxElement
  flexWrap: (value: string | number | string[] | number[]) => RxElement
  float: (value: string | number | string[] | number[]) => RxElement
  font: (value: string | number | string[] | number[]) => RxElement
  fontFamily: (value: string | number | string[] | number[]) => RxElement
  fontFeatureSettings: (value: string | number | string[] | number[]) => RxElement
  fontKerning: (value: string | number | string[] | number[]) => RxElement
  fontLanguageOverride: (value: string | number | string[] | number[]) => RxElement
  fontSize: (value: string | number | string[] | number[]) => RxElement
  fontSizeAdjust: (value: string | number | string[] | number[]) => RxElement
  fontStretch: (value: string | number | string[] | number[]) => RxElement
  fontStyle: (value: string | number | string[] | number[]) => RxElement
  fontSynthesis: (value: string | number | string[] | number[]) => RxElement
  fontVariant: (value: string | number | string[] | number[]) => RxElement
  fontVariantAlternates: (value: string | number | string[] | number[]) => RxElement
  fontVariantCaps: (value: string | number | string[] | number[]) => RxElement
  fontVariantEastAsian: (value: string | number | string[] | number[]) => RxElement
  fontVariantLigatures: (value: string | number | string[] | number[]) => RxElement
  fontVariantNumeric: (value: string | number | string[] | number[]) => RxElement
  fontVariantPosition: (value: string | number | string[] | number[]) => RxElement
  fontWeight: (value: string | number | string[] | number[]) => RxElement
  grid: (value: string | number | string[] | number[]) => RxElement
  gridArea: (value: string | number | string[] | number[]) => RxElement
  gridAutoColumns: (value: string | number | string[] | number[]) => RxElement
  gridAutoFlow: (value: string | number | string[] | number[]) => RxElement
  gridColumn: (value: string | number | string[] | number[]) => RxElement
  gridColumnEnd: (value: string | number | string[] | number[]) => RxElement
  gridColumnGap: (value: string | number | string[] | number[]) => RxElement
  gridColumnStart: (value: string | number | string[] | number[]) => RxElement
  gridGap: (value: string | number | string[] | number[]) => RxElement
  gridRow: (value: string | number | string[] | number[]) => RxElement
  gridRowEnd: (value: string | number | string[] | number[]) => RxElement
  gridRowStart: (value: string | number | string[] | number[]) => RxElement
  gridTemplate: (value: string | number | string[] | number[]) => RxElement
  gridTemplateAreas: (value: string | number | string[] | number[]) => RxElement
  gridTemplateColumns: (value: string | number | string[] | number[]) => RxElement
  gridTemplateRows: (value: string | number | string[] | number[]) => RxElement
  hangingPunctuation: (value: string | number | string[] | number[]) => RxElement
  height: (value: string | number | string[] | number[]) => RxElement
  hyphens: (value: string | number | string[] | number[]) => RxElement
  isolation: (value: string | number | string[] | number[]) => RxElement
  inset: (value: string | number | string[] | number[]) => RxElement
  insetBottom: (value: string | number | string[] | number[]) => RxElement
  insetLeft: (value: string | number | string[] | number[]) => RxElement
  insetRight: (value: string | number | string[] | number[]) => RxElement
  insetTop: (value: string | number | string[] | number[]) => RxElement
  justifyContent: (value: string | number | string[] | number[]) => RxElement
  justifySelf: (value: string | number | string[] | number[]) => RxElement
  justifyItems: (value: string | number | string[] | number[]) => RxElement
  left: (value: string | number | string[] | number[]) => RxElement
  letterSpacing: (value: string | number | string[] | number[]) => RxElement
  lineBreak: (value: string | number | string[] | number[]) => RxElement
  lineHeight: (value: string | number | string[] | number[]) => RxElement
  lineStyle: (value: string | number | string[] | number[]) => RxElement
  lineStyleImage: (value: string | number | string[] | number[]) => RxElement
  lineStylePosition: (value: string | number | string[] | number[]) => RxElement
  lineStyleType: (value: string | number | string[] | number[]) => RxElement
  margin: (value: string | number | string[] | number[]) => RxElement
  marginBottom: (value: string | number | string[] | number[]) => RxElement
  marginLeft: (value: string | number | string[] | number[]) => RxElement
  marginRight: (value: string | number | string[] | number[]) => RxElement
  marginTop: (value: string | number | string[] | number[]) => RxElement
  maxHeight: (value: string | number | string[] | number[]) => RxElement
  maxWidth: (value: string | number | string[] | number[]) => RxElement
  minHeight: (value: string | number | string[] | number[]) => RxElement
  minWidth: (value: string | number | string[] | number[]) => RxElement
  mixBlendMode: (value: string | number | string[] | number[]) => RxElement
  objectFit: (value: string | number | string[] | number[]) => RxElement
  objectPosition: (value: string | number | string[] | number[]) => RxElement
  opacity: (value: string | number | string[] | number[]) => RxElement
  order: (value: string | number | string[] | number[]) => RxElement
  orphans: (value: string | number | string[] | number[]) => RxElement
  outline: (value: string | number | string[] | number[]) => RxElement
  outlineColor: (value: string | number | string[] | number[]) => RxElement
  outlineOffset: (value: string | number | string[] | number[]) => RxElement
  outlineStyle: (value: string | number | string[] | number[]) => RxElement
  outlineWidth: (value: string | number | string[] | number[]) => RxElement
  overflow: (value: string | number | string[] | number[]) => RxElement
  overflowWrap: (value: string | number | string[] | number[]) => RxElement
  overflowX: (value: string | number | string[] | number[]) => RxElement
  overflowY: (value: string | number | string[] | number[]) => RxElement
  padding: (value: string | number | string[] | number[]) => RxElement
  paddingBottom: (value: string | number | string[] | number[]) => RxElement
  paddingLeft: (value: string | number | string[] | number[]) => RxElement
  paddingRight: (value: string | number | string[] | number[]) => RxElement
  paddingTop: (value: string | number | string[] | number[]) => RxElement
  pageBreakAfter: (value: string | number | string[] | number[]) => RxElement
  pageBreakBefore: (value: string | number | string[] | number[]) => RxElement
  pageBreakInside: (value: string | number | string[] | number[]) => RxElement
  perspective: (value: string | number | string[] | number[]) => RxElement
  perspectiveOrigin: (value: string | number | string[] | number[]) => RxElement
  pointerEvents: (value: string | number | string[] | number[]) => RxElement
  position: (value: string | number | string[] | number[]) => RxElement
  quotes: (value: string | number | string[] | number[]) => RxElement
  resize: (value: string | number | string[] | number[]) => RxElement
  right: (value: string | number | string[] | number[]) => RxElement
  scrollBehavior: (value: string | number | string[] | number[]) => RxElement
  tabSize: (value: string | number | string[] | number[]) => RxElement
  tableLayout: (value: string | number | string[] | number[]) => RxElement
  textAlign: (value: string | number | string[] | number[]) => RxElement
  textAlignLast: (value: string | number | string[] | number[]) => RxElement
  textCombineUpright: (value: string | number | string[] | number[]) => RxElement
  textDecoration: (value: string | number | string[] | number[]) => RxElement
  textDecorationColor: (value: string | number | string[] | number[]) => RxElement
  textDecorationLine: (value: string | number | string[] | number[]) => RxElement
  textDecorationStyle: (value: string | number | string[] | number[]) => RxElement
  textIndent: (value: string | number | string[] | number[]) => RxElement
  textJustify: (value: string | number | string[] | number[]) => RxElement
  textOrientation: (value: string | number | string[] | number[]) => RxElement
  textOverflow: (value: string | number | string[] | number[]) => RxElement
  textShadow: (value: string | number | string[] | number[]) => RxElement
  textTransform: (value: string | number | string[] | number[]) => RxElement
  textUnderlinePosition: (value: string | number | string[] | number[]) => RxElement
  top: (value: string | number | string[] | number[]) => RxElement
  transform: (value: string | number | string[] | number[]) => RxElement
  transformOrigin: (value: string | number | string[] | number[]) => RxElement
  transformStyle: (value: string | number | string[] | number[]) => RxElement
  transition: (value: string | number | string[] | number[]) => RxElement
  transitionDelay: (value: string | number | string[] | number[]) => RxElement
  transitionDuration: (value: string | number | string[] | number[]) => RxElement
  transitionProperty: (value: string | number | string[] | number[]) => RxElement
  transitionTimingFunction: (value: string | number | string[] | number[]) => RxElement
  unicodeBidi: (value: string | number | string[] | number[]) => RxElement
  userSelect: (value: string | number | string[] | number[]) => RxElement
  verticalAlign: (value: string | number | string[] | number[]) => RxElement
  visibility: (value: string | number | string[] | number[]) => RxElement
  whiteSpace: (value: string | number | string[] | number[]) => RxElement
  width: (value: string | number | string[] | number[]) => RxElement
  wordBreak: (value: string | number | string[] | number[]) => RxElement
  wordWrap: (value: string | number | string[] | number[]) => RxElement
  writingMode: (value: string | number | string[] | number[]) => RxElement

  zIndex: (value: string | number | string[] | number[]) => RxElement
  // custom specials
  cornerRadius: (value: string | number | string[] | number[]) => RxElement

  // attributes
  abbr: (value: string | number | string[] | number[]) => RxElement
  acceptCharset: (value: string | number | string[] | number[]) => RxElement
  accessKey: (value: string | number | string[] | number[]) => RxElement
  action: (value: string | number | string[] | number[]) => RxElement
  alink: (value: string | number | string[] | number[]) => RxElement
  allow: (value: string | number | string[] | number[]) => RxElement
  allowFullscreen: (value: string | number | string[] | number[]) => RxElement
  allowPaymentRequest: (value: string | number | string[] | number[]) => RxElement
  allowUserMedia: (value: string | number | string[] | number[]) => RxElement
  alt: (value: string | number | string[] | number[]) => RxElement
  archive: (value: string | number | string[] | number[]) => RxElement
  as: (value: string | number | string[] | number[]) => RxElement
  async: (value: string | number | string[] | number[]) => RxElement
  attrHeight: (value: string | number | string[] | number[]) => RxElement
  attrWidth: (value: string | number | string[] | number[]) => RxElement
  autoCapitalize: (value: string | number | string[] | number[]) => RxElement
  autoComplete: (value: string | number | string[] | number[]) => RxElement
  autoFocus: (value: string | number | string[] | number[]) => RxElement
  autoPlay: (value: string | number | string[] | number[]) => RxElement
  axis: (value: string | number | string[] | number[]) => RxElement
  cellPadding: (value: string | number | string[] | number[]) => RxElement
  cellSpacing: (value: string | number | string[] | number[]) => RxElement
  char: (value: string | number | string[] | number[]) => RxElement
  charOff: (value: string | number | string[] | number[]) => RxElement
  charset: (value: string | number | string[] | number[]) => RxElement
  checked: (value: string | number | string[] | number[]) => RxElement
  cite: (value: string | number | string[] | number[]) => RxElement
  classId: (value: string | number | string[] | number[]) => RxElement
  className: (value: string | number | string[] | number[]) => RxElement
  clearAttr: (value: string | number | string[] | number[]) => RxElement
  code: (value: string | number | string[] | number[]) => RxElement
  codeBase: (value: string | number | string[] | number[]) => RxElement
  codeType: (value: string | number | string[] | number[]) => RxElement
  cols: (value: string | number | string[] | number[]) => RxElement
  colSpan: (value: string | number | string[] | number[]) => RxElement
  compact: (value: string | number | string[] | number[]) => RxElement
  contentEditable: (value: string | number | string[] | number[]) => RxElement
  controls: (value: string | number | string[] | number[]) => RxElement
  coords: (value: string | number | string[] | number[]) => RxElement
  crossOrigin: (value: string | number | string[] | number[]) => RxElement
  data: (value: string | number | string[] | number[]) => RxElement
  datetime: (value: string | number | string[] | number[]) => RxElement
  declare: (value: string | number | string[] | number[]) => RxElement
  decoding: (value: string | number | string[] | number[]) => RxElement
  dir: (value: string | number | string[] | number[]) => RxElement
  dirname: (value: string | number | string[] | number[]) => RxElement
  disabled: (value: string | number | string[] | number[]) => RxElement
  download: (value: string | number | string[] | number[]) => RxElement
  draggable: (value: string | number | string[] | number[]) => RxElement
  enctype: (value: string | number | string[] | number[]) => RxElement
  enterKeyHint: (value: string | number | string[] | number[]) => RxElement
  form: (value: string | number | string[] | number[]) => RxElement
  formAction: (value: string | number | string[] | number[]) => RxElement
  formEnctype: (value: string | number | string[] | number[]) => RxElement
  formMethod: (value: string | number | string[] | number[]) => RxElement
  formNoValidate: (value: string | number | string[] | number[]) => RxElement
  formTarget: (value: string | number | string[] | number[]) => RxElement
  frame: (value: string | number | string[] | number[]) => RxElement
  frameBorder: (value: string | number | string[] | number[]) => RxElement
  headers: (value: string | number | string[] | number[]) => RxElement
  hidden: (value: string | number | string[] | number[]) => RxElement
  high: (value: string | number | string[] | number[]) => RxElement
  href: (value: string | number | string[] | number[]) => RxElement
  hrefLang: (value: string | number | string[] | number[]) => RxElement
  hSpace: (value: string | number | string[] | number[]) => RxElement
  id: (value: string | number | string[] | number[]) => RxElement
  imageSizes: (value: string | number | string[] | number[]) => RxElement
  imageSrcSet: (value: string | number | string[] | number[]) => RxElement
  inputMode: (value: string | number | string[] | number[]) => RxElement
  integrity: (value: string | number | string[] | number[]) => RxElement
  is: (value: string | number | string[] | number[]) => RxElement
  isMap: (value: string | number | string[] | number[]) => RxElement
  itemId: (value: string | number | string[] | number[]) => RxElement
  itemProp: (value: string | number | string[] | number[]) => RxElement
  itemRef: (value: string | number | string[] | number[]) => RxElement
  itemScope: (value: string | number | string[] | number[]) => RxElement
  itemType: (value: string | number | string[] | number[]) => RxElement
  kind: (value: string | number | string[] | number[]) => RxElement
  label: (value: string | number | string[] | number[]) => RxElement
  lang: (value: string | number | string[] | number[]) => RxElement
  link: (value: string | number | string[] | number[]) => RxElement
  list: (value: string | number | string[] | number[]) => RxElement
  longDesc: (value: string | number | string[] | number[]) => RxElement
  loop: (value: string | number | string[] | number[]) => RxElement
  low: (value: string | number | string[] | number[]) => RxElement
  marginHeight: (value: string | number | string[] | number[]) => RxElement
  marginWidth: (value: string | number | string[] | number[]) => RxElement
  max: (value: string | number | string[] | number[]) => RxElement
  maxLength: (value: string | number | string[] | number[]) => RxElement
  media: (value: string | number | string[] | number[]) => RxElement
  method: (value: string | number | string[] | number[]) => RxElement
  min: (value: string | number | string[] | number[]) => RxElement
  minLength: (value: string | number | string[] | number[]) => RxElement
  multiple: (value: string | number | string[] | number[]) => RxElement
  muted: (value: string | number | string[] | number[]) => RxElement
  attrName: (value: string | number | string[] | number[]) => RxElement
  nonce: (value: string | number | string[] | number[]) => RxElement
  noResize: (value: string | number | string[] | number[]) => RxElement
  noShade: (value: string | number | string[] | number[]) => RxElement
  noValidate: (value: string | number | string[] | number[]) => RxElement
  noWrap: (value: string | number | string[] | number[]) => RxElement
  object: (value: string | number | string[] | number[]) => RxElement
  open: (value: string | number | string[] | number[]) => RxElement
  optimum: (value: string | number | string[] | number[]) => RxElement
  pattern: (value: string | number | string[] | number[]) => RxElement
  ping: (value: string | number | string[] | number[]) => RxElement
  placeholder: (value: string | number | string[] | number[]) => RxElement
  playsInline: (value: string | number | string[] | number[]) => RxElement
  poster: (value: string | number | string[] | number[]) => RxElement
  preload: (value: string | number | string[] | number[]) => RxElement
  profile: (value: string | number | string[] | number[]) => RxElement
  prompt: (value: string | number | string[] | number[]) => RxElement
  readOnly: (value: string | number | string[] | number[]) => RxElement
  referrerPolicy: (value: string | number | string[] | number[]) => RxElement
  rel: (value: string | number | string[] | number[]) => RxElement
  required: (value: string | number | string[] | number[]) => RxElement
  rev: (value: string | number | string[] | number[]) => RxElement
  reversed: (value: string | number | string[] | number[]) => RxElement
  rows: (value: string | number | string[] | number[]) => RxElement
  rowSpan: (value: string | number | string[] | number[]) => RxElement
  rules: (value: string | number | string[] | number[]) => RxElement
  sandBox: (value: string | number | string[] | number[]) => RxElement
  scope: (value: string | number | string[] | number[]) => RxElement
  scrolling: (value: string | number | string[] | number[]) => RxElement
  selected: (value: string | number | string[] | number[]) => RxElement
  shape: (value: string | number | string[] | number[]) => RxElement
  sizes: (value: string | number | string[] | number[]) => RxElement
  slot: (value: string | number | string[] | number[]) => RxElement
  span: (value: string | number | string[] | number[]) => RxElement
  spellCheck: (value: string | number | string[] | number[]) => RxElement
  src: (value: string | number | string[] | number[]) => RxElement
  srcDoc: (value: string | number | string[] | number[]) => RxElement
  srcSet: (value: string | number | string[] | number[]) => RxElement
  standBy: (value: string | number | string[] | number[]) => RxElement
  start: (value: string | number | string[] | number[]) => RxElement
  step: (value: string | number | string[] | number[]) => RxElement
  summary: (value: string | number | string[] | number[]) => RxElement
  tabIndex: (value: string | number | string[] | number[]) => RxElement
  target: (value: string | number | string[] | number[]) => RxElement
  title: (value: string | number | string[] | number[]) => RxElement
  translate: (value: string | number | string[] | number[]) => RxElement
  type: (value: string | number | string[] | number[]) => RxElement
  typeMustMatch: (value: string | number | string[] | number[]) => RxElement
  useMap: (value: string | number | string[] | number[]) => RxElement
  vAlign: (value: string | number | string[] | number[]) => RxElement
  value: (value: string | number | string[] | number[]) => RxElement
  valueType: (value: string | number | string[] | number[]) => RxElement
  vLink: (value: string | number | string[] | number[]) => RxElement
  vSpace: (value: string | number | string[] | number[]) => RxElement
  wrap: (value: string | number | string[] | number[]) => RxElement
  attrDefault: (value: string | number | string[] | number[]) => RxElement
  attrFor: (value: string | number | string[] | number[]) => RxElement
} & $RxElement;

export type ElementEvent = {
  abort?: () => void
  animationcancel?: () => void
  animationend?: () => void
  animationiteration?: () => void
  animationstart?: () => void
  auxclick?: () => void
  blur?: () => void
  cancel?: () => void
  canplay?: () => void
  canplaythrough?: () => void
  change?: () => void
  click?: () => void
  close?: () => void
  contextmenu?: () => void
  cuechange?: () => void
  dblclick?: () => void
  drag?: () => void
  dragend?: () => void
  dragenter?: () => void
  dragexit?: () => void
  dragleave?: () => void
  dragover?: () => void
  dragstart?: () => void
  drop?: () => void
  durationchange?: () => void
  emptied?: () => void
  ended?: () => void
  error?: () => void
  focus?: () => void
  focusin?: () => void
  focusout?: () => void
  gotpointercapture?: () => void
  input?: () => void
  invalid?: () => void
  keydown?: () => void
  keypress?: () => void
  keyup?: () => void
  load?: () => void
  loadeddata?: () => void
  loadedmetadata?: () => void
  loadstart?: () => void
  lostpointercapture?: () => void
  mousedown?: () => void
  mouseenter?: () => void
  mouseleave?: () => void
  mousemove?: () => void
  mouseout?: () => void
  mouseover?: () => void
  mouseup?: () => void
  pause?: () => void
  play?: () => void
  playing?: () => void
  pointercancel?: () => void
  pointerdown?: () => void
  pointerenter?: () => void
  pointerleave?: () => void
  pointermove?: () => void
  pointerout?: () => void
  pointerover?: () => void
  pointerup?: () => void
  progress?: () => void
  ratechange?: () => void
  reset?: () => void
  resize?: () => void
  scroll?: () => void
  securitypolicyviolation?: () => void
  seeked?: () => void
  seeking?: () => void
  select?: () => void
  selectionchange?: () => void
  selectstart?: () => void
  stalled?: () => void
  submit?: () => void
  suspend?: () => void
  timeupdate?: () => void
  toggle?: () => void
  touchcancel?: () => void
  touchend?: () => void
  touchmove?: () => void
  touchstart?: () => void
  transitioncancel?: () => void
  transitionend?: () => void
  transitionrun?: () => void
  transitionstart?: () => void
  volumechange?: () => void
  waiting?: () => void
  wheel?: () => void
}

