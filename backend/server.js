const express = require('express');
const Web3Import = require('web3');
const Web3 = Web3Import.default || Web3Import;

const app = express();
app.use(express.json());

const web3 = new Web3("http://127.0.0.1:8545");

// Your contract address & ABI here
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
    } ];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// POST endpoint to create identity
app.post('/create-identity', async (req, res) => {
  const { name, email, nationalId, fromAddress } = req.body;
  try {
    const receipt = await contract.methods
      .createIdentity(name, email, nationalId)
      .send({ from: fromAddress, gas: 300000 });
    console.log("Transaction successful:", receipt.transactionHash);
    res.json({ message: "Identity created successfully", tx: receipt.transactionHash });
  } catch (error) {
    console.error("Smart contract error:", error);
    res.status(500).json({ error: "Failed to create identity" });
  }
});

// GET endpoint to retrieve identity by address
app.get('/get-identity/:address', async (req, res) => {
  const userAddress = req.params.address;

  try {
    const identity = await contract.methods.getIdentity(userAddress).call();

    // Convert timestamp to readable date
    const timestamp = identity[3];
    const date = new Date(timestamp * 1000);
    const readableDate = date.toLocaleString();

    res.json({
      name: identity[0],
      email: identity[1],
      nationalId: identity[2],
      createdAt: readableDate,
    });
  } catch (error) {
    console.error("Error fetching identity:", error);
    res.status(500).json({ error: "Failed to fetch identity" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

