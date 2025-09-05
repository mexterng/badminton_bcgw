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

function is_challenge_valid(place_a, place_b) {
  // Exactly one is positive Infinity → valid
  if ((place_a === Infinity) !== (place_b === Infinity)) return true;

  // Both are positive Infinity → invalid
  if (place_a === Infinity && place_b === Infinity) return false;

  // Normal case: convert place to (row, col)
  let [row_a, col_a] = positionInPyramid(place_a);
  let [row_b, col_b] = positionInPyramid(place_b);

  // Challenge is valid if rows differ by at most 1
  return Math.abs(row_a - row_b) <= 1;
}

module.exports = {
  getOffset,
  emptyOrRows,
  positionInPyramid,
  placeFromPositionInPyramid,
  is_challenge_valid
}