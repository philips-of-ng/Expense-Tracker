import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

import transactions from '../assets/assets';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const TransactionChart = () => {
  // Separate and sum income and expenses
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Total Amount ($)',
        data: [totalIncome, totalExpense],
        backgroundColor: ['#4ade80', '#f87171'], // green for income, red for expense
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Income vs Expense Overview', font: { size: 18 } },
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white shadow rounded-2xl p-5 flex flex-col md:flex-row gap-6 border border-[--color-appPurpleLight]">

      <div className="max-w-md mx-auto p-3 bg-white rounded-2xl shadow">
        <Bar data={data} options={options} />
      </div>

      {/* Category List */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-[--color-appPurple] mb-3">Context</h3>
        <ul className="flex flex-col gap-3">
          <li className="flex justify-between text-gray-600">
            <span>Income</span>
            <span>${totalIncome}</span>
          </li>
          <li className="flex justify-between text-gray-600">
            <span>Expense</span>
            <span>${Number(totalExpense.toFixed(2))}</span>
          </li>
          <li className="flex justify-between text-gray-600">
            <span>Net Balance</span>
            <span>${totalIncome - totalExpense}</span>
          </li>
          
        </ul>
      </div>
    </div>

  );
};

export default TransactionChart;

