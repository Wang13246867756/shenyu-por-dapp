import { useState } from 'react';
import { useContract, CONTRACT_ADDR } from '../hooks/useContract';
import { parseBNB } from '../utils/format';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import DivineABI from '../abis/DivinePrediction.json';

export default function Game() {
  const { signer } = useContract();
  const { data: walletClient } = useWalletClient();
  const [amount, setAmount] = useState('');
  const [side, setSide] = useState<'yes'|'no'|null>(null);
  const [loading, setLoading] = useState(false);

  const handleBet = async () => {
    if (!signer || !walletClient || !side || !amount) return alert('请完整填写');
    setLoading(true);
    try {
      const contractWithSigner = new ethers.Contract(CONTRACT_ADDR, DivineABI.abi, signer);
      const val = parseBNB(amount);
      const tx = await contractWithSigner.bet(1, side === 'yes', val, { value: val });
      await tx.wait();
      alert('下注成功！');
    } catch(e) { console.error(e); alert('失败'); }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-5">
      <div className="glass-card p-6 text-center">
        <h2 className="text-2xl font-bold">BTC 1分钟涨跌</h2>
        <div className="text-4xl font-mono my-4">$64,521</div>
        <div className="flex gap-4 mb-6">
          <button onClick={() => setSide('yes')} className={`flex-1 py-3 rounded-xl ${side === 'yes' ? 'bg-green-600' : 'bg-white/10'}`}>看涨 YES</button>
          <button onClick={() => setSide('no')} className={`flex-1 py-3 rounded-xl ${side === 'no' ? 'bg-red-600' : 'bg-white/10'}`}>看跌 NO</button>
        </div>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="下注 BNB" className="w-full bg-black/40 border border-white/20 rounded-xl p-3 mb-4" />
        <button onClick={handleBet} disabled={loading} className="w-full bg-purple-600 py-3 rounded-xl font-bold">确认下注</button>
      </div>
    </div>
  );
}
