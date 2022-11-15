import { Container, IFrame, PageComponent, Select, Option, P, Pre, Span } from "@javascriptui/core";
import { languages, editor } from 'monaco-editor';
const monaco = { languages, editor };

// @ts-ignore
import type_source from '!!raw-loader!./lib/types.ts';
// @ts-ignore
import native from '!!raw-loader!./lib/native.ts';
// @ts-ignore
import props from '!!raw-loader!./lib/props.ts';
import { TopBar } from "./app";

const CACHE = "jui::last-save";

const codeSamples = {
  'hello-world': `import { Component } from "javascriptui";

export class App extends Component {
  constructor() {
    super();
    this.text('Hello world!').fontSize(32).fontFamily('arial');
  }
}`,
  'simple-todo': `import { Component, Input, Container, Div, Button } from "javascriptui";

export class App extends Component {
  inputField: Input;
  itemList: Container;
  items: string[] = [];
  constructor() {
    super();
    this.inputField = new Input().width(200).padding([5, 15]).boxSizing('border-box')
      .attrPlaceholder('Enter an item').on({
        keyup: (e) => {
          if(e.key === 'Enter') {
            const inputNode: any = this.inputField.node();
            this.items.push(inputNode.value);
            inputNode.value = '';
            this.updateUI();
          }
        }
      })

    this.itemList = new Container();

    this.backgroundColor('#f0f0f0').padding([25, 50]).addChild(
      this.inputField, this.itemList
    )
  }

  updateUI() {
    this.itemList.removeChildren();
    this.itemList.addChild(
      ...this.items.map(item => {
        const listItem = new Div().width(200).text(item).fontSize(14).padding(8)
          .borderBottom('1px solid #e0e0fe').display('flex').justifyContent('space-between')
          .addChild(
            new Button().text('remove').color('red').on({
              click: () => {
                this.items.splice(this.items.indexOf(item), 1);
                this.updateUI();
              }
            })
          )
        return listItem;
      })
    )
  }
}`,
  'simple-modal': `import { PageComponent, Container, ELEMENT, Button } from 'javascriptui';

class App extends PageComponent {
  constructor() {
    super();
    this.width('100vw').height('100vh').backgroundColor('#d7d7d7')
      .display('flex').padding(50).justifyContent('center');

    this.addChild(
      new Button().text('Open modal').height(32).padding([5, 10]).on({
        click: () => new Modal(this)
      })
    )
  }
}

class Modal extends Container {
  wrapper: Container;
  modal: Container;
  constructor(host: ELEMENT) {
    super();
    this.wrapper = new Container().position('fixed').top(0)
      .left(0).width('100%').height('100%').on({
        click: () => this.close()
      });
    this.modal = new Container().position('absolute')
      .top('50%').left('50%').transform('translate(-50%, -50%)')
      .backgroundColor('white').borderRadius(8).width(460).height(320)
      .addChild(
        new Button().text('Close').on({ click: () => this.close() })
      )
    host.addChild(
      this.wrapper, this.modal
    )
  }

  close() {
    this.wrapper.remove();
    this.modal.remove();
  }
}`,
  'simple-request': `import { PageComponent, Container, Image } from 'javascriptui';

class App extends PageComponent {
  constructor() {
    super();
    this.text("Dogs").fontSize(32).color('black').textAlign('center')
      .padding(50).fontFamily('arial').display('flex').alignItems('center')
      .flexDirection('column');

    fetch("https://dog.ceo/api/breed/borzoi/images")
      .then(res => res.json()).then(data => {
        const photos = data.message.splice(0, 10);
        this.addChild(
          new Container().display('grid').gridTemplateColumns([200, 200])
            .gap(15).marginTop(50).addChild(
              ...photos.map((photo, index) => {
                return new Image().attrSrc(photo).attrAlt('Dog photo ' + (index + 1))
                  .height(200).width(200).objectFit('cover').borderRadius(8)
                })
              )
            )
      })
  }
}`,
  'pseudo-example': `import { PageComponent, Container, Image } from 'javascriptui';

class App extends PageComponent {
  constructor() {
    super();
    this.padding(50).display('flex').justifyContent('center')
      .backgroundColor('#f7f7f7').addChild(
        new Container().width(500).height(280).backgroundColor('white')
          .marginTop(15).borderRadius(15).boxShadow('0px 5px 15px rgba(0,0,0,0.1)')
          .transition('ease-in-out .3s all').position('relative').zIndex('1')
          .overflow('hidden').text('Hover to reveal').display('flex')
          .placeItems('center').justifyContent('center').fontSize(32).fontFamily('arial')
          .pseudo({
            ':hover': {
              backgroundColor: '#f0f0f0'
            },
            ':before': {
              content: "':)'", position: 'absolute', top: '-100%', left: 0,
              width: '100%', height: '100%', backgroundColor: '#5367c0', fontFamily: 'arial',
              borderRadius: 8, color: 'white', fontSize: 32, padding: 100,
              transition: 'ease-in .15s all', boxSizing: 'border-box', textAlign: 'center'
            },
            ':hover::before': {
              top: 0
            }
          })

      )
  }
}`,
  'list-children': `import { PageComponent, IMG, Container, Span } from 'javascriptui';

class App extends PageComponent {
  constructor() {
    super();
    const nital = ["batten", "hatton", "fatten", "platen"];
    const main = new Container().display('flex').gap(10).addChild(
      ...Array(nital.length).fill('https://picsum.photos/100')
        .map((photo, index) => {
          return new Container().display('flex')
          .flexDirection('column').alignItems('center').addChild(
            new IMG().attrAlt("Photo " + (index + 1))
              .borderRadius(100).border('4px solid white')
              .attrSrc(photo + '?random=' + (index + 1)),
            new Span().text(nital[index]).fontSize(16)
              .color('#303030').backgroundColor('white')
              .borderRadius(4).padding([4, 12])
              .fontFamily('arial').marginTop(16)
          )
        })
    )

    this.addChild(main);
  }
}`

}

export default class Playground extends PageComponent {
  editor: Container;
  preview: IFrame;
  console: Container;
  topBar: TopBar;
  monacoEditor: any;
  errorCounter: Span;
  errorCount = 0;
  constructor() {
    super();
    let keyUpTimeout: any;
    this.editor = new Container().addClassName('editor').backgroundColor(Theme.colors?.backgroundLight)
      .height('100%').on({
        keydown: () => clearTimeout(keyUpTimeout),
        keyup: () => {
          if (keyUpTimeout) clearTimeout(keyUpTimeout);
          keyUpTimeout = setTimeout(() => {
            clearTimeout(keyUpTimeout);
            if (!props || !native) return;
            const model1 = this.monacoEditor.getModel();
            const code = model1.getValue();
            if (!code) return;
            const parsed = transpileCode(props + native + code, message => {
              this.errorCount = this.errorCount + 1;
              this.errorCounter.text(this.errorCount + '').display('inline');
              this.console.addChild(
                new Pre().borderTop('1px').padding(5).fontFamily('"Source Code Pro"')
                  .fontSize(14).color('var(--console-error)').text(message).padding(8)
                  .borderBottom('1px solid ' + Theme.colors?.borderLight)
              )
            });
            localStorage.setItem(CACHE, code as any);

            monaco.languages.typescript.getTypeScriptWorker().then(worker => {
              worker(model1.uri).then(client => {
                client.getEmitOutput(model1.uri.toString()).then(result => {
                  if (result.outputFiles && result.outputFiles.length > 0) {
                    const iframe: HTMLIFrameElement = this.preview.node() as any;
                    if (parsed?.sourceCode) iframe.srcdoc = `
                      <!DOCType html>
                      <html lang="en">
                        <head>
                          <title>Playground</title>
                        </head>
                        <body>
                          <div id="app"></div>
                          <script type="module" defer>
                            const source = window.parent.document.URL,
                              target = window.parent;
                            window.console = {
                              log: function (msg) { return target.postMessage({type: 'log', data: maybeStringify(msg)}, source) },
                              warn: function (msg) { return target.postMessage({type: 'warn', data: maybeStringify(msg)}, source) },
                              error: function (err) {
                                if (err) {
                                  if (typeof err === 'string') {
                                    err = err.split(' at ')[0]
                                  }
                                  return target.postMessage({type: 'error', data: maybeStringify(err.message || err)}, source)
                                }
                              }
                            }
                            window.onerror = function (error) {
                              return console.error(error)
                            }
                            function maybeStringify (msg) {
                              return typeof msg === 'object' ? JSON.stringify(msg) : msg
                            }
                            ${parsed?.sourceCode}
                            Native.load('#app', new App());
                            try {
                              if(Theme) {
                                Native.registerTheme(Theme);
                              }
                            }catch(e){}
                          </script>
                        </body>
                      </html>
                    `;
                  }
                }).catch(e => console.error(e));

                client.getSyntacticDiagnostics(model1.uri.toString()).then(res => {
                  if (res.length > 0) {
                    // console.error(res[0])
                  };
                })

                client.getSemanticDiagnostics(model1.uri.toString()).then(res => {
                  if (res.length > 0) {
                    // console.error(res[0]);
                  }
                })
              });
            });
          }, 500);
        }
      });
    this.preview = new IFrame().attrWidth('100%').attrHeight('100%').attrBorder(0)
      .border('0').borderCollapse('collapse');
    this.errorCounter = new Span().padding([0, 4]).color('white').backgroundColor('#c04467').borderRadius(20)
      .text('2').marginLeft(8).fontSize(12).display('none');
    this.console = new Container().position('absolute').bottom(0).width('100%').left('0').height(40)
      .borderTop('1px solid ' + Theme.colors?.border).backgroundColor(Theme.colors?.background)
      .bottom(64).transition('all .2s ease-out')
      .addChild(
        new P().text('Console').fontWeight('bold').color(Theme.colors?.text).padding([8, 16])
          .addChild(this.errorCounter)
          .on({
            click: () => {
              this.errorCount = 0;
              this.errorCounter.display('none');
              if ((this.console.height() as any) === 40) this.console.height(400);
              else this.console.height(40)
            }
          }).cursor('pointer')
      )
    this.topBar = new TopBar(Config.socialLinks, Config.topLinks.filter((i: any) => i.title !== 'Playground'), true)
    this.topBar.marginBottom(0).padding(15);
    // events listernes = use input field as a sample
    const samples = [
      ['hello-world', 'Hello world!'], ['simple-todo', 'Simple todo'],
      ['simple-modal', 'Simple modal'], ['simple-request', 'Simple request'],
      ['pseudo-example', 'Pseudo example'], ['list-children', 'List children']
      // ['drag-and-drop', 'Drag & Drop']
    ];
    const self = this;
    this.height('100vh').overflow('hidden').addChild(
      new Select().position('absolute').top(8).left(380).attrPlaceholder('Choose example')
        .fontSize('1.2rem').width('fit-content').appearance('none').padding([10, 15]).border('2px solid ' + Theme.colors?.text)
        .borderRadius(8)
        .addChild(
          new Option().attrValue('').text('Choose example'),
          ...samples.map(sample => new Option().attrValue(sample[0]).text(sample[1])),
        ).on({
          change() {
            self.monacoEditor.getModel().setValue(codeSamples[this.node().value]);
            self.editor.dispatch('keyup');
          }
        }),
      this.topBar,
      new Container().display('grid').height('100vh').width('100vw')
        .gridTemplateColumns('1fr 1fr').addChild(
          this.editor,
          new Container().backgroundColor(Theme.colors?.backgroundLight)
            .position('relative')
            .addChild(
              this.preview, this.console
            ),
        )

    );
    window.addEventListener('message', data => {
      if (data.data.type === 'error') {
        this.errorCount = this.errorCount + 1;
        this.errorCounter.text(this.errorCount + '').display('inline');
        this.console.addChild(
          new Pre().borderTop('1px').padding(5).fontFamily('"Source Code Pro"')
            .fontSize(14).color('var(--console-error)').text(data.data.data).padding(8)
            .borderBottom('1px solid ' + Theme.colors?.borderLight)
        )
      }
    })

    this.topBar.modeToggle.onToggle = (toggle) => {
      monaco.editor.setTheme(toggle ? 'vs' : 'vs-dark');
    }
  }

  onCreate() {
    let theme = 'vs-dark';
    const LIGHT_MODE = 'jui::dark-mode';
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      const lastState = localStorage.getItem(LIGHT_MODE);
      if (lastState) {
        theme = 'vs'
      }
    } else {
      theme = 'vs';
    }

    const babelScript = document.createElement('script');
    babelScript.setAttribute('src', 'https://unpkg.com/@babel/standalone/babel.min.js');
    document.head.appendChild(babelScript);

    // try {
    //   monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    //     experimentalDecorators: true,
    //     allowSyntheticDefaultImports: true,
    //     moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    //     esModuleInterop: false,
    //     strict: false,
    //     typeRoots: ["node_modules/@types", "types.ts"]
    //   });
    // } catch (e) {}

    // monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    // monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    //   noSemanticValidation: false,
    //   noSyntaxValidation: false
    // })

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'types' {${type_source}} `,
      'types.ts'
    );
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare module 'javascriptui' {${props + native}} `,
      'javascriptui'
    );

    this.monacoEditor = monaco.editor.create(this.editor.node() as HTMLElement, {
      language: 'typescript',
      theme,
      fontSize: 14,
      fontFamily: '"Source Code Pro"',
      minimap: { enabled: false },
      value: localStorage.getItem(CACHE) || `import { PageComponent } from 'javascriptui';

export default class App extends PageComponent {
  constructor() {
    super();
    this.text("Hello world").fontSize(32).color('black').textAlign('center')
      .padding(50).fontFamily('arial')
  }
}`
    });

    this.monacoEditor.getModel()?.updateOptions({
      tabSize: 2,
    });

    setTimeout(() => this.editor.dispatch('keyup'), 500);
  }
}

function transpileCode(code: string, ecb: (m: any) => void): { iframeCode: string, sourceCode: string } | undefined {
  const codeToTranspile = replace(code, importsRegex)
  const options = {
    presets: ['typescript', ['es2015', { modules: true }]],
    plugins: ["proposal-class-properties"], filename: 'index.ts'
  }
  const Babel = (<any>window).Babel;
  try {
    const { code: transpiledCode } = Babel.transform(codeToTranspile, options)
    if (!transpiledCode) {
      throw new Error(`Something went wrong transpiling ${codeToTranspile}.`)
    }

    const hasImports = Boolean(code.match(importsRegex))
    const imports = code.match(importsRegex)?.join('\n') ?? ''

    return {
      iframeCode: hasImports ? `${imports} \n${transpiledCode} ` : transpiledCode,
      sourceCode: replace(transpiledCode, pureRegex),
    }
  } catch (e) {
    ecb(e.message);
  }
}


const importsRegex = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g
const pureRegex = /\/\*#__PURE__\*\//g

function replace(string: string, regex: RegExp, value = ''): string {
  return string.replace(regex, value).trim()
}
