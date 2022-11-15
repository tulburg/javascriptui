import { A, Container, H1, PageComponent, Style } from 'javascriptui/lib/components';

export default class App extends PageComponent {

  constructor() {
    super();

    const linkStyle = new Style({ color: Theme.colors?.text })
      .pseudo({
        ':hover': { fontWeight: 'bold' }
      });

    this.display('flex').alignItems('center').justifyContent('center')
      .height('100vh').width('100vw').backgroundColor(Theme.colors?.background)
      .addChild(
        new Container().display('flex').flexDirection('column').addChild(
          new H1().text('Welcome to JavascriptUI!').color(Theme.colors?.text)
            .fontSize(48),
          new Container().display('flex').gap(32).padding(16).justifyContent('center')
            .addChild(
              ...[
                { title: 'Github', url: 'https://github.com/tulburg/javascriptui.git' },
                { title: 'Twitter', url: 'https://twitter.com/tulburg' },
                { title: 'Documentation', url: 'https://javascriptui.dev' }
              ].map(link => {
                return new A().attrHref(link.url).attrTarget('_blank').text(link.title).style(linkStyle)
              })
            )
        )
      ).media({
        'only screen and (max-width: 800px)': { padding: [0, 20] }
      });
  }
}
