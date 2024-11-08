// App.jsx
import React, { useState } from 'react';

function App() {
  const [balance, setBalance] = useState(10000); 
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [history, setHistory] = useState([]);

  const predefinedAmounts = [100, 500, 1000, 5000];

  const handleWithdraw = (amount) => {
    if (balance - amount < 1) {
      alert("ไม่สามารถถอนเงินจนหมดบัญชีได้ จะต้องมีเงินเหลืออย่างน้อย 1 บาท");
      return;
    }
    if (amount > balance) {
      alert("ไม่สามารถถอนเงินเกินจํานวนที่มีอยู่ในบัญชีได้");
      return;
    }

    const newBalance = balance - amount;
    setBalance(newBalance);
    setHistory([...history, { amount, newBalance }]);
  };

  const handleCustomWithdraw = () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!isNaN(amount)) {
      handleWithdraw(amount);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ระบบถอนเงิน</h2>
          <p className="text-lg mb-6">
            ยอดเงินคงเหลือ: <span className="text-2xl font-bold text-green-500">{balance.toLocaleString()} บาท</span>
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleWithdraw(amount)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
              >
                ถอน {amount.toLocaleString()} บาท
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">จำนวนเงินที่ต้องการถอน:</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="ระบุจำนวนเงิน"
              className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleCustomWithdraw}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 w-full rounded-lg"
          >
            ถอนเงิน
          </button>
        </div>
        
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ประวัติการถอนเงิน</h2>
          <ul className="divide-y divide-gray-200">
            {history.length === 0 ? (
              <p className="text-gray-500 text-center">ยังไม่มีประวัติการถอน</p>
            ) : (
              history.map((entry, index) => (
                <li key={index} className="py-3 flex justify-between text-gray-700">
                  <span>ถอน {entry.amount.toLocaleString()} บาท</span>
                  <span>คงเหลือ: {entry.newBalance.toLocaleString()} บาท</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
