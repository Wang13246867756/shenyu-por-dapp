import { useEffect, useState } from 'react';
import { useContract } from '../hooks/useContract';
import { useBalance } from 'wagmi';
import { formatBNB } from '../utils/format';
import { Link } from 'react-router-dom';

export default function Home() {
  const { contract, address } = useContract();
  const { data: balance } = useBalance({ address });
  const [totalPool, setTotalPool] = useState('0');
  const [teamActivity, setTeamActivity] = useState(0);
  const [pendingReward, setPendingReward] = useState('0');
  const [nodeStatic, setNodeStatic] = useState('0');
  const [teamDynamic, setTeamDynamic] = useState('0');
  const [directCount, setDirectCount] = useState(0);
  const [aiStatus, setAiStatus] = useState('季度VIP');
  const [countdown] = useState('00:02:38');

  useEffect(() => {
    if (!contract || !address) return;
    const load = async () => {
      try {
        const stats = await (contract as any).getUserStats();
        setTeamActivity(stats[1].toNumber());
        setPendingReward(formatBNB(stats[2]));
        setNodeStatic(formatBNB(stats[3]));
        setDirectCount(stats[4].toNumber());
        setAiStatus(stats[5] ? '季度VIP' : '普通会员');
      } catch(e) { console.error(e); }
      const pool = await (contract as any).totalPool().catch(() => 0);
      setTotalPool(formatBNB(pool));
      setTeamDynamic(formatBNB(Math.random() * 2));
    };
    load();
  }, [contract, address]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-5 text-center">
          <div className="text-gray-400 text-sm">奖池总额</div>
          <div className="text-3xl font-bold text-yellow-400">{totalPool} <span className="text-base">BNB</span></div>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-gray-400 text-sm">我的余额</div>
          <div className="text-2xl font-bold">{balance ? formatBNB(balance.value) : '0'} BNB</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <div className="text-gray-400">团队活跃度</div>
          <div className="text-3xl font-bold">{teamActivity}</div>
        </div>
        <div className="glass-card p-5">
          <div className="text-gray-400">待分红</div>
          <div className="text-2xl font-bold text-green-400">{pendingReward} BNB</div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300">当前预测对局</span>
          <span className="text-red-400 font-mono">{countdown}</span>
        </div>
        <div className="flex gap-4">
          <Link to="/game" className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-center py-3 rounded-xl font-bold">YES 看涨</Link>
          <Link to="/game" className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-center py-3 rounded-xl font-bold">NO 看跌</Link>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="text-white/70 text-sm mb-2">账号数据</div>
        <div className="grid grid-cols-2 gap-y-3">
          <div><span className="text-gray-400">节点静态收益</span><br/><span className="text-xl font-semibold">{nodeStatic} BNB</span></div>
          <div><span className="text-gray-400">团队动态收益</span><br/><span className="text-xl font-semibold">{teamDynamic} BNB</span></div>
          <div><span className="text-gray-400">直推人数</span><br/><span className="text-xl font-semibold">{directCount}</span></div>
          <div><span className="text-gray-400">AI会员状态</span><br/><span className="text-purple-400 font-semibold">{aiStatus}</span></div>
        </div>
      </div>
    </div>
  );
}
