const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
	return matrix.map((row, i) => {
		return row.map((item, j) => {
			let sum = 0;
			if (i !== 0) sum += matrix[i - 1][j];
			if (i !== matrix.length - 1) sum += matrix[i + 1][j];
			if (j !== 0) sum += matrix[i][j - 1];
			if (j !== matrix[i].length - 1) sum += matrix[i][j + 1];
			if (i !== 0 && j !== matrix[i].length - 1) sum += matrix[i - 1][j + 1];
			if (i !== matrix.length - 1 && j !== matrix[i].length - 1) sum += matrix[i + 1][j + 1];
			if (i !== 0 && j !== 0) sum += +matrix[i - 1][j - 1];
			if (i !== matrix.length - 1 && j !== 0) sum += matrix[i + 1][j - 1];
			return sum;
		});
	});
}

module.exports = {
	minesweeper
};
