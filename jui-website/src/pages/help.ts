import { A, Container, H2, P, PageComponent } from "@javascriptui/core";
import { Layout } from "../theme";
import { TopBar, Footer } from "./app";

export default class Help extends PageComponent {
  constructor() {
    super();
    this.backgroundColor(Theme.colors?.background).display('flex')
      .height('100vh').width('100vw').overflowX('hidden')
      .justifyContent('center')
      .addChild(
        new Container().width(960).addChild(
          new TopBar(Config.socialLinks, Config.topLinks),
          new Container().border('1px solid ' + Theme.colors.borderLight)
            .backgroundColor(Theme.colors.backgroundLight)
            .padding([15, 25]).borderRadius(15)
            .addChild(
              new H2().text('Contact').color(Theme.colors.text),
              new P().color(Theme.colors.text).replaceTextTag('Adam <${email}>', {
                'email': () => new A().text('demos_08_dovish@icloud.com')
                  .attrHref('mailto:demos_08_dovish@icloud.com').color('#3452c9')
                  .attrTitle('Send email').textDecoration('none').wordBreak('break-all')
              })
            ).media({
              '(max-width: 1024px)': { width: '100%' }
            }),
          new Footer()
        ).media({
          '(max-width: 1024px)': { width: '100%' }
        })
      ).media({
        '(max-width: 1024px)': { padding: [0, 25] },
        '(max-width: 560px)': { padding: [0, 20] }
      });
  }
}
