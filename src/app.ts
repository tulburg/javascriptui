import {PageComponent, Button} from "../core/components";

export default class App extends PageComponent {

  constructor() {
    super();
    console.log('working..');

    this.display('block');
    this.backgroundColor('red');

    
    this.addChild(new Button().text('test button'));
  }
}
