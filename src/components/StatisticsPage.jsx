export default function StatisticsPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-5 flex flex-col gap-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-[--color-appPurple]">Statistics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-2xl p-4 text-center border border-[--color-appPurpleLight]">
          <p className="text-gray-500 text-sm">Total Income</p>
          <h2 className="text-2xl font-bold text-green-600">$2,350</h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 text-center border border-[--color-appPurpleLight]">
          <p className="text-gray-500 text-sm">Total Expense</p>
          <h2 className="text-2xl font-bold text-red-500">$1,820</h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 text-center border border-[--color-appPurpleLight]">
          <p className="text-gray-500 text-sm">Balance</p>
          <h2 className="text-2xl font-bold text-[--color-appPurple]">$530</h2>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 text-center border border-[--color-appPurpleLight]">
          <p className="text-gray-500 text-sm">Transactions</p>
          <h2 className="text-2xl font-bold text-[--color-appPurple]">28</h2>
        </div>
      </div>

      {/* Chart + Breakdown Section */}
      <div className="bg-white shadow rounded-2xl p-5 flex flex-col md:flex-row gap-6 border border-[--color-appPurpleLight]">
        {/* Chart placeholder */}
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-[--color-appPurpleLight] rounded-xl p-6">
          <p className="text-gray-500 text-sm">[ Pie / Bar Chart Placeholder ]</p>
          <p className="text-gray-400 text-xs mt-2">You can replace this with Recharts later</p>
        </div>

        {/* Category List */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[--color-appPurple] mb-3">Category Breakdown</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between text-gray-600">
              <span>Food</span>
              <span>$420 (38%)</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Bills</span>
              <span>$280 (25%)</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Transport</span>
              <span>$150 (13%)</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Entertainment</span>
              <span>$90 (8%)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-[--color-appPurple] text-white p-5 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-1">Insights</h3>
        <p className="text-sm text-[--color-appPurpleLight]">
          You spent <span className="font-semibold text-white">25% more</span> this week than last week.
          Try reducing transport and food expenses.
        </p>
      </div>
    </div>
  );
}
