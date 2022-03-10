const { NotImplementedError } = require('../extensions/index.js');

/**
 * Calculate turns number and time (in seconds) required
 * to solve puzzle
 * 
 * @param {Number} disks number of disks
 * @param {Number} turnsSpeed speed (in turns/hour)
 * @return {Object} object with props turns (number of turns)
 * and seconds (time in seconds)
 *
 * @example
 * 
 * calculateHanoi(9, 4308) => { turns: 511, seconds: 427 }
 *
 */
let rods;
let turns = 0;

function calculateHanoi(disksNumber, turnsSpeed) {
	rods = [[], [], []];

	for(let i = 1; i < disksNumber + 1; i++) {
		rods[0].push(i);
	}

	/* uncomment rows below if you need to see an algorithm of moving */

	// console.log("from: " + rods[0]);
	// console.log("temp: " + rods[1]);
	// console.log("to: " + rods[2]);

	// hanoi(disksNumber);

	// return { turns: turns, seconds: Math.floor(turns / turnsSpeed * 3600) };

	return { 
		turns: 2 ** disksNumber - 1, 
		seconds: Math.floor((2 ** disksNumber - 1) / turnsSpeed * 3600) 
	};
}

function hanoi(n, from = "from", temp = "temp", to = "to") {
	if (n > 0) {
		hanoi(n - 1, from, to, temp);
		
		console.log(`Move disk from rod ${from} to rod ${to} `);
		
		move(from, to);

		console.log("from: " + rods[0]);
		console.log("temp: " + rods[1]);
		console.log("to: " + rods[2]);

		hanoi(n - 1, temp, from, to);
	} else {
		return;
	}
}

function move(from, to) {
	let fromArr, toArr;

	if (from === "from") {
		fromArr = 0;
	} else if(from === "temp") {
		fromArr = 1;
	} else {
		fromArr = 2;
	}

	if (to == "from") {
		toArr = 0;
	} else if(to == "temp") {
		toArr = 1;
	} else {
		toArr = 2;
	}

	rods[toArr].push(rods[fromArr].pop());

	turns++;
}


module.exports = {
	calculateHanoi
};
