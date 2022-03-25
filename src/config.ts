import App from './app';
import { Style } from '../core/components';

export default {
  theme: {
    globals: {
      '*': {
        padding: 0,
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 12
      },
      body: {
        backgroundColor: '#202020'
      }
    },
    color: {
      background: '#f0f0f0',
      fontColorGreyLight: '#707070',
      fontColorGrey: '#404040'
    },
    styles: {
      roundButton: new Style({
        padding: [10, 20], borderRadius: 16
      })
    }
  },
  routes: [
    { path: '/', component: App, name: 'Home' }
  ]
}
