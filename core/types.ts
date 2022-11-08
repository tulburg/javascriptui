import { PageComponent, Container, Style } from './components';
import NSRouter from './router';

declare global {
  var Theme: {
    globals?: { [key: string]: any },
    colors?: { [key: string]: string },
    fonts?: { [key: string]: any },
    dimens?: { [key: string]: any },
    styles?: { [key: string]: Style }
  } & { [key: string]: any };
  var Config: {
    routes: ConfigType.Route[],
    theme?: typeof Theme,
    styleDebug?: boolean
  } & { [key: string]: any };
  var Router: NSRouter;
  interface String {
    watch: (_: (v: any) => void) => void
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

export type StyleProperties = {

}

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

export namespace DataType {
  export type AbsoluteSize = "large" | "medium" | "small" | "x-large" | "x-small" | "xx-large" | "xx-small" | "xxx-large";
  export type AnimateableFeature = "contents" | "scroll-position" | (string & {});
  export type Attachment = "fixed" | "local" | "scroll";
  export type BgPosition = "bottom" | "center" | "left" | "right" | "top" | (string & {});
  export type BgSize = "auto" | "contain" | "cover" | (string & {});
  export type BlendMode =
    | "color"
    | "color-burn"
    | "color-dodge"
    | "darken"
    | "difference"
    | "exclusion"
    | "hard-light"
    | "hue"
    | "lighten"
    | "luminosity"
    | "multiply"
    | "normal"
    | "overlay"
    | "saturation"
    | "screen"
    | "soft-light";
  export type Box = "border-box" | "content-box" | "padding-box";
  export type Color = NamedColor | DeprecatedSystemColor | "currentcolor" | (string & {});
  export type CompatAuto =
    | "button"
    | "checkbox"
    | "listbox"
    | "menulist"
    | "meter"
    | "progress-bar"
    | "push-button"
    | "radio"
    | "searchfield"
    | "slider-horizontal"
    | "square-button"
    | "textarea";
  export type CompositeStyle =
    | "clear"
    | "copy"
    | "destination-atop"
    | "destination-in"
    | "destination-out"
    | "destination-over"
    | "source-atop"
    | "source-in"
    | "source-out"
    | "source-over"
    | "xor";
  export type CompositingOperator = "add" | "exclude" | "intersect" | "subtract";
  export type ContentDistribution = "space-around" | "space-between" | "space-evenly" | "stretch";
  export type ContentList = Quote | "contents" | (string & {});
  export type ContentPosition = "center" | "end" | "flex-end" | "flex-start" | "start";
  export type CubicBezierTimingFunction = "ease" | "ease-in" | "ease-in-out" | "ease-out" | (string & {});
  export type Dasharray = (string & {}) | (number & {});
  export type DeprecatedSystemColor =
    | "ActiveBorder"
    | "ActiveCaption"
    | "AppWorkspace"
    | "Background"
    | "ButtonFace"
    | "ButtonHighlight"
    | "ButtonShadow"
    | "ButtonText"
    | "CaptionText"
    | "GrayText"
    | "Highlight"
    | "HighlightText"
    | "InactiveBorder"
    | "InactiveCaption"
    | "InactiveCaptionText"
    | "InfoBackground"
    | "InfoText"
    | "Menu"
    | "MenuText"
    | "Scrollbar"
    | "ThreeDDarkShadow"
    | "ThreeDFace"
    | "ThreeDHighlight"
    | "ThreeDLightShadow"
    | "ThreeDShadow"
    | "Window"
    | "WindowFrame"
    | "WindowText";
  export type DisplayInside = "-ms-flexbox" | "-ms-grid" | "-webkit-flex" | "flex" | "flow" | "flow-root" | "grid" | "ruby" | "table";
  export type DisplayInternal =
    | "ruby-base"
    | "ruby-base-container"
    | "ruby-text"
    | "ruby-text-container"
    | "table-caption"
    | "table-cell"
    | "table-column"
    | "table-column-group"
    | "table-footer-group"
    | "table-header-group"
    | "table-row"
    | "table-row-group";
  export type DisplayLegacy = "-ms-inline-flexbox" | "-ms-inline-grid" | "-webkit-inline-flex" | "inline-block" | "inline-flex" | "inline-grid" | "inline-list-item" | "inline-table";
  export type DisplayOutside = "block" | "inline" | "run-in";
  export type EasingFunction = CubicBezierTimingFunction | StepTimingFunction | "linear";
  export type EastAsianVariantValues = "jis04" | "jis78" | "jis83" | "jis90" | "simplified" | "traditional";
  export type FinalBgLayer = Color | BgPosition | RepeatStyle | Attachment | Box | "none" | (string & {});
  export type FontStretchAbsolute =
    | "condensed"
    | "expanded"
    | "extra-condensed"
    | "extra-expanded"
    | "normal"
    | "semi-condensed"
    | "semi-expanded"
    | "ultra-condensed"
    | "ultra-expanded"
    | (string & {});
  export type FontWeightAbsolute = "bold" | "normal" | (number & {}) | (string & {});
  export type GenericFamily = "cursive" | "fantasy" | "monospace" | "sans-serif" | "serif";
  export type GeometryBox = Box | "fill-box" | "margin-box" | "stroke-box" | "view-box";
  export type GridLine = "auto" | (string & {}) | (number & {});
  export type LineStyle = "dashed" | "dotted" | "double" | "groove" | "hidden" | "inset" | "none" | "outset" | "ridge" | "solid";
  export type LineWidth = "medium" | "thick" | "thin";
  export type MaskLayer = Position | RepeatStyle | GeometryBox | CompositingOperator | MaskingMode | "no-clip" | "none" | (string & {});
  export type MaskingMode = "alpha" | "luminance" | "match-source";
  export type NamedColor =
    | "aliceblue"
    | "antiquewhite"
    | "aqua"
    | "aquamarine"
    | "azure"
    | "beige"
    | "bisque"
    | "black"
    | "blanchedalmond"
    | "blue"
    | "blueviolet"
    | "brown"
    | "burlywood"
    | "cadetblue"
    | "chartreuse"
    | "chocolate"
    | "coral"
    | "cornflowerblue"
    | "cornsilk"
    | "crimson"
    | "cyan"
    | "darkblue"
    | "darkcyan"
    | "darkgoldenrod"
    | "darkgray"
    | "darkgreen"
    | "darkgrey"
    | "darkkhaki"
    | "darkmagenta"
    | "darkolivegreen"
    | "darkorange"
    | "darkorchid"
    | "darkred"
    | "darksalmon"
    | "darkseagreen"
    | "darkslateblue"
    | "darkslategray"
    | "darkslategrey"
    | "darkturquoise"
    | "darkviolet"
    | "deeppink"
    | "deepskyblue"
    | "dimgray"
    | "dimgrey"
    | "dodgerblue"
    | "firebrick"
    | "floralwhite"
    | "forestgreen"
    | "fuchsia"
    | "gainsboro"
    | "ghostwhite"
    | "gold"
    | "goldenrod"
    | "gray"
    | "green"
    | "greenyellow"
    | "grey"
    | "honeydew"
    | "hotpink"
    | "indianred"
    | "indigo"
    | "ivory"
    | "khaki"
    | "lavender"
    | "lavenderblush"
    | "lawngreen"
    | "lemonchiffon"
    | "lightblue"
    | "lightcoral"
    | "lightcyan"
    | "lightgoldenrodyellow"
    | "lightgray"
    | "lightgreen"
    | "lightgrey"
    | "lightpink"
    | "lightsalmon"
    | "lightseagreen"
    | "lightskyblue"
    | "lightslategray"
    | "lightslategrey"
    | "lightsteelblue"
    | "lightyellow"
    | "lime"
    | "limegreen"
    | "linen"
    | "magenta"
    | "maroon"
    | "mediumaquamarine"
    | "mediumblue"
    | "mediumorchid"
    | "mediumpurple"
    | "mediumseagreen"
    | "mediumslateblue"
    | "mediumspringgreen"
    | "mediumturquoise"
    | "mediumvioletred"
    | "midnightblue"
    | "mintcream"
    | "mistyrose"
    | "moccasin"
    | "navajowhite"
    | "navy"
    | "oldlace"
    | "olive"
    | "olivedrab"
    | "orange"
    | "orangered"
    | "orchid"
    | "palegoldenrod"
    | "palegreen"
    | "paleturquoise"
    | "palevioletred"
    | "papayawhip"
    | "peachpuff"
    | "peru"
    | "pink"
    | "plum"
    | "powderblue"
    | "purple"
    | "rebeccapurple"
    | "red"
    | "rosybrown"
    | "royalblue"
    | "saddlebrown"
    | "salmon"
    | "sandybrown"
    | "seagreen"
    | "seashell"
    | "sienna"
    | "silver"
    | "skyblue"
    | "slateblue"
    | "slategray"
    | "slategrey"
    | "snow"
    | "springgreen"
    | "steelblue"
    | "tan"
    | "teal"
    | "thistle"
    | "tomato"
    | "transparent"
    | "turquoise"
    | "violet"
    | "wheat"
    | "white"
    | "whitesmoke"
    | "yellow"
    | "yellowgreen";
  export type PageSize = "A3" | "A4" | "A5" | "B4" | "B5" | "JIS-B4" | "JIS-B5" | "ledger" | "legal" | "letter";
  export type Paint = Color | "child" | "context-fill" | "context-stroke" | "none" | (string & {});
  export type Position = "bottom" | "center" | "left" | "right" | "top" | (string & {});
  export type Quote = "close-quote" | "no-close-quote" | "no-open-quote" | "open-quote";
  export type RepeatStyle = "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "round" | "space" | (string & {});
  export type SelfPosition = "center" | "end" | "flex-end" | "flex-start" | "self-end" | "self-start" | "start";
  export type SingleAnimation =
    | EasingFunction
    | SingleAnimationDirection
    | SingleAnimationFillMode
    | "infinite"
    | "none"
    | "paused"
    | "running"
    | (string & {})
    | (number & {});
  export type SingleAnimationDirection = "alternate" | "alternate-reverse" | "normal" | "reverse";
  export type SingleAnimationFillMode = "backwards" | "both" | "forwards" | "none";
  export type SingleAnimationTimeline = "auto" | "none" | (string & {});
  export type SingleTransition = EasingFunction | "all" | "none" | (string & {});
  export type StepTimingFunction = "step-end" | "step-start" | (string & {});
  export type TrackBreadth = "auto" | "max-content" | "min-content" | (string & {});
  export type ViewportLength = "auto" | (string & {});
  export type VisualBox = "border-box" | "content-box" | "padding-box";
}
export type Globals = "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset" | Number | Number[];

export interface Attributes<T> {
  attrAbbr: (_?: string | number | string[] | number[]) => T
  attrAcceptCharset: (_?: string | number | string[] | number[]) => T
  attrAccept: (_?: string | number | string[] | number[]) => T
  attrAccesskey: (_?: string | number | string[] | number[]) => T
  attrAction: (_?: string | number | string[] | number[]) => T
  attrAlign: (_?: string | number | string[] | number[]) => T
  attrAlink: (_?: string | number | string[] | number[]) => T
  attrAllow: (_?: string | number | string[] | number[]) => T
  attrAllowfullscreen: (_?: string | number | string[] | number[]) => T
  attrAllowpaymentrequest: (_?: string | number | string[] | number[]) => T
  attrAlt: (_?: string | number | string[] | number[]) => T
  attrArchive: (_?: string | number | string[] | number[]) => T
  attrAsync: (_?: string | number | string[] | number[]) => T
  attrAutobuffer: (_?: string | number | string[] | number[]) => T
  attrAutocapitalize: (_?: string | number | string[] | number[]) => T
  attrAutocomplete: (_?: string | number | string[] | number[]) => T
  attrAutofocus: (_?: string | number | string[] | number[]) => T
  attrAutoplay: (_?: string | number | string[] | number[]) => T
  attrAxis: (_?: string | number | string[] | number[]) => T
  attrBackground: (_?: string | number | string[] | number[]) => T
  attrBehavior: (_?: string | number | string[] | number[]) => T
  attrBgcolor: (_?: string | number | string[] | number[]) => T
  attrBorder: (_?: string | number | string[] | number[]) => T
  attrBottommargin: (_?: string | number | string[] | number[]) => T
  attrCapture: (_?: string | number | string[] | number[]) => T
  attrCellpadding: (_?: string | number | string[] | number[]) => T
  attrCellspacing: (_?: string | number | string[] | number[]) => T
  attrChar: (_?: string | number | string[] | number[]) => T
  attrCharoff: (_?: string | number | string[] | number[]) => T
  attrCharset: (_?: string | number | string[] | number[]) => T
  attrChecked: (_?: string | number | string[] | number[]) => T
  attrCite: (_?: string | number | string[] | number[]) => T
  attrClass: (_?: string | number | string[] | number[]) => T
  attrClassid: (_?: string | number | string[] | number[]) => T
  attrClear: (_?: string | number | string[] | number[]) => T
  attrCode: (_?: string | number | string[] | number[]) => T
  attrCodebase: (_?: string | number | string[] | number[]) => T
  attrCodetype: (_?: string | number | string[] | number[]) => T
  attrColor: (_?: string | number | string[] | number[]) => T
  attrCols: (_?: string | number | string[] | number[]) => T
  attrColspan: (_?: string | number | string[] | number[]) => T
  attrCommand: (_?: string | number | string[] | number[]) => T
  attrCompact: (_?: string | number | string[] | number[]) => T
  attrContent: (_?: string | number | string[] | number[]) => T
  attrContenteditable: (_?: string | number | string[] | number[]) => T
  attrContextmenu: (_?: string | number | string[] | number[]) => T
  attrControls: (_?: string | number | string[] | number[]) => T
  attrCoords: (_?: string | number | string[] | number[]) => T
  attrCrossorigin: (_?: string | number | string[] | number[]) => T
  attrData: (_?: string | number | string[] | number[]) => T
  attrDatafld: (_?: string | number | string[] | number[]) => T
  attrDatasrc: (_?: string | number | string[] | number[]) => T
  attrDatetime: (_?: string | number | string[] | number[]) => T
  attrDeclare: (_?: string | number | string[] | number[]) => T
  attrDecoding: (_?: string | number | string[] | number[]) => T
  attrDefault: (_?: string | number | string[] | number[]) => T
  attrDefer: (_?: string | number | string[] | number[]) => T
  attrDir: (_?: string | number | string[] | number[]) => T
  attrDirection: (_?: string | number | string[] | number[]) => T
  attrDirname: (_?: string | number | string[] | number[]) => T
  attrDisabled: (_?: string | number | string[] | number[]) => T
  attrDownload: (_?: string | number | string[] | number[]) => T
  attrDraggable: (_?: string | number | string[] | number[]) => T
  attrEnctype: (_?: string | number | string[] | number[]) => T
  attrEnterkeyhint: (_?: string | number | string[] | number[]) => T
  attrExportparts: (_?: string | number | string[] | number[]) => T
  attrFace: (_?: string | number | string[] | number[]) => T
  attrFetchpriority: (_?: string | number | string[] | number[]) => T
  attrFor: (_?: string | number | string[] | number[]) => T
  attrForm: (_?: string | number | string[] | number[]) => T
  attrFormaction: (_?: string | number | string[] | number[]) => T
  attrFormenctype: (_?: string | number | string[] | number[]) => T
  attrFormmethod: (_?: string | number | string[] | number[]) => T
  attrFormnovalidate: (_?: string | number | string[] | number[]) => T
  attrFormtarget: (_?: string | number | string[] | number[]) => T
  attrFrame: (_?: string | number | string[] | number[]) => T
  attrFrameborder: (_?: string | number | string[] | number[]) => T
  attrHeaders: (_?: string | number | string[] | number[]) => T
  attrHeight: (_?: string | number | string[] | number[]) => T
  attrHidden: (_?: string | number | string[] | number[]) => T
  attrHigh: (_?: string | number | string[] | number[]) => T
  attrHref: (_?: string | number | string[] | number[]) => T
  attrHreflang: (_?: string | number | string[] | number[]) => T
  attrHspace: (_?: string | number | string[] | number[]) => T
  attrHttpEquiv: (_?: string | number | string[] | number[]) => T
  attrIcon: (_?: string | number | string[] | number[]) => T
  attrId: (_?: string | number | string[] | number[]) => T
  attrImagesizes: (_?: string | number | string[] | number[]) => T
  attrImagesrcset: (_?: string | number | string[] | number[]) => T
  attrInert: (_?: string | number | string[] | number[]) => T
  attrInputmode: (_?: string | number | string[] | number[]) => T
  attrIntegrity: (_?: string | number | string[] | number[]) => T
  attrIs: (_?: string | number | string[] | number[]) => T
  attrIsmap: (_?: string | number | string[] | number[]) => T
  attrItemid: (_?: string | number | string[] | number[]) => T
  attrItemprop: (_?: string | number | string[] | number[]) => T
  attrItemref: (_?: string | number | string[] | number[]) => T
  attrItemscope: (_?: string | number | string[] | number[]) => T
  attrItemtype: (_?: string | number | string[] | number[]) => T
  attrKind: (_?: string | number | string[] | number[]) => T
  attrLabel: (_?: string | number | string[] | number[]) => T
  attrLang: (_?: string | number | string[] | number[]) => T
  attrLanguage: (_?: string | number | string[] | number[]) => T
  attrLeftmargin: (_?: string | number | string[] | number[]) => T
  attrLink: (_?: string | number | string[] | number[]) => T
  attrList: (_?: string | number | string[] | number[]) => T
  attrLoading: (_?: string | number | string[] | number[]) => T
  attrLongdesc: (_?: string | number | string[] | number[]) => T
  attrLoop: (_?: string | number | string[] | number[]) => T
  attrLow: (_?: string | number | string[] | number[]) => T
  attrManifest: (_?: string | number | string[] | number[]) => T
  attrMarginheight: (_?: string | number | string[] | number[]) => T
  attrMarginwidth: (_?: string | number | string[] | number[]) => T
  attrMax: (_?: string | number | string[] | number[]) => T
  attrMaxlength: (_?: string | number | string[] | number[]) => T
  attrMayscript: (_?: string | number | string[] | number[]) => T
  attrMedia: (_?: string | number | string[] | number[]) => T
  attrMethod: (_?: string | number | string[] | number[]) => T
  attrMethods: (_?: string | number | string[] | number[]) => T
  attrMin: (_?: string | number | string[] | number[]) => T
  attrMinlength: (_?: string | number | string[] | number[]) => T
  attrMozOpaque: (_?: string | number | string[] | number[]) => T
  attrMozallowfullscreen: (_?: string | number | string[] | number[]) => T
  attrMsallowfullscreen: (_?: string | number | string[] | number[]) => T
  attrMultiple: (_?: string | number | string[] | number[]) => T
  attrMuted: (_?: string | number | string[] | number[]) => T
  attrName: (_?: string | number | string[] | number[]) => T
  attrNohref: (_?: string | number | string[] | number[]) => T
  attrNomodule: (_?: string | number | string[] | number[]) => T
  attrNonce: (_?: string | number | string[] | number[]) => T
  attrNoresize: (_?: string | number | string[] | number[]) => T
  attrNoshade: (_?: string | number | string[] | number[]) => T
  attrNovalidate: (_?: string | number | string[] | number[]) => T
  attrNowrap: (_?: string | number | string[] | number[]) => T
  attrObject: (_?: string | number | string[] | number[]) => T
  attrOnerror: (_?: string | number | string[] | number[]) => T
  attrOpen: (_?: string | number | string[] | number[]) => T
  attrOptimum: (_?: string | number | string[] | number[]) => T
  attrPart: (_?: string | number | string[] | number[]) => T
  attrPattern: (_?: string | number | string[] | number[]) => T
  attrPing: (_?: string | number | string[] | number[]) => T
  attrPlaceholder: (_?: string | number | string[] | number[]) => T
  attrPoster: (_?: string | number | string[] | number[]) => T
  attrPrefetch: (_?: string | number | string[] | number[]) => T
  attrPreload: (_?: string | number | string[] | number[]) => T
  attrPreserveAspectRatio: (_?: string | number | string[] | number[]) => T
  attrProfile: (_?: string | number | string[] | number[]) => T
  attrRadiogroup: (_?: string | number | string[] | number[]) => T
  attrReadonly: (_?: string | number | string[] | number[]) => T
  attrReferrerpolicy: (_?: string | number | string[] | number[]) => T
  attrRel: (_?: string | number | string[] | number[]) => T
  attrRequired: (_?: string | number | string[] | number[]) => T
  attrRev: (_?: string | number | string[] | number[]) => T
  attrReversed: (_?: string | number | string[] | number[]) => T
  attrRightmargin: (_?: string | number | string[] | number[]) => T
  attrRows: (_?: string | number | string[] | number[]) => T
  attrRowspan: (_?: string | number | string[] | number[]) => T
  attrRules: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowDownloads: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowModals: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowPopupsToEscapeSandbox: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowPopups: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowPresentation: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowSameOrigin: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowStorageAccessByUserActivation: (_?: string | number | string[] | number[]) => T
  attrSandboxAllowTopNavigationByUserActivation: (_?: string | number | string[] | number[]) => T
  attrSandbox: (_?: string | number | string[] | number[]) => T
  attrScope: (_?: string | number | string[] | number[]) => T
  attrScrollamount: (_?: string | number | string[] | number[]) => T
  attrScrolldelay: (_?: string | number | string[] | number[]) => T
  attrScrolling: (_?: string | number | string[] | number[]) => T
  attrSelected: (_?: string | number | string[] | number[]) => T
  attrShadowroot: (_?: string | number | string[] | number[]) => T
  attrShape: (_?: string | number | string[] | number[]) => T
  attrSize: (_?: string | number | string[] | number[]) => T
  attrSizes: (_?: string | number | string[] | number[]) => T
  attrSlot: (_?: string | number | string[] | number[]) => T
  attrSpan: (_?: string | number | string[] | number[]) => T
  attrSpellcheck: (_?: string | number | string[] | number[]) => T
  attrSrc: (_?: string | number | string[] | number[]) => T
  attrSrcdoc: (_?: string | number | string[] | number[]) => T
  attrSrclang: (_?: string | number | string[] | number[]) => T
  attrSrcset: (_?: string | number | string[] | number[]) => T
  attrStandby: (_?: string | number | string[] | number[]) => T
  attrStart: (_?: string | number | string[] | number[]) => T
  attrStep: (_?: string | number | string[] | number[]) => T
  attrStyle: (_?: string | number | string[] | number[]) => T
  attrSummary: (_?: string | number | string[] | number[]) => T
  attrTabindex: (_?: string | number | string[] | number[]) => T
  attrTarget: (_?: string | number | string[] | number[]) => T
  attrText: (_?: string | number | string[] | number[]) => T
  attrTitle: (_?: string | number | string[] | number[]) => T
  attrTopmargin: (_?: string | number | string[] | number[]) => T
  attrTranslate: (_?: string | number | string[] | number[]) => T
  attrTruespeed: (_?: string | number | string[] | number[]) => T
  attrType: (_?: string | number | string[] | number[]) => T
  attrUsemap: (_?: string | number | string[] | number[]) => T
  attrValign: (_?: string | number | string[] | number[]) => T
  attrValue: (_?: string | number | string[] | number[]) => T
  attrValuetype: (_?: string | number | string[] | number[]) => T
  attrVersion: (_?: string | number | string[] | number[]) => T
  attrViewbox: (_?: string | number | string[] | number[]) => T
  attrVlink: (_?: string | number | string[] | number[]) => T
  attrVspace: (_?: string | number | string[] | number[]) => T
  attrWebkitallowfullscreen: (_?: string | number | string[] | number[]) => T
  attrWidth: (_?: string | number | string[] | number[]) => T
  attrWrap: (_?: string | number | string[] | number[]) => T
  attrXMozErrormessage: (_?: string | number | string[] | number[]) => T
  attrXmlns: (_?: string | number | string[] | number[]) => T
}

export interface Properties<T> {
  preColor?: Globals | DataType.Color
  accentColor: (_?: Globals | DataType.Color | "auto") => T
  alignContent: (_?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {})) => T
  alignItems: (_?: Globals | DataType.SelfPosition | "baseline" | "normal" | "stretch" | (string & {})) => T
  alignSelf: (_?: Globals | DataType.SelfPosition | "auto" | "baseline" | "normal" | "stretch" | (string & {})) => T
  alignTracks: (_?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {})) => T
  all: (_?: Globals) => T
  animation: (_?: Globals | DataType.SingleAnimation | (string & {})) => T
  animationComposition: (_?: Globals | (string & {})) => T
  animationDelay: (_?: Globals | (string & {})) => T
  animationDirection: (_?: Globals | DataType.SingleAnimationDirection | (string & {})) => T
  animationDuration: (_?: Globals | (string & {})) => T
  animationFillMode: (_?: Globals | DataType.SingleAnimationFillMode | (string & {})) => T
  animationIterationCount: (_?: Globals | "infinite" | (string & {}) | (number & {})) => T
  animationName: (_?: Globals | "none" | (string & {})) => T
  animationPlayState: (_?: Globals | "paused" | "running" | (string & {})) => T
  animationTimeline: (_?: Globals | DataType.SingleAnimationTimeline | (string & {})) => T
  animationTimingFunction: (_?: Globals | DataType.EasingFunction | (string & {})) => T
  appearance: (_?: Globals | DataType.CompatAuto | "auto" | "menulist-button" | "none" | "textfield") => T
  aspectRatio: (_?: Globals | "auto" | (string & {}) | (number & {})) => T
  azimuth: (_?:
    | Globals
    | "behind"
    | "center"
    | "center-left"
    | "center-right"
    | "far-left"
    | "far-right"
    | "left"
    | "left-side"
    | "leftwards"
    | "right"
    | "right-side"
    | "rightwards"
    | (string & {})) => T
  backdropFilter: (_?: Globals | "none" | (string & {})) => T
  backfaceVisibility: (_?: Globals | "hidden" | "visible") => T
  background: (_?: Globals | DataType.FinalBgLayer | (string & {})) => T
  backgroundAttachment: (_?: Globals | DataType.Attachment | (string & {})) => T
  backgroundBlendMode: (_?: Globals | DataType.BlendMode | (string & {})) => T
  backgroundClip: (_?: Globals | DataType.Box | (string & {})) => T
  backgroundColor: (_?: Globals | DataType.Color) => T
  backgroundImage: (_?: Globals | "none" | (string & {})) => T
  backgroundOrigin: (_?: Globals | DataType.Box | (string & {})) => T
  backgroundPosition: (_?: Globals | DataType.BgPosition | (string & {})) => T
  backgroundPositionX: (_?: Globals | "center" | "left" | "right" | "x-end" | "x-start" | (string & {})) => T
  backgroundPositionY: (_?: Globals | "bottom" | "center" | "top" | "y-end" | "y-start" | (string & {})) => T
  backgroundRepeat: (_?: Globals | DataType.RepeatStyle | (string & {})) => T
  backgroundSize: (_?: Globals | DataType.BgSize | (string & {})) => T
  blockOverflow: (_?: Globals | "clip" | "ellipsis" | (string & {})) => T
  blockSize: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "auto"
    | "fit-content"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  border: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderBlock: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderBlockColor: (_?: Globals | DataType.Color | (string & {})) => T
  borderBlockEnd: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderBlockEndColor: (_?: Globals | DataType.Color) => T
  borderBlockEndStyle: (_?: Globals | DataType.LineStyle) => T
  borderBlockEndWidth: (_?: Globals | DataType.LineWidth) => T
  borderBlockStart: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderBlockStartColor: (_?: Globals | DataType.Color) => T
  borderBlockStartStyle: (_?: Globals | DataType.LineStyle) => T
  borderBlockStartWidth: (_?: Globals | DataType.LineWidth) => T
  borderBlockStyle: (_?: Globals | DataType.LineStyle) => T
  borderBlockWidth: (_?: Globals | DataType.LineWidth) => T
  borderBottom: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderBottomColor: (_?: Globals | DataType.Color) => T
  borderBottomLeftRadius: (_?: Globals | (string & {})) => T
  borderBottomRightRadius: (_?: Globals | (string & {})) => T
  borderBottomStyle: (_?: Globals | DataType.LineStyle) => T
  borderBottomWidth: (_?: Globals | DataType.LineWidth) => T
  borderCollapse: (_?: Globals | "collapse" | "separate") => T
  borderColor: (_?: Globals | DataType.Color | (string & {})) => T
  borderEndEndRadius: (_?: Globals | (string & {})) => T
  borderEndStartRadius: (_?: Globals | (string & {})) => T
  borderImage: (_?: Globals | "none" | "repeat" | "round" | "space" | "stretch" | (string & {}) | (number & {})) => T
  borderImageOutset: (_?: Globals | (string & {}) | (number & {})) => T
  borderImageRepeat: (_?: Globals | "repeat" | "round" | "space" | "stretch" | (string & {})) => T
  borderImageSlice: (_?: Globals | (string & {}) | (number & {})) => T
  borderImageSource: (_?: Globals | "none" | (string & {})) => T
  borderImageWidth: (_?: Globals | "auto" | (string & {}) | (number & {})) => T
  borderInline: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderInlineColor: (_?: Globals | DataType.Color | (string & {})) => T
  borderInlineEnd: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderInlineEndColor: (_?: Globals | DataType.Color) => T
  borderInlineEndStyle: (_?: Globals | DataType.LineStyle) => T
  borderInlineEndWidth: (_?: Globals | DataType.LineWidth) => T
  borderInlineStart: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderInlineStartColor: (_?: Globals | DataType.Color) => T
  borderInlineStartStyle: (_?: Globals | DataType.LineStyle) => T
  borderInlineStartWidth: (_?: Globals | DataType.LineWidth) => T
  borderInlineStyle: (_?: Globals | DataType.LineStyle) => T
  borderInlineWidth: (_?: Globals | DataType.LineWidth) => T
  borderLeft: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderLeftColor: (_?: Globals | DataType.Color) => T
  borderLeftStyle: (_?: Globals | DataType.LineStyle) => T
  borderLeftWidth: (_?: Globals | DataType.LineWidth) => T
  borderRadius: (_?: Globals | (string & {})) => T
  borderRight: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderRightColor: (_?: Globals | DataType.Color) => T
  borderRightStyle: (_?: Globals | DataType.LineStyle) => T
  borderRightWidth: (_?: Globals | DataType.LineWidth) => T
  borderSpacing: (_?: Globals | (string & {})) => T
  borderStartEndRadius: (_?: Globals | (string & {})) => T
  borderStartStartRadius: (_?: Globals | (string & {})) => T
  borderStyle: (_?: Globals | DataType.LineStyle | (string & {})) => T
  borderTop: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  borderTopColor: (_?: Globals | DataType.Color) => T
  borderTopLeftRadius: (_?: Globals | (string & {})) => T
  borderTopRightRadius: (_?: Globals | (string & {})) => T
  borderTopStyle: (_?: Globals | DataType.LineStyle) => T
  borderTopWidth: (_?: Globals | DataType.LineWidth) => T
  borderWidth: (_?: Globals | DataType.LineWidth | (string & {})) => T
  bottom: (_?: Globals | "auto" | (string & {})) => T
  boxAlign: (_?: Globals | "baseline" | "center" | "end" | "start" | "stretch") => T
  boxDecorationBreak: (_?: Globals | "clone" | "slice") => T
  boxDirection: (_?: Globals | "inherit" | "normal" | "reverse") => T
  boxFlex: (_?: Globals | (number & {}) | (string & {})) => T
  boxFlexGroup: (_?: Globals | (number & {}) | (string & {})) => T
  boxLines: (_?: Globals | "multiple" | "single") => T
  boxOrdinalGroup: (_?: Globals | (number & {}) | (string & {})) => T
  boxOrient: (_?: Globals | "block-axis" | "horizontal" | "inherit" | "inline-axis" | "vertical") => T
  boxPack: (_?: Globals | "center" | "end" | "justify" | "start") => T
  boxShadow: (_?: Globals | "none" | (string & {})) => T
  boxSizing: (_?: Globals | "border-box" | "content-box") => T
  breakAfter: (_?:
    | Globals
    | "all"
    | "always"
    | "auto"
    | "avoid"
    | "avoid-column"
    | "avoid-page"
    | "avoid-region"
    | "column"
    | "left"
    | "page"
    | "recto"
    | "region"
    | "right"
    | "verso") => T

  breakBefore: (_?:
    | Globals
    | "all"
    | "always"
    | "auto"
    | "avoid"
    | "avoid-column"
    | "avoid-page"
    | "avoid-region"
    | "column"
    | "left"
    | "page"
    | "recto"
    | "region"
    | "right"
    | "verso") => T
  breakInside: (_?: Globals | "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region") => T
  captionSide: (_?: Globals | "block-end" | "block-start" | "bottom" | "inline-end" | "inline-start" | "top") => T
  caretColor: (_?: Globals | DataType.Color | "auto") => T
  clear: (_?: Globals | "both" | "inline-end" | "inline-start" | "left" | "none" | "right") => T
  clip: (_?: Globals | "auto" | (string & {})) => T
  clipPath: (_?: Globals | DataType.GeometryBox | "none" | (string & {})) => T
  color: (_?: Globals | DataType.Color) => T
  printColorAdjust: (_?: Globals | "economy" | "exact") => T
  colorScheme: (_?: Globals | "dark" | "light" | "normal" | (string & {})) => T
  columnCount: (_?: Globals | "auto" | (number & {}) | (string & {})) => T
  columnFill: (_?: Globals | "auto" | "balance" | "balance-all") => T
  columnGap: (_?: Globals | "normal" | (string & {})) => T
  columnRule: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  columnRuleColor: (_?: Globals | DataType.Color) => T
  columnRuleStyle: (_?: Globals | DataType.LineStyle | (string & {})) => T
  columnRuleWidth: (_?: Globals | DataType.LineWidth | (string & {})) => T
  columnSpan: (_?: Globals | "all" | "none") => T
  columnWidth: (_?: Globals | "auto") => T
  columns: (_?: Globals | "auto" | (string & {}) | (number & {})) => T
  contain: (_?: Globals | "content" | "inline-size" | "layout" | "none" | "paint" | "size" | "strict" | "style" | (string & {})) => T
  content: (_?: Globals | DataType.ContentList | "none" | "normal" | (string & {})) => T
  contentVisibility: (_?: Globals | "auto" | "hidden" | "visible") => T
  counterIncrement: (_?: Globals | "none" | (string & {})) => T
  counterReset: (_?: Globals | "none" | (string & {})) => T
  counterSet: (_?: Globals | "none" | (string & {})) => T
  cursor: (_?:
    | Globals
    | "-moz-grab"
    | "-webkit-grab"
    | "alias"
    | "all-scroll"
    | "auto"
    | "cell"
    | "col-resize"
    | "context-menu"
    | "copy"
    | "crosshair"
    | "default"
    | "e-resize"
    | "ew-resize"
    | "grab"
    | "grabbing"
    | "help"
    | "move"
    | "n-resize"
    | "ne-resize"
    | "nesw-resize"
    | "no-drop"
    | "none"
    | "not-allowed"
    | "ns-resize"
    | "nw-resize"
    | "nwse-resize"
    | "pointer"
    | "progress"
    | "row-resize"
    | "s-resize"
    | "se-resize"
    | "sw-resize"
    | "text"
    | "vertical-text"
    | "w-resize"
    | "wait"
    | "zoom-in"
    | "zoom-out"
    | (string & {})) => T
  direction: (_?: Globals | "ltr" | "rtl") => T
  display: (_?:
    | Globals
    | DataType.DisplayOutside
    | DataType.DisplayInside
    | DataType.DisplayInternal
    | DataType.DisplayLegacy
    | "contents"
    | "list-item"
    | "none"
    | (string & {})) => T
  emptyCells: (_?: Globals | "hide" | "show") => T
  filter: (_?: Globals | "none" | (string & {})) => T
  flex: (_?: Globals | "auto" | "content" | "fit-content" | "max-content" | "min-content" | "none" | (string & {}) | (number & {})) => T
  flexBasis: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-auto"
    | "auto"
    | "content"
    | "fit-content"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  flexDirection: (_?: Globals | "column" | "column-reverse" | "row" | "row-reverse") => T
  flexFlow: (_?: Globals | "column" | "column-reverse" | "nowrap" | "row" | "row-reverse" | "wrap" | "wrap-reverse" | (string & {})) => T
  flexGrow: (_?: Globals | (number & {}) | (string & {})) => T
  flexShrink: (_?: Globals | (number & {}) | (string & {})) => T
  flexWrap: (_?: Globals | "nowrap" | "wrap" | "wrap-reverse") => T
  float: (_?: Globals | "inline-end" | "inline-start" | "left" | "none" | "right") => T
  font: (_?: Globals | "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar" | (string & {})) => T
  fontFamily: (_?: Globals | DataType.GenericFamily | (string & {})) => T
  fontFeatureSettings: (_?: Globals | "normal" | (string & {})) => T
  fontKerning: (_?: Globals | "auto" | "none" | "normal") => T
  fontLanguageOverride: (_?: Globals | "normal" | (string & {})) => T
  fontOpticalSizing: (_?: Globals | "auto" | "none") => T
  fontSize: (_?: Globals | DataType.AbsoluteSize | "larger" | "smaller" | (string & {})) => T
  fontSizeAdjust: (_?: Globals | "from-font" | "none" | (string & {}) | (number & {})) => T
  fontSmooth: (_?: Globals | DataType.AbsoluteSize | "always" | "auto" | "never") => T
  fontStretch: (_?: Globals | DataType.FontStretchAbsolute) => T
  fontStyle: (_?: Globals | "italic" | "normal" | "oblique" | (string & {})) => T
  fontSynthesis: (_?: Globals | "none" | "small-caps" | "style" | "weight" | (string & {})) => T
  fontVariant: (_?:
    | Globals
    | DataType.EastAsianVariantValues
    | "all-petite-caps"
    | "all-small-caps"
    | "common-ligatures"
    | "contextual"
    | "diagonal-fractions"
    | "discretionary-ligatures"
    | "full-width"
    | "historical-forms"
    | "historical-ligatures"
    | "lining-nums"
    | "no-common-ligatures"
    | "no-contextual"
    | "no-discretionary-ligatures"
    | "no-historical-ligatures"
    | "none"
    | "normal"
    | "oldstyle-nums"
    | "ordinal"
    | "petite-caps"
    | "proportional-nums"
    | "proportional-width"
    | "ruby"
    | "slashed-zero"
    | "small-caps"
    | "stacked-fractions"
    | "tabular-nums"
    | "titling-caps"
    | "unicase"
    | (string & {})) => T
  fontVariantAlternates: (_?: Globals | "historical-forms" | "normal" | (string & {})) => T
  fontVariantCaps: (_?: Globals | "all-petite-caps" | "all-small-caps" | "normal" | "petite-caps" | "small-caps" | "titling-caps" | "unicase") => T
  fontVariantEastAsian: (_?: Globals | DataType.EastAsianVariantValues | "full-width" | "normal" | "proportional-width" | "ruby" | (string & {})) => T
  fontVariantLigatures: (_?:
    | Globals
    | "common-ligatures"
    | "contextual"
    | "discretionary-ligatures"
    | "historical-ligatures"
    | "no-common-ligatures"
    | "no-contextual"
    | "no-discretionary-ligatures"
    | "no-historical-ligatures"
    | "none"
    | "normal"
    | (string & {})) => T
  fontVariantNumeric: (_?:
    | Globals
    | "diagonal-fractions"
    | "lining-nums"
    | "normal"
    | "oldstyle-nums"
    | "ordinal"
    | "proportional-nums"
    | "slashed-zero"
    | "stacked-fractions"
    | "tabular-nums"
    | (string & {})) => T
  fontVariantPosition: (_?: Globals | "normal" | "sub" | "super") => T
  fontVariationSettings: (_?: Globals | "normal" | (string & {})) => T
  fontWeight: (_?: Globals | DataType.FontWeightAbsolute | "bolder" | "lighter") => T
  forcedColorAdjust: (_?: Globals | "auto" | "none") => T
  gap: (_?: Globals | "normal" | (string & {})) => T
  grid: (_?: Globals | "none" | (string & {})) => T
  gridArea: (_?: Globals | DataType.GridLine | (string & {})) => T
  gridAutoColumns: (_?: Globals | DataType.TrackBreadth | (string & {})) => T
  gridAutoFlow: (_?: Globals | "column" | "dense" | "row" | (string & {})) => T
  gridAutoRows: (_?: Globals | DataType.TrackBreadth | (string & {})) => T
  gridColumn: (_?: Globals | DataType.GridLine | (string & {})) => T
  gridColumnEnd: (_?: Globals | DataType.GridLine) => T
  gridColumnGap: (_?: Globals | (string & {})) => T
  gridColumnStart: (_?: Globals | DataType.GridLine) => T
  gridGap: (_?: Globals | (string & {})) => T
  gridRow: (_?: Globals | DataType.GridLine | (string & {})) => T
  gridRowEnd: (_?: Globals | DataType.GridLine) => T
  gridRowGap: (_?: Globals | (string & {})) => T
  gridRowStart: (_?: Globals | DataType.GridLine) => T
  gridTemplate: (_?: Globals | "none" | (string & {})) => T
  gridTemplateAreas: (_?: Globals | "none" | (string & {})) => T
  gridTemplateColumns: (_?: Globals | DataType.TrackBreadth | "none" | "subgrid" | (string & {})) => T
  gridTemplateRows: (_?: Globals | DataType.TrackBreadth | "none" | "subgrid" | (string & {})) => T
  hangingPunctuation: (_?: Globals | "allow-end" | "first" | "force-end" | "last" | "none" | (string & {})) => T
  height: (_?:
    | Globals
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fit-content"
    | "auto"
    | "fit-content"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  hyphenateCharacter: (_?: Globals | "auto" | (string & {})) => T
  hyphens: (_?: Globals | "auto" | "manual" | "none") => T
  imageOrientation: (_?: Globals | "flip" | "from-image" | (string & {})) => T
  imageRendering: (_?: Globals | "-moz-crisp-edges" | "-webkit-optimize-contrast" | "auto" | "crisp-edges" | "pixelated") => T
  imageResolution: (_?: Globals | "from-image" | (string & {})) => T
  imeMode: (_?: Globals | "active" | "auto" | "disabled" | "inactive" | "normal") => T
  initialLetter: (_?: Globals | "normal" | (string & {}) | (number & {})) => T
  inlineSize: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "auto"
    | "fit-content"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  inputSecurity: (_?: Globals | "auto" | "none") => T
  inset: (_?: Globals | "auto" | (string & {})) => T
  insetBlock: (_?: Globals | "auto" | (string & {})) => T
  insetBlockEnd: (_?: Globals | "auto" | (string & {})) => T
  insetBlockStart: (_?: Globals | "auto" | (string & {})) => T
  insetInline: (_?: Globals | "auto" | (string & {})) => T
  insetInlineEnd: (_?: Globals | "auto" | (string & {})) => T
  insetInlineStart: (_?: Globals | "auto" | (string & {})) => T
  isolation: (_?: Globals | "auto" | "isolate") => T
  justifyContent: (_?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "left" | "normal" | "right" | (string & {})) => T
  justifyItems: (_?: Globals | DataType.SelfPosition | "baseline" | "left" | "legacy" | "normal" | "right" | "stretch" | (string & {})) => T
  justifySelf: (_?: Globals | DataType.SelfPosition | "auto" | "baseline" | "left" | "normal" | "right" | "stretch" | (string & {})) => T
  justifyTracks: (_?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "left" | "normal" | "right" | (string & {})) => T
  left: (_?: Globals | "auto" | (string & {})) => T
  letterSpacing: (_?: Globals | "normal") => T
  lineBreak: (_?: Globals | "anywhere" | "auto" | "loose" | "normal" | "strict") => T
  lineClamp: (_?: Globals | "none" | (number & {}) | (string & {})) => T
  lineHeight: (_?: Globals | "normal" | (string & {}) | (number & {})) => T
  lineHeightStep: (_?: Globals) => T
  listStyle: (_?: Globals | "inside" | "none" | "outside" | (string & {})) => T
  listStyleImage: (_?: Globals | "none" | (string & {})) => T
  listStylePosition: (_?: Globals | "inside" | "outside") => T
  listStyleType: (_?: Globals | "none" | (string & {})) => T
  margin: (_?: Globals | "auto" | (string & {})) => T
  marginBlock: (_?: Globals | "auto" | (string & {})) => T
  marginBlockEnd: (_?: Globals | "auto" | (string & {})) => T
  marginBlockStart: (_?: Globals | "auto" | (string & {})) => T
  marginBottom: (_?: Globals | "auto" | (string & {})) => T
  marginInline: (_?: Globals | "auto" | (string & {})) => T
  marginInlineEnd: (_?: Globals | "auto" | (string & {})) => T
  marginInlineStart: (_?: Globals | "auto" | (string & {})) => T
  marginLeft: (_?: Globals | "auto" | (string & {})) => T
  marginRight: (_?: Globals | "auto" | (string & {})) => T
  marginTop: (_?: Globals | "auto" | (string & {})) => T
  mask: (_?: Globals | DataType.MaskLayer | (string & {})) => T
  maskBorder: (_?: Globals | "alpha" | "luminance" | "none" | "repeat" | "round" | "space" | "stretch" | (string & {}) | (number & {})) => T
  maskBorderMode: (_?: Globals | "alpha" | "luminance") => T
  maskBorderOutset: (_?: Globals | (string & {}) | (number & {})) => T
  maskBorderRepeat: (_?: Globals | "repeat" | "round" | "space" | "stretch" | (string & {})) => T
  maskBorderSlice: (_?: Globals | (string & {}) | (number & {})) => T
  maskBorderSource: (_?: Globals | "none" | (string & {})) => T
  maskBorderWidth: (_?: Globals | "auto" | (string & {}) | (number & {})) => T
  maskClip: (_?: Globals | DataType.GeometryBox | "no-clip" | (string & {})) => T
  maskComposite: (_?: Globals | DataType.CompositingOperator | (string & {})) => T
  maskImage: (_?: Globals | "none" | (string & {})) => T
  maskMode: (_?: Globals | DataType.MaskingMode | (string & {})) => T
  maskOrigin: (_?: Globals | DataType.GeometryBox | (string & {})) => T
  maskPosition: (_?: Globals | DataType.Position | (string & {})) => T
  maskRepeat: (_?: Globals | DataType.RepeatStyle | (string & {})) => T
  maskSize: (_?: Globals | DataType.BgSize | (string & {})) => T
  maskType: (_?: Globals | "alpha" | "luminance") => T
  mathDepth: (_?: Globals | "auto-add" | (string & {}) | (number & {})) => T
  mathShift: (_?: Globals | "compact" | "normal") => T
  mathStyle: (_?: Globals | "compact" | "normal") => T
  maxBlockSize: (_?:
    | Globals
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "fit-content"
    | "max-content"
    | "min-content"
    | "none"
    | (string & {})) => T
  maxHeight: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fit-content"
    | "-webkit-max-content"
    | "-webkit-min-content"
    | "fit-content"
    | "intrinsic"
    | "max-content"
    | "min-content"
    | "none"
    | (string & {})) => T
  maxInlineSize: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "fit-content"
    | "max-content"
    | "min-content"
    | "none"
    | (string & {})) => T
  maxLines: (_?: Globals | "none" | (number & {}) | (string & {})) => T
  maxWidth: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fit-content"
    | "-webkit-max-content"
    | "-webkit-min-content"
    | "fit-content"
    | "intrinsic"
    | "max-content"
    | "min-content"
    | "none"
    | (string & {})) => T
  minBlockSize: (_?:
    | Globals
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "auto"
    | "fit-content"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  minHeight: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fit-content"
    | "-webkit-max-content"
    | "-webkit-min-content"
    | "auto"
    | "fit-content"
    | "intrinsic"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  minInlineSize: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "auto"
    | "fit-content"
    | "max-content"
    | "min-content"
    | (string & {})) => T
  minWidth: (_?:
    | Globals
    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fill-available"
    | "-webkit-fit-content"
    | "-webkit-max-content"
    | "-webkit-min-content"
    | "auto"
    | "fit-content"
    | "intrinsic"
    | "max-content"
    | "min-content"
    | "min-intrinsic"
    | (string & {})) => T
  mixBlendMode: (_?: Globals | DataType.BlendMode | "plus-lighter") => T
  offset: (_?: Globals | DataType.Position | DataType.GeometryBox | "auto" | "none" | (string & {})) => T
  offsetDistance: (_?: Globals | (string & {})) => T
  offsetPath: (_?: Globals | DataType.GeometryBox | "none" | (string & {})) => T
  offsetRotate: (_?: Globals | "auto" | "reverse" | (string & {})) => T
  objectFit: (_?: Globals | "contain" | "cover" | "fill" | "none" | "scale-down") => T
  objectPosition: (_?: Globals | DataType.Position) => T
  offsetAnchor: (_?: Globals | DataType.Position | "auto") => T
  opacity: (_?: Globals | (string & {}) | (number & {})) => T
  order: (_?: Globals | (number & {}) | (string & {})) => T
  orphans: (_?: Globals | (number & {}) | (string & {})) => T
  outline: (_?: Globals | DataType.Color | DataType.LineStyle | DataType.LineWidth | "auto" | "invert" | (string & {})) => T
  outlineColor: (_?: Globals | DataType.Color | "invert") => T
  outlineOffset: (_?: Globals) => T
  outlineStyle: (_?: Globals | DataType.LineStyle | "auto" | (string & {})) => T
  outlineWidth: (_?: Globals | DataType.LineWidth) => T
  overflow: (_?: Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible" | (string & {})) => T
  overflowAnchor: (_?: Globals | "auto" | "none") => T
  overflowBlock: (_?: Globals | "auto" | "clip" | "hidden" | "scroll" | "visible") => T
  overflowClipBox: (_?: Globals | "content-box" | "padding-box") => T
  overflowClipMargin: (_?: Globals | DataType.VisualBox | (string & {})) => T
  overflowInline: (_?: Globals | "auto" | "clip" | "hidden" | "scroll" | "visible") => T
  overflowWrap: (_?: Globals | "anywhere" | "break-word" | "normal") => T
  overflowX: (_?: Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible") => T
  overflowY: (_?: Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible") => T
  overscrollBehavior: (_?: Globals | "auto" | "contain" | "none" | (string & {})) => T
  overscrollBehaviorBlock: (_?: Globals | "auto" | "contain" | "none") => T
  overscrollBehaviorInline: (_?: Globals | "auto" | "contain" | "none") => T
  overscrollBehaviorX: (_?: Globals | "auto" | "contain" | "none") => T
  overscrollBehaviorY: (_?: Globals | "auto" | "contain" | "none") => T
  padding: (_?: Globals | (string & {})) => T
  paddingBlock: (_?: Globals | (string & {})) => T
  paddingBlockEnd: (_?: Globals | (string & {})) => T
  paddingBlockStart: (_?: Globals | (string & {})) => T
  paddingBottom: (_?: Globals | (string & {})) => T
  paddingInline: (_?: Globals | (string & {})) => T
  paddingInlineEnd: (_?: Globals | (string & {})) => T
  paddingInlineStart: (_?: Globals | (string & {})) => T
  paddingLeft: (_?: Globals | (string & {})) => T
  paddingRight: (_?: Globals | (string & {})) => T
  paddingTop: (_?: Globals | (string & {})) => T
  pageBreakAfter: (_?: Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso") => T
  pageBreakBefore: (_?: Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso") => T
  pageBreakInside: (_?: Globals | "auto" | "avoid") => T
  paintOrder: (_?: Globals | "fill" | "markers" | "normal" | "stroke" | (string & {})) => T
  perspective: (_?: Globals | "none") => T
  perspectiveOrigin: (_?: Globals | DataType.Position) => T
  placeContent: (_?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {})) => T
  placeItems: (_?: Globals | DataType.SelfPosition | "baseline" | "normal" | "stretch" | (string & {})) => T
  placeSelf: (_?: Globals | DataType.SelfPosition | "auto" | "baseline" | "normal" | "stretch" | (string & {})) => T
  pointerEvents: (_?: Globals | "all" | "auto" | "fill" | "inherit" | "none" | "painted" | "stroke" | "visible" | "visibleFill" | "visiblePainted" | "visibleStroke") => T
  position: (_?: Globals | "-webkit-sticky" | "absolute" | "fixed" | "relative" | "static" | "sticky") => T
  quotes: (_?: Globals | "auto" | "none" | (string & {})) => T
  resize: (_?: Globals | "block" | "both" | "horizontal" | "inline" | "none" | "vertical") => T
  right: (_?: Globals | "auto" | (string & {})) => T
  rotate: (_?: Globals | "none" | (string & {})) => T
  rowGap: (_?: Globals | "normal" | (string & {})) => T
  rubyAlign: (_?: Globals | "center" | "space-around" | "space-between" | "start") => T
  rubyMerge: (_?: Globals | "auto" | "collapse" | "separate") => T
  rubyPosition: (_?: Globals | "alternate" | "inter-character" | "over" | "under" | (string & {})) => T
  scale: (_?: Globals | "none" | (string & {}) | (number & {})) => T
  scrollBehavior: (_?: Globals | "auto" | "smooth") => T
  scrollMargin: (_?: Globals | (string & {})) => T
  scrollMarginBlock: (_?: Globals | (string & {})) => T
  scrollMarginBlockEnd: (_?: Globals) => T
  scrollMarginBlockStart: (_?: Globals) => T
  scrollMarginBottom: (_?: Globals) => T
  scrollMarginInline: (_?: Globals | (string & {})) => T
  scrollMarginInlineEnd: (_?: Globals) => T
  scrollMarginInlineStart: (_?: Globals) => T
  scrollMarginLeft: (_?: Globals) => T
  scrollMarginRight: (_?: Globals) => T
  scrollMarginTop: (_?: Globals) => T
  scrollPadding: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingBlock: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingBlockEnd: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingBlockStart: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingBottom: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingInline: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingInlineEnd: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingInlineStart: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingLeft: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingRight: (_?: Globals | "auto" | (string & {})) => T
  scrollPaddingTop: (_?: Globals | "auto" | (string & {})) => T
  scrollSnapAlign: (_?: Globals | "center" | "end" | "none" | "start" | (string & {})) => T
  scrollSnapCoordinate: (_?: Globals | DataType.Position | "none" | (string & {})) => T
  scrollSnapDestination: (_?: Globals | DataType.Position) => T
  scrollSnapPointsX: (_?: Globals | "none" | (string & {})) => T
  scrollSnapPointsY: (_?: Globals | "none" | (string & {})) => T
  scrollSnapStop: (_?: Globals | "always" | "normal") => T
  scrollSnapType: (_?: Globals | "block" | "both" | "inline" | "none" | "x" | "y" | (string & {})) => T
  scrollSnapTypeX: (_?: Globals | "mandatory" | "none" | "proximity") => T
  scrollSnapTypeY: (_?: Globals | "mandatory" | "none" | "proximity") => T
  scrollbarColor: (_?: Globals | "auto" | (string & {})) => T
  scrollbarGutter: (_?: Globals | "auto" | "stable" | (string & {})) => T
  scrollbarWidth: (_?: Globals | "auto" | "none" | "thin") => T
  shapeImageThreshold: (_?: Globals | (string & {}) | (number & {})) => T
  shapeMargin: (_?: Globals | (string & {})) => T
  shapeOutside: (_?: Globals | DataType.Box | "margin-box" | "none" | (string & {})) => T
  tabSize: (_?: Globals | (number & {}) | (string & {})) => T
  tableLayout: (_?: Globals | "auto" | "fixed") => T
  textAlign: (_?: Globals | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start") => T
  textAlignLast: (_?: Globals | "auto" | "center" | "end" | "justify" | "left" | "right" | "start") => T
  textCombineUpright: (_?: Globals | "all" | "none" | (string & {})) => T
  textDecoration: (_?:
    | Globals
    | DataType.Color

    | "auto"
    | "blink"
    | "dashed"
    | "dotted"
    | "double"
    | "from-font"
    | "grammar-error"
    | "line-through"
    | "none"
    | "overline"
    | "solid"
    | "spelling-error"
    | "underline"
    | "wavy"
    | (string & {})) => T
  textDecorationColor: (_?: Globals | DataType.Color) => T
  textDecorationLine: (_?: Globals | "blink" | "grammar-error" | "line-through" | "none" | "overline" | "spelling-error" | "underline" | (string & {})) => T
  textDecorationSkip: (_?: Globals | "box-decoration" | "edges" | "leading-spaces" | "none" | "objects" | "spaces" | "trailing-spaces" | (string & {})) => T
  textDecorationSkipInk: (_?: Globals | "all" | "auto" | "none") => T
  textDecorationStyle: (_?: Globals | "dashed" | "dotted" | "double" | "solid" | "wavy") => T
  textDecorationThickness: (_?: Globals | "auto" | "from-font" | (string & {})) => T
  textEmphasis: (_?: Globals | DataType.Color | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | (string & {})) => T
  textEmphasisColor: (_?: Globals | DataType.Color) => T
  textEmphasisPosition: (_?: Globals | (string & {})) => T
  textEmphasisStyle: (_?: Globals | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | (string & {})) => T
  textIndent: (_?: Globals | (string & {})) => T
  textJustify: (_?: Globals | "auto" | "inter-character" | "inter-word" | "none") => T
  textOrientation: (_?: Globals | "mixed" | "sideways" | "upright") => T
  textOverflow: (_?: Globals | "clip" | "ellipsis" | (string & {})) => T
  textRendering: (_?: Globals | "auto" | "geometricPrecision" | "optimizeLegibility" | "optimizeSpeed") => T
  textShadow: (_?: Globals | "none" | (string & {})) => T
  textSizeAdjust: (_?: Globals | "auto" | "none" | (string & {})) => T
  textTransform: (_?: Globals | "capitalize" | "full-size-kana" | "full-width" | "lowercase" | "none" | "uppercase") => T
  textUnderlineOffset: (_?: Globals | "auto" | (string & {})) => T
  textUnderlinePosition: (_?: Globals | "auto" | "from-font" | "left" | "right" | "under" | (string & {})) => T
  top: (_?: Globals | "auto" | (string & {})) => T
  touchAction: (_?:
    | Globals
    | "-ms-manipulation"
    | "-ms-none"
    | "-ms-pinch-zoom"
    | "auto"
    | "manipulation"
    | "none"
    | "pan-down"
    | "pan-left"
    | "pan-right"
    | "pan-up"
    | "pan-x"
    | "pan-y"
    | "pinch-zoom"
    | (string & {})) => T
  transform: (_?: Globals | "none" | (string & {})) => T
  transformBox: (_?: Globals | "border-box" | "content-box" | "fill-box" | "stroke-box" | "view-box") => T
  transformOrigin: (_?: Globals | "bottom" | "center" | "left" | "right" | "top" | (string & {})) => T
  transformStyle: (_?: Globals | "flat" | "preserve-3d") => T
  transition: (_?: Globals | DataType.SingleTransition | (string & {})) => T
  transitionDelay: (_?: Globals | (string & {})) => T
  transitionDuration: (_?: Globals | (string & {})) => T
  transitionProperty: (_?: Globals | "all" | "none" | (string & {})) => T
  transitionTimingFunction: (_?: Globals | DataType.EasingFunction | (string & {})) => T

  translate: (_?: Globals | "none" | (string & {})) => T

  unicodeBidi: (_?:
    | Globals
    | "-moz-isolate"
    | "-moz-isolate-override"
    | "-moz-plaintext"
    | "-webkit-isolate"
    | "-webkit-isolate-override"
    | "-webkit-plaintext"
    | "bidi-override"
    | "embed"
    | "isolate"
    | "isolate-override"
    | "normal"
    | "plaintext") => T
  userSelect: (_?: Globals | "-moz-none" | "all" | "auto" | "contain" | "element" | "none" | "text") => T
  verticalAlign: (_?:
    | Globals

    | "baseline"
    | "bottom"
    | "middle"
    | "sub"
    | "super"
    | "text-bottom"
    | "text-top"
    | "top"
    | (string & {})) => T
  visibility: (_?: Globals | "collapse" | "hidden" | "visible") => T
  whiteSpace: (_?: Globals | "-moz-pre-wrap" | "break-spaces" | "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap") => T
  widows: (_?: Globals | (number & {}) | (string & {})) => T
  width: (_?:
    | Globals

    | "-moz-fit-content"
    | "-moz-max-content"
    | "-moz-min-content"
    | "-webkit-fit-content"
    | "-webkit-max-content"
    | "auto"
    | "fit-content"
    | "intrinsic"
    | "max-content"
    | "min-content"
    | "min-intrinsic"
    | (string & {})) => T
  willChange: (_?: Globals | DataType.AnimateableFeature | "auto" | (string & {})) => T
  wordBreak: (_?: Globals | "break-all" | "break-word" | "keep-all" | "normal") => T
  wordSpacing: (_?: Globals | "normal") => T
  wordWrap: (_?: Globals | "break-word" | "normal") => T
  writingMode: (_?: Globals | "horizontal-tb" | "sideways-lr" | "sideways-rl" | "vertical-lr" | "vertical-rl") => T
  zIndex: (_?: Globals | "auto" | (number & {}) | (string & {})) => T
  zoom: (_?: Globals | "normal" | "reset" | (string & {}) | (number & {})) => T
  mozAppearance: (_?:
    | Globals
    | "-moz-mac-unified-toolbar"
    | "-moz-win-borderless-glass"
    | "-moz-win-browsertabbar-toolbox"
    | "-moz-win-communications-toolbox"
    | "-moz-win-communicationstext"
    | "-moz-win-exclude-glass"
    | "-moz-win-glass"
    | "-moz-win-media-toolbox"
    | "-moz-win-mediatext"
    | "-moz-window-button-box"
    | "-moz-window-button-box-maximized"
    | "-moz-window-button-close"
    | "-moz-window-button-maximize"
    | "-moz-window-button-minimize"
    | "-moz-window-button-restore"
    | "-moz-window-frame-bottom"
    | "-moz-window-frame-left"
    | "-moz-window-frame-right"
    | "-moz-window-titlebar"
    | "-moz-window-titlebar-maximized"
    | "button"
    | "button-arrow-down"
    | "button-arrow-next"
    | "button-arrow-previous"
    | "button-arrow-up"
    | "button-bevel"
    | "button-focus"
    | "caret"
    | "checkbox"
    | "checkbox-container"
    | "checkbox-label"
    | "checkmenuitem"
    | "dualbutton"
    | "groupbox"
    | "listbox"
    | "listitem"
    | "menuarrow"
    | "menubar"
    | "menucheckbox"
    | "menuimage"
    | "menuitem"
    | "menuitemtext"
    | "menulist"
    | "menulist-button"
    | "menulist-text"
    | "menulist-textfield"
    | "menupopup"
    | "menuradio"
    | "menuseparator"
    | "meterbar"
    | "meterchunk"
    | "none"
    | "progressbar"
    | "progressbar-vertical"
    | "progresschunk"
    | "progresschunk-vertical"
    | "radio"
    | "radio-container"
    | "radio-label"
    | "radiomenuitem"
    | "range"
    | "range-thumb"
    | "resizer"
    | "resizerpanel"
    | "scale-horizontal"
    | "scale-vertical"
    | "scalethumb-horizontal"
    | "scalethumb-vertical"
    | "scalethumbend"
    | "scalethumbstart"
    | "scalethumbtick"
    | "scrollbarbutton-down"
    | "scrollbarbutton-left"
    | "scrollbarbutton-right"
    | "scrollbarbutton-up"
    | "scrollbarthumb-horizontal"
    | "scrollbarthumb-vertical"
    | "scrollbartrack-horizontal"
    | "scrollbartrack-vertical"
    | "searchfield"
    | "separator"
    | "sheet"
    | "spinner"
    | "spinner-downbutton"
    | "spinner-textfield"
    | "spinner-upbutton"
    | "splitter"
    | "statusbar"
    | "statusbarpanel"
    | "tab"
    | "tab-scroll-arrow-back"
    | "tab-scroll-arrow-forward"
    | "tabpanel"
    | "tabpanels"
    | "textfield"
    | "textfield-multiline"
    | "toolbar"
    | "toolbarbutton"
    | "toolbarbutton-dropdown"
    | "toolbargripper"
    | "toolbox"
    | "tooltip"
    | "treeheader"
    | "treeheadercell"
    | "treeheadersortarrow"
    | "treeitem"
    | "treeline"
    | "treetwisty"
    | "treetwistyopen"
    | "treeview") => T
  mozBinding: (_?: Globals | "none" | (string & {})) => T
  mozBorderBottomColors: (_?: Globals | DataType.Color | "none" | (string & {})) => T
  mozBorderLeftColors: (_?: Globals | DataType.Color | "none" | (string & {})) => T
  mozBorderRightColors: (_?: Globals | DataType.Color | "none" | (string & {})) => T
  mozBorderTopColors: (_?: Globals | DataType.Color | "none" | (string & {})) => T
  mozContextProperties: (_?: Globals | "fill" | "fill-opacity" | "none" | "stroke" | "stroke-opacity" | (string & {})) => T
  mozFloatEdge: (_?: Globals | "border-box" | "content-box" | "margin-box" | "padding-box") => T
  mozForceBrokenImageIcon: (_?: Globals | 0 | (string & {}) | 1) => T
  mozImageRegion: (_?: Globals | "auto" | (string & {})) => T
  mozOrient: (_?: Globals | "block" | "horizontal" | "inline" | "vertical") => T
  mozOutlineRadius: (_?: Globals | (string & {})) => T
  mozOutlineRadiusBottomleft: (_?: Globals | (string & {})) => T
  mozOutlineRadiusBottomright: (_?: Globals | (string & {})) => T
  mozOutlineRadiusTopleft: (_?: Globals | (string & {})) => T
  mozOutlineRadiusTopright: (_?: Globals | (string & {})) => T
  mozStackSizing: (_?: Globals | "ignore" | "stretch-to-fit") => T
  mozTextBlink: (_?: Globals | "blink" | "none") => T
  mozUserFocus: (_?: Globals | "ignore" | "none" | "normal" | "select-after" | "select-all" | "select-before" | "select-menu" | "select-same") => T
  mozUserInput: (_?: Globals | "auto" | "disabled" | "enabled" | "none") => T
  mozUserModify: (_?: Globals | "read-only" | "read-write" | "write-only") => T
  mozWindowDragging: (_?: Globals | "drag" | "no-drag") => T
  mozWindowShadow: (_?: Globals | "default" | "menu" | "none" | "sheet" | "tooltip") => T
  msAccelerator: (_?: Globals | "false" | "true") => T
  msBlockProgression: (_?: Globals | "bt" | "lr" | "rl" | "tb") => T
  msContentZoomChaining: (_?: Globals | "chained" | "none") => T
  msContentZoomLimit: (_?: Globals | (string & {})) => T
  msContentZoomLimitMax: (_?: Globals | (string & {})) => T
  msContentZoomLimitMin: (_?: Globals | (string & {})) => T
  msContentZoomSnap: (_?: Globals | "mandatory" | "none" | "proximity" | (string & {})) => T
  msContentZoomSnapPoints: (_?: Globals | (string & {})) => T
  msContentZoomSnapType: (_?: Globals | "mandatory" | "none" | "proximity") => T
  msContentZooming: (_?: Globals | "none" | "zoom") => T
  msFilter: (_?: Globals | (string & {})) => T
  msFlowFrom: (_?: Globals | "none" | (string & {})) => T
  msFlowInto: (_?: Globals | "none" | (string & {})) => T
  msGridColumns: (_?: Globals | DataType.TrackBreadth | "none" | (string & {})) => T
  msGridRows: (_?: Globals | DataType.TrackBreadth | "none" | (string & {})) => T
  msHighContrastAdjust: (_?: Globals | "auto" | "none") => T
  msHyphenateLimitChars: (_?: Globals | "auto" | (string & {}) | (number & {})) => T
  msHyphenateLimitLines: (_?: Globals | "no-limit" | (number & {}) | (string & {})) => T
  msHyphenateLimitZone: (_?: Globals | (string & {})) => T
  msImeAlign: (_?: Globals | "after" | "auto") => T
  msOverflowStyle: (_?: Globals | "-ms-autohiding-scrollbar" | "auto" | "none" | "scrollbar") => T
  msScrollChaining: (_?: Globals | "chained" | "none") => T
  msScrollLimit: (_?: Globals | (string & {})) => T
  msScrollLimitXMax: (_?: Globals | "auto") => T
  msScrollLimitXMin: (_?: Globals) => T
  msScrollLimitYMax: (_?: Globals | "auto") => T
  msScrollLimitYMin: (_?: Globals) => T
  msScrollRails: (_?: Globals | "none" | "railed") => T
  msScrollSnapPointsX: (_?: Globals | (string & {})) => T
  msScrollSnapPointsY: (_?: Globals | (string & {})) => T
  msScrollSnapType: (_?: Globals | "mandatory" | "none" | "proximity") => T
  msScrollSnapX: (_?: Globals | (string & {})) => T
  msScrollSnapY: (_?: Globals | (string & {})) => T
  msScrollTranslation: (_?: Globals | "none" | "vertical-to-horizontal") => T
  msScrollbar3dlightColor: (_?: Globals | DataType.Color) => T
  msScrollbarArrowColor: (_?: Globals | DataType.Color) => T
  msScrollbarBaseColor: (_?: Globals | DataType.Color) => T
  msScrollbarDarkshadowColor: (_?: Globals | DataType.Color) => T
  msScrollbarFaceColor: (_?: Globals | DataType.Color) => T
  msScrollbarHighlightColor: (_?: Globals | DataType.Color) => T
  msScrollbarShadowColor: (_?: Globals | DataType.Color) => T
  msScrollbarTrackColor: (_?: Globals | DataType.Color) => T
  msTextAutospace: (_?: Globals | "ideograph-alpha" | "ideograph-numeric" | "ideograph-parenthesis" | "ideograph-space" | "none") => T
  msTouchSelect: (_?: Globals | "grippers" | "none") => T
  msUserSelect: (_?: Globals | "element" | "none" | "text") => T
  msWrapFlow: (_?: Globals | "auto" | "both" | "clear" | "end" | "maximum" | "start") => T
  msWrapMargin: (_?: Globals) => T
  msWrapThrough: (_?: Globals | "none" | "wrap") => T
  webkitAppearance: (_?:
    | Globals
    | "-apple-pay-button"
    | "button"
    | "button-bevel"
    | "caret"
    | "checkbox"
    | "default-button"
    | "inner-spin-button"
    | "listbox"
    | "listitem"
    | "media-controls-background"
    | "media-controls-fullscreen-background"
    | "media-current-time-display"
    | "media-enter-fullscreen-button"
    | "media-exit-fullscreen-button"
    | "media-fullscreen-button"
    | "media-mute-button"
    | "media-overlay-play-button"
    | "media-play-button"
    | "media-seek-back-button"
    | "media-seek-forward-button"
    | "media-slider"
    | "media-sliderthumb"
    | "media-time-remaining-display"
    | "media-toggle-closed-captions-button"
    | "media-volume-slider"
    | "media-volume-slider-container"
    | "media-volume-sliderthumb"
    | "menulist"
    | "menulist-button"
    | "menulist-text"
    | "menulist-textfield"
    | "meter"
    | "none"
    | "progress-bar"
    | "progress-bar-value"
    | "push-button"
    | "radio"
    | "searchfield"
    | "searchfield-cancel-button"
    | "searchfield-decoration"
    | "searchfield-results-button"
    | "searchfield-results-decoration"
    | "slider-horizontal"
    | "slider-vertical"
    | "sliderthumb-horizontal"
    | "sliderthumb-vertical"
    | "square-button"
    | "textarea"
    | "textfield") => T
  webkitBorderBefore: (_?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})) => T
  webkitBorderBeforeColor: (_?: Globals | DataType.Color) => T
  webkitBorderBeforeStyle: (_?: Globals | DataType.LineStyle | (string & {})) => T
  webkitBorderBeforeWidth: (_?: Globals | DataType.LineWidth | (string & {})) => T
  webkitBoxReflect: (_?: Globals | "above" | "below" | "left" | "right" | (string & {})) => T
  webkitLineClamp: (_?: Globals | "none" | (number & {}) | (string & {})) => T
  webkitMask: (_?:
    | Globals
    | DataType.Position
    | DataType.RepeatStyle
    | DataType.Box
    | "border"
    | "content"
    | "none"
    | "padding"
    | "text"
    | (string & {})) => T
  webkitMaskAttachment: (_?: Globals | DataType.Attachment | (string & {})) => T
  webkitMaskClip: (_?: Globals | DataType.Box | "border" | "content" | "padding" | "text" | (string & {})) => T
  webkitMaskComposite: (_?: Globals | DataType.CompositeStyle | (string & {})) => T
  webkitMaskImage: (_?: Globals | "none" | (string & {})) => T
  webkitMaskOrigin: (_?: Globals | DataType.Box | "border" | "content" | "padding" | (string & {})) => T
  webkitMaskPosition: (_?: Globals | DataType.Position | (string & {})) => T
  webkitMaskPositionX: (_?: Globals | "center" | "left" | "right" | (string & {})) => T
  webkitMaskPositionY: (_?: Globals | "bottom" | "center" | "top" | (string & {})) => T
  webkitMaskRepeat: (_?: Globals | DataType.RepeatStyle | (string & {})) => T
  webkitMaskRepeatX: (_?: Globals | "no-repeat" | "repeat" | "round" | "space") => T
  webkitMaskRepeatY: (_?: Globals | "no-repeat" | "repeat" | "round" | "space") => T
  webkitMaskSize: (_?: Globals | DataType.BgSize | (string & {})) => T
  webkitOverflowScrolling: (_?: Globals | "auto" | "touch") => T
  webkitTapHighlightColor: (_?: Globals | DataType.Color) => T
  webkitTextFillColor: (_?: Globals | DataType.Color) => T
  webkitTextStroke: (_?: Globals | DataType.Color | (string & {})) => T
  webkitTextStrokeColor: (_?: Globals | DataType.Color) => T
  webkitTextStrokeWidth: (_?: Globals) => T
  webkitTouchCallout: (_?: Globals | "default" | "none") => T
  webkitUserModify: (_?: Globals | "read-only" | "read-write" | "read-write-plaintext-only") => T
  alignmentBaseline: (_?:
    | Globals
    | "after-edge"
    | "alphabetic"
    | "auto"
    | "baseline"
    | "before-edge"
    | "central"
    | "hanging"
    | "ideographic"
    | "mathematical"
    | "middle"
    | "text-after-edge"
    | "text-before-edge") => T
  baselineShift: (_?: Globals | "baseline" | "sub" | "super" | (string & {})) => T
  clipRule: (_?: Globals | "evenodd" | "nonzero") => T
  colorInterpolation: (_?: Globals | "auto" | "linearRGB" | "sRGB") => T
  colorRendering: (_?: Globals | "auto" | "optimizeQuality" | "optimizeSpeed") => T
  dominantBaseline: (_?:
    | Globals
    | "alphabetic"
    | "auto"
    | "central"
    | "hanging"
    | "ideographic"
    | "mathematical"
    | "middle"
    | "no-change"
    | "reset-size"
    | "text-after-edge"
    | "text-before-edge"
    | "use-script") => T
  fill: (_?: Globals | DataType.Paint) => T
  fillOpacity: (_?: Globals | (number & {}) | (string & {})) => T
  fillRule: (_?: Globals | "evenodd" | "nonzero") => T
  floodColor: (_?: Globals | DataType.Color | "currentColor") => T
  floodOpacity: (_?: Globals | (number & {}) | (string & {})) => T
  glyphOrientationVertical: (_?: Globals | "auto" | (string & {}) | (number & {})) => T
  lightingColor: (_?: Globals | DataType.Color | "currentColor") => T
  marker: (_?: Globals | "none" | (string & {})) => T
  markerEnd: (_?: Globals | "none" | (string & {})) => T
  markerMid: (_?: Globals | "none" | (string & {})) => T
  markerStart: (_?: Globals | "none" | (string & {})) => T
  shapeRendering: (_?: Globals | "auto" | "crispEdges" | "geometricPrecision" | "optimizeSpeed") => T
  stopColor: (_?: Globals | DataType.Color | "currentColor") => T
  stopOpacity: (_?: Globals | (number & {}) | (string & {})) => T
  stroke: (_?: Globals | DataType.Paint) => T
  strokeDasharray: (_?: Globals | DataType.Dasharray | "none") => T
  strokeDashoffset: (_?: Globals | (string & {})) => T
  strokeLinecap: (_?: Globals | "butt" | "round" | "square") => T
  strokeLinejoin: (_?: Globals | "bevel" | "miter" | "round") => T
  strokeMiterlimit: (_?: Globals | (number & {}) | (string & {})) => T
  strokeOpacity: (_?: Globals | (number & {}) | (string & {})) => T
  strokeWidth: (_?: Globals | (string & {})) => T
  textAnchor: (_?: Globals | "end" | "middle" | "start") => T
  vectorEffect: (_?: Globals | "non-scaling-stroke" | "none") => T
}

export type ArgProperties = {
  accentColor?: Globals | DataType.Color | "auto"
  alignContent?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {})
  alignItems?: Globals | DataType.SelfPosition | "baseline" | "normal" | "stretch" | (string & {})
  alignSelf?: Globals | DataType.SelfPosition | "auto" | "baseline" | "normal" | "stretch" | (string & {})
  alignTracks?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {})
  all?: Globals
  animation?: Globals | DataType.SingleAnimation | (string & {})
  animationComposition?: Globals | (string & {})
  animationDelay?: Globals | (string & {})
  animationDirection?: Globals | DataType.SingleAnimationDirection | (string & {})
  animationDuration?: Globals | (string & {})
  animationFillMode?: Globals | DataType.SingleAnimationFillMode | (string & {})
  animationIterationCount?: Globals | "infinite" | (string & {}) | (number & {})
  animationName?: Globals | "none" | (string & {})
  animationPlayState?: Globals | "paused" | "running" | (string & {})
  animationTimeline?: Globals | DataType.SingleAnimationTimeline | (string & {})
  animationTimingFunction?: Globals | DataType.EasingFunction | (string & {})
  appearance?: Globals | DataType.CompatAuto | "auto" | "menulist-button" | "none" | "textfield"
  aspectRatio?: Globals | "auto" | (string & {}) | (number & {})
  azimuth?: | Globals
  | "behind"
  | "center"
  | "center-left"
  | "center-right"
  | "far-left"
  | "far-right"
  | "left"
  | "left-side"
  | "leftwards"
  | "right"
  | "right-side"
  | "rightwards"
  | (string & {})
  backdropFilter?: Globals | "none" | (string & {})
  backfaceVisibility?: Globals | "hidden" | "visible"
  background?: Globals | DataType.FinalBgLayer | (string & {})
  backgroundAttachment?: Globals | DataType.Attachment | (string & {})
  backgroundBlendMode?: Globals | DataType.BlendMode | (string & {})
  backgroundClip?: Globals | DataType.Box | (string & {})
  backgroundColor?: Globals | DataType.Color
  backgroundImage?: Globals | "none" | (string & {})
  backgroundOrigin?: Globals | DataType.Box | (string & {})
  backgroundPosition?: Globals | DataType.BgPosition | (string & {})
  backgroundPositionX?: Globals | "center" | "left" | "right" | "x-end" | "x-start" | (string & {})
  backgroundPositionY?: Globals | "bottom" | "center" | "top" | "y-end" | "y-start" | (string & {})
  backgroundRepeat?: Globals | DataType.RepeatStyle | (string & {})
  backgroundSize?: Globals | DataType.BgSize | (string & {})
  blockOverflow?: Globals | "clip" | "ellipsis" | (string & {})
  blockSize?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | (string & {})
  border?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderBlock?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderBlockColor?: Globals | DataType.Color | (string & {})
  borderBlockEnd?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderBlockEndColor?: Globals | DataType.Color
  borderBlockEndStyle?: Globals | DataType.LineStyle
  borderBlockEndWidth?: Globals | DataType.LineWidth
  borderBlockStart?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderBlockStartColor?: Globals | DataType.Color
  borderBlockStartStyle?: Globals | DataType.LineStyle
  borderBlockStartWidth?: Globals | DataType.LineWidth
  borderBlockStyle?: Globals | DataType.LineStyle
  borderBlockWidth?: Globals | DataType.LineWidth
  borderBottom?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderBottomColor?: Globals | DataType.Color
  borderBottomLeftRadius?: Globals | (string & {})
  borderBottomRightRadius?: Globals | (string & {})
  borderBottomStyle?: Globals | DataType.LineStyle
  borderBottomWidth?: Globals | DataType.LineWidth
  borderCollapse?: Globals | "collapse" | "separate"
  borderColor?: Globals | DataType.Color | (string & {})
  borderEndEndRadius?: Globals | (string & {})
  borderEndStartRadius?: Globals | (string & {})
  borderImage?: Globals | "none" | "repeat" | "round" | "space" | "stretch" | (string & {}) | (number & {})
  borderImageOutset?: Globals | (string & {}) | (number & {})
  borderImageRepeat?: Globals | "repeat" | "round" | "space" | "stretch" | (string & {})
  borderImageSlice?: Globals | (string & {}) | (number & {})
  borderImageSource?: Globals | "none" | (string & {})
  borderImageWidth?: Globals | "auto" | (string & {}) | (number & {})
  borderInline?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderInlineColor?: Globals | DataType.Color | (string & {})
  borderInlineEnd?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderInlineEndColor?: Globals | DataType.Color
  borderInlineEndStyle?: Globals | DataType.LineStyle
  borderInlineEndWidth?: Globals | DataType.LineWidth
  borderInlineStart?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderInlineStartColor?: Globals | DataType.Color
  borderInlineStartStyle?: Globals | DataType.LineStyle
  borderInlineStartWidth?: Globals | DataType.LineWidth
  borderInlineStyle?: Globals | DataType.LineStyle
  borderInlineWidth?: Globals | DataType.LineWidth
  borderLeft?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderLeftColor?: Globals | DataType.Color
  borderLeftStyle?: Globals | DataType.LineStyle
  borderLeftWidth?: Globals | DataType.LineWidth
  borderRadius?: Globals | (string & {})
  borderRight?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderRightColor?: Globals | DataType.Color
  borderRightStyle?: Globals | DataType.LineStyle
  borderRightWidth?: Globals | DataType.LineWidth
  borderSpacing?: Globals | (string & {})
  borderStartEndRadius?: Globals | (string & {})
  borderStartStartRadius?: Globals | (string & {})
  borderStyle?: Globals | DataType.LineStyle | (string & {})
  borderTop?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  borderTopColor?: Globals | DataType.Color
  borderTopLeftRadius?: Globals | (string & {})
  borderTopRightRadius?: Globals | (string & {})
  borderTopStyle?: Globals | DataType.LineStyle
  borderTopWidth?: Globals | DataType.LineWidth
  borderWidth?: Globals | DataType.LineWidth | (string & {})
  bottom?: Globals | "auto" | (string & {})
  boxAlign?: Globals | "baseline" | "center" | "end" | "start" | "stretch"
  boxDecorationBreak?: Globals | "clone" | "slice"
  boxDirection?: Globals | "inherit" | "normal" | "reverse"
  boxFlex?: Globals | (number & {}) | (string & {})
  boxFlexGroup?: Globals | (number & {}) | (string & {})
  boxLines?: Globals | "multiple" | "single"
  boxOrdinalGroup?: Globals | (number & {}) | (string & {})
  boxOrient?: Globals | "block-axis" | "horizontal" | "inherit" | "inline-axis" | "vertical"
  boxPack?: Globals | "center" | "end" | "justify" | "start"
  boxShadow?: Globals | "none" | (string & {})
  boxSizing?: Globals | "border-box" | "content-box"
  breakAfter?: | Globals
  | "all"
  | "always"
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region"
  | "column"
  | "left"
  | "page"
  | "recto"
  | "region"
  | "right"
  | "verso"

  breakBefore?: | Globals
  | "all"
  | "always"
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region"
  | "column"
  | "left"
  | "page"
  | "recto"
  | "region"
  | "right"
  | "verso"
  breakInside?: Globals | "auto" | "avoid" | "avoid-column" | "avoid-page" | "avoid-region"
  captionSide?: Globals | "block-end" | "block-start" | "bottom" | "inline-end" | "inline-start" | "top"
  caretColor?: Globals | DataType.Color | "auto"
  clear?: Globals | "both" | "inline-end" | "inline-start" | "left" | "none" | "right"
  clip?: Globals | "auto" | (string & {})
  clipPath?: Globals | DataType.GeometryBox | "none" | (string & {})
  color?: Globals | DataType.Color
  printColorAdjust?: Globals | "economy" | "exact"
  colorScheme?: Globals | "dark" | "light" | "normal" | (string & {})
  columnCount?: Globals | "auto" | (number & {}) | (string & {})
  columnFill?: Globals | "auto" | "balance" | "balance-all"
  columnGap?: Globals | "normal" | (string & {})
  columnRule?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  columnRuleColor?: Globals | DataType.Color
  columnRuleStyle?: Globals | DataType.LineStyle | (string & {})
  columnRuleWidth?: Globals | DataType.LineWidth | (string & {})
  columnSpan?: Globals | "all" | "none"
  columnWidth?: Globals | "auto"
  columns?: Globals | "auto" | (string & {}) | (number & {})
  contain?: Globals | "content" | "inline-size" | "layout" | "none" | "paint" | "size" | "strict" | "style" | (string & {})
  content?: Globals | DataType.ContentList | "none" | "normal" | (string & {})
  contentVisibility?: Globals | "auto" | "hidden" | "visible"
  counterIncrement?: Globals | "none" | (string & {})
  counterReset?: Globals | "none" | (string & {})
  counterSet?: Globals | "none" | (string & {})
  cursor?: | Globals
  | "-moz-grab"
  | "-webkit-grab"
  | "alias"
  | "all-scroll"
  | "auto"
  | "cell"
  | "col-resize"
  | "context-menu"
  | "copy"
  | "crosshair"
  | "default"
  | "e-resize"
  | "ew-resize"
  | "grab"
  | "grabbing"
  | "help"
  | "move"
  | "n-resize"
  | "ne-resize"
  | "nesw-resize"
  | "no-drop"
  | "none"
  | "not-allowed"
  | "ns-resize"
  | "nw-resize"
  | "nwse-resize"
  | "pointer"
  | "progress"
  | "row-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "text"
  | "vertical-text"
  | "w-resize"
  | "wait"
  | "zoom-in"
  | "zoom-out"
  | (string & {})
  direction?: Globals | "ltr" | "rtl"
  display?: | Globals
  | DataType.DisplayOutside
  | DataType.DisplayInside
  | DataType.DisplayInternal
  | DataType.DisplayLegacy
  | "contents"
  | "list-item"
  | "none"
  | (string & {})
  emptyCells?: Globals | "hide" | "show"
  filter?: Globals | "none" | (string & {})
  flex?: Globals | "auto" | "content" | "fit-content" | "max-content" | "min-content" | "none" | (string & {}) | (number & {})
  flexBasis?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-auto"
  | "auto"
  | "content"
  | "fit-content"
  | "max-content"
  | "min-content"
  | (string & {})
  flexDirection?: Globals | "column" | "column-reverse" | "row" | "row-reverse"
  flexFlow?: Globals | "column" | "column-reverse" | "nowrap" | "row" | "row-reverse" | "wrap" | "wrap-reverse" | (string & {})
  flexGrow?: Globals | (number & {}) | (string & {})
  flexShrink?: Globals | (number & {}) | (string & {})
  flexWrap?: Globals | "nowrap" | "wrap" | "wrap-reverse"
  float?: Globals | "inline-end" | "inline-start" | "left" | "none" | "right"
  font?: Globals | "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar" | (string & {})
  fontFamily?: Globals | DataType.GenericFamily | (string & {})
  fontFeatureSettings?: Globals | "normal" | (string & {})
  fontKerning?: Globals | "auto" | "none" | "normal"
  fontLanguageOverride?: Globals | "normal" | (string & {})
  fontOpticalSizing?: Globals | "auto" | "none"
  fontSize?: Globals | DataType.AbsoluteSize | "larger" | "smaller" | (string & {})
  fontSizeAdjust?: Globals | "from-font" | "none" | (string & {}) | (number & {})
  fontSmooth?: Globals | DataType.AbsoluteSize | "always" | "auto" | "never"
  fontStretch?: Globals | DataType.FontStretchAbsolute
  fontStyle?: Globals | "italic" | "normal" | "oblique" | (string & {})
  fontSynthesis?: Globals | "none" | "small-caps" | "style" | "weight" | (string & {})
  fontVariant?: | Globals
  | DataType.EastAsianVariantValues
  | "all-petite-caps"
  | "all-small-caps"
  | "common-ligatures"
  | "contextual"
  | "diagonal-fractions"
  | "discretionary-ligatures"
  | "full-width"
  | "historical-forms"
  | "historical-ligatures"
  | "lining-nums"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "petite-caps"
  | "proportional-nums"
  | "proportional-width"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "stacked-fractions"
  | "tabular-nums"
  | "titling-caps"
  | "unicase"
  | (string & {})
  fontVariantAlternates?: Globals | "historical-forms" | "normal" | (string & {})
  fontVariantCaps?: Globals | "all-petite-caps" | "all-small-caps" | "normal" | "petite-caps" | "small-caps" | "titling-caps" | "unicase"
  fontVariantEastAsian?: Globals | DataType.EastAsianVariantValues | "full-width" | "normal" | "proportional-width" | "ruby" | (string & {})
  fontVariantLigatures?: | Globals
  | "common-ligatures"
  | "contextual"
  | "discretionary-ligatures"
  | "historical-ligatures"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | (string & {})
  fontVariantNumeric?: | Globals
  | "diagonal-fractions"
  | "lining-nums"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "proportional-nums"
  | "slashed-zero"
  | "stacked-fractions"
  | "tabular-nums"
  | (string & {})
  fontVariantPosition?: Globals | "normal" | "sub" | "super"
  fontVariationSettings?: Globals | "normal" | (string & {})
  fontWeight?: Globals | DataType.FontWeightAbsolute | "bolder" | "lighter"
  forcedColorAdjust?: Globals | "auto" | "none"
  gap?: Globals | "normal" | (string & {})
  grid?: Globals | "none" | (string & {})
  gridArea?: Globals | DataType.GridLine | (string & {})
  gridAutoColumns?: Globals | DataType.TrackBreadth | (string & {})
  gridAutoFlow?: Globals | "column" | "dense" | "row" | (string & {})
  gridAutoRows?: Globals | DataType.TrackBreadth | (string & {})
  gridColumn?: Globals | DataType.GridLine | (string & {})
  gridColumnEnd?: Globals | DataType.GridLine
  gridColumnGap?: Globals | (string & {})
  gridColumnStart?: Globals | DataType.GridLine
  gridGap?: Globals | (string & {})
  gridRow?: Globals | DataType.GridLine | (string & {})
  gridRowEnd?: Globals | DataType.GridLine
  gridRowGap?: Globals | (string & {})
  gridRowStart?: Globals | DataType.GridLine
  gridTemplate?: Globals | "none" | (string & {})
  gridTemplateAreas?: Globals | "none" | (string & {})
  gridTemplateColumns?: Globals | DataType.TrackBreadth | "none" | "subgrid" | (string & {})
  gridTemplateRows?: Globals | DataType.TrackBreadth | "none" | "subgrid" | (string & {})
  hangingPunctuation?: Globals | "allow-end" | "first" | "force-end" | "last" | "none" | (string & {})
  height?: | Globals
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | (string & {})
  hyphenateCharacter?: Globals | "auto" | (string & {})
  hyphens?: Globals | "auto" | "manual" | "none"
  imageOrientation?: Globals | "flip" | "from-image" | (string & {})
  imageRendering?: Globals | "-moz-crisp-edges" | "-webkit-optimize-contrast" | "auto" | "crisp-edges" | "pixelated"
  imageResolution?: Globals | "from-image" | (string & {})
  imeMode?: Globals | "active" | "auto" | "disabled" | "inactive" | "normal"
  initialLetter?: Globals | "normal" | (string & {}) | (number & {})
  inlineSize?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | (string & {})
  inputSecurity?: Globals | "auto" | "none"
  inset?: Globals | "auto" | (string & {})
  insetBlock?: Globals | "auto" | (string & {})
  insetBlockEnd?: Globals | "auto" | (string & {})
  insetBlockStart?: Globals | "auto" | (string & {})
  insetInline?: Globals | "auto" | (string & {})
  insetInlineEnd?: Globals | "auto" | (string & {})
  insetInlineStart?: Globals | "auto" | (string & {})
  isolation?: Globals | "auto" | "isolate"
  justifyContent?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "left" | "normal" | "right" | (string & {})
  justifyItems?: Globals | DataType.SelfPosition | "baseline" | "left" | "legacy" | "normal" | "right" | "stretch" | (string & {})
  justifySelf?: Globals | DataType.SelfPosition | "auto" | "baseline" | "left" | "normal" | "right" | "stretch" | (string & {})
  justifyTracks?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "left" | "normal" | "right" | (string & {})
  left?: Globals | "auto" | (string & {})
  letterSpacing?: Globals | "normal"
  lineBreak?: Globals | "anywhere" | "auto" | "loose" | "normal" | "strict"
  lineClamp?: Globals | "none" | (number & {}) | (string & {})
  lineHeight?: Globals | "normal" | (string & {}) | (number & {})
  lineHeightStep?: Globals
  listStyle?: Globals | "inside" | "none" | "outside" | (string & {})
  listStyleImage?: Globals | "none" | (string & {})
  listStylePosition?: Globals | "inside" | "outside"
  listStyleType?: Globals | "none" | (string & {})
  margin?: Globals | "auto" | (string & {})
  marginBlock?: Globals | "auto" | (string & {})
  marginBlockEnd?: Globals | "auto" | (string & {})
  marginBlockStart?: Globals | "auto" | (string & {})
  marginBottom?: Globals | "auto" | (string & {})
  marginInline?: Globals | "auto" | (string & {})
  marginInlineEnd?: Globals | "auto" | (string & {})
  marginInlineStart?: Globals | "auto" | (string & {})
  marginLeft?: Globals | "auto" | (string & {})
  marginRight?: Globals | "auto" | (string & {})
  marginTop?: Globals | "auto" | (string & {})
  mask?: Globals | DataType.MaskLayer | (string & {})
  maskBorder?: Globals | "alpha" | "luminance" | "none" | "repeat" | "round" | "space" | "stretch" | (string & {}) | (number & {})
  maskBorderMode?: Globals | "alpha" | "luminance"
  maskBorderOutset?: Globals | (string & {}) | (number & {})
  maskBorderRepeat?: Globals | "repeat" | "round" | "space" | "stretch" | (string & {})
  maskBorderSlice?: Globals | (string & {}) | (number & {})
  maskBorderSource?: Globals | "none" | (string & {})
  maskBorderWidth?: Globals | "auto" | (string & {}) | (number & {})
  maskClip?: Globals | DataType.GeometryBox | "no-clip" | (string & {})
  maskComposite?: Globals | DataType.CompositingOperator | (string & {})
  maskImage?: Globals | "none" | (string & {})
  maskMode?: Globals | DataType.MaskingMode | (string & {})
  maskOrigin?: Globals | DataType.GeometryBox | (string & {})
  maskPosition?: Globals | DataType.Position | (string & {})
  maskRepeat?: Globals | DataType.RepeatStyle | (string & {})
  maskSize?: Globals | DataType.BgSize | (string & {})
  maskType?: Globals | "alpha" | "luminance"
  mathDepth?: Globals | "auto-add" | (string & {}) | (number & {})
  mathShift?: Globals | "compact" | "normal"
  mathStyle?: Globals | "compact" | "normal"
  maxBlockSize?: | Globals
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | (string & {})
  maxHeight?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "none"
  | (string & {})
  maxInlineSize?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | (string & {})
  maxLines?: Globals | "none" | (number & {}) | (string & {})
  maxWidth?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "none"
  | (string & {})
  minBlockSize?: | Globals
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | (string & {})
  minHeight?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | (string & {})
  minInlineSize?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | (string & {})
  minWidth?: | Globals
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "min-intrinsic"
  | (string & {})
  mixBlendMode?: Globals | DataType.BlendMode | "plus-lighter"
  offset?: Globals | DataType.Position | DataType.GeometryBox | "auto" | "none" | (string & {})
  offsetDistance?: Globals | (string & {})
  offsetPath?: Globals | DataType.GeometryBox | "none" | (string & {})
  offsetRotate?: Globals | "auto" | "reverse" | (string & {})
  objectFit?: Globals | "contain" | "cover" | "fill" | "none" | "scale-down"
  objectPosition?: Globals | DataType.Position
  offsetAnchor?: Globals | DataType.Position | "auto"
  opacity?: Globals | (string & {}) | (number & {})
  order?: Globals | (number & {}) | (string & {})
  orphans?: Globals | (number & {}) | (string & {})
  outline?: Globals | DataType.Color | DataType.LineStyle | DataType.LineWidth | "auto" | "invert" | (string & {})
  outlineColor?: Globals | DataType.Color | "invert"
  outlineOffset?: Globals
  outlineStyle?: Globals | DataType.LineStyle | "auto" | (string & {})
  outlineWidth?: Globals | DataType.LineWidth
  overflow?: Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible" | (string & {})
  overflowAnchor?: Globals | "auto" | "none"
  overflowBlock?: Globals | "auto" | "clip" | "hidden" | "scroll" | "visible"
  overflowClipBox?: Globals | "content-box" | "padding-box"
  overflowClipMargin?: Globals | DataType.VisualBox | (string & {})
  overflowInline?: Globals | "auto" | "clip" | "hidden" | "scroll" | "visible"
  overflowWrap?: Globals | "anywhere" | "break-word" | "normal"
  overflowX?: Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible"
  overflowY?: Globals | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible"
  overscrollBehavior?: Globals | "auto" | "contain" | "none" | (string & {})
  overscrollBehaviorBlock?: Globals | "auto" | "contain" | "none"
  overscrollBehaviorInline?: Globals | "auto" | "contain" | "none"
  overscrollBehaviorX?: Globals | "auto" | "contain" | "none"
  overscrollBehaviorY?: Globals | "auto" | "contain" | "none"
  padding?: Globals | (string & {})
  paddingBlock?: Globals | (string & {})
  paddingBlockEnd?: Globals | (string & {})
  paddingBlockStart?: Globals | (string & {})
  paddingBottom?: Globals | (string & {})
  paddingInline?: Globals | (string & {})
  paddingInlineEnd?: Globals | (string & {})
  paddingInlineStart?: Globals | (string & {})
  paddingLeft?: Globals | (string & {})
  paddingRight?: Globals | (string & {})
  paddingTop?: Globals | (string & {})
  pageBreakAfter?: Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso"
  pageBreakBefore?: Globals | "always" | "auto" | "avoid" | "left" | "recto" | "right" | "verso"
  pageBreakInside?: Globals | "auto" | "avoid"
  paintOrder?: Globals | "fill" | "markers" | "normal" | "stroke" | (string & {})
  perspective?: Globals | "none"
  perspectiveOrigin?: Globals | DataType.Position
  placeContent?: Globals | DataType.ContentDistribution | DataType.ContentPosition | "baseline" | "normal" | (string & {})
  placeItems?: Globals | DataType.SelfPosition | "baseline" | "normal" | "stretch" | (string & {})
  placeSelf?: Globals | DataType.SelfPosition | "auto" | "baseline" | "normal" | "stretch" | (string & {})
  pointerEvents?: Globals | "all" | "auto" | "fill" | "inherit" | "none" | "painted" | "stroke" | "visible" | "visibleFill" | "visiblePainted" | "visibleStroke"
  position?: Globals | "-webkit-sticky" | "absolute" | "fixed" | "relative" | "static" | "sticky"
  quotes?: Globals | "auto" | "none" | (string & {})
  resize?: Globals | "block" | "both" | "horizontal" | "inline" | "none" | "vertical"
  right?: Globals | "auto" | (string & {})
  rotate?: Globals | "none" | (string & {})
  rowGap?: Globals | "normal" | (string & {})
  rubyAlign?: Globals | "center" | "space-around" | "space-between" | "start"
  rubyMerge?: Globals | "auto" | "collapse" | "separate"
  rubyPosition?: Globals | "alternate" | "inter-character" | "over" | "under" | (string & {})
  scale?: Globals | "none" | (string & {}) | (number & {})
  scrollBehavior?: Globals | "auto" | "smooth"
  scrollMargin?: Globals | (string & {})
  scrollMarginBlock?: Globals | (string & {})
  scrollMarginBlockEnd?: Globals
  scrollMarginBlockStart?: Globals
  scrollMarginBottom?: Globals
  scrollMarginInline?: Globals | (string & {})
  scrollMarginInlineEnd?: Globals
  scrollMarginInlineStart?: Globals
  scrollMarginLeft?: Globals
  scrollMarginRight?: Globals
  scrollMarginTop?: Globals
  scrollPadding?: Globals | "auto" | (string & {})
  scrollPaddingBlock?: Globals | "auto" | (string & {})
  scrollPaddingBlockEnd?: Globals | "auto" | (string & {})
  scrollPaddingBlockStart?: Globals | "auto" | (string & {})
  scrollPaddingBottom?: Globals | "auto" | (string & {})
  scrollPaddingInline?: Globals | "auto" | (string & {})
  scrollPaddingInlineEnd?: Globals | "auto" | (string & {})
  scrollPaddingInlineStart?: Globals | "auto" | (string & {})
  scrollPaddingLeft?: Globals | "auto" | (string & {})
  scrollPaddingRight?: Globals | "auto" | (string & {})
  scrollPaddingTop?: Globals | "auto" | (string & {})
  scrollSnapAlign?: Globals | "center" | "end" | "none" | "start" | (string & {})
  scrollSnapCoordinate?: Globals | DataType.Position | "none" | (string & {})
  scrollSnapDestination?: Globals | DataType.Position
  scrollSnapPointsX?: Globals | "none" | (string & {})
  scrollSnapPointsY?: Globals | "none" | (string & {})
  scrollSnapStop?: Globals | "always" | "normal"
  scrollSnapType?: Globals | "block" | "both" | "inline" | "none" | "x" | "y" | (string & {})
  scrollSnapTypeX?: Globals | "mandatory" | "none" | "proximity"
  scrollSnapTypeY?: Globals | "mandatory" | "none" | "proximity"
  scrollbarColor?: Globals | "auto" | (string & {})
  scrollbarGutter?: Globals | "auto" | "stable" | (string & {})
  scrollbarWidth?: Globals | "auto" | "none" | "thin"
  shapeImageThreshold?: Globals | (string & {}) | (number & {})
  shapeMargin?: Globals | (string & {})
  shapeOutside?: Globals | DataType.Box | "margin-box" | "none" | (string & {})
  tabSize?: Globals | (number & {}) | (string & {})
  tableLayout?: Globals | "auto" | "fixed"
  textAlign?: Globals | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start"
  textAlignLast?: Globals | "auto" | "center" | "end" | "justify" | "left" | "right" | "start"
  textCombineUpright?: Globals | "all" | "none" | (string & {})
  textDecoration?: | Globals
  | DataType.Color

  | "auto"
  | "blink"
  | "dashed"
  | "dotted"
  | "double"
  | "from-font"
  | "grammar-error"
  | "line-through"
  | "none"
  | "overline"
  | "solid"
  | "spelling-error"
  | "underline"
  | "wavy"
  | (string & {})
  textDecorationColor?: Globals | DataType.Color
  textDecorationLine?: Globals | "blink" | "grammar-error" | "line-through" | "none" | "overline" | "spelling-error" | "underline" | (string & {})
  textDecorationSkip?: Globals | "box-decoration" | "edges" | "leading-spaces" | "none" | "objects" | "spaces" | "trailing-spaces" | (string & {})
  textDecorationSkipInk?: Globals | "all" | "auto" | "none"
  textDecorationStyle?: Globals | "dashed" | "dotted" | "double" | "solid" | "wavy"
  textDecorationThickness?: Globals | "auto" | "from-font" | (string & {})
  textEmphasis?: Globals | DataType.Color | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | (string & {})
  textEmphasisColor?: Globals | DataType.Color
  textEmphasisPosition?: Globals | (string & {})
  textEmphasisStyle?: Globals | "circle" | "dot" | "double-circle" | "filled" | "none" | "open" | "sesame" | "triangle" | (string & {})
  textIndent?: Globals | (string & {})
  textJustify?: Globals | "auto" | "inter-character" | "inter-word" | "none"
  textOrientation?: Globals | "mixed" | "sideways" | "upright"
  textOverflow?: Globals | "clip" | "ellipsis" | (string & {})
  textRendering?: Globals | "auto" | "geometricPrecision" | "optimizeLegibility" | "optimizeSpeed"
  textShadow?: Globals | "none" | (string & {})
  textSizeAdjust?: Globals | "auto" | "none" | (string & {})
  textTransform?: Globals | "capitalize" | "full-size-kana" | "full-width" | "lowercase" | "none" | "uppercase"
  textUnderlineOffset?: Globals | "auto" | (string & {})
  textUnderlinePosition?: Globals | "auto" | "from-font" | "left" | "right" | "under" | (string & {})
  top?: Globals | "auto" | (string & {})
  touchAction?: | Globals
  | "-ms-manipulation"
  | "-ms-none"
  | "-ms-pinch-zoom"
  | "auto"
  | "manipulation"
  | "none"
  | "pan-down"
  | "pan-left"
  | "pan-right"
  | "pan-up"
  | "pan-x"
  | "pan-y"
  | "pinch-zoom"
  | (string & {})
  transform?: Globals | "none" | (string & {})
  transformBox?: Globals | "border-box" | "content-box" | "fill-box" | "stroke-box" | "view-box"
  transformOrigin?: Globals | "bottom" | "center" | "left" | "right" | "top" | (string & {})
  transformStyle?: Globals | "flat" | "preserve-3d"
  transition?: Globals | DataType.SingleTransition | (string & {})
  transitionDelay?: Globals | (string & {})
  transitionDuration?: Globals | (string & {})
  transitionProperty?: Globals | "all" | "none" | (string & {})
  transitionTimingFunction?: Globals | DataType.EasingFunction | (string & {})

  translate?: Globals | "none" | (string & {})

  unicodeBidi?: | Globals
  | "-moz-isolate"
  | "-moz-isolate-override"
  | "-moz-plaintext"
  | "-webkit-isolate"
  | "-webkit-isolate-override"
  | "-webkit-plaintext"
  | "bidi-override"
  | "embed"
  | "isolate"
  | "isolate-override"
  | "normal"
  | "plaintext"
  userSelect?: Globals | "-moz-none" | "all" | "auto" | "contain" | "element" | "none" | "text"
  verticalAlign?: | Globals

  | "baseline"
  | "bottom"
  | "middle"
  | "sub"
  | "super"
  | "text-bottom"
  | "text-top"
  | "top"
  | (string & {})
  visibility?: Globals | "collapse" | "hidden" | "visible"
  whiteSpace?: Globals | "-moz-pre-wrap" | "break-spaces" | "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap"
  widows?: Globals | (number & {}) | (string & {})
  width?: | Globals

  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "auto"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "min-intrinsic"
  | (string & {})
  willChange?: Globals | DataType.AnimateableFeature | "auto" | (string & {})
  wordBreak?: Globals | "break-all" | "break-word" | "keep-all" | "normal"
  wordSpacing?: Globals | "normal"
  wordWrap?: Globals | "break-word" | "normal"
  writingMode?: Globals | "horizontal-tb" | "sideways-lr" | "sideways-rl" | "vertical-lr" | "vertical-rl"
  zIndex?: Globals | "auto" | (number & {}) | (string & {})
  zoom?: Globals | "normal" | "reset" | (string & {}) | (number & {})
  mozAppearance?: | Globals
  | "-moz-mac-unified-toolbar"
  | "-moz-win-borderless-glass"
  | "-moz-win-browsertabbar-toolbox"
  | "-moz-win-communications-toolbox"
  | "-moz-win-communicationstext"
  | "-moz-win-exclude-glass"
  | "-moz-win-glass"
  | "-moz-win-media-toolbox"
  | "-moz-win-mediatext"
  | "-moz-window-button-box"
  | "-moz-window-button-box-maximized"
  | "-moz-window-button-close"
  | "-moz-window-button-maximize"
  | "-moz-window-button-minimize"
  | "-moz-window-button-restore"
  | "-moz-window-frame-bottom"
  | "-moz-window-frame-left"
  | "-moz-window-frame-right"
  | "-moz-window-titlebar"
  | "-moz-window-titlebar-maximized"
  | "button"
  | "button-arrow-down"
  | "button-arrow-next"
  | "button-arrow-previous"
  | "button-arrow-up"
  | "button-bevel"
  | "button-focus"
  | "caret"
  | "checkbox"
  | "checkbox-container"
  | "checkbox-label"
  | "checkmenuitem"
  | "dualbutton"
  | "groupbox"
  | "listbox"
  | "listitem"
  | "menuarrow"
  | "menubar"
  | "menucheckbox"
  | "menuimage"
  | "menuitem"
  | "menuitemtext"
  | "menulist"
  | "menulist-button"
  | "menulist-text"
  | "menulist-textfield"
  | "menupopup"
  | "menuradio"
  | "menuseparator"
  | "meterbar"
  | "meterchunk"
  | "none"
  | "progressbar"
  | "progressbar-vertical"
  | "progresschunk"
  | "progresschunk-vertical"
  | "radio"
  | "radio-container"
  | "radio-label"
  | "radiomenuitem"
  | "range"
  | "range-thumb"
  | "resizer"
  | "resizerpanel"
  | "scale-horizontal"
  | "scale-vertical"
  | "scalethumb-horizontal"
  | "scalethumb-vertical"
  | "scalethumbend"
  | "scalethumbstart"
  | "scalethumbtick"
  | "scrollbarbutton-down"
  | "scrollbarbutton-left"
  | "scrollbarbutton-right"
  | "scrollbarbutton-up"
  | "scrollbarthumb-horizontal"
  | "scrollbarthumb-vertical"
  | "scrollbartrack-horizontal"
  | "scrollbartrack-vertical"
  | "searchfield"
  | "separator"
  | "sheet"
  | "spinner"
  | "spinner-downbutton"
  | "spinner-textfield"
  | "spinner-upbutton"
  | "splitter"
  | "statusbar"
  | "statusbarpanel"
  | "tab"
  | "tab-scroll-arrow-back"
  | "tab-scroll-arrow-forward"
  | "tabpanel"
  | "tabpanels"
  | "textfield"
  | "textfield-multiline"
  | "toolbar"
  | "toolbarbutton"
  | "toolbarbutton-dropdown"
  | "toolbargripper"
  | "toolbox"
  | "tooltip"
  | "treeheader"
  | "treeheadercell"
  | "treeheadersortarrow"
  | "treeitem"
  | "treeline"
  | "treetwisty"
  | "treetwistyopen"
  | "treeview"
  mozBinding?: Globals | "none" | (string & {})
  mozBorderBottomColors?: Globals | DataType.Color | "none" | (string & {})
  mozBorderLeftColors?: Globals | DataType.Color | "none" | (string & {})
  mozBorderRightColors?: Globals | DataType.Color | "none" | (string & {})
  mozBorderTopColors?: Globals | DataType.Color | "none" | (string & {})
  mozContextProperties?: Globals | "fill" | "fill-opacity" | "none" | "stroke" | "stroke-opacity" | (string & {})
  mozFloatEdge?: Globals | "border-box" | "content-box" | "margin-box" | "padding-box"
  mozForceBrokenImageIcon?: Globals | 0 | (string & {}) | 1
  mozImageRegion?: Globals | "auto" | (string & {})
  mozOrient?: Globals | "block" | "horizontal" | "inline" | "vertical"
  mozOutlineRadius?: Globals | (string & {})
  mozOutlineRadiusBottomleft?: Globals | (string & {})
  mozOutlineRadiusBottomright?: Globals | (string & {})
  mozOutlineRadiusTopleft?: Globals | (string & {})
  mozOutlineRadiusTopright?: Globals | (string & {})
  mozStackSizing?: Globals | "ignore" | "stretch-to-fit"
  mozTextBlink?: Globals | "blink" | "none"
  mozUserFocus?: Globals | "ignore" | "none" | "normal" | "select-after" | "select-all" | "select-before" | "select-menu" | "select-same"
  mozUserInput?: Globals | "auto" | "disabled" | "enabled" | "none"
  mozUserModify?: Globals | "read-only" | "read-write" | "write-only"
  mozWindowDragging?: Globals | "drag" | "no-drag"
  mozWindowShadow?: Globals | "default" | "menu" | "none" | "sheet" | "tooltip"
  msAccelerator?: Globals | "false" | "true"
  msBlockProgression?: Globals | "bt" | "lr" | "rl" | "tb"
  msContentZoomChaining?: Globals | "chained" | "none"
  msContentZoomLimit?: Globals | (string & {})
  msContentZoomLimitMax?: Globals | (string & {})
  msContentZoomLimitMin?: Globals | (string & {})
  msContentZoomSnap?: Globals | "mandatory" | "none" | "proximity" | (string & {})
  msContentZoomSnapPoints?: Globals | (string & {})
  msContentZoomSnapType?: Globals | "mandatory" | "none" | "proximity"
  msContentZooming?: Globals | "none" | "zoom"
  msFilter?: Globals | (string & {})
  msFlowFrom?: Globals | "none" | (string & {})
  msFlowInto?: Globals | "none" | (string & {})
  msGridColumns?: Globals | DataType.TrackBreadth | "none" | (string & {})
  msGridRows?: Globals | DataType.TrackBreadth | "none" | (string & {})
  msHighContrastAdjust?: Globals | "auto" | "none"
  msHyphenateLimitChars?: Globals | "auto" | (string & {}) | (number & {})
  msHyphenateLimitLines?: Globals | "no-limit" | (number & {}) | (string & {})
  msHyphenateLimitZone?: Globals | (string & {})
  msImeAlign?: Globals | "after" | "auto"
  msOverflowStyle?: Globals | "-ms-autohiding-scrollbar" | "auto" | "none" | "scrollbar"
  msScrollChaining?: Globals | "chained" | "none"
  msScrollLimit?: Globals | (string & {})
  msScrollLimitXMax?: Globals | "auto"
  msScrollLimitXMin?: Globals
  msScrollLimitYMax?: Globals | "auto"
  msScrollLimitYMin?: Globals
  msScrollRails?: Globals | "none" | "railed"
  msScrollSnapPointsX?: Globals | (string & {})
  msScrollSnapPointsY?: Globals | (string & {})
  msScrollSnapType?: Globals | "mandatory" | "none" | "proximity"
  msScrollSnapX?: Globals | (string & {})
  msScrollSnapY?: Globals | (string & {})
  msScrollTranslation?: Globals | "none" | "vertical-to-horizontal"
  msScrollbar3dlightColor?: Globals | DataType.Color
  msScrollbarArrowColor?: Globals | DataType.Color
  msScrollbarBaseColor?: Globals | DataType.Color
  msScrollbarDarkshadowColor?: Globals | DataType.Color
  msScrollbarFaceColor?: Globals | DataType.Color
  msScrollbarHighlightColor?: Globals | DataType.Color
  msScrollbarShadowColor?: Globals | DataType.Color
  msScrollbarTrackColor?: Globals | DataType.Color
  msTextAutospace?: Globals | "ideograph-alpha" | "ideograph-numeric" | "ideograph-parenthesis" | "ideograph-space" | "none"
  msTouchSelect?: Globals | "grippers" | "none"
  msUserSelect?: Globals | "element" | "none" | "text"
  msWrapFlow?: Globals | "auto" | "both" | "clear" | "end" | "maximum" | "start"
  msWrapMargin?: Globals
  msWrapThrough?: Globals | "none" | "wrap"
  webkitAppearance?: | Globals
  | "-apple-pay-button"
  | "button"
  | "button-bevel"
  | "caret"
  | "checkbox"
  | "default-button"
  | "inner-spin-button"
  | "listbox"
  | "listitem"
  | "media-controls-background"
  | "media-controls-fullscreen-background"
  | "media-current-time-display"
  | "media-enter-fullscreen-button"
  | "media-exit-fullscreen-button"
  | "media-fullscreen-button"
  | "media-mute-button"
  | "media-overlay-play-button"
  | "media-play-button"
  | "media-seek-back-button"
  | "media-seek-forward-button"
  | "media-slider"
  | "media-sliderthumb"
  | "media-time-remaining-display"
  | "media-toggle-closed-captions-button"
  | "media-volume-slider"
  | "media-volume-slider-container"
  | "media-volume-sliderthumb"
  | "menulist"
  | "menulist-button"
  | "menulist-text"
  | "menulist-textfield"
  | "meter"
  | "none"
  | "progress-bar"
  | "progress-bar-value"
  | "push-button"
  | "radio"
  | "searchfield"
  | "searchfield-cancel-button"
  | "searchfield-decoration"
  | "searchfield-results-button"
  | "searchfield-results-decoration"
  | "slider-horizontal"
  | "slider-vertical"
  | "sliderthumb-horizontal"
  | "sliderthumb-vertical"
  | "square-button"
  | "textarea"
  | "textfield"
  webkitBorderBefore?: Globals | DataType.LineWidth | DataType.LineStyle | DataType.Color | (string & {})
  webkitBorderBeforeColor?: Globals | DataType.Color
  webkitBorderBeforeStyle?: Globals | DataType.LineStyle | (string & {})
  webkitBorderBeforeWidth?: Globals | DataType.LineWidth | (string & {})
  webkitBoxReflect?: Globals | "above" | "below" | "left" | "right" | (string & {})
  webkitLineClamp?: Globals | "none" | (number & {}) | (string & {})
  webkitMask?: | Globals
  | DataType.Position
  | DataType.RepeatStyle
  | DataType.Box
  | "border"
  | "content"
  | "none"
  | "padding"
  | "text"
  | (string & {})
  webkitMaskAttachment?: Globals | DataType.Attachment | (string & {})
  webkitMaskClip?: Globals | DataType.Box | "border" | "content" | "padding" | "text" | (string & {})
  webkitMaskComposite?: Globals | DataType.CompositeStyle | (string & {})
  webkitMaskImage?: Globals | "none" | (string & {})
  webkitMaskOrigin?: Globals | DataType.Box | "border" | "content" | "padding" | (string & {})
  webkitMaskPosition?: Globals | DataType.Position | (string & {})
  webkitMaskPositionX?: Globals | "center" | "left" | "right" | (string & {})
  webkitMaskPositionY?: Globals | "bottom" | "center" | "top" | (string & {})
  webkitMaskRepeat?: Globals | DataType.RepeatStyle | (string & {})
  webkitMaskRepeatX?: Globals | "no-repeat" | "repeat" | "round" | "space"
  webkitMaskRepeatY?: Globals | "no-repeat" | "repeat" | "round" | "space"
  webkitMaskSize?: Globals | DataType.BgSize | (string & {})
  webkitOverflowScrolling?: Globals | "auto" | "touch"
  webkitTapHighlightColor?: Globals | DataType.Color
  webkitTextFillColor?: Globals | DataType.Color
  webkitTextStroke?: Globals | DataType.Color | (string & {})
  webkitTextStrokeColor?: Globals | DataType.Color
  webkitTextStrokeWidth?: Globals
  webkitTouchCallout?: Globals | "default" | "none"
  webkitUserModify?: Globals | "read-only" | "read-write" | "read-write-plaintext-only"
  alignmentBaseline?: | Globals
  | "after-edge"
  | "alphabetic"
  | "auto"
  | "baseline"
  | "before-edge"
  | "central"
  | "hanging"
  | "ideographic"
  | "mathematical"
  | "middle"
  | "text-after-edge"
  | "text-before-edge"
  baselineShift?: Globals | "baseline" | "sub" | "super" | (string & {})
  clipRule?: Globals | "evenodd" | "nonzero"
  colorInterpolation?: Globals | "auto" | "linearRGB" | "sRGB"
  colorRendering?: Globals | "auto" | "optimizeQuality" | "optimizeSpeed"
  dominantBaseline?: | Globals
  | "alphabetic"
  | "auto"
  | "central"
  | "hanging"
  | "ideographic"
  | "mathematical"
  | "middle"
  | "no-change"
  | "reset-size"
  | "text-after-edge"
  | "text-before-edge"
  | "use-script"
  fill?: Globals | DataType.Paint
  fillOpacity?: Globals | (number & {}) | (string & {})
  fillRule?: Globals | "evenodd" | "nonzero"
  floodColor?: Globals | DataType.Color | "currentColor"
  floodOpacity?: Globals | (number & {}) | (string & {})
  glyphOrientationVertical?: Globals | "auto" | (string & {}) | (number & {})
  lightingColor?: Globals | DataType.Color | "currentColor"
  marker?: Globals | "none" | (string & {})
  markerEnd?: Globals | "none" | (string & {})
  markerMid?: Globals | "none" | (string & {})
  markerStart?: Globals | "none" | (string & {})
  shapeRendering?: Globals | "auto" | "crispEdges" | "geometricPrecision" | "optimizeSpeed"
  stopColor?: Globals | DataType.Color | "currentColor"
  stopOpacity?: Globals | (number & {}) | (string & {})
  stroke?: Globals | DataType.Paint
  strokeDasharray?: Globals | DataType.Dasharray | "none"
  strokeDashoffset?: Globals | (string & {})
  strokeLinecap?: Globals | "butt" | "round" | "square"
  strokeLinejoin?: Globals | "bevel" | "miter" | "round"
  strokeMiterlimit?: Globals | (number & {}) | (string & {})
  strokeOpacity?: Globals | (number & {}) | (string & {})
  strokeWidth?: Globals | (string & {})
  textAnchor?: Globals | "end" | "middle" | "start"
  vectorEffect?: Globals | "non-scaling-stroke" | "none"
} | { [key: string]: string }
