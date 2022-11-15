/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/native.ts":
/*!***********************!*\
  !*** ./lib/native.ts ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Style = exports.Animation = exports.SVG = exports.Input = exports.Container = exports.Button = exports.PageComponent = exports.Component = exports.createElement = exports.createRules = exports.Parser = exports.ELEMENT = exports.type = void 0;
var props_1 = __webpack_require__(/*! ./props */ "./lib/props.ts");
var createSheet;
var type = function (o) { return Object.prototype.toString.call(o).substr(8).replace(']', '').toLowerCase(); };
exports.type = type;
createSheet = function (data) {
    var allStyles = document.head.getElementsByTagName('style');
    var id = 'n' + Math.random().toString(36).substring(2, 9);
    var style = Array.from(allStyles).find(function (i) { return i.id === Native.sheetId; });
    if (style)
        style.disabled = true;
    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode(''));
    newStyle.setAttribute('id', id);
    document.head.appendChild(newStyle);
    for (var i = 0; i < data.length; i++) {
        if (data[i].trim().length > 0 && !data[i].trim().match('{ }')) {
            var rule = data[i].trim();
            try {
                newStyle.sheet.insertRule(rule, newStyle.sheet.cssRules.length);
            }
            catch (e) {
                throw Error('Rule not applied: ' + rule + ' ' + e.message);
            }
        }
    }
    return { sheet: newStyle.sheet, id: id };
};
var NativeClass = (function () {
    function NativeClass() {
        this.sheetId = '';
        this.loadQueue = {};
        this.components = {};
        var _a = createSheet([]), sheet = _a.sheet, id = _a.id;
        this.sheet = sheet;
        this.sheetId = id;
    }
    NativeClass.prototype.load = function (selector, root) {
        document.querySelector(selector).appendChild(createElement(root));
        if (this.serving) {
            this.loadQueue[this.serving].forEach(function (i) { return Function.prototype.call.apply(i); });
            this.loadQueue[this.serving] = [];
        }
    };
    return NativeClass;
}());
var Native = new NativeClass();
Native.sheet.insertRule('app{}');
exports["default"] = Native;
var ELEMENT = (function () {
    function ELEMENT(tagName) {
        var _this = this;
        this.$level = 1;
        this.$children = [];
        this.$tagName = 'ELEMENT';
        this.$root = undefined;
        this.$events = undefined;
        this.$className = undefined;
        this.$styles = [];
        this.$pseudo = [];
        this.$medias = [];
        this.$global = [];
        this.$hostComponent = Native.serving;
        this.$rules = [];
        this.name = this.constructor.name;
        this.value = function (_) { return _this; };
        this.$tagName = tagName || this.$tagName;
        this.$className = this.$tagName[0].toLowerCase() + Math.random().toString(36).substring(2, 9);
    }
    ELEMENT.prototype.addChild = function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        if (children[0] instanceof Array) {
            throw "Cannot addChild: ".concat(children[0], " is not valid ELEMENT");
        }
        if (this.$children) {
            for (var i = 0; i < children.length; i++) {
                if (children[i].$root !== undefined) {
                    throw "Cannot addChild: ".concat(children[i].name, " is already attached");
                }
                var nullIndex = this.$children.indexOf(null);
                if (nullIndex > -1)
                    this.$children.splice(nullIndex, 1, children[i]);
                else
                    this.$children.push(children[i]);
                children[i].$root = this;
                if (this.$node)
                    this.$node.append(createElement(children[i]));
            }
            return this;
        }
        else {
            throw "Cannot addChild: ".concat(this.name, " does not accept children");
        }
    };
    ELEMENT.prototype.removeChild = function (child) {
        if (this.$children.indexOf(child) > -1) {
            child.$root = undefined;
            var resetRules_1 = function (item) {
                item.$rules = [];
                if (item.$children.length > 0)
                    item.$children.forEach(function (i) { return (0, exports.type)(i) === 'object' && resetRules_1(i); });
            };
            resetRules_1(child);
            this.$children.splice(this.$children.indexOf(child), 1);
            return this;
        }
        else {
            console.warn("Cannot removeChild: ".concat(child.name, " is not a child of ").concat(this.name));
        }
    };
    ELEMENT.prototype.removeChildren = function () {
        if (this.$children.length > 0) {
            this.$children.forEach(function (child) { return child && child.$root ? child.$root = undefined : ''; });
            while (this.$children.length > 0)
                this.$children.pop();
        }
        return this;
    };
    ELEMENT.prototype.replaceChild = function (child, newChild) {
        if (this.$children.indexOf(child) > -1) {
            if (newChild.$root != undefined) {
                throw "Cannot replaceChild: ".concat(newChild.name, " is already attched");
            }
            this.$children.splice(this.$children.indexOf(child), 1, newChild);
            newChild.$root = this;
            return this;
        }
        else {
        }
        if (this.$node) {
            this.$node.removeChild(child.$node);
            this.$node.appendChild(newChild.$node);
        }
    };
    ELEMENT.prototype.node = function () { return this.$node; };
    ELEMENT.prototype.parent = function () { return this.$root; };
    ELEMENT.prototype.children = function () { return this.$children; };
    ELEMENT.prototype.on = function (fns) {
        this.$events = this.$events || [];
        for (var fn in fns) {
            if ((0, exports.type)(fns[fn]) !== 'function')
                throw "".concat(fns[fn], " is not a function");
            if ((0, exports.type)(this.$events) !== 'array')
                console.trace(this, this.$events);
            this.$events.push({
                event: fns[fn].bind(this),
                name: fn, object: this
            });
        }
        return this;
    };
    ELEMENT.prototype.dispatch = function (event) {
        if (!this.$node)
            throw "Cannot dispatch, node is not attached";
        else {
            var e = new Event(event, { bubbles: false });
            this.$node.dispatchEvent(e);
        }
        return this;
    };
    ELEMENT.prototype.text = function (string) {
        if (string != undefined) {
            if (typeof this.$children[0] == 'string')
                this.$children.splice(0, 1, string);
            else
                this.$children.unshift(string);
            if (this.$node)
                this.$node.innerText = string;
            return this;
        }
        if (Object.prototype.toString.call(this.$children[0]) === '[object String]') {
            return this.$children[0];
        }
        return this;
    };
    ELEMENT.prototype.styles = function () {
        var styles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            styles[_i] = arguments[_i];
        }
        if (arguments.length == 0)
            return this.$styles;
        for (var i = 0; i < styles.length; i++) {
            if (styles[i].$className) {
                this.$className += ' ' + styles[i].$className;
                this.$styles.push(styles[i]);
            }
        }
        return this;
    };
    ELEMENT.prototype.removeStyle = function () {
        var styles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            styles[_i] = arguments[_i];
        }
        if (arguments.length == 0)
            throw 'Remove style: 0 arguments passed. Min. of 1 expected';
        var _loop_3 = function (i) {
            this_1.$styles = this_1.$styles.filter(function (s) { return s.$className === styles[i].$className; });
            this_1.$className.replace(' ' + styles[i].$className, '');
        };
        var this_1 = this;
        for (var i = 0; i < styles.length; i++) {
            _loop_3(i);
        }
    };
    ELEMENT.prototype.medias = function (props) {
        var _this = this;
        this.$medias.push(props);
        var rules = [], native = Native;
        Object.getOwnPropertyNames(props).forEach(function (key) {
            var rule = '@media ' + key + '{ ';
            rule += _this.$tagName.toLowerCase() + '.' + _this.$className.replace(' ', '.') + ' {' + exports.Parser.parseNativeStyle(props[key]) + '} ';
            rule += ' }';
            rules.push(rule);
        });
        native.loadQueue[native.serving].push(function () { return (0, exports.createRules)(_this, rules); });
        return this;
    };
    ELEMENT.prototype.animate = function (callback) {
        var work = function () {
            callback();
            requestAnimationFrame(work);
        };
        requestAnimationFrame(work);
        return this;
    };
    ELEMENT.prototype.pseudo = function (props) {
        var _this = this;
        this.$pseudo.push(props);
        var rules = [], native = Native;
        for (var key in props) {
            rules.push('.' + this.$className.replace(' ', '.') + key + ' {' + exports.Parser.parseNativeStyle(props[key]) + '} ');
        }
        if (!native.served && native.serving === this.$hostComponent) {
            native.loadQueue[native.serving].push(function () { return (0, exports.createRules)(_this, rules); });
        }
        else {
            (0, exports.createRules)(this, rules);
        }
        return this;
    };
    ELEMENT.prototype.global = function (props) {
        var _this = this;
        this.$global.push(props);
        var rules = [], native = Native;
        for (var key in props) {
            rules.push('.' + this.$className + ' ' + key + ' {' + exports.Parser.parseNativeStyle(props[key]) + '} ');
        }
        if (!native.served && native.serving === this.$hostComponent) {
            native.loadQueue[native.serving].push(function () { return (0, exports.createRules)(_this, rules); });
        }
        else {
            (0, exports.createRules)(this, rules);
        }
        return this;
    };
    ELEMENT.prototype.addClassName = function (name) {
        if (this.$node) {
            if (!this.$node.classList || !this.$node.classList.contains(name)) {
                this.$node.classList.add(name);
            }
        }
        else {
            if (!this.$className.match(name)) {
                this.$className = this.$className + ' ' + name;
            }
        }
        return this;
    };
    ELEMENT.prototype.tag = function (tag) {
        if (tag !== undefined) {
            this.$tag = tag;
            return this;
        }
        return this.$tag;
    };
    ELEMENT.prototype.child = function (predicate) {
        var children = this.$children.filter(function (child) {
            var keys = window.Object.keys(predicate), check = keys.length;
            var valid = 0;
            keys.forEach(function (key) {
                if (predicate[key] === child['$' + key]) {
                    valid += 1;
                }
            });
            if (valid === check)
                return true;
        });
        return children[0];
    };
    ELEMENT.prototype.removeAllClassName = function () {
        var _this = this;
        if (this.$node) {
            this.$node.classList.forEach(function (i, index) {
                if (index > 0)
                    _this.$node.classList.remove(i);
            });
        }
        else
            this.$className = this.$className.replace(/ .+/, '');
        return this;
    };
    ELEMENT.prototype.removeClassName = function (classname) {
        if (this.$node) {
            this.$node.classList.remove(classname);
        }
        else if (this.$className.match(classname)) {
            this.$className = this.$className.replace(' ' + classname, '');
        }
        return this;
    };
    ELEMENT.prototype.replaceTextTag = function (text, tagObject) {
        var _this = this;
        var all = text.match(/\${\w+(\(.*\))?\}?/g);
        var children = [], p = function (t) {
            all.map(function (i, inx) {
                var _a;
                var tag = i.replace('${', '').replace('}', ''), args = [];
                var match = tag.match(/(\w+)\(/g);
                if (match) {
                    tag = (_a = match[0]) === null || _a === void 0 ? void 0 : _a.replace('(', '');
                    args = i.match(/(\(.*)\)/g).map(function (i) { return i.replace('(', '').replace(')', ''); });
                }
                children.push(t.slice(0, t.indexOf(i)));
                children.push(tagObject[tag].apply(tagObject, args));
                t = t.slice(t.indexOf(i) + i.length);
                if (inx === all.length - 1) {
                    if (t.length > 0)
                        children.push(t);
                }
            });
        };
        if (all) {
            p(text);
            children.forEach(function (child) {
                var nullIndex = _this.$children.indexOf(null);
                if (nullIndex > -1)
                    _this.$children.splice(nullIndex, 1, child);
                else
                    _this.$children.push(child);
                ((0, exports.type)(child) === 'object') ? child.$root = _this : '';
            });
        }
        else
            this.$children.push(text);
        return this;
    };
    return ELEMENT;
}());
exports.ELEMENT = ELEMENT;
exports.Parser = {
    parseNativeStyle: function (obj) {
        var objStyles = '';
        for (var prop in obj) {
            if (ELEMENT.prototype[prop]) {
                var key = prop.replace(/[A-Z]/g, function (letter) { return "-".concat(letter.toLowerCase()); });
                objStyles += key + ': '
                    + exports.Parser.parseStyleValue(obj[prop]) + '; ';
            }
            else {
                if (prop.replace('$', '').match('--')) {
                    var root = prop.replace('$', '');
                    objStyles += "".concat(root, ": ").concat(obj[root], "; ");
                }
                else if (props_1.default.excludes.indexOf(prop.toLowerCase()) < 0 && obj.$level != 0) {
                    throw new Error('Invalid css property ' + prop);
                }
            }
        }
        return objStyles;
    },
    parseProperties: function (component, state) {
        var properties = {};
        var all = Object.keys(props_1.default.props).concat(props_1.default.excludes);
        var componentStyles = component.$tagName + '.'
            + component.$className.split(' ')[0] + ' { ';
        var props = Object.getOwnPropertyNames(component);
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            if (all.indexOf(prop) === -1 && prop[0] === '$') {
                var key = prop.slice(1).replace(/[A-Z]/g, function (letter) { return "-".concat(letter.toLowerCase()); });
                componentStyles += key + ': '
                    + exports.Parser.parseStyleValue(component[prop]) + '; ';
            }
            else if (props_1.default.props[prop] || prop === '$events') {
                if (component[prop] !== undefined && prop !== '$events') {
                    properties[props_1.default.props[prop].split('.')[1]] = component[prop];
                }
                else if (props_1.default.excludes.indexOf(prop) < 0 && component.$level !== 0) {
                }
            }
        }
        if (!state)
            (0, exports.createRules)(component, [componentStyles + '} ']);
        return properties;
    },
    parseStyleValue: function (value) {
        if (value == null) {
            return 'unset';
        }
        else if (typeof value == 'string') {
            return value;
        }
        else if (typeof value == 'number') {
            return value + 'px';
        }
        else if (value instanceof Array) {
            return value.map(function (v) { return exports.Parser.parseStyleValue(v); }).join(' ');
        }
        return value;
    }
};
var createRules = function (object, rules) {
    var sheet = Native.sheet;
    rules.forEach(function (css) {
        try {
            var length_1 = sheet.cssRules.length;
            sheet.insertRule(css, length_1);
            object.$rules = object.$rules || [];
            object.$rules.unshift(sheet.cssRules[length_1]);
        }
        catch (e) {
            throw new Error('Rule not applied: ' + css + e.message);
        }
    });
};
exports.createRules = createRules;
function createElement(object, updateState) {
    var _this = this;
    var graphics = ['svg', 'path'];
    var create = function (parent, item) {
        var c = graphics.indexOf(item.$tagName) < 0 ? document.createElement(item.$tagName) : document.createElementNS(item.$xmlns || parent.namespaceURI, item.$tagName);
        var parsedProperties = exports.Parser.parseProperties(item, updateState);
        for (var prop in parsedProperties) {
            if (prop == 'events') {
                for (var i = 0; i < parsedProperties[prop].length; i++) {
                    var e = parsedProperties[prop][i];
                    c.addEventListener(e.name, e.event, { capture: true });
                }
            }
            else {
                c.setAttribute(prop === 'className' ? 'class' : prop, parsedProperties[prop]);
            }
        }
        item.$node = c;
        if (parent)
            parent.appendChild(c);
        if (item.$level === 0 && parent != undefined) {
            var oldServing = _this.serving;
            var component_1 = item;
            _this.components[component_1.name]
                = _this.components[component_1.name] || { structure: component_1.constructor };
            var newInstance_1 = item;
            var nid_1 = newInstance_1.$nid;
            _this.components[component_1.name][nid_1].route = _this.router.current;
            _this.components[component_1.name][nid_1].instance = newInstance_1;
            if (_this.bindings[nid_1]) {
                for (var i = 0; i < _this.bindings[nid_1].length; i++) {
                    var event_1 = _this.bindings[nid_1][i];
                    var o = {};
                    o[event_1.name] = event_1.event.bind(newInstance_1);
                    event_1.object.$events.push(o);
                    c.addEventListener(event_1.name, event_1.event, { capture: true });
                    _this.bindings[nid_1].splice(i, 1);
                    i--;
                }
                if (_this.bindings[nid_1].length < 1) {
                    delete _this.bindings[nid_1];
                }
            }
            queueMicrotask(function () {
                if (_this.components[component_1.name][nid_1] && _this.components[component_1.name][nid_1].rootNode == undefined) {
                    _this.components[component_1.name][nid_1].rootNode = item.$node;
                }
            });
            queueMicrotask(function () {
                if (!updateState) {
                    if (newInstance_1.onCreate) {
                        newInstance_1.onCreate();
                        newInstance_1.dispatch('create');
                    }
                }
            });
            _this.serving = oldServing;
            _this.components[component_1.name][nid_1].served = true;
        }
        queueMicrotask(function () {
            if (item.onCreate)
                item.onCreate();
            item.dispatch('create');
        });
        for (var i = 0; i < item.$children.length; i++) {
            if (typeof item.$children[i] === 'string') {
                c.appendChild(document.createTextNode(item.$children[i]));
            }
            else {
                create(c, item.$children[i]);
            }
        }
        return c;
    };
    var result = create(undefined, object);
    return result;
}
exports.createElement = createElement;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, 'component') || this;
        _this.$level = 0;
        _this.$events = [];
        _this.$loadQueue = [];
        _this.$nid = Math.random().toString(36).substr(2, 9);
        _this.$tagName = _this.name.length > 2 ? _this.name : _this.name + _this.$nid;
        Native.serving = _this.name + "-" + _this.$nid;
        Native.components[_this.name] = Native.components[_this.name] || { structure: _this.constructor };
        Native.components[_this.name][_this.$nid] = { served: false, watchlist: [] };
        Native.components[_this.name][_this.$nid].args
            = Native.components[_this.name][_this.$nid].args || args;
        Native.loadQueue[Native.serving] = [];
        _this.display('block');
        return _this;
    }
    Component.prototype.parent = function () {
        return this.$root;
    };
    Component.prototype.children = function () {
        return this.$children;
    };
    return Component;
}(ELEMENT));
exports.Component = Component;
var PageComponent = (function (_super) {
    __extends(PageComponent, _super);
    function PageComponent() {
        return _super.call(this) || this;
    }
    return PageComponent;
}(Component));
exports.PageComponent = PageComponent;
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this, 'button') || this;
        _this.text('Button');
        return _this;
    }
    return Button;
}(ELEMENT));
exports.Button = Button;
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super.call(this, 'div') || this;
    }
    return Container;
}(ELEMENT));
exports.Container = Container;
'A,Abbr,Applet,Area,Article,Aside,Audio,Base,BaseFont,BDO,BlockQuote,Body,BR,Canvas,Caption,Code,Col,ColGroup,Data,Details,DFN,Dialog,DIR,Div,DL,EM,Embed,FieldSet,FigCaption,Figure,Font,Footer,Form,Del,Frame,FrameSet,H1,H2,H3,H4,H5,H6,Head,Header,HR,HTML,IFrame,Image,IMG,Ins,IsIndex,Label,Link,Legend,LI,Main,Map,Mark,Menu,Meta,Meter,Nav,ObjectElement,OL,OptGroup,Option,Output,P,Param,Path,Pre,Progress,Q,Script,Section,Select,Slot,Source,Span,Strong,Summary,Table,TBody,TD,Textarea,TFoot,TH,THead,Time,TR,Track,UL,Video'.split(',').forEach(function (i) { return module.exports[i] = (function (_super) {
    __extends(class_1, _super);
    function class_1() {
        return _super.call(this, i) || this;
    }
    return class_1;
}(ELEMENT)); });
var Input = (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super.call(this, 'input') || this;
        _this.value = function (v) {
            if (v !== undefined) {
                if (_this.$node) {
                    if (_this.$node.type !== 'file')
                        _this.$node.value = v;
                    _this.$value = v;
                }
                else
                    _this.$value = v;
                return _this;
            }
            else
                return _this.$value;
        };
        return _this;
    }
    return Input;
}(ELEMENT));
exports.Input = Input;
var SVG = (function (_super) {
    __extends(SVG, _super);
    function SVG() {
        var _this = _super.call(this, 'svg') || this;
        _this.xmlns('http://www.w3.org/2000/svg');
        return _this;
    }
    return SVG;
}(ELEMENT));
exports.SVG = SVG;
var Animation = (function () {
    function Animation(props) {
        this.$className = this.name = 's' + Math.random().toString(36).substr(2, 9);
        var rule = '@keyframes ' + this.$className + '{ ';
        Object.getOwnPropertyNames(props).forEach(function (key) {
            rule += key + ' {' + exports.Parser.parseNativeStyle(props[key]) + '} ';
        });
        rule += ' }';
        (0, exports.createRules)(this, [rule]);
    }
    return Animation;
}());
exports.Animation = Animation;
var Style = (function () {
    function Style(props) {
        var _this = this;
        this.$rules = [];
        this.$className = 's' + Math.random().toString(36).substr(2, 9);
        var rules = ['.' + this.$className + '{  }'];
        window.__native_load_queue = window.__native_load_queue || [];
        window.__native_load_queue.push(function () {
            (0, exports.createRules)(_this, rules);
            Object.getOwnPropertyNames(props).forEach(function (i) {
                _this[i](props[i]);
            });
        });
    }
    Style.prototype.global = function (props) {
        var _this = this;
        window.__native_load_queue = window.__native_load_queue || [];
        window.__native_load_queue.push(function () {
            var rules = [];
            for (var key in props) {
                rules.push('.' + _this.$className + ' ' + key + ' {' + exports.Parser.parseNativeStyle(props[key]) + '} ');
            }
            (0, exports.createRules)(_this, rules);
        });
        return this;
    };
    Style.prototype.pseudo = function (props) {
        var _this = this;
        window.__native_load_queue = window.__native_load_queue || [];
        window.__native_load_queue.push(function () {
            var rules = [];
            for (var key in props) {
                rules.push('.' + _this.$className.replace(' ', '.') + key + ' {' + exports.Parser.parseNativeStyle(props[key]) + '} ');
            }
            (0, exports.createRules)(_this, rules);
        });
        return this;
    };
    return Style;
}());
exports.Style = Style;
var altProps = Object.getOwnPropertyNames(Native.sheet.cssRules[0].style);
var propIndex = 0;
var _loop_1 = function () {
    var prop = altProps[propIndex], key = prop.replace(/[A-Z]/g, function (letter) { return "-".concat(letter.toLowerCase()); });
    var fns = function () {
        if (Native.serving)
            return;
        Object.defineProperty(this, '$' + prop, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        var value = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        if (arguments.length > 0) {
            this.$rules = this.$rules || [];
            if (this.$rules.length > 0) {
                this.$rules[this.$rules.length - 1].style.setProperty(key, window.Native.parseStyleValue(value));
            }
            this['$' + prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        }
        else
            return this['$' + prop];
        return this;
    };
    ELEMENT.prototype[prop] = fns;
    Style.prototype[prop] = fns;
    propIndex++;
};
while (propIndex < altProps.length - 1) {
    _loop_1();
}
var props = Object.getOwnPropertyNames(props_1.default.props);
var _loop_2 = function (i) {
    var prop = props[i], caller = props_1.default.props[prop];
    var fn = void 0;
    var split = caller.split('.'), key = split[0], name_1 = split[1];
    fn = function () {
        Object.defineProperty(this, prop, {
            writable: true,
            enumerable: true,
            configurable: true
        });
        if (Native.serving)
            return;
        if (arguments.length > 0) {
            if (key === 'attr') {
                if (this.$node) {
                    this.$node.setAttribute(name_1, arguments.length === 1 ? arguments[0] : Array.from(arguments));
                }
            }
            this[prop] = arguments.length === 1 ? arguments[0] : Array.from(arguments);
        }
        else
            return this[prop];
        return this;
    };
    ELEMENT.prototype[prop.slice(1)] = fn;
};
for (var i = 0; i < props.length; i++) {
    _loop_2(i);
}


/***/ }),

/***/ "./lib/props.ts":
/*!**********************!*\
  !*** ./lib/props.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    props: {
        '$abbr': 'attr.abbr',
        '$accept': 'attr.accept',
        '$acceptCharset': 'attr.accept-charset',
        '$accessKey': 'attr.accesskey',
        '$action': 'attr.action',
        '$alink': 'attr.alink',
        '$allow': 'attr.allow',
        '$allowFullscreen': 'attr.allowfullscreen',
        '$allowPaymentRequest': 'attr.allowpaymentrequest',
        '$allowUserMedia': 'attr.allowusermedia',
        '$alt': 'attr.alt',
        '$archive': 'attr.archive',
        '$as': 'attr.as',
        '$async': 'attr.async',
        '$attrHeight': 'attr.height',
        '$attrWidth': 'attr.width',
        '$autoCapitalize': 'attr.autocapitalize',
        '$autoComplete': 'atrr.autocomplete',
        '$autoFocus': 'attr.autofocus',
        '$autoPlay': 'attr.autoplay',
        '$axis': 'attr.axis',
        '$capture': 'attr.capture',
        '$cellPadding': 'attr.cellpadding',
        '$cellSpacing': 'attr.cellspacing',
        '$char': 'attr.char',
        '$charOff': 'attr.charoff',
        '$charset': 'attr.charset',
        '$checked': 'attr.checked',
        '$cite': 'attr.cite',
        '$classId': 'attr.classid',
        '$className': 'attr.class',
        '$clearAttr': 'attr.clear',
        '$code': 'attr.code',
        '$codeBase': 'attr.codebase',
        '$codeType': 'attr.codetype',
        '$cols': 'attr.cols',
        '$colSpan': 'attr.colspan',
        '$compact': 'attr.compact',
        '$contentEditable': 'attr.contenteditable',
        '$controls': 'attr.controls',
        '$coords': 'attr.coords',
        '$crossOrigin': 'attr.crossorigin',
        '$d': 'attr.d',
        '$data': 'attr.data',
        '$datetime': 'attr.datetime',
        '$declare': 'attr.declare',
        '$decoding': 'attr.decoding',
        '$dir': 'attr.dir',
        '$dirname': 'attr.dirname',
        '$disabled': 'attr.disabled',
        '$download': 'attr.download',
        '$draggable': 'attr.draggable',
        '$enctype': 'attr.enctype',
        '$enterKeyHint': 'attr.enterkeyhint',
        '$fill': 'attr.fill',
        '$form': 'attr.form',
        '$formAction': 'attr.formaction',
        '$formEnctype': 'attr.formenctype',
        '$formMethod': 'attr.formmethod',
        '$formNoValidate': 'attr.formnovalidate',
        '$formTarget': 'attr.formtarget',
        '$frame': 'attr.frame',
        '$frameBorder': 'attr.frameborder',
        '$headers': 'attr.headers',
        '$hidden': 'attr.hidden',
        '$high': 'attr.high',
        '$href': 'attr.href',
        '$hrefLang': 'attr.hreflang',
        '$hSpace': 'attr.hspace',
        '$id': 'attr.id',
        '$imageSizes': 'attr.imagesizes',
        '$imageSrcSet': 'attr.imagesrcset',
        '$inputMode': 'attr.inputmode',
        '$integrity': 'attr.integrity',
        '$is': 'attr.is',
        '$isMap': 'attr.ismap',
        '$itemId': 'attr.itemid',
        '$itemProp': 'attr.itemprop',
        '$itemRef': 'attr.itemref',
        '$itemScope': 'attr.itemscope',
        '$itemType': 'attr.itemtype',
        '$kind': 'attr.kind',
        '$label': 'attr.label',
        '$lang': 'attr.lang',
        '$link': 'attr.link',
        '$list': 'attr.list',
        '$longDesc': 'attr.longdesc',
        '$loop': 'attr.loop',
        '$low': 'attr.low',
        '$marginHeight': 'attr.marginheight',
        '$marginWidth': 'attr.marginwidth',
        '$max': 'attr.max',
        '$maxLength': 'attr.maxlength',
        '$media': 'attr.media',
        '$method': 'attr.method',
        '$min': 'attr.min',
        '$minLength': 'attr.minlength',
        '$multiple': 'attr.multiple',
        '$muted': 'attr.muted',
        '$attrName': 'attr.name',
        '$nonce': 'attr.nonce',
        '$noResize': 'attr.noresize',
        '$noShade': 'attr.noshade',
        '$noValidate': 'attr.novalidate',
        '$noWrap': 'attr.nowrap',
        '$object': 'attr.object',
        '$open': 'attr.open',
        '$optimum': 'attr.optimum',
        '$pattern': 'attr.pattern',
        '$ping': 'attr.ping',
        '$placeholder': 'attr.placeholder',
        '$playsInline': 'attr.playsinline',
        '$poster': 'attr.poster',
        '$preload': 'attr.preload',
        '$preserveAspectRatio': 'attr.preserveAspectRatio',
        '$profile': 'attr.profile',
        '$prompt': 'attr.prompt',
        '$readOnly': 'attr.readonly',
        '$referrerPolicy': 'attr.referrerpolicy',
        '$rel': 'attr.rel',
        '$required': 'attr.required',
        '$rev': 'attr.rev',
        '$reversed': 'attr.reversed',
        '$rows': 'attr.rows',
        '$rowSpan': 'attr.rowspan',
        '$sandBox': 'attr.sandbox',
        '$scope': 'attr.scope',
        '$scrolling': 'attr.scrolling',
        '$selected': 'attr.selected',
        '$shape': 'attr.shape',
        '$sizes': 'attr.sizes',
        '$slot': 'attr.slot',
        '$span': 'attr.span',
        '$spellCheck': 'attr.spellcheck',
        '$src': 'attr.src',
        '$srcDoc': 'attr.srcdoc',
        '$srcSet': 'attr.srcset',
        '$standBy': 'attr.standby',
        '$start': 'attr.start',
        '$step': 'attr.step',
        '$summary': 'attr.summary',
        '$tabIndex': 'attr.tabindex',
        '$target': 'attr.target',
        '$title': 'attr.title',
        '$translate': 'attr.translate',
        '$attrTransform': 'attr.transform',
        '$type': 'attr.type',
        '$typeMustMatch': 'attr.typemustmatch',
        '$useMap': 'attr.usemap',
        '$vAlign': 'attr.valign',
        '$value': 'attr.value',
        '$valueType': 'attr.valuetype',
        '$viewBox': 'attr.viewBox',
        '$vLink': 'attr.vlink',
        '$vSpace': 'attr.vspace',
        '$wrap': 'attr.wrap',
        '$xmlns': 'attr.xmlns',
        'className': 'attr.class',
        '$attrDefault': 'attr.default',
        '$attrFor': 'attr.for',
        '$for': 'attr.for',
        '$default': 'attr.default'
    },
    excludes: [
        '$native',
        '$children',
        '$level',
        '$model',
        '$tagName',
        '$pseudo',
        '$global',
        '$hostComponent',
        '$root',
        '$node',
        '$loadQueue',
        '$nid',
        'id',
        'tagName',
        '$animation',
        '$rules',
        'cssRules',
        'options',
        '$events',
        'root',
        'value',
        'get',
        'set',
        '$stackVertical',
        '$childVerticalSpacing',
        '$size',
        '$absPosition',
        '$absCenter',
        '$absCenterRight',
        '$absCenterLeft',
        '$absCenterTop',
        '$absCenterBottom',
        '$absTopRight',
        '$absTopLeft',
        '$absBottomRight',
        '$absBottomLeft',
        '$absCenterVertical',
        '$absCenterHorizontal',
        '$aspectRation',
        '$truncateText',
        '$relCenterHorizontal',
        '$clearFix',
        '$backgroundGradient',
        '$flexSpaceBetween',
        '$flexCenter',
        '$responsiveness',
        '$styles',
        '$medias'
    ]
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/native.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDek5BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2JhbHQvLi9saWIvbmF0aXZlLnRzIiwid2VicGFjazovL2NvYmFsdC8uL2xpYi9wcm9wcy50cyIsIndlYnBhY2s6Ly9jb2JhbHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29iYWx0L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY29iYWx0L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jb2JhbHQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU3R5bGUgPSBleHBvcnRzLkFuaW1hdGlvbiA9IGV4cG9ydHMuU1ZHID0gZXhwb3J0cy5JbnB1dCA9IGV4cG9ydHMuQ29udGFpbmVyID0gZXhwb3J0cy5CdXR0b24gPSBleHBvcnRzLlBhZ2VDb21wb25lbnQgPSBleHBvcnRzLkNvbXBvbmVudCA9IGV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGV4cG9ydHMuY3JlYXRlUnVsZXMgPSBleHBvcnRzLlBhcnNlciA9IGV4cG9ydHMuRUxFTUVOVCA9IGV4cG9ydHMudHlwZSA9IHZvaWQgMDtcbnZhciBwcm9wc18xID0gcmVxdWlyZShcIi4vcHJvcHNcIik7XG52YXIgY3JlYXRlU2hlZXQ7XG52YXIgdHlwZSA9IGZ1bmN0aW9uIChvKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc3Vic3RyKDgpLnJlcGxhY2UoJ10nLCAnJykudG9Mb3dlckNhc2UoKTsgfTtcbmV4cG9ydHMudHlwZSA9IHR5cGU7XG5jcmVhdGVTaGVldCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIGFsbFN0eWxlcyA9IGRvY3VtZW50LmhlYWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N0eWxlJyk7XG4gICAgdmFyIGlkID0gJ24nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDkpO1xuICAgIHZhciBzdHlsZSA9IEFycmF5LmZyb20oYWxsU3R5bGVzKS5maW5kKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLmlkID09PSBOYXRpdmUuc2hlZXRJZDsgfSk7XG4gICAgaWYgKHN0eWxlKVxuICAgICAgICBzdHlsZS5kaXNhYmxlZCA9IHRydWU7XG4gICAgdmFyIG5ld1N0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBuZXdTdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJykpO1xuICAgIG5ld1N0eWxlLnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdTdHlsZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkYXRhW2ldLnRyaW0oKS5sZW5ndGggPiAwICYmICFkYXRhW2ldLnRyaW0oKS5tYXRjaCgneyB9JykpIHtcbiAgICAgICAgICAgIHZhciBydWxlID0gZGF0YVtpXS50cmltKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlLnNoZWV0Lmluc2VydFJ1bGUocnVsZSwgbmV3U3R5bGUuc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1J1bGUgbm90IGFwcGxpZWQ6ICcgKyBydWxlICsgJyAnICsgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBzaGVldDogbmV3U3R5bGUuc2hlZXQsIGlkOiBpZCB9O1xufTtcbnZhciBOYXRpdmVDbGFzcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF0aXZlQ2xhc3MoKSB7XG4gICAgICAgIHRoaXMuc2hlZXRJZCA9ICcnO1xuICAgICAgICB0aGlzLmxvYWRRdWV1ZSA9IHt9O1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSB7fTtcbiAgICAgICAgdmFyIF9hID0gY3JlYXRlU2hlZXQoW10pLCBzaGVldCA9IF9hLnNoZWV0LCBpZCA9IF9hLmlkO1xuICAgICAgICB0aGlzLnNoZWV0ID0gc2hlZXQ7XG4gICAgICAgIHRoaXMuc2hlZXRJZCA9IGlkO1xuICAgIH1cbiAgICBOYXRpdmVDbGFzcy5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIChzZWxlY3Rvciwgcm9vdCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KHJvb3QpKTtcbiAgICAgICAgaWYgKHRoaXMuc2VydmluZykge1xuICAgICAgICAgICAgdGhpcy5sb2FkUXVldWVbdGhpcy5zZXJ2aW5nXS5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7IHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbC5hcHBseShpKTsgfSk7XG4gICAgICAgICAgICB0aGlzLmxvYWRRdWV1ZVt0aGlzLnNlcnZpbmddID0gW107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBOYXRpdmVDbGFzcztcbn0oKSk7XG52YXIgTmF0aXZlID0gbmV3IE5hdGl2ZUNsYXNzKCk7XG5OYXRpdmUuc2hlZXQuaW5zZXJ0UnVsZSgnYXBwe30nKTtcbmV4cG9ydHMuZGVmYXVsdCA9IE5hdGl2ZTtcbnZhciBFTEVNRU5UID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFTEVNRU5UKHRhZ05hbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy4kbGV2ZWwgPSAxO1xuICAgICAgICB0aGlzLiRjaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLiR0YWdOYW1lID0gJ0VMRU1FTlQnO1xuICAgICAgICB0aGlzLiRyb290ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLiRldmVudHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuJGNsYXNzTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy4kc3R5bGVzID0gW107XG4gICAgICAgIHRoaXMuJHBzZXVkbyA9IFtdO1xuICAgICAgICB0aGlzLiRtZWRpYXMgPSBbXTtcbiAgICAgICAgdGhpcy4kZ2xvYmFsID0gW107XG4gICAgICAgIHRoaXMuJGhvc3RDb21wb25lbnQgPSBOYXRpdmUuc2VydmluZztcbiAgICAgICAgdGhpcy4kcnVsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF90aGlzOyB9O1xuICAgICAgICB0aGlzLiR0YWdOYW1lID0gdGFnTmFtZSB8fCB0aGlzLiR0YWdOYW1lO1xuICAgICAgICB0aGlzLiRjbGFzc05hbWUgPSB0aGlzLiR0YWdOYW1lWzBdLnRvTG93ZXJDYXNlKCkgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOSk7XG4gICAgfVxuICAgIEVMRU1FTlQucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkcmVuWzBdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGFkZENoaWxkOiBcIi5jb25jYXQoY2hpbGRyZW5bMF0sIFwiIGlzIG5vdCB2YWxpZCBFTEVNRU5UXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiRjaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXS4kcm9vdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGFkZENoaWxkOiBcIi5jb25jYXQoY2hpbGRyZW5baV0ubmFtZSwgXCIgaXMgYWxyZWFkeSBhdHRhY2hlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG51bGxJbmRleCA9IHRoaXMuJGNoaWxkcmVuLmluZGV4T2YobnVsbCk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGxJbmRleCA+IC0xKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjaGlsZHJlbi5zcGxpY2UobnVsbEluZGV4LCAxLCBjaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRjaGlsZHJlbi5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltpXS4kcm9vdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJG5vZGUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG5vZGUuYXBwZW5kKGNyZWF0ZUVsZW1lbnQoY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgXCJDYW5ub3QgYWRkQ2hpbGQ6IFwiLmNvbmNhdCh0aGlzLm5hbWUsIFwiIGRvZXMgbm90IGFjY2VwdCBjaGlsZHJlblwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRUxFTUVOVC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuJGNoaWxkcmVuLmluZGV4T2YoY2hpbGQpID4gLTEpIHtcbiAgICAgICAgICAgIGNoaWxkLiRyb290ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHJlc2V0UnVsZXNfMSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbS4kcnVsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS4kY2hpbGRyZW4ubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgaXRlbS4kY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaSkgeyByZXR1cm4gKDAsIGV4cG9ydHMudHlwZSkoaSkgPT09ICdvYmplY3QnICYmIHJlc2V0UnVsZXNfMShpKTsgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmVzZXRSdWxlc18xKGNoaWxkKTtcbiAgICAgICAgICAgIHRoaXMuJGNoaWxkcmVuLnNwbGljZSh0aGlzLiRjaGlsZHJlbi5pbmRleE9mKGNoaWxkKSwgMSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbm5vdCByZW1vdmVDaGlsZDogXCIuY29uY2F0KGNoaWxkLm5hbWUsIFwiIGlzIG5vdCBhIGNoaWxkIG9mIFwiKS5jb25jYXQodGhpcy5uYW1lKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy4kY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIGNoaWxkICYmIGNoaWxkLiRyb290ID8gY2hpbGQuJHJvb3QgPSB1bmRlZmluZWQgOiAnJzsgfSk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy4kY2hpbGRyZW4ubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICB0aGlzLiRjaGlsZHJlbi5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLnJlcGxhY2VDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCwgbmV3Q2hpbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuJGNoaWxkcmVuLmluZGV4T2YoY2hpbGQpID4gLTEpIHtcbiAgICAgICAgICAgIGlmIChuZXdDaGlsZC4kcm9vdCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbm5vdCByZXBsYWNlQ2hpbGQ6IFwiLmNvbmNhdChuZXdDaGlsZC5uYW1lLCBcIiBpcyBhbHJlYWR5IGF0dGNoZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRjaGlsZHJlbi5zcGxpY2UodGhpcy4kY2hpbGRyZW4uaW5kZXhPZihjaGlsZCksIDEsIG5ld0NoaWxkKTtcbiAgICAgICAgICAgIG5ld0NoaWxkLiRyb290ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiRub2RlKSB7XG4gICAgICAgICAgICB0aGlzLiRub2RlLnJlbW92ZUNoaWxkKGNoaWxkLiRub2RlKTtcbiAgICAgICAgICAgIHRoaXMuJG5vZGUuYXBwZW5kQ2hpbGQobmV3Q2hpbGQuJG5vZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy4kbm9kZTsgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLiRyb290OyB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy4kY2hpbGRyZW47IH07XG4gICAgRUxFTUVOVC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZm5zKSB7XG4gICAgICAgIHRoaXMuJGV2ZW50cyA9IHRoaXMuJGV2ZW50cyB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgZm4gaW4gZm5zKSB7XG4gICAgICAgICAgICBpZiAoKDAsIGV4cG9ydHMudHlwZSkoZm5zW2ZuXSkgIT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJcIi5jb25jYXQoZm5zW2ZuXSwgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgICAgICAgICBpZiAoKDAsIGV4cG9ydHMudHlwZSkodGhpcy4kZXZlbnRzKSAhPT0gJ2FycmF5JylcbiAgICAgICAgICAgICAgICBjb25zb2xlLnRyYWNlKHRoaXMsIHRoaXMuJGV2ZW50cyk7XG4gICAgICAgICAgICB0aGlzLiRldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGZuc1tmbl0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBuYW1lOiBmbiwgb2JqZWN0OiB0aGlzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy4kbm9kZSlcbiAgICAgICAgICAgIHRocm93IFwiQ2Fubm90IGRpc3BhdGNoLCBub2RlIGlzIG5vdCBhdHRhY2hlZFwiO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEV2ZW50KGV2ZW50LCB7IGJ1YmJsZXM6IGZhbHNlIH0pO1xuICAgICAgICAgICAgdGhpcy4kbm9kZS5kaXNwYXRjaEV2ZW50KGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRUxFTUVOVC5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgaWYgKHN0cmluZyAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy4kY2hpbGRyZW5bMF0gPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hpbGRyZW4uc3BsaWNlKDAsIDEsIHN0cmluZyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hpbGRyZW4udW5zaGlmdChzdHJpbmcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuJG5vZGUpXG4gICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5pbm5lclRleHQgPSBzdHJpbmc7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMuJGNoaWxkcmVuWzBdKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRjaGlsZHJlblswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLnN0eWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgc3R5bGVzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzdHlsZXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVzW2ldLiRjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjbGFzc05hbWUgKz0gJyAnICsgc3R5bGVzW2ldLiRjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3R5bGVzLnB1c2goc3R5bGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLnJlbW92ZVN0eWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3R5bGVzID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBzdHlsZXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgdGhyb3cgJ1JlbW92ZSBzdHlsZTogMCBhcmd1bWVudHMgcGFzc2VkLiBNaW4uIG9mIDEgZXhwZWN0ZWQnO1xuICAgICAgICB2YXIgX2xvb3BfMyA9IGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB0aGlzXzEuJHN0eWxlcyA9IHRoaXNfMS4kc3R5bGVzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gcy4kY2xhc3NOYW1lID09PSBzdHlsZXNbaV0uJGNsYXNzTmFtZTsgfSk7XG4gICAgICAgICAgICB0aGlzXzEuJGNsYXNzTmFtZS5yZXBsYWNlKCcgJyArIHN0eWxlc1tpXS4kY2xhc3NOYW1lLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB0aGlzXzEgPSB0aGlzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2xvb3BfMyhpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRUxFTUVOVC5wcm90b3R5cGUubWVkaWFzID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJG1lZGlhcy5wdXNoKHByb3BzKTtcbiAgICAgICAgdmFyIHJ1bGVzID0gW10sIG5hdGl2ZSA9IE5hdGl2ZTtcbiAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvcHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgdmFyIHJ1bGUgPSAnQG1lZGlhICcgKyBrZXkgKyAneyAnO1xuICAgICAgICAgICAgcnVsZSArPSBfdGhpcy4kdGFnTmFtZS50b0xvd2VyQ2FzZSgpICsgJy4nICsgX3RoaXMuJGNsYXNzTmFtZS5yZXBsYWNlKCcgJywgJy4nKSArICcgeycgKyBleHBvcnRzLlBhcnNlci5wYXJzZU5hdGl2ZVN0eWxlKHByb3BzW2tleV0pICsgJ30gJztcbiAgICAgICAgICAgIHJ1bGUgKz0gJyB9JztcbiAgICAgICAgICAgIHJ1bGVzLnB1c2gocnVsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBuYXRpdmUubG9hZFF1ZXVlW25hdGl2ZS5zZXJ2aW5nXS5wdXNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuICgwLCBleHBvcnRzLmNyZWF0ZVJ1bGVzKShfdGhpcywgcnVsZXMpOyB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciB3b3JrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh3b3JrKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHdvcmspO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLnBzZXVkbyA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRwc2V1ZG8ucHVzaChwcm9wcyk7XG4gICAgICAgIHZhciBydWxlcyA9IFtdLCBuYXRpdmUgPSBOYXRpdmU7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgcnVsZXMucHVzaCgnLicgKyB0aGlzLiRjbGFzc05hbWUucmVwbGFjZSgnICcsICcuJykgKyBrZXkgKyAnIHsnICsgZXhwb3J0cy5QYXJzZXIucGFyc2VOYXRpdmVTdHlsZShwcm9wc1trZXldKSArICd9ICcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbmF0aXZlLnNlcnZlZCAmJiBuYXRpdmUuc2VydmluZyA9PT0gdGhpcy4kaG9zdENvbXBvbmVudCkge1xuICAgICAgICAgICAgbmF0aXZlLmxvYWRRdWV1ZVtuYXRpdmUuc2VydmluZ10ucHVzaChmdW5jdGlvbiAoKSB7IHJldHVybiAoMCwgZXhwb3J0cy5jcmVhdGVSdWxlcykoX3RoaXMsIHJ1bGVzKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoMCwgZXhwb3J0cy5jcmVhdGVSdWxlcykodGhpcywgcnVsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRUxFTUVOVC5wcm90b3R5cGUuZ2xvYmFsID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGdsb2JhbC5wdXNoKHByb3BzKTtcbiAgICAgICAgdmFyIHJ1bGVzID0gW10sIG5hdGl2ZSA9IE5hdGl2ZTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBydWxlcy5wdXNoKCcuJyArIHRoaXMuJGNsYXNzTmFtZSArICcgJyArIGtleSArICcgeycgKyBleHBvcnRzLlBhcnNlci5wYXJzZU5hdGl2ZVN0eWxlKHByb3BzW2tleV0pICsgJ30gJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFuYXRpdmUuc2VydmVkICYmIG5hdGl2ZS5zZXJ2aW5nID09PSB0aGlzLiRob3N0Q29tcG9uZW50KSB7XG4gICAgICAgICAgICBuYXRpdmUubG9hZFF1ZXVlW25hdGl2ZS5zZXJ2aW5nXS5wdXNoKGZ1bmN0aW9uICgpIHsgcmV0dXJuICgwLCBleHBvcnRzLmNyZWF0ZVJ1bGVzKShfdGhpcywgcnVsZXMpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICgwLCBleHBvcnRzLmNyZWF0ZVJ1bGVzKSh0aGlzLCBydWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS5hZGRDbGFzc05hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICBpZiAodGhpcy4kbm9kZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLiRub2RlLmNsYXNzTGlzdCB8fCAhdGhpcy4kbm9kZS5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRub2RlLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJGNsYXNzTmFtZS5tYXRjaChuYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNsYXNzTmFtZSA9IHRoaXMuJGNsYXNzTmFtZSArICcgJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS50YWcgPSBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIGlmICh0YWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy4kdGFnID0gdGFnO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJHRhZztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlLmNoaWxkID0gZnVuY3Rpb24gKHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLiRjaGlsZHJlbi5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IHdpbmRvdy5PYmplY3Qua2V5cyhwcmVkaWNhdGUpLCBjaGVjayA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHZhbGlkID0gMDtcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZWRpY2F0ZVtrZXldID09PSBjaGlsZFsnJCcgKyBrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkICs9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodmFsaWQgPT09IGNoZWNrKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuWzBdO1xuICAgIH07XG4gICAgRUxFTUVOVC5wcm90b3R5cGUucmVtb3ZlQWxsQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy4kbm9kZSkge1xuICAgICAgICAgICAgdGhpcy4kbm9kZS5jbGFzc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAoaSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbm9kZS5jbGFzc0xpc3QucmVtb3ZlKGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy4kY2xhc3NOYW1lID0gdGhpcy4kY2xhc3NOYW1lLnJlcGxhY2UoLyAuKy8sICcnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS5yZW1vdmVDbGFzc05hbWUgPSBmdW5jdGlvbiAoY2xhc3NuYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLiRub2RlKSB7XG4gICAgICAgICAgICB0aGlzLiRub2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLiRjbGFzc05hbWUubWF0Y2goY2xhc3NuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy4kY2xhc3NOYW1lID0gdGhpcy4kY2xhc3NOYW1lLnJlcGxhY2UoJyAnICsgY2xhc3NuYW1lLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZS5yZXBsYWNlVGV4dFRhZyA9IGZ1bmN0aW9uICh0ZXh0LCB0YWdPYmplY3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGFsbCA9IHRleHQubWF0Y2goL1xcJHtcXHcrKFxcKC4qXFwpKT9cXH0/L2cpO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXSwgcCA9IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBhbGwubWFwKGZ1bmN0aW9uIChpLCBpbngpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IGkucmVwbGFjZSgnJHsnLCAnJykucmVwbGFjZSgnfScsICcnKSwgYXJncyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IHRhZy5tYXRjaCgvKFxcdyspXFwoL2cpO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICB0YWcgPSAoX2EgPSBtYXRjaFswXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlcGxhY2UoJygnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBpLm1hdGNoKC8oXFwoLiopXFwpL2cpLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5yZXBsYWNlKCcoJywgJycpLnJlcGxhY2UoJyknLCAnJyk7IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHQuc2xpY2UoMCwgdC5pbmRleE9mKGkpKSk7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh0YWdPYmplY3RbdGFnXS5hcHBseSh0YWdPYmplY3QsIGFyZ3MpKTtcbiAgICAgICAgICAgICAgICB0ID0gdC5zbGljZSh0LmluZGV4T2YoaSkgKyBpLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGlueCA9PT0gYWxsLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChhbGwpIHtcbiAgICAgICAgICAgIHAodGV4dCk7XG4gICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBudWxsSW5kZXggPSBfdGhpcy4kY2hpbGRyZW4uaW5kZXhPZihudWxsKTtcbiAgICAgICAgICAgICAgICBpZiAobnVsbEluZGV4ID4gLTEpXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRjaGlsZHJlbi5zcGxpY2UobnVsbEluZGV4LCAxLCBjaGlsZCk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgKCgwLCBleHBvcnRzLnR5cGUpKGNoaWxkKSA9PT0gJ29iamVjdCcpID8gY2hpbGQuJHJvb3QgPSBfdGhpcyA6ICcnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy4kY2hpbGRyZW4ucHVzaCh0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRUxFTUVOVDtcbn0oKSk7XG5leHBvcnRzLkVMRU1FTlQgPSBFTEVNRU5UO1xuZXhwb3J0cy5QYXJzZXIgPSB7XG4gICAgcGFyc2VOYXRpdmVTdHlsZTogZnVuY3Rpb24gKG9iaikge1xuICAgICAgICB2YXIgb2JqU3R5bGVzID0gJyc7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoRUxFTUVOVC5wcm90b3R5cGVbcHJvcF0pIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcHJvcC5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbiAobGV0dGVyKSB7IHJldHVybiBcIi1cIi5jb25jYXQobGV0dGVyLnRvTG93ZXJDYXNlKCkpOyB9KTtcbiAgICAgICAgICAgICAgICBvYmpTdHlsZXMgKz0ga2V5ICsgJzogJ1xuICAgICAgICAgICAgICAgICAgICArIGV4cG9ydHMuUGFyc2VyLnBhcnNlU3R5bGVWYWx1ZShvYmpbcHJvcF0pICsgJzsgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wLnJlcGxhY2UoJyQnLCAnJykubWF0Y2goJy0tJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvb3QgPSBwcm9wLnJlcGxhY2UoJyQnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIG9ialN0eWxlcyArPSBcIlwiLmNvbmNhdChyb290LCBcIjogXCIpLmNvbmNhdChvYmpbcm9vdF0sIFwiOyBcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHByb3BzXzEuZGVmYXVsdC5leGNsdWRlcy5pbmRleE9mKHByb3AudG9Mb3dlckNhc2UoKSkgPCAwICYmIG9iai4kbGV2ZWwgIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3NzIHByb3BlcnR5ICcgKyBwcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialN0eWxlcztcbiAgICB9LFxuICAgIHBhcnNlUHJvcGVydGllczogZnVuY3Rpb24gKGNvbXBvbmVudCwgc3RhdGUpIHtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgdmFyIGFsbCA9IE9iamVjdC5rZXlzKHByb3BzXzEuZGVmYXVsdC5wcm9wcykuY29uY2F0KHByb3BzXzEuZGVmYXVsdC5leGNsdWRlcyk7XG4gICAgICAgIHZhciBjb21wb25lbnRTdHlsZXMgPSBjb21wb25lbnQuJHRhZ05hbWUgKyAnLidcbiAgICAgICAgICAgICsgY29tcG9uZW50LiRjbGFzc05hbWUuc3BsaXQoJyAnKVswXSArICcgeyAnO1xuICAgICAgICB2YXIgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjb21wb25lbnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICAgICAgaWYgKGFsbC5pbmRleE9mKHByb3ApID09PSAtMSAmJiBwcm9wWzBdID09PSAnJCcpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcHJvcC5zbGljZSgxKS5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbiAobGV0dGVyKSB7IHJldHVybiBcIi1cIi5jb25jYXQobGV0dGVyLnRvTG93ZXJDYXNlKCkpOyB9KTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRTdHlsZXMgKz0ga2V5ICsgJzogJ1xuICAgICAgICAgICAgICAgICAgICArIGV4cG9ydHMuUGFyc2VyLnBhcnNlU3R5bGVWYWx1ZShjb21wb25lbnRbcHJvcF0pICsgJzsgJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb3BzXzEuZGVmYXVsdC5wcm9wc1twcm9wXSB8fCBwcm9wID09PSAnJGV2ZW50cycpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50W3Byb3BdICE9PSB1bmRlZmluZWQgJiYgcHJvcCAhPT0gJyRldmVudHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcHNfMS5kZWZhdWx0LnByb3BzW3Byb3BdLnNwbGl0KCcuJylbMV1dID0gY29tcG9uZW50W3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm9wc18xLmRlZmF1bHQuZXhjbHVkZXMuaW5kZXhPZihwcm9wKSA8IDAgJiYgY29tcG9uZW50LiRsZXZlbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0YXRlKVxuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY3JlYXRlUnVsZXMpKGNvbXBvbmVudCwgW2NvbXBvbmVudFN0eWxlcyArICd9ICddKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfSxcbiAgICBwYXJzZVN0eWxlVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuICd1bnNldCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGV4cG9ydHMuUGFyc2VyLnBhcnNlU3R5bGVWYWx1ZSh2KTsgfSkuam9pbignICcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59O1xudmFyIGNyZWF0ZVJ1bGVzID0gZnVuY3Rpb24gKG9iamVjdCwgcnVsZXMpIHtcbiAgICB2YXIgc2hlZXQgPSBOYXRpdmUuc2hlZXQ7XG4gICAgcnVsZXMuZm9yRWFjaChmdW5jdGlvbiAoY3NzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoXzEgPSBzaGVldC5jc3NSdWxlcy5sZW5ndGg7XG4gICAgICAgICAgICBzaGVldC5pbnNlcnRSdWxlKGNzcywgbGVuZ3RoXzEpO1xuICAgICAgICAgICAgb2JqZWN0LiRydWxlcyA9IG9iamVjdC4kcnVsZXMgfHwgW107XG4gICAgICAgICAgICBvYmplY3QuJHJ1bGVzLnVuc2hpZnQoc2hlZXQuY3NzUnVsZXNbbGVuZ3RoXzFdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSdWxlIG5vdCBhcHBsaWVkOiAnICsgY3NzICsgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbmV4cG9ydHMuY3JlYXRlUnVsZXMgPSBjcmVhdGVSdWxlcztcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQob2JqZWN0LCB1cGRhdGVTdGF0ZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGdyYXBoaWNzID0gWydzdmcnLCAncGF0aCddO1xuICAgIHZhciBjcmVhdGUgPSBmdW5jdGlvbiAocGFyZW50LCBpdGVtKSB7XG4gICAgICAgIHZhciBjID0gZ3JhcGhpY3MuaW5kZXhPZihpdGVtLiR0YWdOYW1lKSA8IDAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0uJHRhZ05hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKGl0ZW0uJHhtbG5zIHx8IHBhcmVudC5uYW1lc3BhY2VVUkksIGl0ZW0uJHRhZ05hbWUpO1xuICAgICAgICB2YXIgcGFyc2VkUHJvcGVydGllcyA9IGV4cG9ydHMuUGFyc2VyLnBhcnNlUHJvcGVydGllcyhpdGVtLCB1cGRhdGVTdGF0ZSk7XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gcGFyc2VkUHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHByb3AgPT0gJ2V2ZW50cycpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlZFByb3BlcnRpZXNbcHJvcF0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGUgPSBwYXJzZWRQcm9wZXJ0aWVzW3Byb3BdW2ldO1xuICAgICAgICAgICAgICAgICAgICBjLmFkZEV2ZW50TGlzdGVuZXIoZS5uYW1lLCBlLmV2ZW50LCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYy5zZXRBdHRyaWJ1dGUocHJvcCA9PT0gJ2NsYXNzTmFtZScgPyAnY2xhc3MnIDogcHJvcCwgcGFyc2VkUHJvcGVydGllc1twcm9wXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS4kbm9kZSA9IGM7XG4gICAgICAgIGlmIChwYXJlbnQpXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYyk7XG4gICAgICAgIGlmIChpdGVtLiRsZXZlbCA9PT0gMCAmJiBwYXJlbnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgb2xkU2VydmluZyA9IF90aGlzLnNlcnZpbmc7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50XzEgPSBpdGVtO1xuICAgICAgICAgICAgX3RoaXMuY29tcG9uZW50c1tjb21wb25lbnRfMS5uYW1lXVxuICAgICAgICAgICAgICAgID0gX3RoaXMuY29tcG9uZW50c1tjb21wb25lbnRfMS5uYW1lXSB8fCB7IHN0cnVjdHVyZTogY29tcG9uZW50XzEuY29uc3RydWN0b3IgfTtcbiAgICAgICAgICAgIHZhciBuZXdJbnN0YW5jZV8xID0gaXRlbTtcbiAgICAgICAgICAgIHZhciBuaWRfMSA9IG5ld0luc3RhbmNlXzEuJG5pZDtcbiAgICAgICAgICAgIF90aGlzLmNvbXBvbmVudHNbY29tcG9uZW50XzEubmFtZV1bbmlkXzFdLnJvdXRlID0gX3RoaXMucm91dGVyLmN1cnJlbnQ7XG4gICAgICAgICAgICBfdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudF8xLm5hbWVdW25pZF8xXS5pbnN0YW5jZSA9IG5ld0luc3RhbmNlXzE7XG4gICAgICAgICAgICBpZiAoX3RoaXMuYmluZGluZ3NbbmlkXzFdKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfdGhpcy5iaW5kaW5nc1tuaWRfMV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50XzEgPSBfdGhpcy5iaW5kaW5nc1tuaWRfMV1baV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICAgICAgICAgIG9bZXZlbnRfMS5uYW1lXSA9IGV2ZW50XzEuZXZlbnQuYmluZChuZXdJbnN0YW5jZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRfMS5vYmplY3QuJGV2ZW50cy5wdXNoKG8pO1xuICAgICAgICAgICAgICAgICAgICBjLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRfMS5uYW1lLCBldmVudF8xLmV2ZW50LCB7IGNhcHR1cmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJpbmRpbmdzW25pZF8xXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmJpbmRpbmdzW25pZF8xXS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfdGhpcy5iaW5kaW5nc1tuaWRfMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudF8xLm5hbWVdW25pZF8xXSAmJiBfdGhpcy5jb21wb25lbnRzW2NvbXBvbmVudF8xLm5hbWVdW25pZF8xXS5yb290Tm9kZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuY29tcG9uZW50c1tjb21wb25lbnRfMS5uYW1lXVtuaWRfMV0ucm9vdE5vZGUgPSBpdGVtLiRub2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghdXBkYXRlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlXzEub25DcmVhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luc3RhbmNlXzEub25DcmVhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0luc3RhbmNlXzEuZGlzcGF0Y2goJ2NyZWF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfdGhpcy5zZXJ2aW5nID0gb2xkU2VydmluZztcbiAgICAgICAgICAgIF90aGlzLmNvbXBvbmVudHNbY29tcG9uZW50XzEubmFtZV1bbmlkXzFdLnNlcnZlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVNaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ub25DcmVhdGUpXG4gICAgICAgICAgICAgICAgaXRlbS5vbkNyZWF0ZSgpO1xuICAgICAgICAgICAgaXRlbS5kaXNwYXRjaCgnY3JlYXRlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uJGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0uJGNoaWxkcmVuW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaXRlbS4kY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyZWF0ZShjLCBpdGVtLiRjaGlsZHJlbltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgICB2YXIgcmVzdWx0ID0gY3JlYXRlKHVuZGVmaW5lZCwgb2JqZWN0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcbnZhciBDb21wb25lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb21wb25lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsICdjb21wb25lbnQnKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy4kbGV2ZWwgPSAwO1xuICAgICAgICBfdGhpcy4kZXZlbnRzID0gW107XG4gICAgICAgIF90aGlzLiRsb2FkUXVldWUgPSBbXTtcbiAgICAgICAgX3RoaXMuJG5pZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcbiAgICAgICAgX3RoaXMuJHRhZ05hbWUgPSBfdGhpcy5uYW1lLmxlbmd0aCA+IDIgPyBfdGhpcy5uYW1lIDogX3RoaXMubmFtZSArIF90aGlzLiRuaWQ7XG4gICAgICAgIE5hdGl2ZS5zZXJ2aW5nID0gX3RoaXMubmFtZSArIFwiLVwiICsgX3RoaXMuJG5pZDtcbiAgICAgICAgTmF0aXZlLmNvbXBvbmVudHNbX3RoaXMubmFtZV0gPSBOYXRpdmUuY29tcG9uZW50c1tfdGhpcy5uYW1lXSB8fCB7IHN0cnVjdHVyZTogX3RoaXMuY29uc3RydWN0b3IgfTtcbiAgICAgICAgTmF0aXZlLmNvbXBvbmVudHNbX3RoaXMubmFtZV1bX3RoaXMuJG5pZF0gPSB7IHNlcnZlZDogZmFsc2UsIHdhdGNobGlzdDogW10gfTtcbiAgICAgICAgTmF0aXZlLmNvbXBvbmVudHNbX3RoaXMubmFtZV1bX3RoaXMuJG5pZF0uYXJnc1xuICAgICAgICAgICAgPSBOYXRpdmUuY29tcG9uZW50c1tfdGhpcy5uYW1lXVtfdGhpcy4kbmlkXS5hcmdzIHx8IGFyZ3M7XG4gICAgICAgIE5hdGl2ZS5sb2FkUXVldWVbTmF0aXZlLnNlcnZpbmddID0gW107XG4gICAgICAgIF90aGlzLmRpc3BsYXkoJ2Jsb2NrJyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRyb290O1xuICAgIH07XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNoaWxkcmVuO1xuICAgIH07XG4gICAgcmV0dXJuIENvbXBvbmVudDtcbn0oRUxFTUVOVCkpO1xuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG52YXIgUGFnZUNvbXBvbmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBhZ2VDb21wb25lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGFnZUNvbXBvbmVudCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBQYWdlQ29tcG9uZW50O1xufShDb21wb25lbnQpKTtcbmV4cG9ydHMuUGFnZUNvbXBvbmVudCA9IFBhZ2VDb21wb25lbnQ7XG52YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1dHRvbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgJ2J1dHRvbicpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRleHQoJ0J1dHRvbicpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIHJldHVybiBCdXR0b247XG59KEVMRU1FTlQpKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xudmFyIENvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb250YWluZXIoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCAnZGl2JykgfHwgdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIENvbnRhaW5lcjtcbn0oRUxFTUVOVCkpO1xuZXhwb3J0cy5Db250YWluZXIgPSBDb250YWluZXI7XG4nQSxBYmJyLEFwcGxldCxBcmVhLEFydGljbGUsQXNpZGUsQXVkaW8sQmFzZSxCYXNlRm9udCxCRE8sQmxvY2tRdW90ZSxCb2R5LEJSLENhbnZhcyxDYXB0aW9uLENvZGUsQ29sLENvbEdyb3VwLERhdGEsRGV0YWlscyxERk4sRGlhbG9nLERJUixEaXYsREwsRU0sRW1iZWQsRmllbGRTZXQsRmlnQ2FwdGlvbixGaWd1cmUsRm9udCxGb290ZXIsRm9ybSxEZWwsRnJhbWUsRnJhbWVTZXQsSDEsSDIsSDMsSDQsSDUsSDYsSGVhZCxIZWFkZXIsSFIsSFRNTCxJRnJhbWUsSW1hZ2UsSU1HLElucyxJc0luZGV4LExhYmVsLExpbmssTGVnZW5kLExJLE1haW4sTWFwLE1hcmssTWVudSxNZXRhLE1ldGVyLE5hdixPYmplY3RFbGVtZW50LE9MLE9wdEdyb3VwLE9wdGlvbixPdXRwdXQsUCxQYXJhbSxQYXRoLFByZSxQcm9ncmVzcyxRLFNjcmlwdCxTZWN0aW9uLFNlbGVjdCxTbG90LFNvdXJjZSxTcGFuLFN0cm9uZyxTdW1tYXJ5LFRhYmxlLFRCb2R5LFRELFRleHRhcmVhLFRGb290LFRILFRIZWFkLFRpbWUsVFIsVHJhY2ssVUwsVmlkZW8nLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoaSkgeyByZXR1cm4gbW9kdWxlLmV4cG9ydHNbaV0gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhjbGFzc18xLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIGNsYXNzXzEoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBpKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gY2xhc3NfMTtcbn0oRUxFTUVOVCkpOyB9KTtcbnZhciBJbnB1dCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKElucHV0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIElucHV0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCAnaW5wdXQnKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLiRub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy4kbm9kZS50eXBlICE9PSAnZmlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbm9kZS52YWx1ZSA9IHY7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR2YWx1ZSA9IHY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHZhbHVlID0gdjtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLiR2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gSW5wdXQ7XG59KEVMRU1FTlQpKTtcbmV4cG9ydHMuSW5wdXQgPSBJbnB1dDtcbnZhciBTVkcgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTVkcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU1ZHKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCAnc3ZnJykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMueG1sbnMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFNWRztcbn0oRUxFTUVOVCkpO1xuZXhwb3J0cy5TVkcgPSBTVkc7XG52YXIgQW5pbWF0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBbmltYXRpb24ocHJvcHMpIHtcbiAgICAgICAgdGhpcy4kY2xhc3NOYW1lID0gdGhpcy5uYW1lID0gJ3MnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpO1xuICAgICAgICB2YXIgcnVsZSA9ICdAa2V5ZnJhbWVzICcgKyB0aGlzLiRjbGFzc05hbWUgKyAneyAnO1xuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICBydWxlICs9IGtleSArICcgeycgKyBleHBvcnRzLlBhcnNlci5wYXJzZU5hdGl2ZVN0eWxlKHByb3BzW2tleV0pICsgJ30gJztcbiAgICAgICAgfSk7XG4gICAgICAgIHJ1bGUgKz0gJyB9JztcbiAgICAgICAgKDAsIGV4cG9ydHMuY3JlYXRlUnVsZXMpKHRoaXMsIFtydWxlXSk7XG4gICAgfVxuICAgIHJldHVybiBBbmltYXRpb247XG59KCkpO1xuZXhwb3J0cy5BbmltYXRpb24gPSBBbmltYXRpb247XG52YXIgU3R5bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0eWxlKHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJHJ1bGVzID0gW107XG4gICAgICAgIHRoaXMuJGNsYXNzTmFtZSA9ICdzJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcbiAgICAgICAgdmFyIHJ1bGVzID0gWycuJyArIHRoaXMuJGNsYXNzTmFtZSArICd7ICB9J107XG4gICAgICAgIHdpbmRvdy5fX25hdGl2ZV9sb2FkX3F1ZXVlID0gd2luZG93Ll9fbmF0aXZlX2xvYWRfcXVldWUgfHwgW107XG4gICAgICAgIHdpbmRvdy5fX25hdGl2ZV9sb2FkX3F1ZXVlLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY3JlYXRlUnVsZXMpKF90aGlzLCBydWxlcyk7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIF90aGlzW2ldKHByb3BzW2ldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3R5bGUucHJvdG90eXBlLmdsb2JhbCA9IGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB3aW5kb3cuX19uYXRpdmVfbG9hZF9xdWV1ZSA9IHdpbmRvdy5fX25hdGl2ZV9sb2FkX3F1ZXVlIHx8IFtdO1xuICAgICAgICB3aW5kb3cuX19uYXRpdmVfbG9hZF9xdWV1ZS5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBydWxlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgcnVsZXMucHVzaCgnLicgKyBfdGhpcy4kY2xhc3NOYW1lICsgJyAnICsga2V5ICsgJyB7JyArIGV4cG9ydHMuUGFyc2VyLnBhcnNlTmF0aXZlU3R5bGUocHJvcHNba2V5XSkgKyAnfSAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICgwLCBleHBvcnRzLmNyZWF0ZVJ1bGVzKShfdGhpcywgcnVsZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBTdHlsZS5wcm90b3R5cGUucHNldWRvID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5fX25hdGl2ZV9sb2FkX3F1ZXVlID0gd2luZG93Ll9fbmF0aXZlX2xvYWRfcXVldWUgfHwgW107XG4gICAgICAgIHdpbmRvdy5fX25hdGl2ZV9sb2FkX3F1ZXVlLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJ1bGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgICAgICBydWxlcy5wdXNoKCcuJyArIF90aGlzLiRjbGFzc05hbWUucmVwbGFjZSgnICcsICcuJykgKyBrZXkgKyAnIHsnICsgZXhwb3J0cy5QYXJzZXIucGFyc2VOYXRpdmVTdHlsZShwcm9wc1trZXldKSArICd9ICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKDAsIGV4cG9ydHMuY3JlYXRlUnVsZXMpKF90aGlzLCBydWxlcyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBTdHlsZTtcbn0oKSk7XG5leHBvcnRzLlN0eWxlID0gU3R5bGU7XG52YXIgYWx0UHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmUuc2hlZXQuY3NzUnVsZXNbMF0uc3R5bGUpO1xudmFyIHByb3BJbmRleCA9IDA7XG52YXIgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvcCA9IGFsdFByb3BzW3Byb3BJbmRleF0sIGtleSA9IHByb3AucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24gKGxldHRlcikgeyByZXR1cm4gXCItXCIuY29uY2F0KGxldHRlci50b0xvd2VyQ2FzZSgpKTsgfSk7XG4gICAgdmFyIGZucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKE5hdGl2ZS5zZXJ2aW5nKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJyQnICsgcHJvcCwge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuJHJ1bGVzID0gdGhpcy4kcnVsZXMgfHwgW107XG4gICAgICAgICAgICBpZiAodGhpcy4kcnVsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJ1bGVzW3RoaXMuJHJ1bGVzLmxlbmd0aCAtIDFdLnN0eWxlLnNldFByb3BlcnR5KGtleSwgd2luZG93Lk5hdGl2ZS5wYXJzZVN0eWxlVmFsdWUodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXNbJyQnICsgcHJvcF0gPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB0aGlzWyckJyArIHByb3BdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVMRU1FTlQucHJvdG90eXBlW3Byb3BdID0gZm5zO1xuICAgIFN0eWxlLnByb3RvdHlwZVtwcm9wXSA9IGZucztcbiAgICBwcm9wSW5kZXgrKztcbn07XG53aGlsZSAocHJvcEluZGV4IDwgYWx0UHJvcHMubGVuZ3RoIC0gMSkge1xuICAgIF9sb29wXzEoKTtcbn1cbnZhciBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzXzEuZGVmYXVsdC5wcm9wcyk7XG52YXIgX2xvb3BfMiA9IGZ1bmN0aW9uIChpKSB7XG4gICAgdmFyIHByb3AgPSBwcm9wc1tpXSwgY2FsbGVyID0gcHJvcHNfMS5kZWZhdWx0LnByb3BzW3Byb3BdO1xuICAgIHZhciBmbiA9IHZvaWQgMDtcbiAgICB2YXIgc3BsaXQgPSBjYWxsZXIuc3BsaXQoJy4nKSwga2V5ID0gc3BsaXRbMF0sIG5hbWVfMSA9IHNwbGl0WzFdO1xuICAgIGZuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcCwge1xuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoTmF0aXZlLnNlcnZpbmcpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2F0dHInKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJG5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbm9kZS5zZXRBdHRyaWJ1dGUobmFtZV8xLCBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogQXJyYXkuZnJvbShhcmd1bWVudHMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzW3Byb3BdID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGFyZ3VtZW50c1swXSA6IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFTEVNRU5ULnByb3RvdHlwZVtwcm9wLnNsaWNlKDEpXSA9IGZuO1xufTtcbmZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICBfbG9vcF8yKGkpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgICAgJyRhYmJyJzogJ2F0dHIuYWJicicsXG4gICAgICAgICckYWNjZXB0JzogJ2F0dHIuYWNjZXB0JyxcbiAgICAgICAgJyRhY2NlcHRDaGFyc2V0JzogJ2F0dHIuYWNjZXB0LWNoYXJzZXQnLFxuICAgICAgICAnJGFjY2Vzc0tleSc6ICdhdHRyLmFjY2Vzc2tleScsXG4gICAgICAgICckYWN0aW9uJzogJ2F0dHIuYWN0aW9uJyxcbiAgICAgICAgJyRhbGluayc6ICdhdHRyLmFsaW5rJyxcbiAgICAgICAgJyRhbGxvdyc6ICdhdHRyLmFsbG93JyxcbiAgICAgICAgJyRhbGxvd0Z1bGxzY3JlZW4nOiAnYXR0ci5hbGxvd2Z1bGxzY3JlZW4nLFxuICAgICAgICAnJGFsbG93UGF5bWVudFJlcXVlc3QnOiAnYXR0ci5hbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAgICAgJyRhbGxvd1VzZXJNZWRpYSc6ICdhdHRyLmFsbG93dXNlcm1lZGlhJyxcbiAgICAgICAgJyRhbHQnOiAnYXR0ci5hbHQnLFxuICAgICAgICAnJGFyY2hpdmUnOiAnYXR0ci5hcmNoaXZlJyxcbiAgICAgICAgJyRhcyc6ICdhdHRyLmFzJyxcbiAgICAgICAgJyRhc3luYyc6ICdhdHRyLmFzeW5jJyxcbiAgICAgICAgJyRhdHRySGVpZ2h0JzogJ2F0dHIuaGVpZ2h0JyxcbiAgICAgICAgJyRhdHRyV2lkdGgnOiAnYXR0ci53aWR0aCcsXG4gICAgICAgICckYXV0b0NhcGl0YWxpemUnOiAnYXR0ci5hdXRvY2FwaXRhbGl6ZScsXG4gICAgICAgICckYXV0b0NvbXBsZXRlJzogJ2F0cnIuYXV0b2NvbXBsZXRlJyxcbiAgICAgICAgJyRhdXRvRm9jdXMnOiAnYXR0ci5hdXRvZm9jdXMnLFxuICAgICAgICAnJGF1dG9QbGF5JzogJ2F0dHIuYXV0b3BsYXknLFxuICAgICAgICAnJGF4aXMnOiAnYXR0ci5heGlzJyxcbiAgICAgICAgJyRjYXB0dXJlJzogJ2F0dHIuY2FwdHVyZScsXG4gICAgICAgICckY2VsbFBhZGRpbmcnOiAnYXR0ci5jZWxscGFkZGluZycsXG4gICAgICAgICckY2VsbFNwYWNpbmcnOiAnYXR0ci5jZWxsc3BhY2luZycsXG4gICAgICAgICckY2hhcic6ICdhdHRyLmNoYXInLFxuICAgICAgICAnJGNoYXJPZmYnOiAnYXR0ci5jaGFyb2ZmJyxcbiAgICAgICAgJyRjaGFyc2V0JzogJ2F0dHIuY2hhcnNldCcsXG4gICAgICAgICckY2hlY2tlZCc6ICdhdHRyLmNoZWNrZWQnLFxuICAgICAgICAnJGNpdGUnOiAnYXR0ci5jaXRlJyxcbiAgICAgICAgJyRjbGFzc0lkJzogJ2F0dHIuY2xhc3NpZCcsXG4gICAgICAgICckY2xhc3NOYW1lJzogJ2F0dHIuY2xhc3MnLFxuICAgICAgICAnJGNsZWFyQXR0cic6ICdhdHRyLmNsZWFyJyxcbiAgICAgICAgJyRjb2RlJzogJ2F0dHIuY29kZScsXG4gICAgICAgICckY29kZUJhc2UnOiAnYXR0ci5jb2RlYmFzZScsXG4gICAgICAgICckY29kZVR5cGUnOiAnYXR0ci5jb2RldHlwZScsXG4gICAgICAgICckY29scyc6ICdhdHRyLmNvbHMnLFxuICAgICAgICAnJGNvbFNwYW4nOiAnYXR0ci5jb2xzcGFuJyxcbiAgICAgICAgJyRjb21wYWN0JzogJ2F0dHIuY29tcGFjdCcsXG4gICAgICAgICckY29udGVudEVkaXRhYmxlJzogJ2F0dHIuY29udGVudGVkaXRhYmxlJyxcbiAgICAgICAgJyRjb250cm9scyc6ICdhdHRyLmNvbnRyb2xzJyxcbiAgICAgICAgJyRjb29yZHMnOiAnYXR0ci5jb29yZHMnLFxuICAgICAgICAnJGNyb3NzT3JpZ2luJzogJ2F0dHIuY3Jvc3NvcmlnaW4nLFxuICAgICAgICAnJGQnOiAnYXR0ci5kJyxcbiAgICAgICAgJyRkYXRhJzogJ2F0dHIuZGF0YScsXG4gICAgICAgICckZGF0ZXRpbWUnOiAnYXR0ci5kYXRldGltZScsXG4gICAgICAgICckZGVjbGFyZSc6ICdhdHRyLmRlY2xhcmUnLFxuICAgICAgICAnJGRlY29kaW5nJzogJ2F0dHIuZGVjb2RpbmcnLFxuICAgICAgICAnJGRpcic6ICdhdHRyLmRpcicsXG4gICAgICAgICckZGlybmFtZSc6ICdhdHRyLmRpcm5hbWUnLFxuICAgICAgICAnJGRpc2FibGVkJzogJ2F0dHIuZGlzYWJsZWQnLFxuICAgICAgICAnJGRvd25sb2FkJzogJ2F0dHIuZG93bmxvYWQnLFxuICAgICAgICAnJGRyYWdnYWJsZSc6ICdhdHRyLmRyYWdnYWJsZScsXG4gICAgICAgICckZW5jdHlwZSc6ICdhdHRyLmVuY3R5cGUnLFxuICAgICAgICAnJGVudGVyS2V5SGludCc6ICdhdHRyLmVudGVya2V5aGludCcsXG4gICAgICAgICckZmlsbCc6ICdhdHRyLmZpbGwnLFxuICAgICAgICAnJGZvcm0nOiAnYXR0ci5mb3JtJyxcbiAgICAgICAgJyRmb3JtQWN0aW9uJzogJ2F0dHIuZm9ybWFjdGlvbicsXG4gICAgICAgICckZm9ybUVuY3R5cGUnOiAnYXR0ci5mb3JtZW5jdHlwZScsXG4gICAgICAgICckZm9ybU1ldGhvZCc6ICdhdHRyLmZvcm1tZXRob2QnLFxuICAgICAgICAnJGZvcm1Ob1ZhbGlkYXRlJzogJ2F0dHIuZm9ybW5vdmFsaWRhdGUnLFxuICAgICAgICAnJGZvcm1UYXJnZXQnOiAnYXR0ci5mb3JtdGFyZ2V0JyxcbiAgICAgICAgJyRmcmFtZSc6ICdhdHRyLmZyYW1lJyxcbiAgICAgICAgJyRmcmFtZUJvcmRlcic6ICdhdHRyLmZyYW1lYm9yZGVyJyxcbiAgICAgICAgJyRoZWFkZXJzJzogJ2F0dHIuaGVhZGVycycsXG4gICAgICAgICckaGlkZGVuJzogJ2F0dHIuaGlkZGVuJyxcbiAgICAgICAgJyRoaWdoJzogJ2F0dHIuaGlnaCcsXG4gICAgICAgICckaHJlZic6ICdhdHRyLmhyZWYnLFxuICAgICAgICAnJGhyZWZMYW5nJzogJ2F0dHIuaHJlZmxhbmcnLFxuICAgICAgICAnJGhTcGFjZSc6ICdhdHRyLmhzcGFjZScsXG4gICAgICAgICckaWQnOiAnYXR0ci5pZCcsXG4gICAgICAgICckaW1hZ2VTaXplcyc6ICdhdHRyLmltYWdlc2l6ZXMnLFxuICAgICAgICAnJGltYWdlU3JjU2V0JzogJ2F0dHIuaW1hZ2VzcmNzZXQnLFxuICAgICAgICAnJGlucHV0TW9kZSc6ICdhdHRyLmlucHV0bW9kZScsXG4gICAgICAgICckaW50ZWdyaXR5JzogJ2F0dHIuaW50ZWdyaXR5JyxcbiAgICAgICAgJyRpcyc6ICdhdHRyLmlzJyxcbiAgICAgICAgJyRpc01hcCc6ICdhdHRyLmlzbWFwJyxcbiAgICAgICAgJyRpdGVtSWQnOiAnYXR0ci5pdGVtaWQnLFxuICAgICAgICAnJGl0ZW1Qcm9wJzogJ2F0dHIuaXRlbXByb3AnLFxuICAgICAgICAnJGl0ZW1SZWYnOiAnYXR0ci5pdGVtcmVmJyxcbiAgICAgICAgJyRpdGVtU2NvcGUnOiAnYXR0ci5pdGVtc2NvcGUnLFxuICAgICAgICAnJGl0ZW1UeXBlJzogJ2F0dHIuaXRlbXR5cGUnLFxuICAgICAgICAnJGtpbmQnOiAnYXR0ci5raW5kJyxcbiAgICAgICAgJyRsYWJlbCc6ICdhdHRyLmxhYmVsJyxcbiAgICAgICAgJyRsYW5nJzogJ2F0dHIubGFuZycsXG4gICAgICAgICckbGluayc6ICdhdHRyLmxpbmsnLFxuICAgICAgICAnJGxpc3QnOiAnYXR0ci5saXN0JyxcbiAgICAgICAgJyRsb25nRGVzYyc6ICdhdHRyLmxvbmdkZXNjJyxcbiAgICAgICAgJyRsb29wJzogJ2F0dHIubG9vcCcsXG4gICAgICAgICckbG93JzogJ2F0dHIubG93JyxcbiAgICAgICAgJyRtYXJnaW5IZWlnaHQnOiAnYXR0ci5tYXJnaW5oZWlnaHQnLFxuICAgICAgICAnJG1hcmdpbldpZHRoJzogJ2F0dHIubWFyZ2lud2lkdGgnLFxuICAgICAgICAnJG1heCc6ICdhdHRyLm1heCcsXG4gICAgICAgICckbWF4TGVuZ3RoJzogJ2F0dHIubWF4bGVuZ3RoJyxcbiAgICAgICAgJyRtZWRpYSc6ICdhdHRyLm1lZGlhJyxcbiAgICAgICAgJyRtZXRob2QnOiAnYXR0ci5tZXRob2QnLFxuICAgICAgICAnJG1pbic6ICdhdHRyLm1pbicsXG4gICAgICAgICckbWluTGVuZ3RoJzogJ2F0dHIubWlubGVuZ3RoJyxcbiAgICAgICAgJyRtdWx0aXBsZSc6ICdhdHRyLm11bHRpcGxlJyxcbiAgICAgICAgJyRtdXRlZCc6ICdhdHRyLm11dGVkJyxcbiAgICAgICAgJyRhdHRyTmFtZSc6ICdhdHRyLm5hbWUnLFxuICAgICAgICAnJG5vbmNlJzogJ2F0dHIubm9uY2UnLFxuICAgICAgICAnJG5vUmVzaXplJzogJ2F0dHIubm9yZXNpemUnLFxuICAgICAgICAnJG5vU2hhZGUnOiAnYXR0ci5ub3NoYWRlJyxcbiAgICAgICAgJyRub1ZhbGlkYXRlJzogJ2F0dHIubm92YWxpZGF0ZScsXG4gICAgICAgICckbm9XcmFwJzogJ2F0dHIubm93cmFwJyxcbiAgICAgICAgJyRvYmplY3QnOiAnYXR0ci5vYmplY3QnLFxuICAgICAgICAnJG9wZW4nOiAnYXR0ci5vcGVuJyxcbiAgICAgICAgJyRvcHRpbXVtJzogJ2F0dHIub3B0aW11bScsXG4gICAgICAgICckcGF0dGVybic6ICdhdHRyLnBhdHRlcm4nLFxuICAgICAgICAnJHBpbmcnOiAnYXR0ci5waW5nJyxcbiAgICAgICAgJyRwbGFjZWhvbGRlcic6ICdhdHRyLnBsYWNlaG9sZGVyJyxcbiAgICAgICAgJyRwbGF5c0lubGluZSc6ICdhdHRyLnBsYXlzaW5saW5lJyxcbiAgICAgICAgJyRwb3N0ZXInOiAnYXR0ci5wb3N0ZXInLFxuICAgICAgICAnJHByZWxvYWQnOiAnYXR0ci5wcmVsb2FkJyxcbiAgICAgICAgJyRwcmVzZXJ2ZUFzcGVjdFJhdGlvJzogJ2F0dHIucHJlc2VydmVBc3BlY3RSYXRpbycsXG4gICAgICAgICckcHJvZmlsZSc6ICdhdHRyLnByb2ZpbGUnLFxuICAgICAgICAnJHByb21wdCc6ICdhdHRyLnByb21wdCcsXG4gICAgICAgICckcmVhZE9ubHknOiAnYXR0ci5yZWFkb25seScsXG4gICAgICAgICckcmVmZXJyZXJQb2xpY3knOiAnYXR0ci5yZWZlcnJlcnBvbGljeScsXG4gICAgICAgICckcmVsJzogJ2F0dHIucmVsJyxcbiAgICAgICAgJyRyZXF1aXJlZCc6ICdhdHRyLnJlcXVpcmVkJyxcbiAgICAgICAgJyRyZXYnOiAnYXR0ci5yZXYnLFxuICAgICAgICAnJHJldmVyc2VkJzogJ2F0dHIucmV2ZXJzZWQnLFxuICAgICAgICAnJHJvd3MnOiAnYXR0ci5yb3dzJyxcbiAgICAgICAgJyRyb3dTcGFuJzogJ2F0dHIucm93c3BhbicsXG4gICAgICAgICckc2FuZEJveCc6ICdhdHRyLnNhbmRib3gnLFxuICAgICAgICAnJHNjb3BlJzogJ2F0dHIuc2NvcGUnLFxuICAgICAgICAnJHNjcm9sbGluZyc6ICdhdHRyLnNjcm9sbGluZycsXG4gICAgICAgICckc2VsZWN0ZWQnOiAnYXR0ci5zZWxlY3RlZCcsXG4gICAgICAgICckc2hhcGUnOiAnYXR0ci5zaGFwZScsXG4gICAgICAgICckc2l6ZXMnOiAnYXR0ci5zaXplcycsXG4gICAgICAgICckc2xvdCc6ICdhdHRyLnNsb3QnLFxuICAgICAgICAnJHNwYW4nOiAnYXR0ci5zcGFuJyxcbiAgICAgICAgJyRzcGVsbENoZWNrJzogJ2F0dHIuc3BlbGxjaGVjaycsXG4gICAgICAgICckc3JjJzogJ2F0dHIuc3JjJyxcbiAgICAgICAgJyRzcmNEb2MnOiAnYXR0ci5zcmNkb2MnLFxuICAgICAgICAnJHNyY1NldCc6ICdhdHRyLnNyY3NldCcsXG4gICAgICAgICckc3RhbmRCeSc6ICdhdHRyLnN0YW5kYnknLFxuICAgICAgICAnJHN0YXJ0JzogJ2F0dHIuc3RhcnQnLFxuICAgICAgICAnJHN0ZXAnOiAnYXR0ci5zdGVwJyxcbiAgICAgICAgJyRzdW1tYXJ5JzogJ2F0dHIuc3VtbWFyeScsXG4gICAgICAgICckdGFiSW5kZXgnOiAnYXR0ci50YWJpbmRleCcsXG4gICAgICAgICckdGFyZ2V0JzogJ2F0dHIudGFyZ2V0JyxcbiAgICAgICAgJyR0aXRsZSc6ICdhdHRyLnRpdGxlJyxcbiAgICAgICAgJyR0cmFuc2xhdGUnOiAnYXR0ci50cmFuc2xhdGUnLFxuICAgICAgICAnJGF0dHJUcmFuc2Zvcm0nOiAnYXR0ci50cmFuc2Zvcm0nLFxuICAgICAgICAnJHR5cGUnOiAnYXR0ci50eXBlJyxcbiAgICAgICAgJyR0eXBlTXVzdE1hdGNoJzogJ2F0dHIudHlwZW11c3RtYXRjaCcsXG4gICAgICAgICckdXNlTWFwJzogJ2F0dHIudXNlbWFwJyxcbiAgICAgICAgJyR2QWxpZ24nOiAnYXR0ci52YWxpZ24nLFxuICAgICAgICAnJHZhbHVlJzogJ2F0dHIudmFsdWUnLFxuICAgICAgICAnJHZhbHVlVHlwZSc6ICdhdHRyLnZhbHVldHlwZScsXG4gICAgICAgICckdmlld0JveCc6ICdhdHRyLnZpZXdCb3gnLFxuICAgICAgICAnJHZMaW5rJzogJ2F0dHIudmxpbmsnLFxuICAgICAgICAnJHZTcGFjZSc6ICdhdHRyLnZzcGFjZScsXG4gICAgICAgICckd3JhcCc6ICdhdHRyLndyYXAnLFxuICAgICAgICAnJHhtbG5zJzogJ2F0dHIueG1sbnMnLFxuICAgICAgICAnY2xhc3NOYW1lJzogJ2F0dHIuY2xhc3MnLFxuICAgICAgICAnJGF0dHJEZWZhdWx0JzogJ2F0dHIuZGVmYXVsdCcsXG4gICAgICAgICckYXR0ckZvcic6ICdhdHRyLmZvcicsXG4gICAgICAgICckZm9yJzogJ2F0dHIuZm9yJyxcbiAgICAgICAgJyRkZWZhdWx0JzogJ2F0dHIuZGVmYXVsdCdcbiAgICB9LFxuICAgIGV4Y2x1ZGVzOiBbXG4gICAgICAgICckbmF0aXZlJyxcbiAgICAgICAgJyRjaGlsZHJlbicsXG4gICAgICAgICckbGV2ZWwnLFxuICAgICAgICAnJG1vZGVsJyxcbiAgICAgICAgJyR0YWdOYW1lJyxcbiAgICAgICAgJyRwc2V1ZG8nLFxuICAgICAgICAnJGdsb2JhbCcsXG4gICAgICAgICckaG9zdENvbXBvbmVudCcsXG4gICAgICAgICckcm9vdCcsXG4gICAgICAgICckbm9kZScsXG4gICAgICAgICckbG9hZFF1ZXVlJyxcbiAgICAgICAgJyRuaWQnLFxuICAgICAgICAnaWQnLFxuICAgICAgICAndGFnTmFtZScsXG4gICAgICAgICckYW5pbWF0aW9uJyxcbiAgICAgICAgJyRydWxlcycsXG4gICAgICAgICdjc3NSdWxlcycsXG4gICAgICAgICdvcHRpb25zJyxcbiAgICAgICAgJyRldmVudHMnLFxuICAgICAgICAncm9vdCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICdnZXQnLFxuICAgICAgICAnc2V0JyxcbiAgICAgICAgJyRzdGFja1ZlcnRpY2FsJyxcbiAgICAgICAgJyRjaGlsZFZlcnRpY2FsU3BhY2luZycsXG4gICAgICAgICckc2l6ZScsXG4gICAgICAgICckYWJzUG9zaXRpb24nLFxuICAgICAgICAnJGFic0NlbnRlcicsXG4gICAgICAgICckYWJzQ2VudGVyUmlnaHQnLFxuICAgICAgICAnJGFic0NlbnRlckxlZnQnLFxuICAgICAgICAnJGFic0NlbnRlclRvcCcsXG4gICAgICAgICckYWJzQ2VudGVyQm90dG9tJyxcbiAgICAgICAgJyRhYnNUb3BSaWdodCcsXG4gICAgICAgICckYWJzVG9wTGVmdCcsXG4gICAgICAgICckYWJzQm90dG9tUmlnaHQnLFxuICAgICAgICAnJGFic0JvdHRvbUxlZnQnLFxuICAgICAgICAnJGFic0NlbnRlclZlcnRpY2FsJyxcbiAgICAgICAgJyRhYnNDZW50ZXJIb3Jpem9udGFsJyxcbiAgICAgICAgJyRhc3BlY3RSYXRpb24nLFxuICAgICAgICAnJHRydW5jYXRlVGV4dCcsXG4gICAgICAgICckcmVsQ2VudGVySG9yaXpvbnRhbCcsXG4gICAgICAgICckY2xlYXJGaXgnLFxuICAgICAgICAnJGJhY2tncm91bmRHcmFkaWVudCcsXG4gICAgICAgICckZmxleFNwYWNlQmV0d2VlbicsXG4gICAgICAgICckZmxleENlbnRlcicsXG4gICAgICAgICckcmVzcG9uc2l2ZW5lc3MnLFxuICAgICAgICAnJHN0eWxlcycsXG4gICAgICAgICckbWVkaWFzJ1xuICAgIF1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9saWIvbmF0aXZlLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9