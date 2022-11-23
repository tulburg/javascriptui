import { A, Container, H2, P, PageComponent } from "@javascriptui/core";
import { Layout } from "../theme";
import { TopBar, Footer } from "./app";

export default class Help extends PageComponent {
  constructor() {
    super();
    this.backgroundColor(Theme.colors?.background)
      .height('100vh').width('100vw').overflowX('hidden').addChild(
        new Layout(
          new TopBar(Config.socialLinks, Config.topLinks),
          new Container().border('1px solid ' + Theme.colors.borderLight)
            .backgroundColor(Theme.colors.backgroundLight)
            .padding([15, 25]).borderRadius(15)
            .addChild(
              new H2().text('Contact').color(Theme.colors.text),
              new P().color(Theme.colors.text).replaceTextTag('Adam <${email}>', {
                'email': () => new A().text('demos_08_dovish@icloud.com')
                  .attrHref('mailto:demos_08_dovish@icloud.com').color('#3452c9')
                  .attrTitle('Send email').textDecoration('none')
              })
            ),
          new Footer()
        )
      );
  }
}
