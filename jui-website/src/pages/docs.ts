import { ELEMENT, A, Container, H1, H3, LI, OL, P, PageComponent, Span, Strong, SVG, UL } from "@javascriptui/core";
import { TopBar } from "./app";
import { CodeBlock } from "../theme";

const docs = require('../docs/root.json');

export default class Docs extends PageComponent {
  mainPane: Container;
  sidebar: Container;
  constructor() {
    super();
    const pathData = Router.current.data;
    let currentDoc;
    if (Object.keys(pathData).length > 0) {
      currentDoc = docs.find(section => section[1].replace(/\s/g, '-').toLowerCase() === pathData.section)
    }

    this.sidebar = new Container().height('100%').backgroundColor(Theme.colors?.backgroundLight)
      .display('flex').justifyContent('flex-end')
      .addChild(
        new Container().position('fixed').width(180).padding([50, 0]).paddingTop(25)
          .maxHeight('100vh').overflow('scroll').boxSizing('border-box')
          .addChild(
            new A().display('flex').alignItems('center').display('block').marginBottom(50).attrHref('/').on({
              click(e) {
                e?.preventDefault();
                Router.go('/');
              }
            }).addChild(
              new SVG().attrWidth(391).attrHeight(67).attrViewbox('0 0 391 67')
                .width(146).height(32)
                .on({
                  create() {
                    this.node().innerHTML = `
              <path d="M0.44 37.448C0.44 47.456 7.064 54.08 17.144 54.08C27.08 54.08 33.776 46.448 33.776 37.232V1.952H23.84V37.232C23.84 41.696 21.248 44.648 17.072 44.648C13.04 44.648 10.088 42.272 10.016 37.016V32.336L0.44 34.064V37.448ZM38.9392 43.352C38.9392 48.896 43.5472 54.008 51.1072 54.008C56.3632 54.008 59.7472 51.56 61.5472 48.752C61.5472 50.12 61.6912 52.064 61.9072 53H70.6912C70.4752 51.776 70.2592 49.256 70.2592 47.384V29.96C70.2592 22.832 66.0832 16.496 54.8512 16.496C45.3472 16.496 40.2352 22.616 39.6592 28.16L48.1552 29.96C48.4432 26.864 50.7472 24.2 54.9232 24.2C58.9552 24.2 60.8992 26.288 60.8992 28.808C60.8992 30.032 60.2512 31.04 58.2352 31.328L49.5232 32.624C43.6192 33.488 38.9392 37.016 38.9392 43.352ZM53.1232 46.88C50.0272 46.88 48.5152 44.864 48.5152 42.776C48.5152 40.04 50.4592 38.672 52.9072 38.312L60.8992 37.088V38.672C60.8992 44.936 57.1552 46.88 53.1232 46.88ZM109.807 17.576H99.7269L91.3029 41.336L82.5189 17.576H72.0069L86.4789 53H96.0549L109.807 17.576ZM110.453 43.352C110.453 48.896 115.061 54.008 122.621 54.008C127.877 54.008 131.261 51.56 133.061 48.752C133.061 50.12 133.205 52.064 133.421 53H142.205C141.989 51.776 141.773 49.256 141.773 47.384V29.96C141.773 22.832 137.597 16.496 126.365 16.496C116.861 16.496 111.749 22.616 111.173 28.16L119.669 29.96C119.957 26.864 122.261 24.2 126.437 24.2C130.469 24.2 132.413 26.288 132.413 28.808C132.413 30.032 131.765 31.04 129.749 31.328L121.037 32.624C115.133 33.488 110.453 37.016 110.453 43.352ZM124.637 46.88C121.541 46.88 120.029 44.864 120.029 42.776C120.029 40.04 121.973 38.672 124.421 38.312L132.413 37.088V38.672C132.413 44.936 128.669 46.88 124.637 46.88ZM183.609 14.12C182.457 8.36 177.705 0.871997 165.321 0.871997C155.673 0.871997 147.537 7.784 147.537 16.856C147.537 24.56 152.793 29.816 160.929 31.472L168.057 32.912C172.017 33.704 174.249 36.008 174.249 38.96C174.249 42.56 171.297 45.224 165.969 45.224C158.769 45.224 155.241 40.688 154.809 35.648L145.593 38.096C146.385 45.368 152.361 54.08 165.897 54.08C177.777 54.08 184.329 46.16 184.329 38.312C184.329 31.112 179.361 25.064 170.073 23.264L162.945 21.896C159.201 21.176 157.401 18.944 157.401 16.136C157.401 12.752 160.569 9.656 165.393 9.656C171.873 9.656 174.177 14.048 174.681 16.856L183.609 14.12ZM204.749 25.352C209.501 25.352 211.733 28.376 212.597 31.328L221.165 28.448C219.653 22.472 214.181 16.496 204.533 16.496C194.237 16.496 186.173 24.344 186.173 35.288C186.173 46.16 194.381 54.08 204.821 54.08C214.253 54.08 219.797 48.032 221.381 42.128L212.957 39.32C212.165 42.056 209.717 45.296 204.821 45.296C199.925 45.296 195.749 41.696 195.749 35.288C195.749 28.88 199.853 25.352 204.749 25.352ZM247.143 17.432C246.423 17.36 245.703 17.288 244.911 17.288C241.887 17.288 236.991 18.152 234.831 22.832V17.576H225.543V53H235.119V36.8C235.119 29.168 239.367 26.792 244.263 26.792C245.127 26.792 246.063 26.864 247.143 27.08V17.432ZM260.575 53V17.576H250.999V53H260.575ZM249.847 5.984C249.847 9.152 252.511 11.816 255.751 11.816C259.063 11.816 261.655 9.152 261.655 5.984C261.655 2.672 259.063 0.00799561 255.751 0.00799561C252.511 0.00799561 249.847 2.672 249.847 5.984ZM277.523 66.68V49.544C279.251 51.92 282.851 53.864 287.747 53.864C297.755 53.864 304.451 45.944 304.451 35.216C304.451 24.704 298.475 16.784 288.107 16.784C282.779 16.784 278.819 19.16 277.235 21.896V17.576H267.947V66.68H277.523ZM295.019 35.288C295.019 41.624 291.131 45.296 286.235 45.296C281.339 45.296 277.379 41.552 277.379 35.288C277.379 29.024 281.339 25.352 286.235 25.352C291.131 25.352 295.019 29.024 295.019 35.288ZM320.82 6.992H312.18V11.96C312.18 15.128 310.452 17.576 306.708 17.576H304.908V26.072H311.316V42.56C311.316 49.4 315.636 53.504 322.548 53.504C325.356 53.504 327.084 53 327.948 52.64V44.72C327.444 44.864 326.148 45.008 324.996 45.008C322.26 45.008 320.82 44 320.82 40.904V26.072H327.948V17.576H320.82V6.992Z" fill="#787878"/>
              <path d="M352.792 54.152C363.736 54.152 372.448 47.456 372.448 34.928V1.952H362.512V34.208C362.512 40.904 358.84 44.432 352.792 44.432C346.888 44.432 343.144 40.904 343.144 34.208V1.952H333.208V34.928C333.208 47.456 341.92 54.152 352.792 54.152ZM390.834 53V1.952H380.754V53H390.834Z" fill="var(--white)"/>
              `;
                  }
                })
            ),
            ...docs.map(doc => formatSidebar(doc))
          )
      ).media({
        '(max-width: 960px)': { position: 'fixed', top: 0, left: 0, width: 220, boxShadow: '10px 0px 20px rgba(0,0,0,0.1)', display: 'none' },
        '(min-width: 960px)': { display: 'flex', position: 'relative', boxShadow: 'none' }
      });
    const outside = () => {
      this.sidebar.display('none');
    }
    this.mainPane = new Container().height('100%').backgroundColor(Theme.colors?.background).display('flex')
      .paddingRight(50).flexDirection('column').lineHeight('1.7')
      .addChild(
        new TopBar(Config.socialLinks, Config.topLinks.slice(1), false, () => {
          this.sidebar.display('flex !important');
        }).width('clamp(640px, 800px, 100%)').marginBottom(50)
          .media({
            '(max-width: 960px)': { width: '100%' }
          }),
        new Container().width('clamp(640px, 800px, 100%)').height('100%').paddingBottom(50).addChild(
          format(currentDoc || docs[0])
        ).global({
          'a': { color: 'var(--doc-link)' }
        }).media({
          '(max-width: 960px)': { width: '100%' }
        })
      ).on({
        click: outside
      }).media({
        '(max-width: 520px)': { paddingRight: 20 }
      });

    this.display('grid').gridTemplateColumns('minmax(220px, 25%) auto').gap(40)
      .width('100vw').height('100vh').addChild(
        this.sidebar, this.mainPane
      ).media({
        '(max-width: 960px)': { display: 'grid', gridTemplateColumns: '1fr', paddingLeft: 40 },
        '(min-width: 960px)': { display: 'grid', gridTemplateColumns: 'minmax(220px, 25%) auto' },
        '(max-width: 520px)': { paddingLeft: 20 }
      });
  }

  onCreate() {
    if (!document.head.querySelector('#highlight-import')) {
      const highlightImport = document.createElement('script');
      highlightImport.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js');
      highlightImport.setAttribute('id', 'highlight-import');
      highlightImport.onload = () => {
        const tsImport = document.createElement('script');
        tsImport.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/languages/typescript.min.js');
        document.head.appendChild(tsImport);
        const githubImport = document.createElement('style');
        githubImport.innerHTML = "@import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark.min.css')";
        document.head.appendChild(githubImport);
        const lineNumber = document.createElement('script');
        lineNumber.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js');
        document.head.appendChild(lineNumber);
      }
      document.head.appendChild(highlightImport)
    }
    queueMicrotask(() => {
      if (location.hash) {
        const el: any = document.querySelector(location.hash);
        window.scrollTo({
          top: el.offsetTop - (el.offsetTop / 10), behavior: 'smooth'
        });
      }
    })
  }

}

const format = (item: any) => {
  const type = item[0];
  switch (type) {
    case 'section': {
      return new Container().addChild(
        new H1().text(item[1]).fontSize(32).color(Theme.colors?.text).fontWeight('normal'),
        ...item[2].map((dr: any) => {
          return format(dr);
        })
      )
    }
    case 'block': {
      return new Container().attrId(item[1].replace(/\s/g, '-').toLowerCase()).marginTop(50).addChild(
        new H3().text(item[1]).fontSize(24).color(Theme.colors?.text).marginBottom(0),
        new Container().addChild(...item[2].map((i: any) => format(i)))
      )
    }
    case 'list': {
      return item[1] === 'unordered' ? new UL().marginLeft(50).marginTop(25).addChild(
        ...item[2].map((item: any) => format(item))
      ) : new OL().addChild(...item[2].map((i: any) => format(i)))
    }
    case 'list-item': {
      return new LI().replaceTextTag(item[1], argProps).color(Theme.colors?.textLight)
    }
    case 'code': {
      return new CodeBlock(decodeBase64(item[1])).marginTop(15).marginBottom(15)
    }
    case 'tip': {
      return new Container().borderRadius(8).backgroundColor('#d8d8d8').text(item[1])
        .padding([10, 20]).border('1px solid rgba(0,170,0,.25)').color('#101010').lineHeight('1.3');
    }
    case 'html': {
      return new Container().addChild(
        new P().color(Theme.colors?.textLight).marginTop(10).replaceTextTag(item[1], argProps),
        item[2] ? format(item[2]) : new Span()
      )
    }
    default: {
      // console.log(type);
      return new Span().text('Unimplemented yet!')
    }
  }
}

const argProps = {
  a(arg: string) {
    const s = arg.split(',');

    return new A().text(s[0]).attrHref(s[1]).attrTarget(s[1].match('http') ? '_blank' : '_self').on({
      click: e => { console.log(e) }
    })
  },
  code(arg: string) {
    return new Span().text(arg).backgroundColor(Theme.colors?.backgroundLight).borderRadius(4).padding([2, 8])
      .color('var(--doc-link)').fontFamily('"Source Code Pro"')
  },
  bold(arg: string) {
    return new Strong().text(arg).color('var(--doc-link)');
  }
}


const formatSidebar = (item: any): ELEMENT => {
  const type = item[0];
  switch (type) {
    case 'section': {
      return new Container().marginTop(15).addChild(
        new Span().text(item[1]).color(Theme.colors?.text).fontSize(16),
        new Container().display('flex').flexDirection('column').addChild(
          ...item[2].map((link: any) => {
            const address = '/docs/' + item[1].replace(/\s/g, '-').toLowerCase(0) + '#' + link[1].replace(/\s/g, '-').toLowerCase();
            const anchor = new A().text(link[1]).color(Theme.colors?.textLight).fontSize(14).padding([4, 8]).paddingLeft(0)
              .attrHref(address).textIndent(10).textDecoration('none').on({
                click(e) {
                  e?.preventDefault();
                  Router.go(address)
                }
              }).pseudo({ ':hover': { textDecoration: 'underline' } });
            if (location.hash.slice(1) === link[1].replace(/\s/g, '-').toLowerCase()) {
              anchor.textDecoration('underline').color(Theme.colors?.white)
            }
            return anchor;
          })
        )
      )
    }
    default: {
      return new Span().text('Not implemented')
    }
  }
}

const decodeBase64 = (str: string) => {
  return str.indexOf(' ') === -1 ? atob(str) : str;
}
