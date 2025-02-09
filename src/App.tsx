import { useState } from "react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import axios from "axios";

const { chains, publicClient } = configureChains([sepolia, mainnet], [publicProvider()]);
const config = createConfig({ autoConnect: true, publicClient });

function App() {
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const getBalance = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/balance");
      setBalance(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const executeFunction = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/execute", { amount });
      setMessage(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">FlashUSDT DApp</h1>
          <ConnectButton />
          
          <button onClick={getBalance} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
            Get Balance
          </button>
          <p>{balance && `Wallet Balance: ${balance} ETH`}</p>

          <input 
            type="number" 
            placeholder="Enter amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded mt-4"
          />
          <button 
            onClick={executeFunction}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          >
            Execute Function
          </button>
          <p>{message}</p>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
