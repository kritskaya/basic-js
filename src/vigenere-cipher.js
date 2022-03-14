const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
	constructor(direct = true) {
		this.direct = direct;
	}
	encrypt(message, key) {
		if (!message || !key) throw new Error("Incorrect arguments!");

		const keyMessage = this.getKeyMessage(message, key);
		
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let encoded = [];
		let notAlphabet = 0;

		message.split("").forEach((char, index) => {
			let mIndex = alphabet.indexOf(char.toUpperCase());
			let kIndex = alphabet.indexOf(keyMessage[index - notAlphabet].toUpperCase());
			
			if (mIndex !== - 1) {
				encoded.push(alphabet[(mIndex + kIndex) % 26]);
			} else {
				encoded.push(message[index]);
				notAlphabet++;
			}
		});

		return this.direct ? encoded.join("") : encoded.reverse().join("");
	}
	decrypt(encryptedMessage, key) {
		if (!encryptedMessage || !key) throw new Error("Incorrect arguments!");

		const keyMessage = this.getKeyMessage(encryptedMessage, key);

		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let decoded = [];
		let notAlphabet = 0;

		encryptedMessage.split("").forEach((char, index) => {
			let eIndex = alphabet.indexOf(char.toUpperCase());
			let kIndex = alphabet.indexOf(keyMessage[index - notAlphabet].toUpperCase());

			if (eIndex !== - 1) {
				decoded.push(alphabet[(eIndex - kIndex) % 26] || alphabet[26 + eIndex - kIndex]);
			} else {
				decoded.push(encryptedMessage[index]);
				notAlphabet++;
			}
		});

		return this.direct ? decoded.join("") : decoded.reverse().join("");
	}
	getKeyMessage(message, key) {
		return key.repeat(Math.ceil(message.length / key.length))
					 .slice(0, message.length);
	}
}

module.exports = {
	VigenereCipheringMachine
};
