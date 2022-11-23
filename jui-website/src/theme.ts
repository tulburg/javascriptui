import { Button, Container, Label, P, SVG, Input, Textarea, ELEMENT, Style } from "@javascriptui/core";

export default {
  globals: {
    '*': {
      padding: 0, margin: 0,
      boxSizing: 'border-box'
    },
    body: {
      fontFamily: '"Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: '100%'
    },
    '.hljs-title, .hljs-title.class_, .hljs-title.class_.inherited__, .hljs-title.function_': {
      color: 'var(--code-title) !important'
    },
    '.hljs-doctag, .hljs-keyword, .hljs-meta .hljs-keyword, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-variable.language_': {
      color: 'var(--code-keyword) !important'
    },
    '.hljs-meta .hljs-string, .hljs-regexp, .hljs-string': {
      color: 'var(--code-string) !important'
    },
    '.hljs-attr, .hljs-attribute, .hljs-literal, .hljs-meta, .hljs-number, .hljs-operator, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id, .hljs-variable': {
      color: 'var(--code-attr) !important'
    },
    '.hljs': { color: 'var(--code) !important' },
    '.monaco-editor': { paddingTop: 25 },
    html: {
      backgroundColor: 'var(--background)'
    },
    ':root': {
      '--background': '#202122',
      '--background-light': '#303030',
      '--text': '#f0f0f0',
      '--border': '#3f3f3f',
      '--border-light': '#2a2a2a',
      '--text-light': '#a0a0a0',
      '--text-x-light': '#8a8a8a',
      '--glass-background': '#1616168c',
      '--glass-light-background': '#d9d9d91a',
      '--glass-light-border': '#ffffff1f',
      '--black': '#000000',
      '--white': '#FFFFFF',
      '--gradient-opacity': '0.3',

      '--code-background': '#141414',
      '--code-title': '#caaa68',
      '--code-keyword': '#87cacd',
      '--code-string': '#c4ffb9',
      '--code-line-number': '#575757',
      '--code-attr': '#79c0ff',
      '--code': '#ffffff',

      '--doc-link': '#d5d5d5',
      '--console-error': '#e5e5e5'
    },
    ':root.light': {
      '--background': '#f0f0f0',
      '--background-light': '#e5e5e5',
      '--text': '#404040',
      '--border': '#d7d7d7',
      '--border-light': '#e8e8e8',
      '--text-light': '#676767',
      '--text-x-light': '#7f7f7f',
      '--glass-background': '#ffffff6c',
      '--glass-light-background': '#ffffff1a',
      '--glass-light-border': '#0c0c0c1a',
      '--black': '#ffffff',
      '--white': '#101010',
      '--gradient-opacity': '0.8',

      '--code-background': '#FFFFFF',
      '--code-title': '#d58f00',
      '--code-keyword': '#099504',
      '--code-string': '#4d4d4d',
      '--code-line-number': '#bfbfbf',
      '--code-attr': '#006ac9',
      '--code': '#1a1c1d',

      '--doc-link': '#303030',
      '--console-error': '#CC2056'
    }
  },
  colors: {
    white: 'var(--white)',
    black: 'var(--black)',
    background: 'var(--background)',
    backgroundLight: 'var(--background-light)',
    text: 'var(--text)',
    textLight: 'var(--text-light)',
    textXLight: 'var(--text-x-light)',
    glassBackground: 'var(--glass-background)',
    glassLightBackground: 'var(--glass-light-background)',
    glassLightBorder: 'var(--glass-light-border)',
    border: 'var(--border)',
    borderLight: 'var(--border-light)',

    codeBackgound: 'var(--code-background)',
    codeLineNumber: 'var(--code-line-number)'
  },
  styles: {
    linkStyle: new Style({ color: 'var(--text-light)', textDecoration: 'none' })
      .pseudo({ ':hover': { textDecoration: 'underline', color: 'var(--white)' } })
  }
}

export class SoftButton extends Button {
  constructor(title: string, click: () => void, primary = false) {
    super();
    this.backgroundColor(primary ? Theme.colors?.white : Theme.colors?.black)
      .text(title).on({ click: () => click() }).borderRadius(6).height(40)
      .fontSize(16).color(primary ? Theme.colors?.black : Theme.colors?.white)
      .border('none').padding([8, 16]).transition('all .1s ease-out').cursor('pointer')
      .pseudo({
        ':hover': { transform: 'scale(1.05)' }
      })
  }
}

export class GlassBox extends Container {
  constructor(title: string, description: string) {
    super();
    this.backgroundColor(Theme.colors?.glassLightBackground).border('1px solid ' + Theme.colors?.glassLightBorder)
      .borderRadius(8).boxShadow('0px -16px 40px rgba(0,0,0,0.05)').padding(15)
      .addChild(
        new Label().text(title).color(Theme.colors?.white).fontSize(16)
          .fontFamily('"Source Code Pro", "Roboto Mono", Courier, "Consolas", "Courier new", hack, monospace'),
        new P().text(description).color(Theme.colors?.textLight).fontSize(16).marginTop(10).media({
          '(max-width: 1200px)': { fontSize: 14 }
        })
      )
  }
}

export class Layout extends Container {
  constructor(...child: Container[]) {
    super();
    this.display('flex').justifyContent('center').addChild(
      new Container().width(960).addChild(...child)
    )
  }
}

export class CodeBlock extends Container {
  constructor(code: string) {
    super();
    this.addClassName('hljs language-ts').fontFamily('"Source Code Pro" !important').fontWeight('normal')
      .whiteSpace('pre-wrap').padding([16, 24]).borderRadius(8).backgroundColor(Theme.colors?.codeBackgound)
      .wordBreak('break-all')
      .on({
        create: function () {
          this.node().textContent = code;
          const wait = (check: () => boolean | any, cb: (_: boolean | any) => void) => {
            const w: any = window;
            const id = '__wait_interval_' + Math.random().toString(36);
            w[id] = setInterval(() => {
              if (check() !== undefined && check() !== false) {
                cb(check());
                clearInterval(w[id])
              }
            }, 100);
          }
          wait(() => (<any>window).hljs, hljs => {
            wait(() => hljs.highlightElement, () => hljs.highlightElement(this.node()));
            if (window.innerWidth > 640) wait(() => hljs.lineNumbersBlock, () => hljs.lineNumbersBlock(this.node()));
          })
        }
      }).global({
        '*': { fontFamily: '"Source Code Pro" !important', lineHeight: '1.6', fontSize: 14 },
        span: { fontFamily: '"Source Code Pro" !important' },
        '.hljs-ln-n': { paddingRight: 24, color: Theme.colors?.codeLineNumber, whiteSpace: 'nowrap' }
      }).media({
        '(max-width: 800px)': {
          fontSize: 12,
          global: {
            '*': { fontSize: 12 },
            span: { fontSize: 12 }
          }
        },
        '(max-width: 460px)': {
          fontSize: 10,
          global: {
            '*': { fontSize: 10 },
            span: { fontSize: 10 }
          }
        }
      })
  }
}

export class Toggle extends Container {
  nobSVG: SVG;
  toggled = false;
  callback: (checked: boolean) => void;
  togglePath: string;
  onToggle?: (checked: boolean) => void;
  constructor(callback: (checked: boolean) => void) {
    super();
    this.callback = callback;
    this.nobSVG = new SVG().attrWidth(20).attrHeight(20).attrViewbox('0 0 20 20').fill('white')
      .position('absolute').left(2).top(2).transition('all 0.6s ease-out');
    this.position('relative').backgroundColor('#51595E').width(32).height(24).borderRadius(12)
      .transition('all 0.6s ease-out').cursor('pointer')
      .addChild(this.nobSVG);
    this.on({
      click: () => this.toggle(!this.toggled)
    });
    this.togglePath = 'M0 10C0 4.47715 4.47715 0 10 0C7 2.5 6 6.73774 6 10C6 13 7 17.5 10 20C4.47715 20 0 15.5228 0 10Z';
    this.nobSVG.on({
      create: () => {
        this.nobSVG.node().innerHTML = `
          <path fill="white" d="${this.togglePath}">
            <animate attributeName="d" dur="0.6s" id="anim-slice" begin="indefinite" fill="freeze"
              from="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
              to="M0 10C0 4.47715 4.47715 0 10 0C7 2.5 6 6.73774 6 10C6 13 7 17.5 10 20C4.47715 20 0 15.5228 0 10Z"
               />
            <animate attributeName="d" dur="0.6s" id="anim-slice-alt" begin="indefinite" fill="freeze"
              from="M0 10C0 4.47715 4.47715 0 10 0C7 2.5 6 6.73774 6 10C6 13 7 17.5 10 20C4.47715 20 0 15.5228 0 10Z"
              to="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
              />
          </path>`;
      }
    })
  }

  toggle(checked = false) {
    this.toggled = checked;
    if (this.callback) this.callback(this.toggled);
    if (!this.toggled) {
      this.backgroundColor('#51595E');
      if (this.node()) {
        queueMicrotask(() => (<any>this.nobSVG.node().querySelector('#anim-slice')).beginElement());
      }
      this.nobSVG.left(2);
      this.toggled = false;
    } else {
      this.backgroundColor('#FFD250');
      if (this.node()) {
        queueMicrotask(() => (<any>this.nobSVG.node().querySelector('#anim-slice-alt')).beginElement());
      }
      this.nobSVG.left('calc(100% - 22px)');
      this.toggled = true;
    }
    if (!this.node()) this.togglePath = 'M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z';
    if (this.onToggle) this.onToggle(checked);
  }
}


export type inputType = 'email' | 'password' | 'text' | 'date' | 'select' | 'multitext' | 'file';
export class FormInput extends Container {
  titleLabel: Label;
  mainInput: Input;
  config: { title: string, type: inputType };
  constructor(config: { title: string, type: inputType }) {
    super();
    this.config = config;
    this.titleLabel = new Label()
      .text(config.title).color(Theme.colors.textLight)
      .fontSize(14).marginBottom('-1.5rem').transition('ease-in-out all .3s')
      .lineHeight('1').display('block').width('100%').on({
        click: () => this.focus()
      });
    if (this.config.type === 'multitext') {
      this.mainInput = new Textarea() as any;
      this.mainInput.on({
        input: function () {
          this.height('auto');
          this.height(this.node().scrollHeight);
        }
      })
    } else {
      this.mainInput = new Input().attrType(config.type === 'date' ? 'text' : config.type) as any;
    }
    this.mainInput.color(Theme.colors.text)
      .fontSize(14).border(0).padding(0).backgroundColor('transparent')
      .width('100%').on({
        focus: () => this.focus(),
        blur: () => {
          const value = (this.mainInput.node() as HTMLInputElement).value;
          if (value.length === 0) this.defocus();
        }
      });
    if (config.type === 'date') {
      const checkValue = (str: string, max: number) => {
        if (str.charAt(0) !== '0' || str === '00') {
          let num = parseInt(str);
          if (isNaN(num) || num <= 0 || num > max) num = 1;
          str = num > parseInt(max.toString().charAt(0)) && num.toString().length === 1 ? '0' + num : num.toString();
        }
        return str;
      };
      this.mainInput.opacity('0').attrPlaceholder('MM / DD / YYYY').transition('ease-in .2s all');
      this.mainInput.on({
        input: () => {
          let input = (<any>this.mainInput.node()).value;
          if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
          const values = input.split('/').map(function (v: string) {
            return v.replace(/\D/g, '');
          });
          if (values[0]) values[0] = checkValue(values[0], 12);
          if (values[1]) values[1] = checkValue(values[1], 31);
          const output = values.map(function (v: string, i: number) {
            return v.length === 2 && i < 2 ? v + ' / ' : v;
          });
          (<any>this.mainInput.node()).value = output.join('').substr(0, 14);
        }
      });
    }
    this.border('2px solid ' + Theme.colors.border)
      .borderRadius(8).padding([8, 16, 8, 16]).display('flex')
      .alignItems('center').height(60).boxSizing('border-box')
      .marginTop(-1).transition('ease-in-out all .3s')
      .addChild(
        new Container()
          .display('flex').alignItems('center')
          .flexDirection('column').width('100%')
          .addChild(this.titleLabel, this.mainInput)
      ).on({
        click: () => this.focus()
      });
    if (this.config.type === 'multitext') {
      this.height('auto')
    }

    window.addEventListener('DOMContentLoaded', () => {
      if (this.mainInput.node() && (<any>this.mainInput.node()).value !== undefined) this.focus();
    });
  }

  focus() {
    (this.mainInput.node() as HTMLInputElement).focus();
    this.titleLabel.color(Theme.colors.textLight)
      .marginBottom(0).fontSize(13);
  }

  defocus() {
    this.titleLabel.marginBottom('-1.5rem').fontSize(16);
  }

  setValue(value: string) {
    this.mainInput.value(value);
    this.titleLabel.color(Theme.colors.text)
      .marginBottom(2).fontSize(14);
    this.config.type === 'date' && this.mainInput.opacity('1');
    const node: any = this.mainInput.node();
    node.dispatchEvent(new Event('change'));
    node.dispatchEvent(new Event('input'));
    node.dispatchEvent(new Event('focus'));
    node.dispatchEvent(new Event('blur'));
  }

  reset() {
    (this.mainInput.node() as HTMLInputElement).value = '';
    this.defocus();
  }

  inputElement(): Input { return this.mainInput; }
}

declare module "@javascriptui/core" {
  interface ELEMENT {
    fillAbsolute: (fill: boolean) => ELEMENT
    backdropFilterPolyfill: (arg: string) => ELEMENT
  }
}

ELEMENT.prototype.fillAbsolute = function (fill: boolean) {
  if (fill !== undefined) {
    this.position('absolute').width('100%').height('100%');
    this.$fillAbsolute = fill;
    return this;
  } else this.$fillAbsolute;
  return this;
}

ELEMENT.prototype.backdropFilterPolyfill = function (arg: string) {
  if (this.backdropFilter) return this.backdropFilter(arg);
  else return this.webkitBackdropFilter(arg);
}
