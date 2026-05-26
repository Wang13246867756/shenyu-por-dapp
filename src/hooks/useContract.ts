import { useAccount, useWalletClient } from 'wagmi'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import DivineABI from '../abis/DivinePrediction.json'

export const CONTRACT_ADDR = import.meta.env.VITE_CONTRACT_ADDRESS;

export const useContract = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const signer = useMemo(() => {
    if (!walletClient) return null;
    try {
      const provider = new ethers.providers.Web3Provider(walletClient.transport);
      return provider.getSigner();
    } catch(e) {
      console.error(e);
      return null;
    }
  }, [walletClient]);
  
  const contract = useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(CONTRACT_ADDR, DivineABI.abi, signer);
  }, [signer]);
  
  return { contract, address, signer };
};
