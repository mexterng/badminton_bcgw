function getOffset(currentPage = 1, listPerPage) { // calculates the items that can be displayed on the current page
  return (currentPage - 1) * [listPerPage];
}


function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows
}