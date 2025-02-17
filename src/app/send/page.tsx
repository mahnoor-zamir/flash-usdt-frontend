
"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { sendTransaction } from "../utils/flashusdtService";
import { checkExpiration } from '../utils/flashusdtService';
import { Alert } from '@/components/Alert';

const SendPage = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState(null);
  const [loadingState, setLoadingState] = useState<"idle" | "checking" | "sending" | "completed">("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { address, isConnected } = useAccount();

  const handleSend = async () => {
    try {
      setError(null);
      setSuccessMessage(null);
      setLoadingState("checking");

      if (!isConnected) {
        throw new Error("Please connect your wallet first!");
      }

      if (!recipient || !amount) {
        throw new Error("Please fill in all fields!");
      }
      console.log("good")
      const isActive = await checkExpiration();
    console.log("Token status:", isActive);
    
    if (!isActive) {
      setError('Flash USDT has expired! Cannot complete transfer.');
      setLoadingState("idle");
      return;
    }
      
      
      setLoadingState("sending");
      
      // Use the service function directly instead of going through API
      const tx = await sendTransaction(recipient, amount);
      setTxHash(tx.hash);
      setLoadingState("completed");
      setSuccessMessage("Transaction sent successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      setError(error.message || "Transaction failed!");
      setLoadingState("idle");
    }
  };

  const getLoadingText = () => {
    switch (loadingState) {
      case "checking": return "Checking token status...";
      case "sending": return "Sending transaction...";
      case "completed": return "Transaction completed!";
      default: return "Send USDT";
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-purple-800 md:px-12 bg-black/40 backdrop-blur-sm">
        <Link href="/" className="text-xl font-bold text-purple-400">
          Flash USDT
        </Link>
        <ConnectButton />
      </nav>

      <div className="max-w-md p-6 mx-auto mt-20 bg-gray-900 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-purple-500">Send Flash USDT</h2>
        {!isConnected ? (
          <div className="text-center">
            <p className="mb-4 text-gray-400">Please connect your wallet to continue</p>
            <ConnectButton />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-400">Connected Address</label>
                <input
                  type="text"
                  value={address}
                  disabled
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded opacity-50"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-400">Recipient Address</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  placeholder="0x..."
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-400">Amount (USDT)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  placeholder="0.0"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <button
                onClick={handleSend}
                disabled={loadingState !== "idle"}
                className="w-full py-3 font-bold transition-colors bg-purple-500 rounded hover:bg-purple-600 disabled:opacity-50"
              >
                {loadingState !== "idle" ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{getLoadingText()}</span>
                  </div>
                ) : (
                  "Send USDT"
                )}
              </button>
            </div>
            
            {loadingState === "completed" && txHash && (
              <div className="p-4 mt-4 border border-green-700 rounded bg-green-900/30">
                <p className="text-sm text-green-400">Transaction sent successfully!</p>
                <p className="mt-2 text-sm text-gray-400">Transaction Hash:</p>
                <p className="text-purple-400 break-all">{txHash}</p>
              </div>
            )}
          </>
        )}
      </div>
      
      {error && (
        <Alert 
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      
      {successMessage && (
        <Alert 
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
};

export default SendPage;