import App from './app';

export default {
  theme: {
    globals: {
      '*': { 
        padding: 0, 
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 12
      }, 
    },
    color: {
      background: '#f0f0f0',
      fontColorGreyLight: '#707070',
      fontColorGrey: '#404040'
    }
  },
  routes: [
    { path: '/', component: App, name: 'Home' }
  ]
}
