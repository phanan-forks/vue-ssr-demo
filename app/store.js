import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'

Vue.use(Vuex)

const defaultState = {
  count: 0,
  url: '/',
  rows: 100,
  cols: 10
}

const state = typeof __INITIAL_STATE__ !== 'undefined'
  ? __INITIAL_STATE__
  : defaultState

export default new Vuex.Store({
  state,
  mutations: {
    inc: state => state.count++,
    navigate: (state, url) => {
      state.url = url
      const queryIndex = url.indexOf('?')
      if (queryIndex > 0) {
        const query = qs.parse(url.slice(queryIndex + 1))
        state.rows = query.r || 100
        state.cols = query.c || 10
      }
    }
  }
})
