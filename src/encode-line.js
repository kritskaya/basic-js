const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
	
	return (result = str.match(/(.)\1*/g)) ? 
					result.map((item) => item.length > 1 ? item.length + item[0] : item[0])
				 			.join("") : "";						 
}

module.exports = {
	encodeLine
};
