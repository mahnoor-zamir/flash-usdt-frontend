import { Wallet, Contract, JsonRpcProvider, parseEther } from 'ethers';
import * as contractABI from '@/artifacts/contracts/FlashUSDT.json';
import * as dotenv from 'dotenv';

dotenv.config();

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!rpcUrl || !privateKey || !contractAddress) {
  throw new Error("Missing environment variables in .env file!");
}

const provider = new JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKey, provider);
const contract = new Contract(contractAddress, contractABI.abi, wallet);

export const getOwner = async (): Promise<string> => {
  return await contract.owner();
};

export const getContractBalance = async (): Promise<string> => {
  const balance = await contract.balanceOf(wallet.address);
  return balance.toString();
};

export const sendTransaction = async (recipient: string, amount: string, sender: string, senderPrivateKey: string): Promise<void> => {
  const senderWallet = new Wallet(senderPrivateKey, provider);
  const connectedContract = contract.connect(senderWallet);
  const tx = await connectedContract.transfer(recipient, parseEther(amount));
  await tx.wait();
};