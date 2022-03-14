const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
	return n.toString().split("").reduce((prev, digit, index) => {
		let number = n.toString().slice(0, index) + n.toString().slice(index + 1);
		if (prev > +number ) {
			return prev;
		} else {
			return +number;
		}
	}, -Number.MAX_VALUE);
}

module.exports = {
	deleteDigit
};
