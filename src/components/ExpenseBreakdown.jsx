import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// 1. IMPORT CONTEXT HOOK (Remove the assets import)
import { useAppContext } from "../context/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ExpenseBreakdown = () => {
  // 2. GET LIVE DATA
  const { transactions } = useAppContext();

  // 3. FILTER AND AGGREGATE (With Number Safety)
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryTotals = expenses.reduce((acc, t) => {
    // If category is missing, group under "Others"
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
        label: "Expenses by Category ($)",
        data: dataValues,
        backgroundColor: [
          "#42224a", // appPurple
          "#8c6b96", // richer appPurpleLight
          "#6b7280", // deep gray
          "#22c55e", // green
          "#ef4444", // red
          "#eab308", // yellow
          "#3b82f6", // blue
          "#9ca3af", // mid gray
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
        text: "Expense Breakdown by Category",
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

  const totalExpense = dataValues.reduce((a, b) => a + b, 0);

  // 4. HANDLE EMPTY STATE
  if (expenses.length === 0) {
    return (
      <div className="bg-white shadow rounded-2xl p-5 border border-[--color-appPurpleLight] text-center text-gray-500">
        <p>No expenses recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-2xl p-5 flex flex-col md:flex-row gap-6 border border-[--color-appPurpleLight]">
      <div className="w-full md:w-1/2 mx-auto p-3 bg-white rounded-2xl shadow">
        <Pie data={data} options={options} />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-[--color-appPurple] mb-3">
          Details
        </h3>
        <ul className="flex flex-col gap-3">
          {labels.map((label, i) => (
            <li
              key={label}
              className="flex justify-between text-gray-700 border-b border-gray-100 pb-1"
            >
              <span className="capitalize">{label}</span>
              <span className="font-medium">
                ${dataValues[i].toLocaleString()}
              </span>
            </li>
          ))}
          <li className="flex justify-between text-[--color-appPurple] font-bold border-t border-gray-300 pt-3 mt-1">
            <span>Total</span>
            <span>${totalExpense.toLocaleString()}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
