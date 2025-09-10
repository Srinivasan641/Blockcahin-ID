import React, { useState } from "react";
import { ethers } from "ethers";
import Identity from "./contracts/DigitalIdentity.json"; // ABI

// 👇 Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [did, setDid] = useState("");
  const [user, setUser] = useState(null);

  // Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("MetaMask not detected!");
    }
  };

  // Register Digital ID
  const register = async () => {
    if (!account) return alert("Connect wallet first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Identity.abi, signer);

    const tx = await contract.createIdentity(name, email, did);
    await tx.wait();
    alert("Digital ID registered ✅");
  };

  // Fetch Digital ID
  const getUser = async () => {
    if (!account) return alert("Connect wallet first!");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, Identity.abi, provider);
    const data = await contract.getIdentity(account);
    setUser({ name: data[0], email: data[1], did: data[2] });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔐 Blockchain Digital ID</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="DID" onChange={(e) => setDid(e.target.value)} />
      <button onClick={register}>Register</button>

      <h2>Fetch My ID</h2>
      <button onClick={getUser}>Get My Identity</button>
      {user && (
        <div>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>DID:</b> {user.did}</p>
        </div>
      )}
    </div>
  );
}

export default App;