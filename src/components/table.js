import Row from './row'
import store from '../store'

function generateGrid (rowCount, columnCount) {
  var grid = []
  for (var r = 0; r < rowCount; r++) {
    var row = { id: r, items: [] }
    for (var c = 0; c < columnCount; c++) {
      row.items.push({ id: (r + '-' + c) })
    }
    grid.push(row)
  }
  return grid
}

export default {
  data () {
    return {
      grid: generateGrid(store.state.rows, store.state.cols)
    }
  },
  render (h) {
    return (
      <table width="100%" cellspacing="2">
        <tbody>
          {this.grid.map(row => <Row row={row}/>)}
        </tbody>
      </table>
    )
  }
}
