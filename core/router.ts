import Config from '../config';
import Props from './props';

export default class Router {

  routes = Config.routes;
  
  constructor() {
    const props = Object.getOwnPropertyNames(Props.props);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i], caller = Props.props[prop]; let fn: Function;
      if(typeof caller === 'function') {
        fn = new Function(
          prop, `return function() {
            if(arguments.length > 0) {
              Object.defineProperty(this, '${prop}', {
                value: '',
                writable: true,
                enumerable: true,
                configurable: true
              });
              this['${prop}'] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
            }else return this.${prop};
            return this;
          }`
        )();
      }else {
        const split = caller.split('.'),
        key = split[0], name = split[1];
        fn = new Function(
          prop, `return function() {
            if(arguments.length > 0) {
              Object.defineProperty(this, '${prop}', {
                value: '',
                writable: true,
                enumerable: true,
                configurable: true
              });
              if('${key}' === 'css') {
                this.$styles = this.$styles || [];
                const selector = (this.tagName || '') + '.' + this.className.split(' ')[0];
                for(let i = 0; i < this.$styles.length; i++) {
                  const css = this.$styles[i];
                  if(css.selectorText === selector) {
                    css.style.setProperty('${name}', arguments.length === 1 ? arguments[0] : Array.from(arguments));
                  }
                }
              }
              if('${key}' === 'attr') {
                const node = this.node();
                if(node) {
                  node.setAttribute('${name}', arguments.length === 1 ? arguments[0] : Array.from(arguments));
                }
              }
              this['${prop}'] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
            }else return this.${prop};
            return this;
          }`
        )();
      }
      window.RxElement.prototype[prop.slice(1)] = fn;
      Component.prototype[prop.slice(1)] = fn;
      if(typeof caller !== 'function' && caller.split('.')[0] === 'css') {
        Style.prototype[prop.slice(1)] = fn;
      }
    } 
  }
}
