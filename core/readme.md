## Standalone

Usage 

`<script src="http://unpkg.com/jui.min.js"></script>`

```typescript
class App extends UI.Container {
  constructor() {
    super();
    this.text('Hello world!')
  }
}

UI.load('#app', new App())
```


