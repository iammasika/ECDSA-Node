const secp= require("ethereum-cryptography/secp256k1");
const {toHex }= require("ethereum-cryptography/utils");
//generating our random variables
const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log('private key:',toHex(privateKey));
//generating our publick key
const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));


//-private key: 93ee46ee15fa50066b16f9b5aeda3de2afb4cc0ccfe7f8affdcfca30b6182e0d
//-public key: 02013ca90a18d17f6b7e334ac00353488107e84a019b169f84b66e277a316b1790


//-private key: 4ea8276f1a9f43c2f8229f85e0ddc1de5dceef521d81b26e3fa5abbf1e86812b
//-public key: 03742259801dd349900ccccf0b346e3a23c2b1dd6a9aeeee780f1f99cd0e5ddd5c

//-private key: 5b30244815cf06bf39a61afc99464fb9449ebc62fc2c0114026fc4945ddc4046
//-public key: 0271490f950700d3af1a89da41054cbea4bafd79f2d782853de930f773d7afd00f

//-private key: 13de23bfdea71f923488a06f2b5d0696a5ed1d67ff442043b16ec3ac305957c8
//-public key: 02c9cd4cc15439a900dd93efd870544656789e74f0ebc291d58ce885d4ea29ac34



