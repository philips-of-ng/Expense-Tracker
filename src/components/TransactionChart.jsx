import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// 1. IMPORT CONTEXT HOOK
import { useAppContext } from "../context/AppContext";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const TransactionChart = () => {
  // 2. GET LIVE DATA
  const { transactions } = useAppContext();

  // 3. CALCULATE LIVE TOTALS
  // We use Number() to ensure safety in case Firestore sends a string
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Total Amount ($)",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4ade80", "#f87171"], // green for income, red for expense
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income vs Expense Overview",
        font: { size: 18 },
      },
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white shadow rounded-2xl p-5 flex flex-col md:flex-row gap-6 border border-[--color-appPurpleLight] mb-6">
      <div className="w-full md:w-1/2 mx-auto p-3 bg-white rounded-2xl shadow">
        <Bar data={data} options={options} />
      </div>

      {/* Category List */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-[--color-appPurple] mb-3">
          Breakdown
        </h3>
        <ul className="flex flex-col gap-3">
          <li className="flex justify-between text-gray-600 border-b pb-2">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div> Income
            </span>
            <span className="font-bold text-green-600">
              ${totalIncome.toLocaleString()}
            </span>
          </li>

          <li className="flex justify-between text-gray-600 border-b pb-2">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div> Expense
            </span>
            <span className="font-bold text-red-500">
              ${totalExpense.toLocaleString()}
            </span>
          </li>

          <li className="flex justify-between text-gray-800 pt-2">
            <span className="font-bold">Net Balance</span>
            <span
              className={`font-bold ${
                totalIncome - totalExpense >= 0
                  ? "text-appPurple"
                  : "text-red-600"
              }`}
            >
              ${(totalIncome - totalExpense).toLocaleString()}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TransactionChart;
