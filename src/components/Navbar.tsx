import { Link, useLocation } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi';
import { shortenAddress } from '../utils/format';

export const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const location = useLocation();

  const links = [
    { to: '/', label: '首页' },
    { to: '/game', label: '预测' },
    { to: '/profile', label: '我的' },
    { to: '/ai-store', label: 'AI套餐' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
        <Link to="/" className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          神预AI
        </Link>
        <div className="flex gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`${location.pathname === link.to ? 'text-white' : 'text-gray-400'} hover:text-white`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          onClick={() => open()}
          className="bg-purple-600 px-4 py-1.5 rounded-full text-sm"
        >
          {isConnected ? shortenAddress(address!) : '连接钱包'}
        </button>
      </div>
    </nav>
  );
};
