import NativeClass from './native';

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']','').toLowerCase();
const Native = function() : NativeClass {  return (<any>window).Native || undefined };

const setLock = (object: any, componentName: string, name: string | number | symbol, nid: string) => {
  Native().lock = Native().lock || <any>{};
  if(object.name === undefined && type(name) !== 'symbol') {
    Native().lock.key = Native().lock.key + '.' + <string>name;
  }
  if(object.name === componentName && type(name) !== 'symbol') {
    Native().lock.key = componentName + '.' + <string>name;
  }
  Native().lock.type = 'property';
  Native().lock.className = componentName;
  Native().lock.nid = nid;
}

[Boolean.prototype, Number.prototype, String.prototype, Array.prototype].map((o: any) => {
  o.watch = function(fn: Function) {
    if(fn) {
      const watcher: { object: any, prop: string, oldValue: any, function: Function } = {
        prop: Native().lock.key, oldValue: this, function: fn, object: undefined
      };
      const lock = Native().lock;
      if(lock.type === 'property') {
        watcher.object = Native().components[lock.className][lock.nid];
      }
      if(Native().components[lock.className][lock.nid].watchlist.filter(i => {
        return ''+i.function == ''+watcher.function && i.prop == watcher.prop;
      }).length < 1) {
        Native().components[lock.className][lock.nid].watchlist.push(watcher);
      }
    }
  };
});
