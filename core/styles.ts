import Native from "./native";

export const createSheet = function (data: string[]) {
  let style;
  const allStyles = document.head.getElementsByTagName('style');
  style = Array.from(allStyles).find(i => i.id === 'native-styles');
  if(!style) {
    style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    style.setAttribute('id', 'native-styles');
    document.head.appendChild(style);
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].trim().length > 0 && !data[i].trim().match('{ }')) {
      const rule = data[i].trim();
      try {
        style.sheet.insertRule(rule, style.sheet.cssRules.length);
      } catch (e) {
        throw Error('Rule not applied: ' + rule + ' ' + e.message);
      }
    }
  }
  return style.sheet;
};

export const createRules = function(object: any, rules: string[]) {
  const sheet = ((<any>window).Native as Native).sheet;
  rules.forEach(css => {
    try {
      const length = sheet.cssRules.length;
      sheet.insertRule(css, length);
      object.$rules = object.$rules || [];
      object.$rules.unshift(sheet.cssRules[length]);
    }catch(e) {
      throw new Error('Rule not applied: ' + css + e.message);
    }
  });
}

export const updateRules = function (object: any, rules: CSSStyleRule[]) {
  console.log('updateRules called', object, rules);
  // if(!object.$rules || object.$rules.length === 0) return createRules(object, <any>rules);
  // rules.forEach(rule => {
  //   const selector = rule.substring(0, rule.indexOf('{')).trim();
  //   for(let i = 0; i < object.$rules.length; i++) {
  //     const css = object.$rules[i];
  //     if((<any>css).selectorText === selector) {
  //       console.log("found >", css, object.$node);
  //     }
  //   }
  // });
};

export const updateClassRules = function(object: Element, rules: string[]) {
  return rules.map(css => {
    return css.replace(/([\.\b])\w+/g, '.' + object.className.split(' ').join('.'));
  });
}
//
// const extract = (rule: string) => {
//   return rule.trim().substring(rule.indexOf('{') + 1, rule.indexOf('}') - 2)
//     .trim().split(';').map(s => s.trim());
// };
// const pair = (v: string) => {
//   const value = v.split(':').map(s => s.trim());
//   return { name: value[0], value: value[1]};
// };
// const depair = (n: string, v: string) => {
//   return `${n}: ${v}`;
// };
