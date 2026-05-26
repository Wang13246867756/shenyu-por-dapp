import { useEffect, useState } from 'react';
import { useContract } from '../hooks/useContract';
import { shortenAddress } from '../utils/format';

export default function Profile() {
  const { contract, address } = useContract();
  const [activity, setActivity] = useState(0);
  const [referralLink, setLink] = useState('');
  const [vipStatus, setVip] = useState(false);

  useEffect(() => {
    if (!contract || !address) return;
    (contract as any).getUserStats().then((stats: any) => {
      setActivity(stats[0].toNumber());
      setVip(stats[5]);
    });
    setLink(`${window.location.origin}?ref=${address}`);
  }, [contract, address]);

  const copy = () => {
    navigator.clipboard.writeText(referralLink);
    alert('已复制邀请链接');
  };

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="glass-card p-6">
        <div className="text-center mb-4">
          <div className="text-4xl">👤</div>
          <div className="text-xl font-bold mt-2">{shortenAddress(address || '')}</div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>我的活跃度</span>
            <span>{activity}</span>
          </div>
          <div className="flex justify-between">
            <span>AI会员</span>
            <span className="text-purple-400">{vipStatus ? '季度VIP' : '未开通'}</span>
          </div>
          <button onClick={copy} className="w-full bg-blue-600 py-2 rounded-xl mt-3">复制邀请链接</button>
        </div>
      </div>
    </div>
  );
}
