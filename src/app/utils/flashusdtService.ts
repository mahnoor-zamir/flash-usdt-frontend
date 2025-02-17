
import { Contract, BrowserProvider, parseEther } from 'ethers';
import * as contractABI from '@/artifacts/contracts/FlashUSDT.json';
import { Signer, Provider } from 'ethers';
export const getProvider = async () => {
  try {
    // Check specifically for MetaMask
    if (!window.ethereum?.isMetaMask) {
      throw new Error('Please install MetaMask to use this application');
    }

    return new BrowserProvider(window.ethereum);
  } catch (error) {
    console.error('Error initializing provider:', error);
    throw error;
  }
};



export const getContract = async (signerOrProvider: Signer | Provider) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error('Contract address not found');
  }

  return new Contract(
    contractAddress,
    contractABI.abi,
    signerOrProvider
  );
};



export const checkExpiration = async (): Promise<boolean> => {
  try {
    if (!window.ethereum?.isMetaMask) {
      throw new Error('Please use MetaMask');
    }

    const provider = await getProvider();
    const contract = await getContract(provider);
    
    const isExpired = await contract.isExpired();
    console.log("Contract expiration status:", isExpired);
    
    
    return !isExpired;

  } catch (error) {
    console.error('Error checking expiration:', error);
    // Log specific error details
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    // Return false on error to prevent transactions
    return false;
  }
};
export const sendTransaction = async (recipient: string, amount: string) => {
  try {
    if (!window.ethereum?.isMetaMask) {
      throw new Error('Please use MetaMask');
    }
    
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = await getContract(signer);
    
    const tx = await contract.transfer(recipient, parseEther(amount));
    return await tx.wait();
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};