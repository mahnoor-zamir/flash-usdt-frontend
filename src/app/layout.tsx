"use client";
import { WagmiProvider, createConfig } from 'wagmi';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia } from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider }
 from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const hardhat = {
  id: 31337,
  name: "Ethereum Testnet",
  network: "hardhat",
  nativeCurrency: {
    symbol: "ETH",
  },
  rpcUrls: {
    default: "http://127.0.0.1:8545",
  },
};

// Create a new QueryClient instance
// const queryClient = new QueryClient();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const config = createConfig({
  chains: [sepolia, mainnet, hardhat],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}