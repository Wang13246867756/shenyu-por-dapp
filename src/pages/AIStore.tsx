import { useState } from 'react';

export default function AIStore() {
  const [plan, setPlan] = useState('quarterly');
  const plans = {
    monthly: { price: 0.5, bnb: 0.5 },
    quarterly: { price: 1.2, bnb: 1.2 },
    yearly: { price: 4, bnb: 4 }
  };

  const buy = () => {
    alert(`购买${plan}套餐，支付${plans[plan as keyof typeof plans].bnb} BNB`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-center mb-4">AI智能预测套餐</h2>
        <div className="space-y-3">
          {Object.entries(plans).map(([key, val]) => (
            <div
              key={key}
              onClick={() => setPlan(key)}
              className={`p-4 rounded-xl cursor-pointer ${plan === key ? 'bg-purple-600/30 border border-purple-500' : 'bg-white/5'}`}
            >
              <div className="flex justify-between">
                <span className="font-bold capitalize">{key}</span>
                <span>{val.bnb} BNB</span>
              </div>
            </div>
          ))}
          <button onClick={buy} className="w-full bg-purple-600 py-3 rounded-xl mt-4">立即购买</button>
        </div>
      </div>
    </div>
  );
}
