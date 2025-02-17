"use client";
import React from "react";

import { ConnectButton} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from 'next/navigation';


const App = () => {
  const router = useRouter();

  return (
   
    <div className="relative min-h-screen overflow-hidden text-white bg-black">
    {/* Grid Lines Background */}
    <div className="absolute inset-0 z-0 opacity-10">
      <div className="grid w-full h-full grid-cols-12 grid-rows-12">
        {Array.from({ length: 12 }).map((_, index) => (
          <div 
            key={`col-${index}`} 
            className="h-full border-r border-purple-500"
          />
        ))}
        {Array.from({ length: 12 }).map((_, index) => (
          <div 
            key={`row-${index}`} 
            className="w-full border-b border-purple-500"
          />
        ))}
      </div>
    </div>

    {/* Navbar */}
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-purple-800 md:px-12 backdrop-blur-sm bg-black/40">
      <div className="text-xl font-bold text-purple-400 group">
        <span className="relative inline-block">
          Flash USDT
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </span>
      </div>
      <div className="flex space-x-4">
        <button className="relative px-4 py-2 overflow-hidden text-purple-400 border border-purple-500 rounded-md group">
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact Us</span>
          <span className="absolute inset-0 w-0 transition-all duration-300 bg-purple-500 group-hover:w-full"></span>
        </button>
        <ConnectButton />
      </div>
    </nav>

    {/* Hero Section */}
    <section className="relative z-10 py-32 text-center bg-gradient-to-b from-black to-gray-900">
      {/* Animated Background Effect */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 left-0 w-full opacity-30"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradient)"
            d="M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,266.7C840,277,960,267,1080,250.7C1200,235,1320,213,1380,202.7L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"
          >
            <animate 
              attributeName="d" 
              values="
                M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,266.7C840,277,960,267,1080,250.7C1200,235,1320,213,1380,202.7L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z;
                M0,192L60,202.7C120,213,240,235,360,224C480,213,600,171,720,165.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z;
                M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,266.7C840,277,960,267,1080,250.7C1200,235,1320,213,1380,202.7L1440,192V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z
              "
              dur="15s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#7B2CBF" offset="0%" />
              <stop stopColor="#3C096C" offset="100%" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Content with Animated Text */}
      <div className="relative z-10">
        <h1 className="relative inline-block text-6xl font-bold tracking-wide">
          Introducing 
          <span className="relative inline-block ml-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
            Flash USDT
            <span className="absolute border rounded-lg -inset-1 border-purple-500/30 blur opacity-30 animate-pulse"></span>
          </span>
        </h1>

        {/* Motto with Typing Effect */}
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
          <span className="inline-block pr-1 overflow-hidden text-xl font-semibold text-purple-400 border-r-2 border-purple-400 typing-text whitespace-nowrap">
            Fast. Invisible. Temporary.
          </span>
        </p>

        <p className="max-w-2xl mx-auto mt-3 text-gray-400 animate-fade-in">
          A temporary USDT-like token that appears in wallets, can be transferred, but disappears after a set time.
        </p>

        <div className="mt-8 space-x-4">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              mounted,
            }) => {
              return (
                <div
                  {...(!mounted && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!mounted || !account || !chain) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="relative px-6 py-3 overflow-hidden text-white bg-purple-500 rounded-md shadow-lg group"
                        >
                          <span className="relative z-10">Connect Wallet</span>
                          <span className="absolute inset-0 w-full h-full transition-transform duration-300 transform translate-y-full bg-purple-700 group-hover:translate-y-0"></span>
                        </button>
                      );
                    }
                    return (
                      <button
                        onClick={() => router.push('/send')}
                        className="relative px-6 py-3 overflow-hidden text-white bg-purple-500 rounded-md shadow-lg group"
                      >
                        <span className="relative z-10">Send Tokens</span>
                        <span className="absolute inset-0 w-full h-full transition-transform duration-300 transform translate-y-full bg-purple-700 group-hover:translate-y-0"></span>
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          <button className="relative px-6 py-3 mt-4 overflow-hidden text-gray-300 border border-gray-500 rounded-md group">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Learn More</span>
            <span className="absolute inset-0 w-full h-full transition-transform duration-300 transform translate-y-full bg-gray-700 group-hover:translate-y-0"></span>
          </button>
        </div>
      </div>
    </section>

    {/* Key Features Section with Animated Cards */}
    <section className="relative z-10 py-16 bg-black">
      <h2 className="text-3xl font-bold text-center animate-fade-in">
        <span className="relative inline-block">
          Key Features of Flash USDT
          <span className="absolute h-1 bg-purple-500 rounded-full -bottom-2 left-1/4 right-1/4"></span>
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-6 px-6 mt-8 md:grid-cols-2 lg:grid-cols-4 md:px-12">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-6 text-center transition-all duration-300 transform bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-500 hover:-translate-y-2 group"
            style={{ 
              animationDelay: `${index * 150}ms`, 
              animation: 'fade-in-up 0.6s ease-out both'
            }}
          >
            <div className="mb-4 text-3xl text-purple-400 transition-transform duration-300 transform group-hover:scale-110">{feature.icon}</div>
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    <style jsx global>{`
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      
      @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: #a78bfa; }
      }
      
      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      
      .typing-text {
        animation: typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite;
        width: 0;
        animation-fill-mode: forwards;
      }
    `}</style>
  </div>
  );
};

const features = [
  { icon: "✨", title: "Auto-Appearing", description: "Flash USDT appears in wallets automatically." },
  { icon: "🔄", title: "Transferable", description: "Can be sent between wallets before expiration." },
  { icon: "⏳", title: "Timed Expiry", description: "Automatically disappears after a set time." },
  { icon: "💸", title: "Gas Efficient", description: "Uses minimal ETH for transactions." },
];

export default App;