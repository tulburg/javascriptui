import Router from "./router";

new Router();

if((<any>module).hot) {
  (<any>module).hot.accept('./router', () => {
    const highestTimeoutId: any = setTimeout(';');
    for(let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    const w: any = window;
    if(w.Native) w.Native.sheet.disabled = true;
    const NewRouter = require('./router').default;
    new NewRouter();
  })
}
