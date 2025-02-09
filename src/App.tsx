import React from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { http } from "viem";
import { mainnet, sepolia } from "wagmi/chains";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const config = createConfig({
  chains: [sepolia, mainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">FlashUSDT DApp</h1>
          <ConnectButton />
        </div>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
