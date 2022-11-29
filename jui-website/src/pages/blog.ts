import { A, Article, Container, EM, H1, H2, IMG, P, PageComponent, Span } from "@javascriptui/core";
import { CodeBlock, Layout } from "../theme";
import { TopBar, Footer } from "./app";

const blogContent = require('../docs/blog.json');

export default class Blog extends PageComponent {

  mainContainer: Container;
  blogParser: any;

  constructor() {
    super();
    document.title = "JavascriptUI | Blog";

    const blogs = [
      {
        slug: 'reactivity-and-why-its-missing',
        title: "Reactivity & Why it's missing",
        cover: `https://res.cloudinary.com/dwdhnu6bs/image/upload/w_${window.innerWidth > 680 ? '640' : (window.innerWidth + 40)},c_scale/v1669630468/problem-solving-close-up-view-hand-business-woman-stopping-falling-blocks-table-concept-about-taking-responsibility-min_fcdoto.jpg`,
        subtitle: "General design decisions always fall into two categories: Design for aesthetics & usage or a solution to an unavoidable problem. Reactivity falls in the later category.",
        content: blogContent[0]
      }
    ];

    this.blogParser = {
      'text': (value: string) => new P().text(value).padding([10, 0]).color(Theme.colors.text).fontSize(14),
      'heading': (value: string) => new H2().text(value).color(Theme.colors.text),
      'paragraph': (value: string) => new P().text(value).fontSize(16).color(Theme.colors.text)
        .lineHeight('1.7').paddingTop(16),
      'code': (value: string) => new Container().addChild(
        new CodeBlock(value)
      ).marginTop(25).marginBottom(15),
      'image': (value: string) => new IMG().attrSrc(value || 'https://source.unsplash.com/featured/500x500')
        .attrAlt("Blog photo").margin([10, 0]).borderRadius(10)
    };
    this.mainContainer = new Container();

    this.backgroundColor(Theme.colors?.background).display('flex')
      .height('100vh').width('100vw').overflowX('hidden')
      .justifyContent('center').addChild(
        new Container().width(960).addChild(
          new TopBar(Config.socialLinks, Config.topLinks, true),
          this.mainContainer,
          new Footer().marginTop(150)
        ).media({
          '(max-width: 1024px)': { width: '100%' }
        })
      ).media({
        '(max-width: 1024px)': { padding: [0, 25] },
        '(max-width: 560px)': { padding: [0, 20] }
      });

    const { data } = Router.current;
    if (data && data.slug) {
      const blog = blogs.find(i => i.slug === data.slug);
      if (blog) {
        document.title = blog.title;
        const socialShare = [
          [require('../assets/faceb.svg'), 'https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(blog.title + '\n' + location.href + '\n #JavascriptUI')],
          [require('../assets/twitter.svg'), 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(blog.title + '\n' + location.href + '\n #JavascriptUI')],
          [require('../assets/email.svg'), 'mailto:?subject=' + encodeURIComponent(blog.title) + '&body=' + encodeURIComponent(location.href)],
        ]
        this.mainContainer.display('grid').gridTemplateColumns('240px auto')
          .addChild(
            new Container().addChild(
              new P().text('2 min read').color(Theme.colors.textLight),
              new Span().text('SHARE').fontSize(12).color(Theme.colors.textXLight)
                .margin([10, 0]).display('inline-flex').media({
                  '(max-width: 920px)': { margin: 0, alignItems: 'center' }
                }),
              new Container().addChild(
                ...socialShare.map(
                  social => new IMG().attrSrc(social[0]).cursor('pointer').marginRight(10).on({
                    click() { social[1].match('mailto') ? window.open(social[1]) : Router.go(social[1]) }
                  })
                )
              )
            ).media({
              '(max-width: 920px)': { display: 'flex', gap: 25, alignSelf: 'center', marginBottom: 20 }
            }),
            new Article().addChild(
              new H1().text(blog.title).color(Theme.colors.text).media({
                '(max-width: 640px)': { fontSize: 24 },
                '(max-width: 480px)': { fontSize: 20 }
              }),
              new Container().display('flex').addChild(
                new EM().text('—').margin([0, 10]).color(Theme.colors.textLight),
                new A().attrHref('https://twitter.com/intent/tweet?text=@tulburg ')
                  .text('Adam').color(Theme.colors.textLight).marginBottom(10)
                  .attrTarget("_new").on({
                    click: (e) => {
                      e.preventDefault();
                      Router.go('https://twitter.com/intent/tweet?text=@tulburg ')
                    }
                  })
              ),
              // use slug for colbalt storage
              // new Container().addClassName(data.slug).padding(40).width(600)
              new Container().width(600).addChild(
                ...blog.content.map((item: any) => this.blogParser[item.name](item.data))
              ).media({
                '(max-width: 720px)': {
                  width: '100%',
                  global: {
                    'img': { width: '100%' }
                  }
                }
              }),
            )
          ).media({
            '(max-width: 920px)': { gridTemplateColumns: '1fr' },
            '(max-width: 650px)': { width: '100%' }
          })
      }
    } else {
      this.mainContainer.addChild(
        ...blogs.map(blog => new Container().width(600).cursor('pointer').position('relative')
          .zIndex('1').on({ click: () => Router.go('/blog/' + blog.slug) })
          .addChild(
            new Container().addChild(
              new IMG().attrSrc(blog.cover).attrAlt("image showing woman stopping falling blocks")
                .height(window.innerWidth > 480 ? 420 : window.innerWidth * 0.5).borderRadius(10).maxWidth('100%').objectFit('cover').media({
                  '(max-width: 640px)': { width: '100%' }
                }),
              new H2().text(blog.title).color(Theme.colors.text).marginTop(10),
              new P().text(blog.subtitle).fontSize(15).color(Theme.colors.textLight)
                .marginTop(10).lineHeight('1.5')
            ),
          ).pseudo({
            ':before': {
              content: "''", borderRadius: 20, opacity: '0',
              transition: 'ease-out 0.2s all',
              top: -20, left: -20, width: 'calc(100% + 40px)',
              height: 'calc(100% + 40px)', position: 'absolute',
              backgroundColor: Theme.colors.backgroundLight, zIndex: '-1'
            },
            ':hover::before': { opacity: '1' }
          }).media({
            '(max-width: 640px)': { width: '100%' }
          })),
      )
    }
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
    // For debug purpose
    // const Cobalt = (<any>window).Cobalt;
    // new Cobalt('.' + Router.current.data.slug, this.blogParser);
  }
}
