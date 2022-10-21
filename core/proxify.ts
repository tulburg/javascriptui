import { NativeEventType, RxElement } from './types';
import NativeClass from './native';
import {$RxElement} from './components';

const type = (o: any) => Object.prototype.toString.call(o).substr(8).replace(']','').toLowerCase();
const Native = function() : NativeClass {  return (<any>window).Native || undefined };

export const $observeArray = (object: any, value: any, key: string) => {
  const val = value;
  const oldObj = object;
  const oldVal = val;

  value.push = (item: any) => {
    Array.prototype.push.call(value, item);
    if(Native() && Native().served) {
      if(key === '$children') {
        Native().$notify({
          old: oldObj, new: object, oldValue: oldVal, newValue: value,
          key: key, index: value.indexOf(item), count: 1
        }, NativeEventType.insert);
      }
    }
  };

  value.pop = () => {
    const index = value.length - 1;
    if(Native() && Native().served) {
      object.$node.removeChild(object.$node.childNodes[index]);
      // Native().$notify({
      //   old: oldObj, index: index, count: 1
      // }, NativeEventType.delete);
    }
    Array.prototype.pop.call(value);
  };

  value.shift = () => {
    Array.prototype.shift.call(value);
    if(Native() && Native().served) {
      // @ts-ignore
      object.$node.removeChild(this.$node.childNodes[0]);
      // Native().$notify({
      //   old: oldObj, index: 0, count: 1
      // }, NativeEventType.delete);
    }
  };

  value.splice = (index: number, count: number, replace: any) => {
    if(value[index] && value[index].$level === 0) {
      const c = value[index];
      if(Native()) delete Native().components[c.name][c.nid];
    }
    if(Native() && Native().served) {
      if(replace) {
        Native().$notify({
          old: oldObj, new: replace, index: index
        }, NativeEventType.replace);
      }else {
        // send delete
        object.$node.childNodes[index].remove();
        // Native().$notify({
        //   old: oldObj, index, count
        // }, NativeEventType.delete);
      }
    }
    if(replace) Array.prototype.splice.call(value, index, count, replace);
    else Array.prototype.splice.call(value, index, count)
  };

  value.sort = (fn: Function) => {
    Array.prototype.sort.call(value, fn);
    if(Native() && Native().served) {
      Native().$notify({
        old: oldObj, new: object, oldValue: oldVal, newValue: value,
        key: key, index: 0, count: 0
      }, NativeEventType.sort);
    }
  };

  value.reverse = () => {
    Array.prototype.reverse.call(value);
    if(Native() && Native().served) {
      Native().$notify({
        old: oldObj, new: object, oldValue: oldVal, newValue: value,
        key: key, index: 0, count: 0
      }, NativeEventType.reverse);
    }
  };
};

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
export const ProxifyComponent = (object: RxElement, componentName: string, nid: string): RxElement => {
  // proxify children
  if(object.$children) $observeArray(object, object.$children, '$children');
  return new Proxy(object, {
    get: (object, name: string, receiver) => {
      if(name == '__proxy__') return true;
      setLock(object, componentName, name, nid);
      return Reflect.get(object, name, receiver);
    },
    set: (object, name, value, receiver) => {
      const old = (<any>object)[name];
      const oldObj = object;
      setLock(object, componentName, name, nid);
      if(type(value) === 'object' && name !== '$children'
        && name !== '__root__' && name !== 'state' && name !== '$styles') {
        if(value instanceof $RxElement && !(<any>value).__proxy__) {
        }else if(!value.__proxy__) {
          value = ProxifyComponent(value, componentName, nid);
        }
      } else if (type(value) == 'array') {
        // statelyArray or something
      } else if (type(value) == 'function') {
        // do nothing
      }
      if(name != '__proto__') {
        (<any>object)[name] = value;
        const instance = Native().components[componentName][nid];
        if(instance && instance.served) {
          // send notification to watchlist
          for(let i = 0; i < instance.watchlist.length; i++) {
            const w = instance.watchlist[i];
            if(Native().lock && Native().lock.key === w.prop) {
              w.function(value);
              w.oldValue = value;
            }
          }
        }
      }
      if(name !== '__proto__' && name !== '$native' && object.$tagName !== 'window.RxElement'
        && name !== '$tagName' && name !== 'animations' && name !== '$node' && name !== '$root'
        && name !== '$className' && name !== '$children' && name !== '$rules'
        && (<any>name)[0] != '$') {
        if(Native() && Native().served && object instanceof $RxElement) {
          Native().$notify({
            old: oldObj, new: object, oldValue: old,
            newValue: value, key: name as string
          }, NativeEventType.update);
        }
      }
      return Reflect.set(object, name, value, receiver);
    }
  });
};

[Boolean.prototype, Number.prototype, String.prototype, Array.prototype].map((o: any) => {
  o.watch = function(fn: Function) {
    if(fn) {
      const watcher: { object: any, prop: string, oldValue: any, function: Function } = {
        prop: Native().lock.key, oldValue: this, function: fn, object: undefined
      };
      const lock = Native().lock;
      if(Native().lock.type === 'state') {
        watcher.object = Native().components[lock.className][lock.nid].state;
      } else if(lock.type === 'property') {
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
