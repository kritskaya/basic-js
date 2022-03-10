const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample( sampleActivity ) {
  const MAX_VALUE = 15;
  const MIN_VALUE = 0;
  
  if (!sampleActivity) return false;
  if (typeof sampleActivity !== "string") return false;

  let activity = parseFloat(sampleActivity);
  if (isNaN(activity)) return false;
  if (activity >= MAX_VALUE || activity <= MIN_VALUE) return false;
  
  const k = 0.693 / HALF_LIFE_PERIOD;
  const t = Math.ceil(Math.log(MODERN_ACTIVITY / activity) / k);
  
  return t;
}

module.exports = {
  dateSample
};
