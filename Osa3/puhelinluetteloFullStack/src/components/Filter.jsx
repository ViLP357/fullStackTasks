const Filter = ({newFilter, handleFilterChange}) => {
  return (
  <form>
  <div>
    filter: <input value={newFilter} onChange={handleFilterChange} />
  </div>
</form>
  )
}

export default Filter