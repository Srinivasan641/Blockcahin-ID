// test-send.js
const Web3Import = require('web3');
const Web3 = Web3Import.default ? Web3Import.default : Web3Import;

const web3 = new Web3("http://127.0.0.1:8545");


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [{
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "nationalId",
          "type": "string"
        }
      ],
      "name": "IdentityCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_nationalId",
          "type": "string"
        }
      ],
      "name": "createIdentity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getIdentity",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "identities",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nationalId",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "createdAt",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }];

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function sendTx() {
  const accounts = await web3.eth.getAccounts();
  console.log("Accounts:", accounts);

  try {
    const receipt = await contract.methods
      .createIdentity("Alice", "alice@example.com", "1234567890")
      .send({ from: accounts[0], gas: 300000 });
    console.log("Transaction receipt:", receipt);

    console.log("IdentityCreated event data:", receipt.events.IdentityCreated.returnValues);

    res.json({ message: "Identity created successfully", tx: receipt.transactionHash });


  } catch (err) {
    console.error("Error sending transaction:", err);
  }
}

sendTx();
