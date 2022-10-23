import Props from './props';
import { $RxElement } from './components';
import {createRules} from './styles';

function type(object: any) {
  return Object.prototype.toString.apply(object).split(' ')[1].slice(0, -1).toLowerCase();
}

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
      if(cssRule.length > 20) {
        if(!state) createRules(comp, [cssRule]);
      }
      const rem = fnc.replace(rule, '');
      if (rem.trim().length > 0) {
        Parser.parseFncStyles(rem, comp, state);
      }
    } else if(fnc.match(/</)) {
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
    }else {
      return fnc;
    }
  },

  parseProperties: function (component: $RxElement | any, state?: boolean) {
    const properties: any = {};
    const all = Object.keys(Props.props).concat(Props.excludes);
    let componentStyles = component.$tagName+'.'
      + component.$className.split(' ')[0] + ' { ';
    const props = Object.getOwnPropertyNames(component);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (all.indexOf(prop) === -1 && prop[0] === '$') {
        const key = prop.slice(1).replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        componentStyles += key + ': '
              + Parser.parseStyleValue(component[prop]) + '; ';
      } else if(Props.props[prop] || prop === '$events') {
        if (component[prop] !== undefined) {
          properties[prop.slice(1)] = component[prop];
        } else if (Props.excludes.indexOf(prop) < 0 && component.$level !== 0) {
          // console.log(component);
          // throw new Error('Invalid property ' + prop);
        }
      }
    }
    if(!state) createRules(component, [componentStyles + '} ']);
    return properties;
  },

  parseNativeStyle: function (obj: $RxElement | any) {
    let objStyles = '';
    for (let prop in obj) {
      if ($RxElement.prototype[prop]) {
        const key = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
        objStyles += key + ': '
              + Parser.parseStyleValue(obj[prop]) + '; ';
      } else {
        if(prop.replace('$','').match('--')) {
          const root = prop.replace('$', '');
          objStyles += `${root}: ${obj[root]}; `;
        }else if (Props.excludes.indexOf(prop.toLowerCase()) < 0 && obj.$level != 0) {
          throw new Error('Invalid css property ' + prop);
        }
      }
    }
    return objStyles;
  },

  parseStyleValue: function (value: any) : any {
    if(value == null) {
      return 'unset';
    }else if(typeof value == 'string') {
      return value;
    }else if (typeof value == 'number') {
      return value + 'px';
    } else if (value instanceof Array) {
      return value.map(v => Parser.parseStyleValue(v)).join(' ');
    }
    return value;
  }
}

export default Parser;
