import Parser from './parser';
import {
  ElementEvent, NativeLock, StyleProperties, FlexAlignment, FlexAlignmentItem, ConfigType,
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

class StyleClass<T> {
  alignContent: (_?: FlexAlignment) => T
  alignItems: (_?: FlexAlignmentItem) => T
  alignSelf: (_?: FlexAlignmentItem) => T
  animation: (_?: string) => T
  animationDelay: (_?: string | string[]) => T
  animationDirection: (_?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string | string[] | GlobalValues) => T
  animationDuration: (_?: string | string[] | GlobalValues) => T
  animationFillMode: (_?: 'none' | 'forwards' | 'backwards' | 'both' | string | string[] | GlobalValues) => T
  animationIterationCount: (_?: 'infinite' | string | string[] | GlobalValues) => T
  animationName: (_?: 'none' | '-specific' | 'sliding-vertically' | 'sliding' | string | string[] | GlobalValues) => T
  animationPlayState: (_?: 'running' | 'paused' | string | string[] | GlobalValues) => T
  animationTimingFunction: (_?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end' |  string | string[] | GlobalValues) => T
  backfaceVisibility: (_?: 'visible' | 'hidden' | string | string[] | GlobalValues) => T
  background: (_?: string | string[] | GlobalValues) => T
  backgroundAttachment: (_?: 'scroll' | 'fixed' | 'local' | string | string[] | GlobalValues) => T
  backgroundClip: (_?: 'border-box' | 'padding-box' | 'content-box' | 'text' | string | string[] | GlobalValues) => T
  backgroundColor: (_?: Color) => T
  backgroundImage: (_?: CSSImage) => T
  backgroundOrigin: (_?: 'border-box' | 'padding-box' | 'content-box' | string | string[] | GlobalValues) => T
  backgroundPosition: (_?: 'top' | 'bottom' | 'left' | 'right' | 'center' | string | number | string[] | number[] | GlobalValues) => T
  backgroundPositionX: (_?: 'left' | 'center' | 'right' | string | number | string[] | GlobalValues) => T
  backgroundPositionY: (_?: 'top' | 'center' | 'bottom' | string | number | string[] | GlobalValues) => T
  backgroundRepeat: (_?: 'repeat-x' | 'repeat-y' | 'repeat' | 'space' | 'round' | 'no-repeat' | string | string[] | GlobalValues) => T
  backgroundSize: (_?: 'cover' | 'contain' | string | number | string[] | number[] | GlobalValues) => T
  border: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => T
  borderBottom: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => T
  borderBottomColor: (_?: Color) => T
  borderBottomLeftRadius: (_?: string | number | string[] | number[] | GlobalValues) => T
  borderBottomRightRadius: (_?: string | number | string[] | number[] | GlobalValues) => T
  borderBottomStyle: (_?: BorderStyle) => T
  borderBottomWidth: (_?: BorderWidth) => T
  borderCollapse: (_?: 'collapse' | 'separate' | string | GlobalValues) => T
  borderColor: (_?: Color) => T
  borderImage: (_?: 'url()' | 'linear-gradient()' | string | string[] | GlobalValues) => T
  borderImageOutset: (_?: number | number[] | GlobalValues) => T
  borderImageRepeat: (_?: 'stretch' | 'repeat' | 'round' | 'space' | string | string[] | GlobalValues) => T
  borderImageSlice: (_?: 'fill' | string | number | string[] | number[] | GlobalValues) => T
  borderImageSource: (_?: CSSImage) => T
  borderImageWidth: (_?: 'auto' | string | number | string[] | number[] | GlobalValues) => T
  borderLeft: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => T
  borderLeftColor: (_?: Color) => T
  borderLeftStyle: (_?: BorderStyle) => T
  borderLeftWidth: (_?: BorderWidth) => T
  borderRadius: (_?: string | number | string[] | number[] | GlobalValues) => T
  borderRight: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => T
  borderRightColor: (_?: Color) => T
  borderRightStyle: (_?: BorderStyle) => T
  borderRightWidth: (_?: BorderWidth) => T
  borderSpacing: (_?: number | number[] | GlobalValues) => T
  borderStyle: (_?: BorderStyle) => T
  borderTop: (_?: BorderStyle | BorderWidth | string | number | string[] | GlobalValues) => T
  borderTopColor: (_?: Color) => T
  borderTopLeftRadius: (_?: string | number | string[] | number[] | GlobalValues) => T
  borderTopRightRadius: (_?: string | number | string[] | number[] | GlobalValues) => T
  borderTopStyle: (_?: BorderStyle) => T
  borderTopWidth: (_?: BorderWidth) => T
  borderWidth: (_?: BorderWidth) => T
  bottom: (_?: Space) => T
  boxDecorationBreak: (_?: 'slice' | 'clone' | string | GlobalValues) => T
  boxShadow: (_?: 'none' | string | string[] | GlobalValues) => T
  boxSizing: (_?: 'border-box' | 'content-box' | GlobalValues) => T
  breakAfter: (_?: Break) => T
  breakBefore: (_?: Break) => T
  breakInside: (_?: 'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region' | GlobalValues) => T
  captionSide: (_?: 'top' | 'bottom' | 'left' | 'right' | 'top-outside' | 'bottom-outside' | GlobalValues) => T
  caretColor: (_?: 'auto' | Color) => T
  clear: (_?: 'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end' | GlobalValues) => T
  clip: (_?: 'rect()' | 'auto' | string | GlobalValues) => T
  color: (_?: Color) => T
  columnCount: (_?: 'auto' | string | number | GlobalValues) => T
  columnFill: (_?: 'auto' | 'balance' | 'balance-all' | GlobalValues) => T
  columnGap: (_?: 'normal' | string | number | GlobalValues) => T
  columnRule: (_?: BorderStyle | BorderWidth | string | number | number[]) => T
  columnRuleColor: (_?: Color) => T
  columnRuleStyle: (_?: BorderStyle) => T
  columnRuleWidth: (_?: BorderWidth) => T
  columnSpan: (_?: 'none' | 'all' | GlobalValues) => T
  columnWidth: (_?: 'auto' | string | number | GlobalValues) => T
  columns: (_?: 'auto' | string | number | string[] | GlobalValues) => T
  content: (_?:  'none' | 'normal' | 'attr()' | 'open-quote | close-quote' | 'no-open-quote | no-close-quote' | string | string[] | GlobalValues) => T
  counterIncrement: (_?: 'none' | string | number | string[] | GlobalValues) => T
  counterReset: (_?: 'none' | string | number | string[] | GlobalValues) => T
  counterSet: (_?: 'none' | string | number | string[] | GlobalValues) => T
  cursor: (_?: 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' |
    'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize' | 'row-resize' | 'n-resize' | 'e-resize' |
    's-resize' | 'w-resize' | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' |
    'zoom-in' | 'zoom-out' | 'url()' | string | GlobalValues) => T
  direction: (_?: 'ltr' | 'rtl' | GlobalValues) => T
  display: (_?: 'block' | 'inline' | 'run-in' | 'flow' | 'flow-root' | 'table' | 'flex' | 'grid' | 'ruby' | 'list-item' | 'table-row-group' | 'table-header-group' |
    'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'ruby-base' | 'ruby-text' | 'ruby-base-container' |
    'ruby-text-container' | 'contents' | 'none' | 'inline-block' | 'inline-list-item' | 'inline-table' | 'inline-flex' | 'inline-grid' | string | string[] | GlobalValues) => T
  emptyCells: (_?: 'show' | 'hide' | GlobalValues) => T
  filter: (_?: 'url()' | 'blur()' | 'brightness()' | 'contrast()' | 'drop-shadow()' | 'grayscale()' | 'hue-rotate()' | 'invert()' | 'opacity()' | 'saturate()' |
    'sepia()' | 'none' | string | GlobalValues) => T
  flex: (_?: 'auto' | 'inital' | 'none' | string | number | number[] | GlobalValues) => T
  flexBasis: (_?: 'fill' | 'max-content' | 'min-content' | 'fit-content' | 'content' | string | number | GlobalValues) => T
  flexDirection: (_?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | GlobalValues) => T
  flexFlow: (_?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | 'nowrap' | 'wrap' | 'wrap-reverse' | string | string[] | GlobalValues) => T
  flexGrow: (_?: string | GlobalValues) => T
  flexShrink: (_?: string | GlobalValues) => T
  flexWrap: (_?: 'nowrap' | 'wrap' | 'wrap-reverse' | GlobalValues) => T
  float: (_?: 'left' | 'right' | 'none' | 'inline-start' | 'inline-end' | GlobalValues) => T
  font: (_?: 'caption' | 'icon' | 'menu' | 'message-box' | 'small-caption' | 'status-bar' | StyleProperties['fontFamily'] | StyleProperties['fontSize'] | StyleProperties['fontStretch'] |
    StyleProperties['fontStyle'] | StyleProperties['fontVariant'] | StyleProperties['fontWeight'] | StyleProperties['lineHeight']| string | string[] | GlobalValues) => T
  fontFamily: (_?: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy' | 'system-ui' | 'ui-serif' | 'ui-sans-serif' | 'ui-monospace' | 'ui-rounded' | 'emoji' | 'math' | 'fangsong' | string | string[] | GlobalValues) => T
  fontFeatureSettings: (_?: 'normal' | 'smcp' | 'swsh' | string | GlobalValues) => T
  fontKerning: (_?: 'auto' | 'normal' | 'none') => T
  fontLanguageOverride: (_?: 'normal' | string | GlobalValues) => T
  fontSize: (_?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large' | 'xxx-large' | 'smaller' | 'larger' | string | number | GlobalValues) => T
  fontSizeAdjust: (_?: 'none' | string | GlobalValues) => T
  fontSmooth: (_?: 'auto' | 'never' | 'always' | number | string | StyleProperties['fontSize']) => T
  fontStretch: (_?: 'ultra-condensed' | 'extra-condensed' | 'condensed' | 'semi-condensed' | 'normal' | 'semi-expanded' | 'expanded' | 'extra-expanded' | 'ultra-expanded' | string | GlobalValues) => T
  fontStyle: (_?: 'normal' | 'italic' | 'oblique' | string | string[]) => T
  fontSynthesis: (_?: 'none' | StyleProperties['fontWeight'] | StyleProperties['fontStyle'] | string) => T
  fontVariant: (_?: 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' | 'no-historical-ligatures' | 'contextual' | 'no-contextual' |
    'stylistic()' | 'historical-forms' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' |
    'titling-caps' | 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' |
    'full-width' | 'proportional-width' | 'ruby' | string) => T
  fontVariantAlternates: (_?: 'normal' | 'historical-forms' | 'stylistic()' | 'styleset()' | 'character-variant()' | 'swash()' | 'ornaments()' | 'annotation()' | string | GlobalValues) => T
  fontVariantCaps: (_?: 'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps' | GlobalValues) => T
  fontVariantEastAsian: (_?: 'normal' | 'jis78' | 'jis83' | 'jis90' | 'jis04' | 'simplified' | 'traditional' | 'full-width' | 'proportional-width' | 'ruby' | string | GlobalValues) => T
  fontVariantLigatures: (_?: 'normal' | 'none' | 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' |
    'no-historical-ligatures' | 'contextual' | 'no-contextual' | GlobalValues) => T
  fontVariantNumeric: (_?: 'lining-nums' | 'oldstyle-nums' | 'diagonal-fractions' | 'stacked-fractions' | 'ordinal' | 'slashed-zero' | string | GlobalValues) => T
  fontVariantPosition: (_?: 'normal' | 'sub' | 'super' | GlobalValues) => T
  fontWeight: (_?: 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | GlobalValues) => T
  gap: (_?: number | number[] | string | string[] | GlobalValues) => T
  grid: (_?: StyleProperties['gridTemplate'] | StyleProperties['gridTemplateRows'] | StyleProperties['gridAutoFlow'] | StyleProperties['gridAutoColumns'] | StyleProperties['gridTemplateAreas'] |
    StyleProperties['gridColumnGap'] | string | GlobalValues) => T
  gridArea: (_?: 'auto' | 'span' | string | GlobalValues) => T
  gridAutoColumns: (_?: 'auto' | 'max-content' | 'min-content' | 'minmax()' | 'fit-content()' | string | number | GlobalValues) => T
  gridAutoFlow: (_?: 'row' | 'column' | 'dense' | 'row dense' | 'column desne' | GlobalValues) => T
  gridColumn: (_?: StyleProperties['gridArea']) => T
  gridColumnEnd: (_?: StyleProperties['gridArea']) => T
  gridColumnGap: (_?: StyleProperties['columnGap']) => T
  gridColumnStart: (_?: StyleProperties['gridArea']) => T
  gridGap: (_?: Number | number[]) => T
  gridRow: (_?: Number | number[]) => T
  gridRowEnd: (_?: StyleProperties['gridArea']) => T
  gridRowStart: (_?: StyleProperties['gridArea']) => T
  gridTemplate: (_?: 'none' | string | GlobalValues) => T
  gridTemplateAreas: (_?: StyleProperties['gridTemplate']) => T
  gridTemplateColumns: (_?: 'subgrid' | 'masonry' | 'minmax()' | 'fit-content()' | 'repeat()' | string | StyleProperties['gridTemplate']) => T
  gridTemplateRows: (_?: StyleProperties['gridTemplateColumns']) => T
  hangingPunctuation: (_?: 'none' | 'first' | 'last' | 'force-end' | 'allow-end' | string | string[] | GlobalValues) => T
  height: (_?: Number) => T
  hyphens: (_?: 'none' | 'manual' | 'auto' | GlobalValues) => T
  isolation: (_?: 'auto' | 'isolate' | GlobalValues) => T
  inset: (_?: 'auto' | string | number | string[] | number[] | GlobalValues) => T
  insetBottom: (_?: StyleProperties['inset']) => T
  insetLeft: (_?: StyleProperties['inset']) => T
  insetRight: (_?: StyleProperties['inset']) => T
  insetTop: (_?: StyleProperties['inset']) => T
  justifyContent: (_?: 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | FlexAlignment | 'safe center' | 'unsafe center' | GlobalValues) => T
  justifySelf: (_?: FlexAlignmentItem | FlexAlignment) => T
  justifyItems: (_?: FlexAlignment | FlexAlignmentItem | 'legacy right' | 'legacy left' | 'legacy center' | GlobalValues) => T
  left: (_?: Number) => T
  letterSpacing: (_?: Number) => T
  lineBreak: (_?: 'auto' | 'loose' | 'normal' | 'strict' | 'anywhere' | GlobalValues) => T
  lineHeight: (_?: Number) => T
  listStyle: (_?: StyleProperties['listStyleType'] | StyleProperties['listStyleImage'] | StyleProperties['listStylePosition']) => T
  listStyleImage: (_?: 'none' | 'url()' | GlobalValues) => T
  listStylePosition: (_?: 'inside' | 'outside' | GlobalValues) => T
  listStyleType: (_?: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'georgian' | 'trad-chinese-informal' | 'kannada' | '-' | '@<<custom>>' | GlobalValues) => T
  margin: (_?: Number | string | number | string[] | number[]) => T
  marginBottom: (_?: Number | string | number) => T
  marginLeft: (_?: StyleProperties['marginBottom']) => T
  marginRight: (_?: StyleProperties['marginBottom']) => T
  marginTop: (_?: StyleProperties['marginBottom']) => T
  maxHeight: (_?: 'none' | 'max-content' | 'min-content' | 'fit-content()' | Number) => T
  maxWidth: (_?: StyleProperties['maxHeight']) => T
  minHeight: (_?: StyleProperties['maxHeight']) => T
  minWidth: (_?: StyleProperties['maxHeight']) => T
  mixBlendMode: (_?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' |
    'exclusion' | 'hue' | 'saturation' | 'color' | 'liminosity' | GlobalValues) => T
  objectFit: (_?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down') => T
  objectPosition: (_?: 'top' | 'left' | 'right' | 'bottom' | string | number | string[] | number[] | GlobalValues) => T
  opacity: (_?: string | GlobalValues) => T
  order: (_?: string | GlobalValues) => T
  orphans: (_?: string | GlobalValues) => T
  outline: (_?: StyleProperties['outlineColor'] | StyleProperties['outlineStyle'] | StyleProperties['outlineWidth']) => T
  outlineColor: (_?: Color | 'invert') => T
  outlineOffset: (_?: string | number | GlobalValues) => T
  outlineStyle: (_?: BorderStyle) => T
  outlineWidth: (_?: BorderWidth) => T
  overflow: (_?: StyleProperties['overflowX'] | StyleProperties['overflowY']) => T
  overflowBlock: (_?: 'visible' | 'hidden' | 'scroll' | 'auto' | GlobalValues) => T
  overflowHidden: (_?: StyleProperties['overflowBlock']) => T
  overflowWrap: (_?: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => T
  overflowX: (_?: 'clip' | StyleProperties['overflowBlock']) => T
  overflowY: (_?: 'clip' | StyleProperties['overflowBlock']) => T
  padding: (_?: Number | string | number | string[] | number[] | GlobalValues) => T
  paddingBottom: (_?: Number) => T
  paddingLeft: (_?: Number) => T
  paddingRight: (_?: Number) => T
  paddingTop: (_?: Number) => T
  pageBreakAfter: (_?: 'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso' | GlobalValues) => T
  pageBreakBefore: (_?: StyleProperties['pageBreakAfter']) => T
  pageBreakInside: (_?: 'auto' | 'avoid' | GlobalValues) => T
  perspective: (_?: 'none' | Number) => T
  perspectiveOrigin: (_?: 'center' | 'top' | 'bottom' | 'right' | string | GlobalValues) => T
  pointerEvents: (_?: 'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | GlobalValues) => T
  position: (_?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky') => T
  preserveAspectRatio: (_?: 'none' | 'xMinYMin' | 'xMidYMin' | 'xMaxYMin' | 'xMinMid' | 'xMidYMid' | 'xMaxYMid' | 'xMinYMax' | 'xMidYMax' | 'xMaxYMax' | 'meet' | 'slice' | string) => T
  quotes: (_?: 'none' | 'initial' | 'auto' | string | GlobalValues) => T
  resize: (_?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | GlobalValues) => T
  right: (_?: Number) => T
  scrollBehavior: (_?: 'auto' | 'smooth' | GlobalValues) => T
  tabSize: (_?: Number) => T
  tableLayout: (_?: 'auto' | 'fixed' | GlobalValues) => T
  textAlign: (_?: 'left' | 'right' | 'center' | 'justify' | 'justify-all' | 'start' | 'end' | 'match-parent' | string | GlobalValues) => T
  textAlignLast: (_?: 'auto' | 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | string | GlobalValues) => T
  textCombineUpright: (_?: 'none' | 'all' | 'digits' | GlobalValues) => T
  textDecoration: (_?: StyleProperties['textDecorationLine'] | StyleProperties['textDecorationColor'] | StyleProperties['textDecorationStyle'] |
    StyleProperties['textDecorationThickness']) => T
  textDecorationColor: (_?: Color) => T
  textDecorationLine: (_?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink' | string | GlobalValues) => T
  textDecorationStyle: (_?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy' | GlobalValues ) => T
  textDecorationThickness: (_?: 'auto' | 'from-font' | number | string | GlobalValues) => T
  textIndent: (_?: 'each-line' | 'hanging' | number | string | GlobalValues) => T
  textJustify: (_?: 'none' | 'auto' | 'inter-word' | 'inter-character' | 'distribute') => T
  textOrientation: (_?: 'mixed' | 'upright' | 'sideways-right' | 'sideways' | 'use-glyph-orientation' | GlobalValues) => T
  textOverflow: (_?: 'clip' | 'ellipsis' | '-' | GlobalValues) => T
  textShadow: (_?: StyleProperties['boxShadow']) => T
  textTransform: (_?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana' | GlobalValues) => T
  textUnderlinePosition: (_?: 'auto' | 'under' | 'left' | 'right' | string | GlobalValues) => T
  top: (_?: Number) => T
  transform: (_?: 'none' | 'matrix()' | 'matrix3d()' | 'perspective()' | 'rotate()' | 'rotate3d()' | 'rotateX()' | 'rotateY()' | 'rotateZ()' | 'translate()' |
    'translate3d()' | 'translateX()' | 'translateY()' | 'translateZ()' | 'scale()' | 'scale3d()' | 'scaleX()' | 'scaleY()' | 'scaleZ()' | 'skew()' |
    'skewX()' | 'skewY()' | string | GlobalValues) => T
  transformOrigin: (_?: 'center' | 'top' | 'right' | 'left' | 'bottom' | string | number | string[] | number[]) => T
  transformStyle: (_?: 'flat' | 'preserve-3d' | GlobalValues) => T
  transition: (_?: StyleProperties['transitionDelay'] | StyleProperties['transitionDuration'] | StyleProperties['transitionProperty'] | StyleProperties['transitionTimingFunction']) => T
  transitionDelay: (_?: string | string[] | GlobalValues) => T
  transitionDuration: (_?: number | string | GlobalValues) => T
  transitionProperty: (_?: StyleProperties['animationName']) => T
  transitionTimingFunction: (_?: StyleProperties['animationTimingFunction']) => T
  unicodeBidi: (_?: 'normal' | 'embed' | 'isolate' | 'bidi-override' | 'isolate-override' | 'plaintext' | GlobalValues) => T
  userSelect: (_?: 'none' | 'auto' | 'text' | 'contain' | 'all' | 'element' | GlobalValues) => T
  verticalAlign: (_?: 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | number | string | GlobalValues) => T
  visibility: (_?: 'visible' | 'hidden' | 'collapse' | GlobalValues) => T
  whiteSpace: (_?: 'normal' | 'nowrap' | 'wrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces' | GlobalValues) => T
  width: (_?: Number) => T
  wordBreak: (_?: 'normal' | 'break-all' | 'keep-all' | 'break-word' | GlobalValues) => T
  wordSpacing: (_?: 'normal' | number | string | GlobalValues) => T
  wordWrap: (_?: 'normal' | 'break-word' | 'anywhere' | GlobalValues) => T
  writingMode: (_?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | GlobalValues) => T
  zIndex: (_?: string | GlobalValues) => T
}

export class $RxElement extends StyleClass<$RxElement> {

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
    super();
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

'A,Abbr,Applet,Area,Article,Aside,Audio,Base,BaseFont,BDO,BlockQuote,Body,BR,Canvas,Caption,Code,Col,ColGroup,Data,Details,DFN,Dialog,DIR,Div,DL,EM,Embed,FieldSet,FigCaption,Figure,Font,Footer,Form,Del,Frame,FrameSet,H1,H2,H3,H4,H5,H6,Head,Header,HR,HTML,IFrame,Image,IMG,Ins,IsIndex,Label,Legend,LI,Main,Map,Mark,Menu,Meta,Meter,Nav,ObjectElement,OL,OptGroup,Option,Output,P,Param,Path,Pre,Progress,Q,Script,Section,Select,Slot,Source,Span,Strong,Summary,Table,TBody,TD,Textarea,TFoot,TH,THead,Time,TR,Track,UL,Video'.split(',').forEach(i => module.exports[i] = class extends $RxElement { constructor(){ super(i)} });

export class Container extends Div {}
export class Link extends A {}
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

export class Style extends StyleClass<Style> {
  $className: string;
  $rules: CSSStyleRule[] = [];

  constructor(props: StyleProperties) {
    super();
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

