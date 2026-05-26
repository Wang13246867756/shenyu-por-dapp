import { ethers } from 'ethers';
export const formatBNB = (val: ethers.BigNumberish) => ethers.utils.formatEther(val);
export const parseBNB = (val: string) => ethers.utils.parseEther(val);
export const shortenAddress = (addr: string) => addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : '';
