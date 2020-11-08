import { PageComponent, H1, A, Container } from '../core/components';
import App from './app';

export default class Checklist extends PageComponent {

  cont: Container;

  constructor() {
    super();

    this.display('flex').height('100vh').width('100vw').boxSizing('border-box')
      .backgroundColor('#f0f0f0').justifyContent('center').padding(40);
    this.addChild(new H1().text('Checklist').color('#404040').fontSize(32))
    this.cont = new Container();
    this.addChild(this.cont);

    this.addChild(
      new Container().addChild(
        new A().text('view list')
          .href('javascript:void(0)')
          .on({
            click: () => Router.go('/checklist/list/2')
          })
      )
    );
    this.cont.host([
      { path: '/list/:id', name: 'App', component: App }
    ]);
  }

  onCreate() {

  }

}
