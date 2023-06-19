const ethUtil = require("ethereumjs-util");

const inSignature = "0xc2329d8e12311b8dfbc17960519e56b170a9ce209b23432430957912fb4dc56414c659d2b78a1c9b2898ca7f485ae94db9764034000878dabfa567c646d42f251c"; //user signed message
const message = "Example `Ian Masika ` message.";
const msgHex = ethUtil.bufferToHex(Buffer.from(message));
const msgBuffer = ethUtil.toBuffer(msgHex);
const msgHash = ethUtil.hashPersonalMessage(msgBuffer);

const signature = ethUtil.toBuffer(inSignature);

const sigParams = ethUtil.fromRpcSig(signature);
const publicKey = ethUtil.ecrecover(
            msgHash,
            sigParams.v,
            sigParams.r,
            sigParams.s
);

const sender = ethUtil.publicToAddress(publicKey);
const addr = ethUtil.bufferToHex(sender);

console.log(addr);
//now compare addr with user wallet address
//if("0x3a7dF9EcAF38aF2E3ce4A0589AEf0D58De36eA4e" === addr) console.log("valid");