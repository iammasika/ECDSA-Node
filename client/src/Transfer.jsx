import { useState } from "react";
import server from "./server";
import { Buffer } from "buffer";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  
  const exampleMessage = 'Example `Ian Masika ` message.';
  //Th message needs to converted first to hex form
  const  msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
      //This variable is used to request permission
     const account=  await window.ethereum.request({                     
    method: "eth_requestAccounts",
  });
       
       //owner Account signing the message
       const from = account[0]; 
      const sign = await window.ethereum.request({
        method: 'personal_sign',
        params: [msg, from],
      });
     
    
   
    try {
 // the signed signature & message will b send back to server for verification
     const {
        data: { balance },
      } = await server.post(`send`, {
        
        //the signature will be sender then transformed back to address in server
        sign, 
        amount: parseInt(sendAmount),
        recipient,
        exampleMessage
      });
      setBalance(balance);
    } catch (ex) {
    //  alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
