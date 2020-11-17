import { PageComponent, Container, Component, P, H1, Input, Style, A } from "../core/components";
import { RxElement } from "../core/types";

export default class App extends PageComponent {

  // main container - S1
  mainContainer: RxElement;
  time: string;
  modelText: string;
  spec: Spec;
  sample = { name: 'google' };

  constructor() {
    // initialization
    super();

    this.state = {
      time: '00:00:00',
      modelText: ''
    }
    this.time = '00:00:00';
    this.padding(40).boxSizing('border-box');

    this.mainContainer = new Grid('repeat(3, 1fr)', 10).boxSizing('border-box');
    this.mainContainer.height('100vh').width('100vw').position('relative');
    this.addChild(this.mainContainer);

    this.sample.name.watch(() => {
      console.log('sample has changed');
    })

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
        ).styles(Theme.styles.roundButton)
    );
    const modelTest: RxElement = this.mainContainer.children()[2] as RxElement;
    setTimeout(() => (<any>modelTest.styles())[0].background('red').color('white').global({'p': {
      color: 'white'
    }}), 1000);
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
    console.log(Router.current.data);

  }

  onCreate() {
    setInterval(() => {
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
  style: Style;

  constructor() {
    super();
    this.slate = 'google';
    this.style = new Style({
      background: 'red', fontSize: 15, display: 'flex'
    }).global({
      '*': {
        fontSize: 12
      }
    });

    this.addChild(
      new A().text('Checklist').href('javascript:void(0)')
      .on({
        click: () => Router.go('/checklist')
      })
    );
  }

  onCreate() {
    setTimeout(() => {
      this.slate = 'yahoo';
    }, 2000);
  }
}
