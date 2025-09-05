function getOffset(currentPage = 1, listPerPage) { // calculates the items that can be displayed on the current page
  return (currentPage - 1) * [listPerPage];
}


function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

// Calculate row and column in pyramid
function positionInPyramid(place) {
  let row = Math.floor((Math.sqrt(1 + 8 * place) - 1) / 2);
  if ((row * (row + 1)) / 2 < place) row += 1;
  let col = place - (row * (row - 1)) / 2;
  return [row, col];
}

// Map back from (row, col) to absolute position number
function placeFromPositionInPyramid(row, col) {
  return Math.floor((row * (row - 1)) / 2) + col;
}

module.exports = {
  getOffset,
  emptyOrRows,
  positionInPyramid,
  placeFromPositionInPyramid
}