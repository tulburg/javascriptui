import App from './app';

export default {
  theme: {
    globals: {
      '*': {
        padding: 0, margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
      }
    },
    colors: {
      background: '#202020',
      text: '#f0f0f0'
    }
  },
  routes: [
    {path: '/', component: App, name: 'App'}
  ]
}


