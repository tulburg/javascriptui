import { PageComponent, H1, P } from "../core/components";

export default class App extends PageComponent {

  constructor() {
    // initialization
    super();
    this.paddingTop(120).addChild(
      new H1().text('Hello World').fontSize(56).textAlign('center')
        .color('white').border('2px solid yellow'),
      new P().text('Welcome to JS Native. Follow me on twitter @tulburg')
        .color('white').textAlign('center')
    );
  }

}
