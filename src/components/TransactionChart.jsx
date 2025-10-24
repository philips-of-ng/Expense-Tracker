// src/components/TransactionChart.jsx
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
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-2xl shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;

