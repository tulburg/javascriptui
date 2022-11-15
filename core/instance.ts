import Router from "./lib/router";

new Router();

if ((<any>module).hot) {
  (<any>module).hot.accept('./lib/router', () => {
    const highestTimeoutId: any = setTimeout(';');
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    const w: any = window;
    if (w.Native) {
      w.Native.sheet.disabled = true;
      w.Native.hot = true;
    }
    const NewRouter = require('./lib/router').default;
    new NewRouter();
  })
}
