import {$RxElement, Component, PageComponent, Container, Style} from './components';
import NSRouter from './router';

declare global {
  var Theme: {
    globals?: {[key: string]: StyleProperties},
    colors?: {[key: string]: string},
    fonts?: {[key: string]: any},
    dimens?: {[key: string]: any},
    styles?: {[key: string]: Style}
  } & {[key: string]: any};
  var Config: {
    routes: ConfigType.Route[],
    theme?: typeof Theme
  } & {[key: string]: any};
  var Router: NSRouter;
  interface String {
    watch: (_ : (v: any) => void) => void
  }
}

export namespace ConfigType {

  export interface Route {
    path: string;
    component: typeof PageComponent;
    name: string;
    subs?: Route[];
    data?: any,
    hosting?: (Route & { hostComponent?: Container })[],
  }
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

export type GlobalValues = 'inherit' | 'initial' | 'unset';
export type FlexAlignmentItem = 'auto' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'normal' |
  'baseline' | 'first baseline' | 'last baseline' | GlobalValues;
export type FlexAlignment = FlexAlignmentItem | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
export type Color = 'currentcolor' | 'transparent' | 'rgb()' | 'rgba()' | 'hsl()' | 'hsla()' | '#' |  string | string[] | GlobalValues;
export type BorderStyle = 'none' | 'hidden' | 'dotted' | 'dashed' | 'solid' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | GlobalValues;
export type BorderWidth = 'thin' | 'thick' | 'medium' | number | string | GlobalValues;
export type CSSImage = 'none' | 'url()' | 'linear-gradient()' | string | string[] | GlobalValues;
export type Space = 'auto' | number | number[] | string | string[] | GlobalValues;
export type Break = 'auto' | 'avoid' | 'always' | 'all' | 'avoid-pages' | 'page' | 'left' | 'right' | 'recto' | 'verso' | 'avoid-column' | 'column' | 'avoid-region' | GlobalValues;
export type Number = 'calc()' | number | string | GlobalValues;

export type StyleProperties = {
  alignContent?: FlexAlignment;
  alignItems?: FlexAlignmentItem;
  alignSelf?: FlexAlignmentItem;
  animationDelay?: string | string[];
  animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string | string[] | GlobalValues;
  animationDuration?: string | string[] | GlobalValues;
  animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both' | string | string[] | GlobalValues;
  animationIterationCount?: 'infinite' | string | string[] | GlobalValues;
  animationName?: 'none' | '-specific' | 'sliding-vertically' | 'sliding' | string | string[] | GlobalValues;
  animationPlayState?: 'running' | 'paused' | string | string[] | GlobalValues;
  animationTimingFunction?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' |  string | string[] | GlobalValues;
  backfaceVisibility?: 'visible' | 'hidden' | string | string[] | GlobalValues;
  background?: string | string[] | GlobalValues;
  backgroundAttachment?: 'scroll' | 'fixed' | 'local' | string | string[] | GlobalValues;
  backgroundClip?: 'border-box' | 'padding-box' | 'content-box' | 'text' | string | string[] | GlobalValues;
  backgroundColor?: Color;
  backgroundImage?: CSSImage;
  backgroundOrigin?: 'border-box' | 'padding-box' | 'content-box' | string | string[] | GlobalValues;
  backgroundPosition?: 'top' | 'bottom' | 'left' | 'right' | 'center' | string | number | string[] | number[] | GlobalValues;
  backgroundPositionX?: 'left' | 'center' | 'right' | string | number | string[] | GlobalValues;
  backgroundPositionY?: 'top' | 'center' | 'bottom' | string | number | string[] | GlobalValues;
  backgroundRepeat?: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | string | string[] | GlobalValues;
  backgroundSize?: 'cover' | 'contain' | string | number | string[] | number[] | GlobalValues;
  border?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues;
  borderBottom?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues;
  borderBottomColor?: Color;
  borderBottomLeftRadius?: string | number | string[] | number[] | GlobalValues;
  borderBottomRightRadius?: string | number | string[] | number[] | GlobalValues;
  borderBottomStyle?: BorderStyle;
  borderBottomWidth?: BorderWidth;
  borderCollapse?: 'collapse' | 'separate' | string | GlobalValues;
  borderColor?: Color;
  borderImage?: 'url()' | 'linear-gradient()' | string | string[] | GlobalValues;
  borderImageOutset?: number | number[] | GlobalValues;
  borderImageRepeat?: 'stretch' | 'repeat' | 'round' | 'space' | string | string[] | GlobalValues;
  borderImageSlice?: 'fill' | string | number | string[] | number[] | GlobalValues;
  borderImageSource?: CSSImage;
  borderImageWidth?: 'auto' | string | number | string[] | number[] | GlobalValues;
  borderLeft?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues;
  borderLeftColor?: Color;
  borderLeftStyle?: BorderStyle;
  borderLeftWidth?: BorderWidth;
  borderRadius?: string | number | string[] | (number|string)[] | GlobalValues;
  borderRight?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues;
  borderRightColor?: Color;
  borderRightStyle?: BorderStyle;
  borderRightWidth?: BorderWidth;
  borderSpacing?: number | number[] | GlobalValues;
  borderStyle?: BorderStyle;
  borderTop?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues;
  borderTopColor?: Color;
  borderTopLeftRadius?: string | number | string[] | number[] | GlobalValues
  borderTopRightRadius?: string | number | string[] | number[] | GlobalValues;
  borderTopStyle?: BorderStyle;
  borderTopWidth?: BorderWidth;
  borderWidth?: BorderWidth;
  bottom?: Space;
  boxDecorationBreak?: 'slice' | 'clone' | string | GlobalValues;
  boxShadow?: 'none' | string | string[] | GlobalValues;
  boxSizing?: 'border-box' | 'content-box' | GlobalValues;
  breakAfter?: Break;
  breakBefore?: Break;
  breakInside?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region' | GlobalValues;
  captionSide?: 'top' | 'bottom' | 'left' | 'right' | 'top-outside' | 'bottom-outside' | GlobalValues;
  caretColor?: 'auto' | Color;
  clear?: 'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end' | GlobalValues;
  clip?: 'rect()' | 'auto' | string | GlobalValues;
  color?: Color;
  columnCount?: 'auto' | string | number | GlobalValues;
  columnFill?: 'auto' | 'balance' | 'balance-all' | GlobalValues;
  columnGap?: 'normal' | string | number | GlobalValues;
  columnRule?: BorderStyle | BorderWidth | string | number | number[];
  columnRuleColor?: Color;
  columnRuleStyle?: BorderStyle;
  columnRuleWidth?: BorderWidth;
  columnSpan?: 'none' | 'all' | GlobalValues;
  columnWidth?: 'auto' | string | number | GlobalValues;
  columns?: 'auto' | string | number | string[] | GlobalValues;
  content?:  'none' | 'normal' | 'attr()' | 'open-quote | close-quote' | 'no-open-quote | no-close-quote' | string | string[] | GlobalValues;
  counterIncrement?: 'none' | string | number | string[] | GlobalValues;
  counterReset?: 'none' | string | number | string[] | GlobalValues;
  counterSet?: 'none' | string | number | string[] | GlobalValues;
  cursor?: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' |
    'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' |
    's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' |
    'zoom-in' | 'zoom-out' | 'url()' | string | GlobalValues;
  direction?: 'ltr' | 'rtl' | GlobalValues;
  display?: 'block' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' | 'list-item' | 'table-row-group' | 'table-header-group' |
    'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' |
    'ruby-text-container' | 'contents' | 'none' | 'inline-block' | 'inline-list-item' | 'inline-table' | 'inline-flex' | 'inline-grid' | string | string[] | GlobalValues;
  emptyCells?: 'show' | 'hide' | GlobalValues;
  filter?: 'url()' | 'blur()' | 'brightness()' | 'contrast()' | 'drop-shadow()' | 'grayscale()' | 'hue-rotate()' | 'invert()' | 'opacity()' | 'saturate()' |
    'sepia()' | 'none' | string | GlobalValues;
  flex?: 'auto' | 'inital' | 'none' | string | number | number[] | GlobalValues;
  flexBasis?: 'fill' | 'max-content' | 'min-content' | 'fit-content' | 'content' | string | number | GlobalValues;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | GlobalValues;
  flexFlow?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'nowrap' | 'wrap' | 'wrap-reverse' | string | string[] | GlobalValues;
  flexGrow?: string | GlobalValues;
  flexShrink?: string | GlobalValues;
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalValues;
  float?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end' | GlobalValues;
  font?: 'caption' | 'icon' | 'menu' | 'message-box' | 'small-caption' | 'status-bar' | StyleProperties['fontFamily'] | StyleProperties['fontSize'] | StyleProperties['fontStretch'] |
    StyleProperties['fontStyle'] | StyleProperties['fontVariant'] | StyleProperties['fontWeight'] | StyleProperties['lineHeight']| string | string[] | GlobalValues;
  fontFamily?: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | string | string[] | GlobalValues;
  fontFeatureSettings?: 'normal' | 'smcp' | 'swsh' | string | GlobalValues;
  fontKerning?: 'auto' | 'normal' | 'none';
  fontLanguageOverride?: 'normal' | string | GlobalValues;
  fontSize?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | string | number | GlobalValues;
  fontSizeAdjust?: 'none' | string | GlobalValues;
  fontSmooth?: 'auto' | 'never' | 'always' | number | string | StyleProperties['fontSize'];
  fontStretch?: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | string | GlobalValues;
  fontStyle?: 'normal' | 'italic' | 'oblique' | string | string[];
  fontSynthesis?: 'none' | StyleProperties['fontWeight'] | StyleProperties['fontStyle'] | string;
  fontVariant?: 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' | 'no-historical-ligatures' | 'contextual' | 'no-contextual' |
    'stylistic()' | 'historical-forms' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' |
    'titling-caps' | 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' |
    'full-width' | 'proportional-width' | 'ruby' | string;
  fontVariantAlternates?: 'normal' | 'historical-forms' | 'stylistic()' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | string | GlobalValues;
  fontVariantCaps?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | GlobalValues;
  fontVariantEastAsian?: 'normal' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' | 'full-width' | 'proportional-width' | 'ruby' | string | GlobalValues;
  fontVariantLigatures?: 'normal' | 'none' | 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' |
    'no-historical-ligatures' | 'contextual' | 'no-contextual' | GlobalValues;
  fontVariantNumeric?: 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | string | GlobalValues;
  fontVariantPosition?: 'normal' | 'sub' | 'super' | GlobalValues;
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | GlobalValues;
  gap?: number | number[] | string | string[] | GlobalValues;
  grid?: StyleProperties['gridTemplate'] | StyleProperties['gridTemplateRows'] | StyleProperties['gridAutoFlow'] | StyleProperties['gridAutoColumns'] | StyleProperties['gridTemplateAreas'] |
    StyleProperties['gridColumnGap'] | string | GlobalValues;
  gridArea?: 'auto' | 'span' | string | GlobalValues;
  gridAutoColumns?: 'auto' | 'max-content' | 'min-content' | 'minmax()' | 'fit-content()' | string | number | GlobalValues;
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column desne' | GlobalValues;
  gridColumn?: StyleProperties['gridArea'];
  gridColumnEnd?: StyleProperties['gridArea'];
  gridColumnGap?: StyleProperties['columnGap'];
  gridColumnStart?: StyleProperties['gridArea'];
  gridGap?: Number | number[];
  gridRow?: Number | number[];
  gridRowEnd?: StyleProperties['gridArea'];
  gridRowStart?: StyleProperties['gridArea'];
  gridTemplate?: 'none' | string | GlobalValues;
  gridTemplateAreas?: StyleProperties['gridTemplate'];
  gridTemplateColumns?: 'subgrid' | 'masonry' | 'minmax()' | 'fit-content()' | 'repeat()' | string | StyleProperties['gridTemplate'];
  gridTemplateRows?: StyleProperties['gridTemplateColumns'];
  hangingPunctuation?: 'none' | 'first' | 'last' | 'force-end' | 'allow-end' | string | string[] | GlobalValues;
  height?: Number;
  hyphens?: 'none' | 'manual' | 'auto' | GlobalValues;
  isolation?: 'auto' | 'isolate' | GlobalValues
  inset?: 'auto' | string | number | string[] | number[] | GlobalValues;
  insetBottom?: StyleProperties['inset'];
  insetLeft?: StyleProperties['inset'];
  insetRight?: StyleProperties['inset'];
  insetTop?: StyleProperties['inset'];
  justifyContent?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | FlexAlignment | 'safe center' | 'unsafe center' | GlobalValues;
  justifySelf?: FlexAlignmentItem | FlexAlignment
  justifyItems?: FlexAlignment | FlexAlignmentItem | 'legacy right' | 'legacy left' | 'legacy center' | GlobalValues;
  left?: Number;
  letterSpacing?: Number;
  lineBreak?: 'auto' | 'loose' | 'normal' | 'strict' | 'anywhere' | GlobalValues;
  lineHeight?: Number;
  listStyle?: StyleProperties['listStyleType'] | StyleProperties['listStyleImage'] | StyleProperties['listStylePosition'];
  listStyleImage?: 'none' | 'url()' | GlobalValues;
  listStylePosition?: 'inside' | 'outside' | GlobalValues;
  listStyleType?: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'georgian' | 'trad-chinese-informal' | 'kannada' | '-' | '@<<custom>>' | GlobalValues;
  margin?: 'auto' | Number | string | number | (string | number)[];
  marginBottom?: 'auto' | Number | string | number;
  marginLeft?: StyleProperties['marginBottom']
  marginRight?: StyleProperties['marginBottom'];
  marginTop?: StyleProperties['marginBottom'];
  maxHeight?: 'none' | 'max-content' | 'min-content' | 'fit-content()' | Number;
  maxWidth?: StyleProperties['maxHeight'];
  minHeight?: StyleProperties['maxHeight'];
  minWidth?: StyleProperties['maxHeight'];
  mixBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' |
    'exclusion' | 'hue' | 'saturation' | 'color' | 'liminosity' | GlobalValues;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  objectPosition?: 'top' | 'left' | 'right' | 'bottom' | string | number | string[] | number[] | GlobalValues;
  opacity?: string | GlobalValues;
  order?: string | GlobalValues;
  orphans?: string | GlobalValues;
  outline?: StyleProperties['outlineColor'] | StyleProperties['outlineStyle'] | StyleProperties['outlineWidth'];
  outlineColor?: Color | 'invert';
  outlineOffset?: string | number | GlobalValues;
  outlineStyle?: BorderStyle;
  outlineWidth?: BorderWidth;
  overflow?: StyleProperties['overflowX'] | StyleProperties['overflowY'];
  overflowBlock?: 'visible' | 'hidden' | 'scroll' | 'auto' | GlobalValues;
  overflowHidden?: StyleProperties['overflowBlock'];
  overflowWrap?: 'normal' | 'break-word' | 'anywhere' | GlobalValues;
  overflowX?: 'clip' | StyleProperties['overflowBlock'];
  overflowY?: 'clip' | StyleProperties['overflowBlock'];
  padding?: Number | string | number | (number|string)[] | GlobalValues;
  paddingBottom?: Number;
  paddingLeft?: Number;
  paddingRight?: Number;
  paddingTop?: Number;
  pageBreakAfter?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso' | GlobalValues;
  pageBreakBefore?: StyleProperties['pageBreakAfter'];
  pageBreakInside?: 'auto' | 'avoid' | GlobalValues;
  perspective?: 'none' | Number;
  perspectiveOrigin?: 'center' | 'top' | 'bottom' | 'right' | string | GlobalValues;
  pointerEvents?: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | GlobalValues;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  quotes?: 'none' | 'initial' | 'auto' | string | GlobalValues;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | GlobalValues;
  right?: Number;
  scrollBehavior?: 'auto' | 'smooth' | GlobalValues;
  tabSize?: Number;
  tableLayout?: 'auto' | 'fixed' | GlobalValues;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'start' | 'end' | 'match-parent' | string | GlobalValues;
  textAlignLast?: 'auto' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | string | GlobalValues;
  textCombineUpright?: 'none' | 'all' | 'digits' | GlobalValues;
  textDecoration?: StyleProperties['textDecorationLine'] | StyleProperties['textDecorationColor'] | StyleProperties['textDecorationStyle'] |
    StyleProperties['textDecorationThickness'];
  textDecorationColor?: Color;
  textDecorationLine?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink' | string | GlobalValues;
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | GlobalValues ;
  textDecorationThickness?: 'auto' | 'from-font' | number | string | GlobalValues;
  textIndent?: 'each-line' | 'hanging' | number | string | GlobalValues;
  textJustify?: 'none' | 'auto' | 'inter-word' | 'inter-character' | 'distribute';
  textOrientation?: 'mixed' | 'upright' | 'sideways-right' | 'sideways' | 'use-glyph-orientation' | GlobalValues;
  textOverflow?: 'clip' | 'ellipsis' | '-' | GlobalValues;
  textShadow?: StyleProperties['boxShadow'];
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana' | GlobalValues;
  textUnderlinePosition?: 'auto' | 'under' | 'left' | 'right' | string | GlobalValues;
  top?: Number;
  transform?: 'none' | 'matrix()' | 'matrix3d()' | 'perspective()' | 'rotate()' | 'rotate3d()' | 'rotateX()' | 'rotateY()' | 'rotateZ()' | 'translate()' |
    'translate3d()' | 'translateX()' | 'translateY()' | 'translateZ()' | 'scale()' | 'scale3d()' | 'scaleX()' | 'scaleY()' | 'scaleZ()' | 'skew()' |
    'skewX()' | 'skewY()' | string | GlobalValues;
  transformOrigin?: 'center' | 'top' | 'right' | 'left' | 'bottom' | string | number | string[] | number[];
  transformStyle?: 'flat' | 'preserve-3d' | GlobalValues;
  transition?: StyleProperties['transitionDelay'] | StyleProperties['transitionDuration'] | StyleProperties['transitionProperty'] | StyleProperties['transitionTimingFunction'];
  transitionDelay?: string | string[] | GlobalValues;
  transitionDuration?: number | string | GlobalValues;
  transitionProperty?: StyleProperties['animationName'];
  transitionTimingFunction?: StyleProperties['animationTimingFunction'];
  unicodeBidi?: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext' | GlobalValues;
  userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all' | 'element' | GlobalValues;
  verticalAlign?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | number | string | GlobalValues;
  visibility?: 'visible' | 'hidden' | 'collapse' | GlobalValues;
  whiteSpace?: 'normal' | 'nowrap' | 'wrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces' | GlobalValues;
  width?: Number;
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word' | GlobalValues;
  wordSpacing?: 'normal' | number | string | GlobalValues;
  wordWrap?: 'normal' | 'break-word' | 'anywhere' | GlobalValues;
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | GlobalValues;

  zIndex?: string | GlobalValues;
  // custom specials
  cornerRadius?: StyleProperties['borderRadius'];
} | {[key: string]: string}

export type RxElement = {

  $nid?: string;
  state?: any;

  onCreate?: Function;
  onUpdate?: Function;
  onDestroy?: Function;

  //input model
  model?: (object: any) => RxElement

  alignContent: (value: FlexAlignment) => RxElement
  alignItems: (value: FlexAlignmentItem) => RxElement
  alignSelf: (value: FlexAlignmentItem) => RxElement
  animationDelay: (value: string | string[]) => RxElement
  animationDirection: (value: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string | string[] | GlobalValues) => RxElement
  animationDuration: (value: string | string[] | GlobalValues) => RxElement
  animationFillMode: (value: 'none' | 'forwards' | 'backwards' | 'both' | string | string[] | GlobalValues) => RxElement
  animationIterationCount: (value: 'infinite' | string | string[] | GlobalValues) => RxElement
  animationName: (value: 'none' | '-specific' | 'sliding-vertically' | 'sliding' | string | string[] | GlobalValues) => RxElement
  animationPlayState: (value: 'running' | 'paused' | string | string[] | GlobalValues) => RxElement
  animationTimingFunction: (value: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' |  string | string[] | GlobalValues) => RxElement
  backfaceVisibility: (value: 'visible' | 'hidden' | string | string[] | GlobalValues) => RxElement
  background: (value: string | string[] | GlobalValues) => RxElement
  backgroundAttachment: (value: 'scroll' | 'fixed' | 'local' | string | string[] | GlobalValues) => RxElement
  backgroundClip: (value: 'border-box' | 'padding-box' | 'content-box' | 'text' | string | string[] | GlobalValues) => RxElement
  backgroundColor: (value: Color) => RxElement
  backgroundImage: (value: CSSImage) => RxElement
  backgroundOrigin: (value: 'border-box' | 'padding-box' | 'content-box' | string | string[] | GlobalValues) => RxElement
  backgroundPosition: (value: 'top' | 'bottom' | 'left' | 'right' | 'center' | string | number | string[] | number[] | GlobalValues) => RxElement
  backgroundPositionX: (value: 'left' | 'center' | 'right' | string | number | string[] | GlobalValues) => RxElement
  backgroundPositionY: (value: 'top' | 'center' | 'bottom' | string | number | string[] | GlobalValues) => RxElement
  backgroundRepeat: (value: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | string | string[] | GlobalValues) => RxElement
  backgroundSize: (value: 'cover' | 'contain' | string | number | string[] | number[] | GlobalValues) => RxElement
  border: (value: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => RxElement
  borderBottom: (value: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => RxElement
  borderBottomColor: (value: Color) => RxElement
  borderBottomLeftRadius: (value: string | number | string[] | number[] | GlobalValues) => RxElement
  borderBottomRightRadius: (value: string | number | string[] | number[] | GlobalValues) => RxElement
  borderBottomStyle: (value: BorderStyle) => RxElement
  borderBottomWidth: (value: BorderWidth) => RxElement
  borderCollapse: (value: 'collapse' | 'separate' | string | GlobalValues) => RxElement
  borderColor: (value: Color) => RxElement
  borderImage: (value: 'url()' | 'linear-gradient()' | string | string[] | GlobalValues) => RxElement
  borderImageOutset: (value: number | number[] | GlobalValues) => RxElement
  borderImageRepeat: (value: 'stretch' | 'repeat' | 'round' | 'space' | string | string[] | GlobalValues) => RxElement
  borderImageSlice: (value: 'fill' | string | number | string[] | number[] | GlobalValues) => RxElement
  borderImageSource: (value: CSSImage) => RxElement
  borderImageWidth: (value: 'auto' | string | number | string[] | number[] | GlobalValues) => RxElement
  borderLeft: (value: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => RxElement
  borderLeftColor: (value: Color) => RxElement
  borderLeftStyle: (value: BorderStyle) => RxElement
  borderLeftWidth: (value: BorderWidth) => RxElement
  borderRadius: (value: string | number | string[] | number[] | GlobalValues) => RxElement
  borderRight: (value: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => RxElement
  borderRightColor: (value: Color) => RxElement
  borderRightStyle: (value: BorderStyle) => RxElement
  borderRightWidth: (value: BorderWidth) => RxElement
  borderSpacing: (value: number | number[] | GlobalValues) => RxElement
  borderStyle: (value: BorderStyle) => RxElement
  borderTop: (value: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => RxElement
  borderTopColor: (value: Color) => RxElement
  borderTopLeftRadius: (value: string | number | string[] | number[] | GlobalValues) => RxElement
  borderTopRightRadius: (value: string | number | string[] | number[] | GlobalValues) => RxElement
  borderTopStyle: (value: BorderStyle) => RxElement
  borderTopWidth: (value: BorderWidth) => RxElement
  borderWidth: (value: BorderWidth) => RxElement
  bottom: (value: Space) => RxElement
  boxDecorationBreak: (value: 'slice' | 'clone' | string | GlobalValues) => RxElement
  boxShadow: (value: 'none' | string | string[] | GlobalValues) => RxElement
  boxSizing: (value: 'border-box' | 'content-box' | GlobalValues) => RxElement
  breakAfter: (value: Break) => RxElement
  breakBefore: (value: Break) => RxElement
  breakInside: (value: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region' | GlobalValues) => RxElement
  captionSide: (value: 'top' | 'bottom' | 'left' | 'right' | 'top-outside' | 'bottom-outside' | GlobalValues) => RxElement
  caretColor: (value: 'auto' | Color) => RxElement
  clear: (value: 'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end' | GlobalValues) => RxElement
  clip: (value: 'rect()' | 'auto' | string | GlobalValues) => RxElement
  color: (value: Color) => RxElement
  columnCount: (value: 'auto' | string | number | GlobalValues) => RxElement
  columnFill: (value: 'auto' | 'balance' | 'balance-all' | GlobalValues) => RxElement
  columnGap: (value: 'normal' | string | number | GlobalValues) => RxElement
  columnRule: (value: BorderStyle | BorderWidth | string | number | number[]) => RxElement
  columnRuleColor: (value: Color) => RxElement
  columnRuleStyle: (value: BorderStyle) => RxElement
  columnRuleWidth: (value: BorderWidth) => RxElement
  columnSpan: (value: 'none' | 'all' | GlobalValues) => RxElement
  columnWidth: (value: 'auto' | string | number | GlobalValues) => RxElement
  columns: (value: 'auto' | string | number | string[] | GlobalValues) => RxElement
  content: (value:  'none' | 'normal' | 'attr()' | 'open-quote | close-quote' | 'no-open-quote | no-close-quote' | string | string[] | GlobalValues) => RxElement
  counterIncrement: (value: 'none' | string | number | string[] | GlobalValues) => RxElement
  counterReset: (value: 'none' | string | number | string[] | GlobalValues) => RxElement
  counterSet: (value: 'none' | string | number | string[] | GlobalValues) => RxElement
  cursor: (value: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' |
    'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' |
    's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' |
    'zoom-in' | 'zoom-out' | 'url()' | string | GlobalValues) => RxElement
  direction: (value: 'ltr' | 'rtl' | GlobalValues) => RxElement
  display: (value: 'block' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' | 'list-item' | 'table-row-group' | 'table-header-group' |
    'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' |
    'ruby-text-container' | 'contents' | 'none' | 'inline-block' | 'inline-list-item' | 'inline-table' | 'inline-flex' | 'inline-grid' | string | string[] | GlobalValues) => RxElement
  emptyCells: (value: 'show' | 'hide' | GlobalValues) => RxElement
  filter: (value: 'url()' | 'blur()' | 'brightness()' | 'contrast()' | 'drop-shadow()' | 'grayscale()' | 'hue-rotate()' | 'invert()' | 'opacity()' | 'saturate()' |
    'sepia()' | 'none' | string | GlobalValues) => RxElement
  flex: (value: 'auto' | 'inital' | 'none' | string | number | number[] | GlobalValues) => RxElement
  flexBasis: (value: 'fill' | 'max-content' | 'min-content' | 'fit-content' | 'content' | string | number | GlobalValues) => RxElement
  flexDirection: (value: 'row' | 'row-reverse' | 'column' | 'column-reverse' | GlobalValues) => RxElement
  flexFlow: (value: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'nowrap' | 'wrap' | 'wrap-reverse' | string | string[] | GlobalValues) => RxElement
  flexGrow: (value: string | GlobalValues) => RxElement
  flexShrink: (value: string | GlobalValues) => RxElement
  flexWrap: (value: 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalValues) => RxElement
  float: (value: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end' | GlobalValues) => RxElement
  font: (value: 'caption' | 'icon' | 'menu' | 'message-box' | 'small-caption' | 'status-bar' | StyleProperties['fontFamily'] | StyleProperties['fontSize'] | StyleProperties['fontStretch'] |
    StyleProperties['fontStyle'] | StyleProperties['fontVariant'] | StyleProperties['fontWeight'] | StyleProperties['lineHeight']| string | string[] | GlobalValues) => RxElement
  fontFamily: (value: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | string | string[] | GlobalValues) => RxElement
  fontFeatureSettings: (value: 'normal' | 'smcp' | 'swsh' | string | GlobalValues) => RxElement
  fontKerning: (value: 'auto' | 'normal' | 'none') => RxElement
  fontLanguageOverride: (value: 'normal' | string | GlobalValues) => RxElement
  fontSize: (value: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | string | number | GlobalValues) => RxElement
  fontSizeAdjust: (value: 'none' | string | GlobalValues) => RxElement
  fontSmooth: (value: 'auto' | 'never' | 'always' | number | string | StyleProperties['fontSize']) => RxElement
  fontStretch: (value: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | string | GlobalValues) => RxElement
  fontStyle: (value: 'normal' | 'italic' | 'oblique' | string | string[]) => RxElement
  fontSynthesis: (value: 'none' | StyleProperties['fontWeight'] | StyleProperties['fontStyle'] | string) => RxElement
  fontVariant: (value: 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' | 'no-historical-ligatures' | 'contextual' | 'no-contextual' |
    'stylistic()' | 'historical-forms' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' |
    'titling-caps' | 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' |
    'full-width' | 'proportional-width' | 'ruby' | string) => RxElement
  fontVariantAlternates: (value: 'normal' | 'historical-forms' | 'stylistic()' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | string | GlobalValues) => RxElement
  fontVariantCaps: (value: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | GlobalValues) => RxElement
  fontVariantEastAsian: (value: 'normal' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' | 'full-width' | 'proportional-width' | 'ruby' | string | GlobalValues) => RxElement
  fontVariantLigatures: (value: 'normal' | 'none' | 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' |
    'no-historical-ligatures' | 'contextual' | 'no-contextual' | GlobalValues) => RxElement
  fontVariantNumeric: (value: 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | string | GlobalValues) => RxElement
  fontVariantPosition: (value: 'normal' | 'sub' | 'super' | GlobalValues) => RxElement
  fontWeight: (value: 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | GlobalValues) => RxElement
  gap: (value: number | number[] | string | string[] | GlobalValues) => RxElement
  grid: (value: StyleProperties['gridTemplate'] | StyleProperties['gridTemplateRows'] | StyleProperties['gridAutoFlow'] | StyleProperties['gridAutoColumns'] | StyleProperties['gridTemplateAreas'] |
    StyleProperties['gridColumnGap'] | string | GlobalValues) => RxElement
  gridArea: (value: 'auto' | 'span' | string | GlobalValues) => RxElement
  gridAutoColumns: (value: 'auto' | 'max-content' | 'min-content' | 'minmax()' | 'fit-content()' | string | number | GlobalValues) => RxElement
  gridAutoFlow: (value: 'row' | 'column' | 'dense' | 'row dense' | 'column desne' | GlobalValues) => RxElement
  gridColumn: (value: StyleProperties['gridArea']) => RxElement
  gridColumnEnd: (value: StyleProperties['gridArea']) => RxElement
  gridColumnGap: (value: StyleProperties['columnGap']) => RxElement
  gridColumnStart: (value: StyleProperties['gridArea']) => RxElement
  gridGap: (value: Number | number[]) => RxElement
  gridRow: (value: Number | number[]) => RxElement
  gridRowEnd: (value: StyleProperties['gridArea']) => RxElement
  gridRowStart: (value: StyleProperties['gridArea']) => RxElement
  gridTemplate: (value: 'none' | string | GlobalValues) => RxElement
  gridTemplateAreas: (value: StyleProperties['gridTemplate']) => RxElement
  gridTemplateColumns: (value: 'subgrid' | 'masonry' | 'minmax()' | 'fit-content()' | 'repeat()' | string | StyleProperties['gridTemplate']) => RxElement
  gridTemplateRows: (value: StyleProperties['gridTemplateColumns']) => RxElement
  hangingPunctuation: (value: 'none' | 'first' | 'last' | 'force-end' | 'allow-end' | string | string[] | GlobalValues) => RxElement
  height: (value: Number) => RxElement
  hyphens: (value: 'none' | 'manual' | 'auto' | GlobalValues) => RxElement
  isolation: (value: 'auto' | 'isolate' | GlobalValues) => RxElement
  inset: (value: 'auto' | string | number | string[] | number[] | GlobalValues) => RxElement
  insetBottom: (value: StyleProperties['inset']) => RxElement
  insetLeft: (value: StyleProperties['inset']) => RxElement
  insetRight: (value: StyleProperties['inset']) => RxElement
  insetTop: (value: StyleProperties['inset']) => RxElement
  justifyContent: (value: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | FlexAlignment | 'safe center' | 'unsafe center' | GlobalValues) => RxElement
  justifySelf: (value: FlexAlignmentItem | FlexAlignment) => RxElement
  justifyItems: (value: FlexAlignment | FlexAlignmentItem | 'legacy right' | 'legacy left' | 'legacy center' | GlobalValues) => RxElement
  left: (value: Number) => RxElement
  letterSpacing: (value: Number) => RxElement
  lineBreak: (value: 'auto' | 'loose' | 'normal' | 'strict' | 'anywhere' | GlobalValues) => RxElement
  lineHeight: (value: Number) => RxElement
  listStyle: (value: StyleProperties['listStyleType'] | StyleProperties['listStyleImage'] | StyleProperties['listStylePosition']) => RxElement
  listStyleImage: (value: 'none' | 'url()' | GlobalValues) => RxElement
  listStylePosition: (value: 'inside' | 'outside' | GlobalValues) => RxElement
  listStyleType: (value: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'georgian' | 'trad-chinese-informal' | 'kannada' | '-' | '@<<custom>>' | GlobalValues) => RxElement
  margin: (value: Number | string | number | string[] | number[]) => RxElement
  marginBottom: (value: Number | string | number) => RxElement
  marginLeft: (value: StyleProperties['marginBottom']) => RxElement
  marginRight: (value: StyleProperties['marginBottom']) => RxElement
  marginTop: (value: StyleProperties['marginBottom']) => RxElement
  maxHeight: (value: 'none' | 'max-content' | 'min-content' | 'fit-content()' | Number) => RxElement
  maxWidth: (value: StyleProperties['maxHeight']) => RxElement
  minHeight: (value: StyleProperties['maxHeight']) => RxElement
  minWidth: (value: StyleProperties['maxHeight']) => RxElement
  mixBlendMode: (value: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' |
    'exclusion' | 'hue' | 'saturation' | 'color' | 'liminosity' | GlobalValues) => RxElement
  objectFit: (value: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down') => RxElement
  objectPosition: (value: 'top' | 'left' | 'right' | 'bottom' | string | number | string[] | number[] | GlobalValues) => RxElement
  opacity: (value: string | GlobalValues) => RxElement
  order: (value: string | GlobalValues) => RxElement
  orphans: (value: string | GlobalValues) => RxElement
  outline: (value: StyleProperties['outlineColor'] | StyleProperties['outlineStyle'] | StyleProperties['outlineWidth']) => RxElement
  outlineColor: (value: Color | 'invert') => RxElement
  outlineOffset: (value: string | number | GlobalValues) => RxElement
  outlineStyle: (value: BorderStyle) => RxElement
  outlineWidth: (value: BorderWidth) => RxElement
  overflow: (value: StyleProperties['overflowX'] | StyleProperties['overflowY']) => RxElement
  overflowBlock: (value: 'visible' | 'hidden' | 'scroll' | 'auto' | GlobalValues) => RxElement
  overflowHidden: (value: StyleProperties['overflowBlock']) => RxElement
  overflowWrap: (value: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => RxElement
  overflowX: (value: 'clip' | StyleProperties['overflowBlock']) => RxElement
  overflowY: (value: 'clip' | StyleProperties['overflowBlock']) => RxElement
  padding: (value: Number | string | number | (string | number)[] | GlobalValues) => RxElement
  paddingBottom: (value: Number) => RxElement
  paddingLeft: (value: Number) => RxElement
  paddingRight: (value: Number) => RxElement
  paddingTop: (value: Number) => RxElement
  pageBreakAfter: (value: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso' | GlobalValues) => RxElement
  pageBreakBefore: (value: StyleProperties['pageBreakAfter']) => RxElement
  pageBreakInside: (value: 'auto' | 'avoid' | GlobalValues) => RxElement
  perspective: (value: 'none' | Number) => RxElement
  perspectiveOrigin: (value: 'center' | 'top' | 'bottom' | 'right' | string | GlobalValues) => RxElement
  pointerEvents: (value: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | GlobalValues) => RxElement
  position: (value: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky') => RxElement | any
  quotes: (value: 'none' | 'initial' | 'auto' | string | GlobalValues) => RxElement
  resize: (value: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | GlobalValues) => RxElement
  right: (value: Number) => RxElement
  scrollBehavior: (value: 'auto' | 'smooth' | GlobalValues) => RxElement
  tabSize: (value: Number) => RxElement
  tableLayout: (value: 'auto' | 'fixed' | GlobalValues) => RxElement
  textAlign: (value: 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'start' | 'end' | 'match-parent' | string | GlobalValues) => RxElement
  textAlignLast: (value: 'auto' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | string | GlobalValues) => RxElement
  textCombineUpright: (value: 'none' | 'all' | 'digits' | GlobalValues) => RxElement
  textDecoration: (value: StyleProperties['textDecorationLine'] | StyleProperties['textDecorationColor'] | StyleProperties['textDecorationStyle'] |
    StyleProperties['textDecorationThickness']) => RxElement
  textDecorationColor: (value: Color) => RxElement
  textDecorationLine: (value: 'none' | 'underline' | 'overline' | 'line-through' | 'blink' | string | GlobalValues) => RxElement
  textDecorationStyle: (value: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | GlobalValues ) => RxElement
  textDecorationThickness: (value: 'auto' | 'from-font' | number | string | GlobalValues) => RxElement
  textFillColor: (value: Color) => RxElement
  textIndent: (value: 'each-line' | 'hanging' | number | string | GlobalValues) => RxElement
  textJustify: (value: 'none' | 'auto' | 'inter-word' | 'inter-character' | 'distribute') => RxElement
  textOrientation: (value: 'mixed' | 'upright' | 'sideways-right' | 'sideways' | 'use-glyph-orientation' | GlobalValues) => RxElement
  textOverflow: (value: 'clip' | 'ellipsis' | '-' | GlobalValues) => RxElement
  textShadow: (value: StyleProperties['boxShadow']) => RxElement
  textTransform: (value: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana' | GlobalValues) => RxElement
  textUnderlinePosition: (value: 'auto' | 'under' | 'left' | 'right' | string | GlobalValues) => RxElement
  top: (value: Number) => RxElement
  transform: (value: 'none' | 'matrix()' | 'matrix3d()' | 'perspective()' | 'rotate()' | 'rotate3d()' | 'rotateX()' | 'rotateY()' | 'rotateZ()' | 'translate()' |
    'translate3d()' | 'translateX()' | 'translateY()' | 'translateZ()' | 'scale()' | 'scale3d()' | 'scaleX()' | 'scaleY()' | 'scaleZ()' | 'skew()' |
    'skewX()' | 'skewY()' | string | GlobalValues) => RxElement
  transformOrigin: (value: 'center' | 'top' | 'right' | 'left' | 'bottom' | string | number | string[] | number[]) => RxElement
  transformStyle: (value: 'flat' | 'preserve-3d' | GlobalValues) => RxElement
  transition: (value: StyleProperties['transitionDelay'] | StyleProperties['transitionDuration'] | StyleProperties['transitionProperty'] | StyleProperties['transitionTimingFunction']) => RxElement
  transitionDelay: (value: string | string[] | GlobalValues) => RxElement
  transitionDuration: (value: number | string | GlobalValues) => RxElement
  transitionProperty: (value: StyleProperties['animationName']) => RxElement
  transitionTimingFunction: (value: StyleProperties['animationTimingFunction']) => RxElement
  unicodeBidi: (value: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext' | GlobalValues) => RxElement
  userSelect: (value: 'none' | 'auto' | 'text' | 'contain' | 'all' | 'element' | GlobalValues) => RxElement
  verticalAlign: (value: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | number | string | GlobalValues) => RxElement
  visibility: (value: 'visible' | 'hidden' | 'collapse' | GlobalValues) => RxElement
  webkitBackgroundClip: (value: 'text' | StyleProperties['boxSizing']) => RxElement
  webkitTextFillColor: (value: Color) => RxElement
  whiteSpace: (value: 'normal' | 'nowrap' | 'wrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces' | GlobalValues) => RxElement
  width: (value: Number) => RxElement
  wordBreak: (value: 'normal' | 'break-all' | 'keep-all' | 'break-word' | GlobalValues) => RxElement
  wordSpacing: (value: 'normal' | number | string | GlobalValues) => RxElement
  wordWrap: (value: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => RxElement
  writingMode: (value: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | GlobalValues) => RxElement

  zIndex: (value: string | GlobalValues) => RxElement
  // custom specials
  cornerRadius: (value: StyleProperties['borderRadius']) => RxElement

  // attributes
  abbr: (value: string | number | string[] | number[]) => RxElement
  accept: (value: string) => RxElement,
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
  capture: (value: 'user' | 'environment') => RxElement,
  cellPadding: (value: string | number | string[] | number[]) => RxElement
  cellSpacing: (value: string | number | string[] | number[]) => RxElement
  char: (value: string | number | string[] | number[]) => RxElement
  charOff: (value: string | number | string[] | number[]) => RxElement
  charset: (value: string | number | string[] | number[]) => RxElement
  checked?: (value: string | number | string[] | number[]) => RxElement | any | any[]
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
  d: (value: string) => RxElement
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
  fill: (value: string) => RxElement
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
  preserveAspectRatio: (value: 'none' | 'xMinYMin' | 'xMidYMin' | 'xMaxYMin' | 'xMinMid' | 'xMidYMid' | 'xMaxYMid' | 'xMinYMax' | 'xMidYMax' | 'xMaxYMax' | 'meet' | 'slice') => RxElement
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
  attrTransform: (value: string) => RxElement
  translate: (value: string | number | string[] | number[]) => RxElement
  type: (value: string | number | string[] | number[]) => RxElement
  typeMustMatch: (value: string | number | string[] | number[]) => RxElement
  useMap: (value: string | number | string[] | number[]) => RxElement
  vAlign: (value: string | number | string[] | number[]) => RxElement
  value?: (value: string | number | string[] | number[]) => RxElement
  valueType: (value: string | number | string[] | number[]) => RxElement
  viewBox: (value: string) => RxElement
  vLink: (value: string | number | string[] | number[]) => RxElement
  vSpace: (value: string | number | string[] | number[]) => RxElement
  wrap: (value: string | number | string[] | number[]) => RxElement
  xmlns: (value: string) => RxElement
  attrDefault: (value: string | number | string[] | number[]) => RxElement
  attrFor: (value: string | number | string[] | number[]) => RxElement
  for: (value: string | number) => RxElement
  default: (value: string | number) => RxElement


  // functional attributes
  globalStyle: (value: {[key: string]: StyleProperties}) => RxElement
  pseudoActive: (value: StyleProperties) => RxElement
  pseudoChecked: (value: StyleProperties) => RxElement
  pseudoDisabled: (value: StyleProperties) => RxElement
  pseudoEmpty: (value: StyleProperties) => RxElement
  pseudoEnabled: (value: StyleProperties) => RxElement
  pseudoFirstOfType: (value: StyleProperties) => RxElement
  pseudoFocus: (value: StyleProperties) => RxElement
  pseudoHover: (value: StyleProperties) => RxElement
  pseudoInRange: (value: StyleProperties) => RxElement
  pseudoInvalid: (value: StyleProperties) => RxElement
  pseudoLang: (value: StyleProperties) => RxElement
  pseudoLastChild: (value: StyleProperties) => RxElement
  pseudoLastOfType: (value: StyleProperties) => RxElement
  pseudoLink: (value: StyleProperties) => RxElement
  pseudoNot: (value: StyleProperties) => RxElement
  pseudoNthChild: (value: StyleProperties) => RxElement
  pseudoNthLastChild: (value: StyleProperties) => RxElement
  pseudoNthLastOfType: (value: StyleProperties) => RxElement
  pseudoNthOfType: (value: StyleProperties) => RxElement
  pseudoOnlyOfType: (value: StyleProperties) => RxElement
  pseudoOnlyChild: (value: StyleProperties) => RxElement
  pseudoOptional: (value: StyleProperties) => RxElement
  pseudoOutOfRange: (value: StyleProperties) => RxElement
  pseudoReadOnly: (value: StyleProperties) => RxElement
  pseudoReadWrite: (value: StyleProperties) => RxElement
  pseudoRequired: (value: StyleProperties) => RxElement
  pseudoRoot: (value: StyleProperties) => RxElement
  pseudoTarget: (value: StyleProperties) => RxElement
  pseudoValid: (value: StyleProperties) => RxElement
  pseudoVisited: (value: StyleProperties) => RxElement

  pseudoBefore: (value: StyleProperties) => RxElement
  pseudoAfter: (value: StyleProperties) => RxElement
  pseudoSelection: (value: StyleProperties) => RxElement
  pseudoFirstLetter: (value: StyleProperties) => RxElement
  pseudoFirstLine: (value: StyleProperties) => RxElement

  hover: (value: StyleProperties) => RxElement
} & $RxElement & LayoutFunctions;

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
  create?: () => void
  cuechange?: () => void
  dblclick?: () => void
  destroy?: () => void
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

export type LayoutFunctions = {
  absCenter: (value?: boolean) => RxElement | boolean
  absCenterRight: (value?: Number) => RxElement | Number
  absCenterLeft: (value?: Number) => RxElement | Number
  absCenterTop: (value?: Number) => RxElement | Number
  absCenterBottom: (value?: Number) => RxElement | Number
  absPosition: (...value: Number[]) => RxElement | Number[]
  absTopRight: (...value: Number[]) => RxElement | Number[]
  absTopLeft: (...value: Number[]) => RxElement | Number[]
  absBottomRight: (...value: Number[]) => RxElement | Number[]
  absBottomLeft: (...value: Number[]) => RxElement | Number[]
  absCenterVertical: (value?: boolean) => RxElement | boolean
  absCenterHorizontal: (value?: boolean) => RxElement | boolean
  addClassName: (name?: string) => RxElement
  // animate: (args?: StyleProperties) => RxElement
  // animation: (animation?: Animation) => RxElement
  // aspectRatio: (value?: boolean) => RxElement
  backgroundLinearGradient: (...value: Color[]) => RxElement | Color[]
  // childVerticalSpacing: (margin?: number) => RxElement
  // childHorizontalSpacing: (margin?: number) => RxElement
  // clearFix: (value?: boolean) => RxElement
  flexSpaceBetween: (value?: boolean) => RxElement | boolean
  flexCenter: (value?: boolean) => RxElement | boolean
  tag: (tag?: string) => RxElement | string
  child: (predicate?: {[key: string]: any}) => RxElement
  relCenterHorizontal: (value?: boolean) => RxElement | boolean
  removeClassName: (value?: string) => RxElement
  replaceTextTag: (text: string, tagObject: {[key: string]: typeof $RxElement}) => RxElement
  respond: (key: string, props: StyleProperties) => RxElement
  size: (...size: Number[]) => RxElement | Number[] | Number
  // stack: (children: RxElement[], options: { margin?: Number, vertical?: boolean, horizontal?: boolean }) => RxElement
  // stackVertical: (children: RxElement[]) => RxElement | boolean
  truncateText: (value?: boolean) => RxElement | boolean
}
