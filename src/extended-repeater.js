const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
	return new Array(options.repeatTimes || 1)
		.fill(str)
		.map(item => item + new Array(options.additionRepeatTimes || 1)
										.fill(options.addition !== undefined ?  options.addition !== null ? options.addition : "null" : "")
										.join(options.additionSeparator || "|")
		)
		.join(options.separator || "+");
}

console.log(repeater(null, { repeatTimes: 3, separator: '??? ', addition: null, additionRepeatTimes: 3, additionSeparator: '!!!' }) );
//'truefalse!!!false??? truefalse!!!false??? truefalse!!!false'

module.exports = {
	repeater
};
