import store from './store'
import Table from './components/table'

export default {
  render (h) {
    return (
      <div id="app">
        <p>
          Rendering a {store.state.rows} x {store.state.cols} table,
          with 25 spans in every cell.
          You can render with different row/column counts with URL query, e.g. ?r=30&c=10
        </p>
        <pre>Store state: {JSON.stringify(store.state, null, 2)}</pre>
        <button on-click={() => alert('clicked!')}>Click me</button>
        {" <--"} Just to show that client-side hydration works
        <Table/>
      </div>
    )
  },
  methods: {
    fetchServerData (url) {
      // in real apps you'd call an action that fetches data into
      // the store and returns a Promise
      return new Promise(resolve => {
        setTimeout(() => {
          store.dispatch('navigate', url)
          resolve()
        }, 0)
      })
    }
  }
}
