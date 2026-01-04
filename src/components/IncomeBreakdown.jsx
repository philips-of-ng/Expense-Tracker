import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// 1. IMPORT CONTEXT (Replaces static assets)
import { useAppContext } from "../context/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const IncomeBreakdown = () => {
  // 2. GET LIVE DATA
  const { transactions } = useAppContext();

  // Filter only income transactions
  const incomes = transactions.filter((t) => t.type === "income");

  // Group income by category (With Number Safety)
  const categoryTotals = incomes.reduce((acc, t) => {
    // Fallback for missing category
    const category = t.category || "Others";
    // Ensure amount is a number
    const amount = Number(t.amount);

    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const data = {
    labels,
    datasets: [
      {
        label: "Income by Source ($)",
        data: dataValues,
        backgroundColor: [
          "#42224a", // appPurple
          "#8c6b96", // appPurpleLight
          "#6b7280", // deep gray
          "#22c55e", // green
          "#3b82f6", // blue
          "#eab308", // yellow
          "#9ca3af", // mid gray
          "#ef4444", // red
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income Breakdown by Source",
        font: { size: 18 },
        color: "#42224a",
      },
      legend: {
        position: "right",
        labels: {
          color: "#42224a",
          font: { size: 14 },
        },
      },
    },
  };

  const totalIncome = dataValues.reduce((a, b) => a + b, 0);

  // 3. HANDLE EMPTY STATE (Prevents empty chart ugliness)
  if (incomes.length === 0) {
    return (
      <div className="bg-white shadow rounded-2xl p-5 border border-[--color-appPurpleLight] text-center text-gray-500">
        <p>No income recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-2xl p-5 flex flex-col md:flex-row gap-6 border border-[--color-appPurpleLight]">
      {/* Chart */}
      <div className="max-w-md mx-auto p-3 bg-white rounded-2xl shadow">
        <Pie data={data} options={options} />
      </div>

      {/* Context */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-[--color-appPurple] mb-3">
          Context
        </h3>
        <ul className="flex flex-col gap-3">
          {labels.map((label, i) => (
            <li key={label} className="flex justify-between text-gray-700">
              <span className="capitalize">{label}</span>
              <span>${dataValues[i].toFixed(2)}</span>
            </li>
          ))}
          <li className="flex justify-between text-[--color-appPurple] font-semibold border-t border-gray-300 pt-2">
            <span>Total</span>
            <span>${totalIncome.toFixed(2)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IncomeBreakdown;
