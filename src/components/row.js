import Column from './column'

export default {
  props: ['row'],
  server: {
    getCacheKey: props => {
      return props.row.id + '::' + props.row.items.length
    }
  },
  render (h) {
    return (
      <tr>
        <th>{this.row.id}</th>
        {this.row.items.map(item => <Column item={item}/>)}
      </tr>
    )
  }
}
