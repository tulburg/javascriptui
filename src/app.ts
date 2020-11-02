import { PageComponent, Container, Component, P, H1, Input } from "../core/components";
import { RxElement } from "../core/types";

export default class App extends PageComponent {

  // main container - S1
  mainContainer: RxElement;
  time: string;
  modelText: string;
  spec: Spec;

  constructor() {
    // initialization
    super();

    this.state = {
      time: '00:00:00',
      modelText: ''
    }
    this.time = '00:00:00';
    this.padding(40).boxSizing('borderBox');
    
    this.mainContainer = new Grid('repeat(3, 1fr)', 10);
    this.mainContainer.height('100vh').width('100vw').position('relative');
    this.addChild(this.mainContainer);

    // state test
    this.mainContainer.addChild(new Container()
      .addChild(
        new P().text('State test')
          .fontSize(20).color(Theme.color.fontColorGreyLight),
        new H1().text(this.state.time)
          .fontSize(54)
          .color(Theme.color.fontColorGrey)
      )
    );

    // property test
    this.mainContainer.addChild(new Container()
      .addChild(
        new P().text('Property test')
          .fontSize(20).color(Theme.color.fontColorGreyLight),
        new H1().text(this.time)
          .fontSize(54)
          .color(Theme.color.fontColorGrey)
      )
    );

    // model test (State) 
    this.mainContainer.addChild(
      new Container()
        .addChild(
          new P().text('Model test (State): ' + this.state.modelText)
            .fontSize(20).color(Theme.color.fontColorGreyLight),
          new Input().placeholder('Enter text here').model(this.state.modelText)
            .padding([10, 20]).fontSize(14)
        )     
    );

    // model test (Property) 
    this.mainContainer.addChild(
      new Container()
        .addChild(
          new P().text('Modely test (Property): ' + this.state.modelText)
            .fontSize(20).color(Theme.color.fontColorGreyLight),
          new Input().placeholder('Enter text here').model(this.state.modelText)
            .padding([10, 20]).fontSize(14)
        )     
    );

    this.time.watch(v => {
      ((<RxElement>this.mainContainer.children()[0]).children()[1] as RxElement).text(v);
    });

    this.spec = new Spec();
    this.spec.slate.watch(v => {
      console.log(v);
    });

    this.addChild(this.spec);

  }

  onCreate() {
    setTimeout(() => {
      // this.state.time = new Date().toLocaleTimeString();
      this.time = new Date().toLocaleTimeString();
      ((this.mainContainer.children()[1] as RxElement).children()[1] as RxElement).text(new Date().toLocaleTimeString());
    }, 1000);
  }
}

class Grid extends Container {
  constructor(templateColumns: string, gap?: string | number) {
    super();
    this.display('grid').gridTemplateColumns(templateColumns);
    if(gap) this.gridGap(gap);
  }
}

class Spec extends Component {

  slate: string;

  constructor() {
    super();
    this.slate = 'google';
  }

  onCreate() {
    setTimeout(() => {
      this.slate = 'yahoo';
    }, 2000);
  }
}
