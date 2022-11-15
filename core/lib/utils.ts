import { ELEMENT } from "./components";
import Props from "./props";
import { Attributes } from "./types";

export function createSheet(data: string[]): CSSStyleSheet {
  const allStyles = document.head.getElementsByTagName('style');
  const id = 'n' + Math.random().toString(36).substr(2, 9);
  const style: any = Array.from(allStyles).find(i => i.id === (<any>window).Native.sheedId);
  if (style) style.disabled = true;
  const newStyle = document.createElement('style');
  newStyle.appendChild(document.createTextNode(''));
  newStyle.setAttribute('id', id);
  (<any>window).Native.sheedId = id;
  document.head.appendChild(newStyle);
  for (let i = 0; i < data.length; i++) {
    if (data[i].trim().length > 0 && !data[i].trim().match('{ }')) {
      const rule = data[i].trim();
      try {
        newStyle.sheet?.insertRule(rule, newStyle.sheet.cssRules.length);
      } catch (e) {
        throw new Error('Rule not applied: ' + rule + ' ' + e.message);
      }
    }
  }
  return newStyle.sheet;
};

export function createRules(object: any, rules: string[]) {
  const sheet = ((<any>window).Native as any).sheet;
  rules.forEach(css => {
    const length = sheet.cssRules.length;
    try {
      sheet.insertRule(css, length);
    } catch (e) {
      throw new Error('Rule not applied: ' + css + e.message);
    }
    const last = sheet.cssRules[length];
    if (Config.styleDebug) {
      addLoadQueue(() => {
        const text = last.cssText.replace(/(.*)\{/, '').replace(/\s/g, ''),
          clean = css.replace(/(.*)\{/, '').replace(/\s/g, '');
        let textSplit = text.split(';').slice(0, -1).map(i => i.split(':')[0]),
          cleanSplit = clean.split(';').slice(0, -1).map(i => i.split(':')[0]);
        if (textSplit.length !== cleanSplit.length) {
          const mergeProps = () => {
            const result: any = [];
            textSplit.forEach(item => {
              result.push(cleanSplit.find(i => item.match(i) || i.match(item)));
            });
            return result;
          }
          if (mergeProps().length !== textSplit.length) {
            console.warn('Rule may not be applied as expected ' + css)
          }
        }
      });
    }
    object.$rules = object.$rules || [];
    object.$rules.unshift(last);
  });
}

let all, cssProps;
let altProps = Object.getOwnPropertyNames(document.head.style);
if (altProps.length === 0) altProps = Object.keys((<any>document.head.style).__proto__).filter(i => !i.match('-'));

export function parseProperties(component: Element | any, state?: boolean): Attributes<ELEMENT> {
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
        + parseStyleValue(component[prop]) + '; ';
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
}

export function parseNativeStyle(obj: ELEMENT | any) {
  let objStyles = '';
  for (let prop in obj) {
    if (ELEMENT.prototype[prop] || (<any>window).Native === undefined) {
      const key = prop.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      objStyles += key + ': '
        + parseStyleValue(obj[prop]) + '; ';
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
}

export function parseStyleValue(value: any): any {
  if (value == null) {
    return 'unset';
  } else if (typeof value == 'string') {
    return value;
  } else if (typeof value == 'number') {
    return value + 'px';
  } else if (value instanceof Array) {
    return value.map(v => parseStyleValue(v)).join(' ');
  }
  return value;
}


export function addLoadQueue(fn: () => void) {
  const w: any = window;
  w.__native_load_queue = w.__native_load_queue || [];
  w.__native_load_queue.push(fn);
}
