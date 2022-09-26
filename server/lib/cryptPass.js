import { pbkdf2, randomBytes } from 'node:crypto'
import util from 'util'

const cryptoPbkdf2 = util.promisify(pbkdf2);

let hashLength = 64;
let iterations = 100000;

let cryptObj = {
	async passCrypt(pass){
		let salt = randomBytes(hashLength).toString('base64');
		let crypted = await cryptoPbkdf2(pass, 'salt', iterations, hashLength, 'sha512')
		return crypted.toString('hex')
	}		
}

export default cryptObj

