import Router from "./router";


new Router();

if((<any>module).hot) {
  (<any>module).hot.accept('./router', () => {
    const highestTimeoutId: any = setTimeout(';');
    for(let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    new Router();
  })
}
