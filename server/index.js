const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const ethUtil= require("ethereumjs-util");
const { Buffer }= require("buffer");

app.use(cors());
app.use(express.json());

const balances = {
  "0x3a7dF9EcAF38aF2E3ce4A0589AEf0D58De36eA4e": 100,
  "0x970a71b84106deb9c4e95723ac246c60fbdf8467": 100,
  "0xF5D5CC50D0233FF285658A081Ac3AEF71619Fdb8": 75
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", (req, res) => {
  //TODO: get a signature from the client-side application
  // recover the public address from the signature
  // The public address will now be the sender
  const {sign, amount,  recipient,  exampleMessage } = req.body;
  
 //const inSignature = sign;
 const msgHex = ethUtil.bufferToHex(Buffer.from(exampleMessage));
 const msgBuffer = ethUtil.toBuffer(msgHex);
 const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
 const signature = ethUtil.toBuffer(sign);
 const sigParams = ethUtil.fromRpcSig(signature);
 const publicKey = ethUtil.ecrecover(
             msgHash,
             sigParams.v,
             sigParams.r,
             sigParams.s
 );
 const sender1 = ethUtil.publicToAddress(publicKey);
 const address1 = ethUtil.bufferToHex(sender1);

  setInitialBalance(address1);
  //console.log(balances[address1]);

  setInitialBalance(recipient);
 // console.log(balances[recipient]);

  if (balances[address1] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[address1] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[address1] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address1) {
  if (!balances[address1]) {
    balances[address1] = 0;
  }
}
