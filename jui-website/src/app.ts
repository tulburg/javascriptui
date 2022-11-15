import { A, Container, H2, H4, H5, Image, IMG, LI, P, PageComponent, Span, Style, SVG, UL } from '@javascriptui/core';
import { CodeBlock, GlassBox, Layout, SoftButton, Toggle } from './config';

export default class App extends PageComponent {
  constructor() {
    super();

    const mains = [
      { title: 'Only Javascript', description: 'No messy HTML or 10,000 lines of CSS, just javascript' },
      { title: '0 Learning curve', description: 'It\'s the same Javascript you know & love, no extra secret' },
      { title: 'Smallest bundle size', description: 'Bundle size less than 1/3 of the nearest framework' },
      { title: 'Highly customizable', description: 'Make it your own, for your design systems and far more' }
    ];
    const codes = [
      { title: 'Do more. With less code', description: 'No magic tricks, just straightforward talking to the browser' },
      { title: 'Extensible everything', description: 'Themes, styles, components all extensible and inheritable' },
      { title: 'Performance like never before', description: 'Create all resuable tokens once and for all, for your design system' },
      { title: 'Styling has never been easier', description: 'All CSS & Styling issues solved. Yes all! Take back control' }
    ];

    const footerLinks = [
      [
        { heading: true, title: 'Channels' },
        { href: 'https://github.com/tulburg', title: 'Github' },
        { href: 'https://twitter.com/tulburg', title: 'Twitter' },
        { href: 'https://discord.com/tulburg', title: 'Discord' },
      ],
      [
        { heading: true, title: 'Resources' },
        { href: '/docs', title: 'Installation' },
        { href: '/docs', title: 'Documentation' },
        { href: '/docs/element-functions', title: 'API References' },
        { href: '/change-log', title: 'Change log' },
      ],
      [
        { heading: true, title: 'More info' },
        { href: '/blog', title: 'Blog' },
        { href: '/about', title: 'About' },
        { href: '/faq', title: 'FAQs' }
      ]
    ];

    const nital = ["batten", "hatton", "fatten", "platen"];

    this.backgroundColor(Theme.colors?.background)
      .height('100vh').width('100vw').overflowX('hidden').addChild(
        new Layout(
          new Container().addChild(
            new TopBar(Config.socialLinks, Config.topLinks),
            window.innerWidth < 520 ? <any>'' : new SVG().attrHeight(1192).attrWidth(1540).attrViewbox('0 0 1540 1192').top(200).width('fit-content')
              .position('absolute').zIndex('-1').left('50%').height(1192).width(1540)
              .display('flex').gap(50).transform('translateX(-50%)').on({
                create() {
                  this.node().innerHTML = Config.gradientSVG;
                }
              }),
            new Container().addChild(
              new SVG().attrWidth(391).attrHeight(67).attrViewbox('0 0 391 67').on({
                create() {
                  this.node().innerHTML = `
                    <path d="M0.44 37.448C0.44 47.456 7.064 54.08 17.144 54.08C27.08 54.08 33.776 46.448 33.776 37.232V1.952H23.84V37.232C23.84 41.696 21.248 44.648 17.072 44.648C13.04 44.648 10.088 42.272 10.016 37.016V32.336L0.44 34.064V37.448ZM38.9392 43.352C38.9392 48.896 43.5472 54.008 51.1072 54.008C56.3632 54.008 59.7472 51.56 61.5472 48.752C61.5472 50.12 61.6912 52.064 61.9072 53H70.6912C70.4752 51.776 70.2592 49.256 70.2592 47.384V29.96C70.2592 22.832 66.0832 16.496 54.8512 16.496C45.3472 16.496 40.2352 22.616 39.6592 28.16L48.1552 29.96C48.4432 26.864 50.7472 24.2 54.9232 24.2C58.9552 24.2 60.8992 26.288 60.8992 28.808C60.8992 30.032 60.2512 31.04 58.2352 31.328L49.5232 32.624C43.6192 33.488 38.9392 37.016 38.9392 43.352ZM53.1232 46.88C50.0272 46.88 48.5152 44.864 48.5152 42.776C48.5152 40.04 50.4592 38.672 52.9072 38.312L60.8992 37.088V38.672C60.8992 44.936 57.1552 46.88 53.1232 46.88ZM109.807 17.576H99.7269L91.3029 41.336L82.5189 17.576H72.0069L86.4789 53H96.0549L109.807 17.576ZM110.453 43.352C110.453 48.896 115.061 54.008 122.621 54.008C127.877 54.008 131.261 51.56 133.061 48.752C133.061 50.12 133.205 52.064 133.421 53H142.205C141.989 51.776 141.773 49.256 141.773 47.384V29.96C141.773 22.832 137.597 16.496 126.365 16.496C116.861 16.496 111.749 22.616 111.173 28.16L119.669 29.96C119.957 26.864 122.261 24.2 126.437 24.2C130.469 24.2 132.413 26.288 132.413 28.808C132.413 30.032 131.765 31.04 129.749 31.328L121.037 32.624C115.133 33.488 110.453 37.016 110.453 43.352ZM124.637 46.88C121.541 46.88 120.029 44.864 120.029 42.776C120.029 40.04 121.973 38.672 124.421 38.312L132.413 37.088V38.672C132.413 44.936 128.669 46.88 124.637 46.88ZM183.609 14.12C182.457 8.36 177.705 0.871997 165.321 0.871997C155.673 0.871997 147.537 7.784 147.537 16.856C147.537 24.56 152.793 29.816 160.929 31.472L168.057 32.912C172.017 33.704 174.249 36.008 174.249 38.96C174.249 42.56 171.297 45.224 165.969 45.224C158.769 45.224 155.241 40.688 154.809 35.648L145.593 38.096C146.385 45.368 152.361 54.08 165.897 54.08C177.777 54.08 184.329 46.16 184.329 38.312C184.329 31.112 179.361 25.064 170.073 23.264L162.945 21.896C159.201 21.176 157.401 18.944 157.401 16.136C157.401 12.752 160.569 9.656 165.393 9.656C171.873 9.656 174.177 14.048 174.681 16.856L183.609 14.12ZM204.749 25.352C209.501 25.352 211.733 28.376 212.597 31.328L221.165 28.448C219.653 22.472 214.181 16.496 204.533 16.496C194.237 16.496 186.173 24.344 186.173 35.288C186.173 46.16 194.381 54.08 204.821 54.08C214.253 54.08 219.797 48.032 221.381 42.128L212.957 39.32C212.165 42.056 209.717 45.296 204.821 45.296C199.925 45.296 195.749 41.696 195.749 35.288C195.749 28.88 199.853 25.352 204.749 25.352ZM247.143 17.432C246.423 17.36 245.703 17.288 244.911 17.288C241.887 17.288 236.991 18.152 234.831 22.832V17.576H225.543V53H235.119V36.8C235.119 29.168 239.367 26.792 244.263 26.792C245.127 26.792 246.063 26.864 247.143 27.08V17.432ZM260.575 53V17.576H250.999V53H260.575ZM249.847 5.984C249.847 9.152 252.511 11.816 255.751 11.816C259.063 11.816 261.655 9.152 261.655 5.984C261.655 2.672 259.063 0.00799561 255.751 0.00799561C252.511 0.00799561 249.847 2.672 249.847 5.984ZM277.523 66.68V49.544C279.251 51.92 282.851 53.864 287.747 53.864C297.755 53.864 304.451 45.944 304.451 35.216C304.451 24.704 298.475 16.784 288.107 16.784C282.779 16.784 278.819 19.16 277.235 21.896V17.576H267.947V66.68H277.523ZM295.019 35.288C295.019 41.624 291.131 45.296 286.235 45.296C281.339 45.296 277.379 41.552 277.379 35.288C277.379 29.024 281.339 25.352 286.235 25.352C291.131 25.352 295.019 29.024 295.019 35.288ZM320.82 6.992H312.18V11.96C312.18 15.128 310.452 17.576 306.708 17.576H304.908V26.072H311.316V42.56C311.316 49.4 315.636 53.504 322.548 53.504C325.356 53.504 327.084 53 327.948 52.64V44.72C327.444 44.864 326.148 45.008 324.996 45.008C322.26 45.008 320.82 44 320.82 40.904V26.072H327.948V17.576H320.82V6.992Z" fill="#787878"/>
                    <path d="M352.792 54.152C363.736 54.152 372.448 47.456 372.448 34.928V1.952H362.512V34.208C362.512 40.904 358.84 44.432 352.792 44.432C346.888 44.432 343.144 40.904 343.144 34.208V1.952H333.208V34.928C333.208 47.456 341.92 54.152 352.792 54.152ZM390.834 53V1.952H380.754V53H390.834Z" fill="var(--white)"/>
                  `;
                }
              }).media({
                '(max-width: 960px)': { width: 320 },
                '(max-width: 520px)': { width: 240 }
              }),
              new P().text('Meet the standard javascript interface design framework for the web')
                .fontSize(30).color(Theme.colors?.white).maxWidth(680).fontWeight('100')
                .media({
                  '(max-width: 768px)': { fontSize: 24 }
                })
            )
          ).pseudo({
            ':before': {
              content: "''", left: 'calc(((100vw - 960px) / 2) - 50px)', top: 0, width: '40%', height: 800, borderLeft: '1px solid ' + Theme.colors?.border,
              position: 'absolute', borderBottom: '1px solid ' + Theme.colors?.border, borderBottomLeftRadius: 72,
              zIndex: '-1'
            }
          }).media({
            '(max-width: 1100px)': {
              pseudo: {
                ':before': { display: 'none ' }
              }
            }
          }),
          new Container().marginTop(50).addChild(
            new Container().display('flex').gap(25).addChild(
              new SoftButton('Get started', () => {}, true),
              new SoftButton('View on Github', () => Router.go('https://github.com/tulburg/javascriptui')),
              new SoftButton('Try playground', () => Router.go('/playground')),
            ).media({
              '(max-width: 560px)': { flexWrap: 'wrap', gap: 15 },
              '(max-width: 420px)': { alignItems: 'baseline' }
            })
          )
        ).position('relative').zIndex('1').pseudo({
          ':before': {
            content: "''", left: 0, top: 420, width: '100vw', borderBottom: '1px solid ' + Theme.colors?.borderLight,
            position: 'absolute'
          }
        }).media({
          '(max-width: 780px)': {
            pseudo: {
              ':before': { display: 'none' }
            }
          }
        }),
        new Layout(
          new Container().marginLeft(-100).display('flex').gap(25).width('calc(100% + 200px)')
            .marginTop(50).position('relative').backdropFilterPolyfill('blur(40px)').zIndex('1').addChild(
              ...mains.map(main => {
                return new GlassBox(main.title, main.description)
              })
            ).media({
              '(max-width: 1200px)': { marginLeft: 0, width: '100%' },
              '(max-width: 768px)': { display: 'grid', gridTemplateColumns: '1fr 1fr' },
              '(max-width: 420px)': { gridTemplateColumns: '1fr' }
            }),
          new Container().display('flex').color(Theme.colors?.white).marginTop(15).addChild(
            new P().text('... and there\'s more, lots more.').fontWeight('100').color(Theme.colors?.textLight),
            new A().text('Show me more!').attrHref('/features').fontWeight('bold').color(Theme.colors?.white)
              .marginLeft(8).textDecoration('none').pseudo({ ':hover': { textDecoration: 'underline' } })
          ).media({
            '(max-width: 420px)': { display: 'block', marginTop: 10 }
          })
        ).position('relative').zIndex('1111'),
        new Layout(
          new Container().height(640).width('100%').borderRadius(12).backgroundColor(Theme.colors?.glassBackground)
            .padding(12).backdropFilterPolyfill('blur(40px)').marginTop(50).position('relative').zIndex('20')
            .display('grid').gridTemplateColumns('320px 1fr').gap(50).addChild(
              new Container().display('flex').flexDirection('column').gap(10)
                .display('none').padding(40).paddingBottom(0)
                .addChild(
                  new H2().text('Do more. With less code').fontSize(40).color(Theme.colors?.white).marginBottom(0)
                    .lineHeight('1'),
                  new P().text('No magic tricks, just straightforward talking to the browser').color(Theme.colors?.textLight)
                    .fontSize(24).margin(0)
                ).media({
                  '(max-width: 920px)': { display: 'flex' },
                  '(max-width: 640px)': { padding: 25, paddingBottom: 0 }
                }),
              new Container().display('flex').flexDirection('column').gap(25).paddingTop(40).paddingLeft(40)
                .width('100%').addChild(
                  ...codes.map(code => {
                    return new Container().paddingBottom(40).borderBottom('1px solid ' + Theme.colors?.borderLight).addChild(
                      new H4().text(code.title).fontWeight('100').marginBottom(10).color(Theme.colors?.white)
                        .fontSize(20),
                      new P().text(code.description).color(Theme.colors?.textLight).fontSize(16)
                    )
                  })
                ).media({
                  '(max-width: 920px)': { display: 'none' }
                }).global({
                  'div:last-child': { borderBottom: '0px' }
                }),
              new Container().height('100%').width('100%').display('flex').flexDirection('column').addChild(
                new Container().height('fit-content').maxWidth('100%').backgroundColor(Theme.colors?.black).borderRadius(8).addChild(
                  new CodeBlock(Config.codeblocks.lessCode).padding(8)
                ),
                new Container().height('100%').backgroundColor(Theme.colors?.background).borderRadius(8)
                  .marginTop(15).display('flex').placeItems('center').justifyContent('center')
                  .addChild(
                    new Container().display('flex').gap(10).addChild(
                      ...Array(nital.length).fill('https://picsum.photos/100')
                        .map((photo, index) => {
                          return new Container().display('flex')
                            .flexDirection('column').alignItems('center')
                            .addChild(
                              new IMG().attrAlt("Photo " + (index + 1))
                                .borderRadius(100).border('4px solid white')
                                .attrSrc(photo + '?random=' + (index + 1)),
                              new Span().text(nital[index]).fontSize(16)
                                .color('#303030').backgroundColor('white')
                                .borderRadius(4).padding([4, 12])
                                .fontFamily('arial').marginTop(16)
                            )
                        })
                    ).media({
                      '(max-width: 520px)': {
                        display: 'grid', gridTemplateColumns: '1fr 1fr'
                      }
                    })
                  )
                  .media({
                    '(max-width: 920px)': { minHeight: 400 }
                  })
              )
            ).media({
              '(max-width: 920px)': { gridTemplateColumns: '1fr', height: 'fit-content' }
            })
        ),
        new Layout(
          new Container().backgroundColor(Theme.colors?.backgroundLight).borderRadius(8).padding(50)
            .position('relative').zIndex('1').overflow('hidden')
            .addChild(
              new Container().display('flex').flexDirection('column').addChild(
                new H5().text('JavascriptUI is built for the community and by the community').fontSize(24)
                  .color(Theme.colors?.white).fontWeight('normal').marginBottom(25).maxWidth(480)
                  .media({
                    '(max-width: 860px)': { fontSize: 22 }
                  }),
                new Container().display('flex').gap(25).addChild(
                  new SoftButton('Join us', () => {}, true),
                  new SoftButton('Become a sponsor', () => {})
                ).media({
                  '(max-width: 860px)': { marginTop: 'auto' },
                  '(max-width: 420px)': { flexDirection: 'column', alignItems: 'baseline' }
                }),
                new Container().position('absolute').zIndex('-1').right(40).bottom(-10)
                  .addChild(
                    new Image().attrSrc(require('./assets/group.svg')).attrAlt('group image').attrHeight(150)
                      .attrWidth(340)
                  ).media({
                    '(max-width: 420px)': {
                      right: 0, display: 'flex', justifyContent: 'center', width: '100%'
                    }
                  })
              ).media({
                '(max-width: 860px)': { height: '100%' },
                '(max-width: 740px)': { height: 'auto' }
              })
            ).media({
              '(max-width: 860px)': { padding: 40, height: 240 },
              '(max-width: 740px)': { height: 400 },
              '(max-width: 420px)': { height: 460 }
            })
        ).marginTop(75),
        new Layout(
          new Container().display('grid').gridTemplateColumns('auto auto auto auto 1fr').gap(100).addChild(
            new Container().addChild(
              new P().text('Copyright ©' + new Date().getFullYear()).color(Theme.colors?.textLight),
              new P().text('All rights reserved.').color(Theme.colors?.textXLight).whiteSpace('nowrap'),
              new Container().display('flex').marginTop(15).gap(15).addChild(
                ...Config.socialLinks.map((link: any) => {
                  return new A().attrHref(link.href).attrTarget('_blank').addChild(
                    new Image().attrSrc(link.src).attrAlt(link.alt).attrWidth(24).attrHeight(24),
                  )
                })
              )
            ).media({
              '(max-width: 580px)': { gridArea: '2' },
              '(max-width: 360px)': { gridArea: '4' }
            }),
            ...footerLinks.map(links => {
              return new Container().display('flex').flexDirection('column').gap(15).addChild(
                ...links.map(link => {
                  if (link.heading) return new Span().text(link.title).color(Theme.colors?.white);
                  else return new A().text(link.title).attrHref(link.href).style(Theme.styles?.linkStyle as Style)
                })
              )
            })
          ).media({
            '(max-width: 860px)': { gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 50 },
            '(max-width: 580px)': { gridTemplateColumns: '1fr 1fr' },
            '(max-width: 360px)': { gridTemplateColumns: '1fr', paddingLeft: 50 }
          })
        ).marginTop(50).paddingBottom(150)
      ).media({
        '(max-width: 1024px)': { padding: [0, 25] },
        '(max-width: 560px)': { padding: [0, 20] }
      })
  }

  onCreate() {
    const style = document.createElement('style');
    style.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&display=swap')";
    document.head.appendChild(style);

    const codeStyle = document.createElement('style');
    codeStyle.innerHTML = "@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap')";
    document.head.appendChild(codeStyle);

    const highlightImport = document.createElement('script');
    highlightImport.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js');
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
}

export class TopBar extends Container {

  modeToggle: Toggle;

  constructor(socialLinks: any[], topLinks: any[], showLogo = false, leftMenu?: () => void) {
    super();
    const LIGHT_MODE = 'jui::dark-mode';
    const root = document.querySelector(':root');
    this.modeToggle = new Toggle(checked => {
      if (checked) {
        root?.classList.add('light');
        localStorage.setItem(LIGHT_MODE, 'true');
      } else {
        root?.classList.remove('light');
        localStorage.removeItem(LIGHT_MODE);
      }
    });

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      const lastState = localStorage.getItem(LIGHT_MODE);
      if (lastState) {
        root?.classList.add('light');
        this.modeToggle.toggle(true);
      }
    } else {
      root?.classList.add('light');
      this.modeToggle.toggle(true);
    }
    const mobileDropDown = new UL().position('absolute').top(40).right(-5).width('calc(100vw - 30px)').borderRadius(8)
      .backgroundColor(Theme.colors?.border).display('none').flexDirection('column').padding([10, 0])
      .boxShadow('0px 10px 20px rgba(0,0,0,0.1)')
      .addChild(
        ...topLinks.map(link => new LI().display('flex').addChild(
          new A().text(link.title).attrHref(link.href).style(Theme.styles?.linkStyle as Style).padding([10, 24])
        ))
      );
    this.display('flex').justifyContent('space-between').alignItems('center').addChild(
      new Container().display('flex').gap(25).addChild(
        showLogo ? new A().display('flex').alignItems('center').attrHref('/').on({
          click(e) {
            e?.preventDefault();
            Router.go('/');
          }
        }).addChild(
          new SVG().attrWidth(391).attrHeight(67).attrViewbox('0 0 391 67')
            .width(186).height(32)
            .on({
              create() {
                this.node().innerHTML = `
            <path d="M0.44 37.448C0.44 47.456 7.064 54.08 17.144 54.08C27.08 54.08 33.776 46.448 33.776 37.232V1.952H23.84V37.232C23.84 41.696 21.248 44.648 17.072 44.648C13.04 44.648 10.088 42.272 10.016 37.016V32.336L0.44 34.064V37.448ZM38.9392 43.352C38.9392 48.896 43.5472 54.008 51.1072 54.008C56.3632 54.008 59.7472 51.56 61.5472 48.752C61.5472 50.12 61.6912 52.064 61.9072 53H70.6912C70.4752 51.776 70.2592 49.256 70.2592 47.384V29.96C70.2592 22.832 66.0832 16.496 54.8512 16.496C45.3472 16.496 40.2352 22.616 39.6592 28.16L48.1552 29.96C48.4432 26.864 50.7472 24.2 54.9232 24.2C58.9552 24.2 60.8992 26.288 60.8992 28.808C60.8992 30.032 60.2512 31.04 58.2352 31.328L49.5232 32.624C43.6192 33.488 38.9392 37.016 38.9392 43.352ZM53.1232 46.88C50.0272 46.88 48.5152 44.864 48.5152 42.776C48.5152 40.04 50.4592 38.672 52.9072 38.312L60.8992 37.088V38.672C60.8992 44.936 57.1552 46.88 53.1232 46.88ZM109.807 17.576H99.7269L91.3029 41.336L82.5189 17.576H72.0069L86.4789 53H96.0549L109.807 17.576ZM110.453 43.352C110.453 48.896 115.061 54.008 122.621 54.008C127.877 54.008 131.261 51.56 133.061 48.752C133.061 50.12 133.205 52.064 133.421 53H142.205C141.989 51.776 141.773 49.256 141.773 47.384V29.96C141.773 22.832 137.597 16.496 126.365 16.496C116.861 16.496 111.749 22.616 111.173 28.16L119.669 29.96C119.957 26.864 122.261 24.2 126.437 24.2C130.469 24.2 132.413 26.288 132.413 28.808C132.413 30.032 131.765 31.04 129.749 31.328L121.037 32.624C115.133 33.488 110.453 37.016 110.453 43.352ZM124.637 46.88C121.541 46.88 120.029 44.864 120.029 42.776C120.029 40.04 121.973 38.672 124.421 38.312L132.413 37.088V38.672C132.413 44.936 128.669 46.88 124.637 46.88ZM183.609 14.12C182.457 8.36 177.705 0.871997 165.321 0.871997C155.673 0.871997 147.537 7.784 147.537 16.856C147.537 24.56 152.793 29.816 160.929 31.472L168.057 32.912C172.017 33.704 174.249 36.008 174.249 38.96C174.249 42.56 171.297 45.224 165.969 45.224C158.769 45.224 155.241 40.688 154.809 35.648L145.593 38.096C146.385 45.368 152.361 54.08 165.897 54.08C177.777 54.08 184.329 46.16 184.329 38.312C184.329 31.112 179.361 25.064 170.073 23.264L162.945 21.896C159.201 21.176 157.401 18.944 157.401 16.136C157.401 12.752 160.569 9.656 165.393 9.656C171.873 9.656 174.177 14.048 174.681 16.856L183.609 14.12ZM204.749 25.352C209.501 25.352 211.733 28.376 212.597 31.328L221.165 28.448C219.653 22.472 214.181 16.496 204.533 16.496C194.237 16.496 186.173 24.344 186.173 35.288C186.173 46.16 194.381 54.08 204.821 54.08C214.253 54.08 219.797 48.032 221.381 42.128L212.957 39.32C212.165 42.056 209.717 45.296 204.821 45.296C199.925 45.296 195.749 41.696 195.749 35.288C195.749 28.88 199.853 25.352 204.749 25.352ZM247.143 17.432C246.423 17.36 245.703 17.288 244.911 17.288C241.887 17.288 236.991 18.152 234.831 22.832V17.576H225.543V53H235.119V36.8C235.119 29.168 239.367 26.792 244.263 26.792C245.127 26.792 246.063 26.864 247.143 27.08V17.432ZM260.575 53V17.576H250.999V53H260.575ZM249.847 5.984C249.847 9.152 252.511 11.816 255.751 11.816C259.063 11.816 261.655 9.152 261.655 5.984C261.655 2.672 259.063 0.00799561 255.751 0.00799561C252.511 0.00799561 249.847 2.672 249.847 5.984ZM277.523 66.68V49.544C279.251 51.92 282.851 53.864 287.747 53.864C297.755 53.864 304.451 45.944 304.451 35.216C304.451 24.704 298.475 16.784 288.107 16.784C282.779 16.784 278.819 19.16 277.235 21.896V17.576H267.947V66.68H277.523ZM295.019 35.288C295.019 41.624 291.131 45.296 286.235 45.296C281.339 45.296 277.379 41.552 277.379 35.288C277.379 29.024 281.339 25.352 286.235 25.352C291.131 25.352 295.019 29.024 295.019 35.288ZM320.82 6.992H312.18V11.96C312.18 15.128 310.452 17.576 306.708 17.576H304.908V26.072H311.316V42.56C311.316 49.4 315.636 53.504 322.548 53.504C325.356 53.504 327.084 53 327.948 52.64V44.72C327.444 44.864 326.148 45.008 324.996 45.008C322.26 45.008 320.82 44 320.82 40.904V26.072H327.948V17.576H320.82V6.992Z" fill="#787878"/>
            <path d="M352.792 54.152C363.736 54.152 372.448 47.456 372.448 34.928V1.952H362.512V34.208C362.512 40.904 358.84 44.432 352.792 44.432C346.888 44.432 343.144 40.904 343.144 34.208V1.952H333.208V34.928C333.208 47.456 341.92 54.152 352.792 54.152ZM390.834 53V1.952H380.754V53H390.834Z" fill="var(--white)"/>
            `;
              }
            })
        ) : '' as any,
        leftMenu !== undefined
          ? new SVG().attrHeight(24).attrWidth(24).attrViewbox('0 0 24 24').on({
            create() {
              this.node().innerHTML = `<path d="M5 17H19" stroke="var(--code-title)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 12H19" stroke="var(--code-title)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 7H19" stroke="var(--code-title)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
            }
          }).on({ click: () => leftMenu() }).display('none')
            .media({
              '(max-width: 960px)': { display: 'inline' }
            })
          : <any>'',
        ...socialLinks.map(link => {
          return new A().attrHref(link.href).attrTarget('_blank').display('flex').alignItems('center').addChild(
            new Image().attrSrc(link.src).attrAlt(link.alt).attrWidth(24).attrHeight(24),
          )
        })
      ),
      new Container().display('flex').addChild(
        new Container().addChild(
          ...topLinks.map(link => {
            return new A().text(link.title).attrHref(link.href).style(Theme.styles?.linkStyle as Style).padding([0, 12])
          })
        ).media({
          '(max-width: 520px)': { display: 'none' }
        }),
        this.modeToggle.marginLeft(15),
        new Container().position('relative').addChild(
          new SVG().attrWidth(24).attrHeight(24).attrViewbox('0 0 24 24').marginLeft(20).on({
            create() {
              this.node().innerHTML = `<path d="M5 17H19" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 12H19" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 7H19" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
            }
          }).on({
            click: () => (<any>mobileDropDown.display()) === 'flex' ? mobileDropDown.display('none') : mobileDropDown.display('flex')
          }), mobileDropDown
        ).display('none')
          .media({
            '(max-width: 520px)': { display: 'flex' }
          })
      )
    ).marginBottom(100).paddingTop(25).media({
      '(max-width: 520px)': { marginBottom: 50 }
    })
  }
}

