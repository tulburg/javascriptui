import App from './app';

export default {
  theme: {
    globals: {
      '*': { padding: 0, margin: 0 }
    }
  },
  routes: [
    { path: '/', component: App, name: 'Home' }
  ]
}
