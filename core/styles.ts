import Native from "./native";

export const createSheet = function (data: string[]) {
  const allStyles = document.head.getElementsByTagName('style');
  const id = 'n' + Math.random().toString(36).substr(2, 9);
  const style: any = Array.from(allStyles).find(i => i.id === (<any>window).Native.sheedId);
  if(style) style.disabled = true;
  const newStyle = document.createElement('style');
  newStyle.appendChild(document.createTextNode(''));
  newStyle.setAttribute('id', id);
  (<any>window).Native.sheedId = id;
  document.head.appendChild(newStyle);
  for (let i = 0; i < data.length; i++) {
    if (data[i].trim().length > 0 && !data[i].trim().match('{ }')) {
      const rule = data[i].trim();
      try {
        newStyle.sheet.insertRule(rule, newStyle.sheet.cssRules.length);
      } catch (e) {
        throw Error('Rule not applied: ' + rule + ' ' + e.message);
      }
    }
  }
  return newStyle.sheet;
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

