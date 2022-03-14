const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
	let map = new Map();
	domains.forEach((domain) => {
		let key = "";
		domain.split(".").reverse().forEach((domainPart) => {
			key = `${key}.${domainPart}`;
			map.set(key, map.has(key) ? map.get(key) + 1 : 1);
		});
	});
	return Object.fromEntries(map.entries());
}

module.exports = {
	getDNSStats
};
