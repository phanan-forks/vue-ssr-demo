import Vue from 'vue'
import App from './app'
import store from './store'

const app = new Vue(App)

export default context => {
  return app.fetchServerData(context.url).then(() => {
    context.initialState = store.state
    return app
  })
}
