# JavascriptUI (JUI)

The standard Javascript interface design framework for the WEB! It is designed for quick and easy UI development of all sizes. This framework is specifically built for high performance and all out customizations.

## Get started

- Try it on the [playground](https://javascriptui.dev/playground)
- Try it on [stackblitz](https://stackblitz.com/edit/express-simple-g1ygzr?file=src%2Fapp.ts)
- Read the [documentation](https://javascriptui.dev)

## Start a project

To create a project with *NPM*

```bash
npm init javascriptui
```

or with yarn

```bash
yarn create javascriptui
```

## Usage

### Basic concepts

All functions can be call in a chain i.e.

```typescript
new Container().display('flex').justifyContent('center')
```
The only exceptions are getter functions. A getter function is used to get the value created by the setter function. Usually, preceded by a string. i.e. `$display` or `$justifyContent`

All functions can both work as getters and setters. The difference is the value passed. If a value is passed, it performs as setter and if no value is passed, it performs as a getter.

```typescript
// setter function
const h1 = new H1().text('Hello world');
 
// getter function
console.log(h1.text())
// output: Hello world
```
#
### Class structure
Elements in JUI are defined as classes. That is, all html tags i.e. `H1`, `A`, `IMG`, `EM`, `DIV`, `Span` etc. Use any of these, simply by calling `new` i.e.

```typescript
new Div();
```

Document tree are created with the `addChild` function.
Check other element functions in [Element functions](https://javascriptui.dev/docs/element-functions)

```typescript
new Container().display('flex').addChild(
  new H1().text('Hello world')
)
```

Output html:

```html
<div>
  <h1>Hello world</h1>
</div>
```

#

### Writing CSS
Elements in JavascriptUI are styled by calling the CSS properties on the class object in their camelCase form.

```typescript
new H1().text('Hi!').fontSize(12).fontWeight('bold').color('red');
```
> These CSS properties are according to what is available in the active client browser. JUI is only exposing the existing browser API
Read more about CSS in [Styling elements](https://javascriptui.dev/docs/styling-elements)

#

### HTML Attributes
HTML attributes can be called in similar fashion as explained above. Only starting with the `attr` keyword.

```typescript
new A().text('Call to action').attrHref('/jui-docs').attrTarget('_self');
```

#

### Event listeners
All events listeners in JUI can be added by using the `on` function i.e.

```typescript
new Button().text('Click').on({
  click: () => console.log('clicked!'),
  mousemove: e => console.log(e.clientX),
  mouseup: e => console.log(e.clientY)
});
```
Read the full documentation about [Themes](https://javascriptui.dev/docs/globals#theme), [Styles](https://javascriptui.dev/docs/styling-elements#overview), [Router](https://javascriptui.dev/docs/globals#router), [Config](https://javascriptui.dev/docs/globals#config) and [more](https://javascriptui.dev/docs/element-functions)

#

# Contributing
We would love to have you on board to make JUI even better. Please see [contribution.md](/contribution.md) for more information.
