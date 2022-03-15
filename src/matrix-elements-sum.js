const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
	let sum = 0;
	
	for (let j = 0, i = 0; i < matrix.length && j < matrix[i].length; j++) {
		while (i < matrix.length) {
			if (matrix[i][j] === 0) {
				break;
			} else {
				sum += matrix[i][j];
			}
			i++;
		}
		i = 0;
	}

	return sum;
}

module.exports = {
	getMatrixElementsSum
};
