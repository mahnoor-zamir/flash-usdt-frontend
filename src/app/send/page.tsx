"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";

const SendPage = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const sendTransaction = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
  
    try {
      setLoading(true);
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, amount, sender: window.ethereum.selectedAddress, privateKey: 'YOUR_PRIVATE_KEY' }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setTxHash(data.txHash);
        alert("Transaction sent!");
      } else {
        alert(`Transaction failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={`col-${index}`} className="border-r border-purple-500 h-full" />
          ))}
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={`row-${index}`} className="border-b border-purple-500 w-full" />
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 border-b border-purple-800 bg-black/40 backdrop-blur-sm z-10">
        <Link href="/" className="text-xl font-bold text-purple-400 group">
          <span className="relative inline-block">
            Flash USDT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>
      </nav>

      {/* Transaction Form */}
      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800 w-96 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-purple-500 mb-6">Send USDT</h2>

        <div className="mb-4">
          <label className="block text-gray-400">Token Name</label>
          <input
            type="text"
            value="Tether USD"
            disabled
            className="w-full p-2 bg-gray-800 text-white rounded mt-1 border border-gray-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Symbol</label>
          <input
            type="text"
            value="USDT"
            disabled
            className="w-full p-2 bg-gray-800 text-white rounded mt-1 border border-gray-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x1234..."
            className="w-full p-2 bg-gray-800 text-white rounded mt-1 border border-gray-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400">Amount (USDT)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 bg-gray-800 text-white rounded mt-1 border border-gray-700 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={sendTransaction}
          className="w-full p-3 bg-purple-500 rounded text-white font-bold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          disabled={loading}
        >
          {loading ? "Processing..." : "Send Transaction"}
        </button>

        {txHash && (
          <p className="mt-4 text-green-400 text-center">
            Transaction Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View on Etherscan
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default SendPage;
