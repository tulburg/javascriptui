import * as components from './lib/components';
import UI from './lib/ui';


const ui = new UI(undefined);
// @ts-ignore
ui.__proto__ = Object.assign(ui.__proto__, components);
// @ts-ignore
UI.prototype.load = function (selector: string, root: ELEMENT) {
  document.querySelector(selector).appendChild(ui.createElement(root));
  if (this.serving) {
    this.loadQueue[this.serving].forEach((i: any) => Function.prototype.call.apply(i));
    this.loadQueue[this.serving] = [];
  }
}



