import Props from './props';
import { $RxElement, Style } from './components';
import { createRules } from './styles';


let all, cssProps;
let altProps = Object.getOwnPropertyNames(document.head.style);
if (altProps.length === 0) altProps = Object.keys((<any>document.head.style).__proto__).filter(i => !i.match('-'))
const Parser = {
  render: function (component: $RxElement) {
    this.parseProperties(component);
  },

  parseFncStyles: function (fnc: string, comp: $RxElement, state?: boolean) {
    if (fnc.match(/(&|>)/)) {
      fnc = fnc.trim();
      const start = fnc.indexOf('&');
      const end = start + fnc.substr(start).indexOf('}') + 1;
      const rule = fnc.substr(start, end);
      const cssRule = rule.replace('&', comp.$tagName + '.'
        + comp.$className.split(' ')[0]).trim();
      if (cssRule.length > 20) {
        if (!state) createRules(comp, [cssRule]);
      }
      const rem = fnc.replace(rule, '');
      if (rem.trim().length > 0) {
        Parser.parseFncStyles(rem, comp, state);
      }
    } else if (fnc.match(/</)) {
      const start = fnc.indexOf('<');
      const end = start + fnc.substr(start).indexOf('}') + 1;
      const rule = fnc.substr(start, end);
      // Todo: Add exception to adding rules that involves the parent
      // during animation, or any term that will include external components

      // if(comp.root) {
      //   const cssRule = rule.replace('<', comp.root.tagName + '.' + comp.root.className).trim();
      //   if(cssRule.length > 20){
      //     styles.push(cssRule);
      //   }
      // }
      const rem = fnc.replace(rule, '');
      if (rem.trim().length > 0) {
        Parser.parseFncStyles(rem, comp, state);
      }
    } else {
      return fnc;
    }
  },

  parseProperties: function (component: $RxElement | any, state?: boolean) {
    const properties: any = {};
    let componentStyles = component.$tagName + '.'
      + component.$className.split(' ')[0] + ' { ';
    const props = Object.getOwnPropertyNames(component);
    cssProps = cssProps || altProps;
    all = all || Object.keys(Props.props).concat(Props.excludes);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (all.indexOf(prop) === -1 && cssProps.indexOf(prop.slice(1)) > -1 && prop[0] === '$') {
        let key = prop.slice(1).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        if (key.match(/^webkit-/) || key.match(/^o-/) || key.match(/^ms-/) || key.match(/^moz-/)) {
          key = '-' + key;
        }
        componentStyles += key + ': '
          + Parser.parseStyleValue(component[prop]) + '; ';
      } else if (Props.props[prop] || prop === '$events') {
        if (component[prop] !== undefined) {
          if (prop !== '$events') properties[Props.props[prop].split('.')[1]] = component[prop];
          else properties[prop] = component[prop];
        } else if (Props.excludes.indexOf(prop) < 0 && component.$level !== 0) {
          throw new Error('Invalid property ' + prop);
        }
      }
    }
    if (!state) createRules(component, [componentStyles + '} ']);
    return properties;
  },

  parseNativeStyle: function (obj: $RxElement | any) {
    let objStyles = '';
    for (let prop in obj) {
      if ($RxElement.prototype[prop] || (<any>window).Native === undefined) {
        const key = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        objStyles += key + ': '
          + Parser.parseStyleValue(obj[prop]) + '; ';
      } else {
        if (prop.replace('$', '').match('--')) {
          const root = prop.replace('$', '');
          objStyles += `${root}: ${obj[root]}; `;
        } else if (Props.excludes.indexOf(prop.toLowerCase()) < 0 && obj.$level != 0) {
          throw new Error('Invalid css property ' + prop + ': ' + obj[prop]);
        }
      }
    }
    return objStyles;
  },

  parseStyleValue: function (value: any): any {
    if (value == null) {
      return 'unset';
    } else if (typeof value == 'string') {
      return value;
    } else if (typeof value == 'number') {
      return value + 'px';
    } else if (value instanceof Array) {
      return value.map(v => Parser.parseStyleValue(v)).join(' ');
    }
    return value;
  }
}

export default Parser;
