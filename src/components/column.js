function range (n) {
  const res = []
  for (let i = 0; i < n; i++) {
    res.push(i)
  }
  return res
}

export default {
  props: ['item'],
  server: {
    getCacheKey: props => props.item.id
  },
  render (h) {
    return (
      <td class="item">
        <ul class="yoyo">
          {/* 5x5 = 25 spans for every cell in the table */}
          {range(5).map(i => {
            return <li>{
              range(5).map(j => <span>{i * j} {this.item.id}</span>)
            }</li>
          })}
        </ul>
      </td>
    )
  }
}
