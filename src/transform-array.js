const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
   if (!Array.isArray(arr)) 
      throw new Error("'arr' parameter must be an instance of the Array!");
   let copy = arr.slice();

   for(let i = 0; i < copy.length; i++) {
      switch (copy[i]) {
         case "--discard-next":
            if (i !== copy.length - 1) copy[i + 1] = null;
            copy[i] = null;
            break;
         case "--discard-prev":
            if (i !== 0) copy[i - 1] = null;
            copy[i] = null;
            break;
         case "--double-next":
            if (i !== copy.length - 1) copy.splice(i + 1, 0, copy[i + 1]);
            copy[i] = null;
            break;
         case "--double-prev":
            copy[i] = null;
            if (i !== 0 && copy[i - 1] !== null) copy.splice(i, 0, copy[i - 1]);
            break;
      }      
   }

   return copy.filter(item => item !== null);  
}

module.exports = {
	transform
};
