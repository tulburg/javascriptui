import Parser from './parser';

export class $RxElement {
  
  $level = 1;
  $children: $RxElement[] = [];
  $tagName = '$RxElement';
  $styles: string[] = [];
  $root: $RxElement = undefined;
  $events = undefined;
  $className: string = undefined;
  // $hostComponent = Native.serving;
  
  get name() { return this.constructor.name };
  
  constructor(tagName?: string) {
    this.$tagName = tagName || this.$tagName;
    this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substr(2, 9);
  }

  addChild(...children: $RxElement[]) {
    if(children[0] instanceof Array) {
      throw `Cannot addChild: ${children[0]} is not valid RxElement`;
    }
    if(this.$children) {
      for(let i = 0; i < children.length; i++) {
        if(children[i].$root !== undefined) {
          throw `Cannot addChild: ${children[i].name} is already attached`;
        }
        this.$children.push(children[i]);
        children[i].$root = this;
      }
      return this;
    }else {
      throw `Cannot addChild: ${this.name} does not accept children`;
    }
  }

  removeChild(child: $RxElement) {
    if(this.$children.indexOf(child) > -1) {
      this.$children.splice(this.$children.indexOf(child), 1);
      this.$children = this.$children.filter(i => i !== undefined);
      child.$root = undefined;
      return this;
    }else {
      throw `Cannot removeChild: ${child.name} is not a child of ${this.name}`;
    }
  }

  replaceChild(child: $RxElement, newChild: $RxElement) {
    if(this.$children.indexOf(child) > -1) {
      if(newChild.$root != undefined) {
        throw `Cannot replaceChild: ${newChild.name} is already attched`;
      }
      this.$children.splice(this.$children.indexOf(child), 1, newChild);
      newChild.$root = this;
      return this;
    } else {
      // child doesnt exist on parent
    }
  }


  // functions
  
  $render() {
    return Parser.render(this);
  }

}
