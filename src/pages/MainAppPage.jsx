import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";

import TransactionChart from "../components/TransactionChart";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import IncomeBreakdown from "../components/IncomeBreakdown";

const MainAppPage = () => {
  // 1. IMPORT REAL DATA FROM CONTEXT
  const { userData } = useAuth();
  const {
    tab,
    setTab,
    uploadNewExpense,
    uploading,
    transactions, // <--- REAL LIVE DATA
  } = useAppContext();

  // 2. HELPER: GET ICON BASED ON CATEGORY
  // (Since icons aren't saved in the DB, we map them here)
  const getCategoryIcon = (category) => {
    if (!category) return "bx bx-purchase-tag";
    switch (category.toLowerCase()) {
      case "groceries":
        return "bx bx-cart";
      case "bills":
        return "bx bx-bulb";
      case "shopping":
        return "bx bx-shopping-bag";
      case "transport":
        return "bx bx-car";
      case "entertainment":
        return "bx bx-movie";
      case "health":
        return "bx bx-plus-medical";
      case "education":
        return "bx bx-book";
      case "subscriptions":
        return "bx bx-wifi";
      case "salary":
        return "bx bx-money";
      case "freelance":
        return "bx bx-laptop";
      case "business":
        return "bx bx-briefcase";
      case "investment":
        return "bx bx-line-chart";
      case "gift":
        return "bx bx-gift";
      default:
        return "bx bx-purchase-tag";
    }
  };

  // 3. DATE HELPER FUNCTIONS
  const convertDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  function getTodayTransactions(data) {
    if (!data) return [];
    const today = new Date();
    return data.filter((t) => {
      const d = new Date(t.date); // Works with ISO strings
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }

  function getThisWeekTransactions(data) {
    if (!data) return [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return data.filter((t) => {
      const d = new Date(t.date);
      return d >= startOfWeek && d < endOfWeek;
    });
  }

  function getThisMonthTransactions(data) {
    if (!data) return [];
    const today = new Date();
    return data.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }

  // 4. CALCULATE TOTALS (LIVE)
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const calculatedBalance = totalIncome - totalExpense;

  // 5. SORTING & FILTERING STATE
  const [showingTrans, setShowingTrans] = useState("Today");

  // Pass the live 'transactions' array to the filters
  const todayTransactions = getTodayTransactions(transactions);
  const thisWeekTransactions = getThisWeekTransactions(transactions);
  const thisMonthTransactions = getThisMonthTransactions(transactions);

  // 6. RECEIPT SEARCH STATE
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }
    const results = transactions.filter((tx) =>
      [tx.title, tx.description, tx.category].some(
        (field) => field && field.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFiltered(results);
  }, [query, transactions]);

  // 7. NEW TRANSACTION FORM STATE
  const [expOrInc, setExpOrInc] = useState("exp");
  const image1_ref = useRef();
  const image2_ref = useRef();
  const image1_inc_ref = useRef(null);
  const image2_inc_ref = useRef(null);

  const [expenseInfo, setExpenseInfo] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today
    category: "",
    description: "",
    amount: "",
    image1: null,
    image2: null,
  });

  const [incomeInfo, setIncomeInfo] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    description: "",
    amount: "",
    image1: null,
    image2: null,
  });

  return (
    <div className="flex flex-col justify-between h-screen bg-[#f8f7fc]">
      {/* ================= HOME TAB ================= */}
      {tab === "home" ? (
        <div className="grow p-2 pb-20 overflow-hidden flex flex-col">
          {/* DASHBOARD CARD */}
          <div className="w-full bg-appPurple border-4 rounded-xl my-4 text-white p-3 shrink-0">
            <div className="flex justify-between">
              <div>
                <p>
                  Hello, <b>{userData?.name}</b>
                </p>
                <h1 className="text-4xl font-bold">
                  ${calculatedBalance.toLocaleString()}
                </h1>
              </div>
              <h2 className="text-center">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
            </div>

            <div className="w-full p-4 flex justify-between align-baseline mt-2">
              <div className="text-center">
                <span className="text-amber-400 font-bold">Income</span>
                <p className="text-xl">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <span className="text-red-300 font-bold">Expense</span>
                <p className="text-xl">${totalExpense.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* FILTER BUTTONS */}
          <div className="w-full flex justify-between align-middle gap-3 py-2 bg-white shrink-0">
            <button
              onClick={() => setShowingTrans("Today")}
              className={`${
                showingTrans == "Today" ? "bg-appPurpleLight" : "bg-gray-200"
              } flex-1 p-2 rounded-3xl`}
            >
              Today
            </button>
            <button
              onClick={() => setShowingTrans("Weekly")}
              className={`${
                showingTrans == "Weekly" ? "bg-appPurpleLight" : "bg-gray-200"
              } flex-1 p-2 rounded-3xl`}
            >
              Weekly
            </button>
            <button
              onClick={() => setShowingTrans("Monthly")}
              className={`${
                showingTrans == "Monthly" ? "bg-appPurpleLight" : "bg-gray-200"
              } flex-1 p-2 rounded-3xl`}
            >
              Monthly
            </button>
          </div>

          <h1 className="my-2 font-bold text-gray-700">
            {showingTrans} Transactions
          </h1>

          {/* TRANSACTION LIST */}
          <div className="overflow-y-auto grow">
            {showingTrans == "Today" && todayTransactions.length === 0 && (
              <p className="text-gray-400 text-center mt-4">
                No transactions today
              </p>
            )}

            {(showingTrans == "Today"
              ? todayTransactions
              : showingTrans == "Weekly"
              ? thisWeekTransactions
              : thisMonthTransactions
            ).map((transaction, index) => (
              <div
                key={transaction.id || index}
                className="one-trans flex justify-between align-middle py-3.5 border-b border-gray-100"
              >
                <div className="flex align-middle justify-start gap-2.5 min-w-0">
                  <div className="min-w-14 min-h-14 bg-appPurpleLight rounded-full flex justify-center items-center">
                    <i
                      className={`${getCategoryIcon(
                        transaction.category
                      )} text-appPurple text-2xl`}
                    ></i>
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <p className="text-lg font-semibold truncate capitalize">
                      {transaction.category || transaction.title}
                    </p>
                    <p className="text-gray-500 text-sm truncate">
                      {transaction.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`text-xl font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : /* ================= RECEIPTS TAB ================= */
      tab === "receipts" ? (
        <div className="grow p-2 pb-20 flex flex-col h-screen">
          <div className="flex w-full justify-between bg-white items-center py-2 shrink-0">
            <h3 className="text-appPurple text-xl font-bold w-full text-center">
              Receipts
            </h3>
          </div>

          <div className="w-full flex items-center justify-between my-4 bg-gray-100 rounded-3xl h-12 px-4 shrink-0">
            <input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none"
              type="text"
            />
            <i className="bx bx-search text-2xl text-gray-500"></i>
          </div>

          <div className="overflow-y-auto grow">
            {(query ? filtered : transactions).map((transaction, index) => (
              <div
                key={index}
                className="one-receipt flex justify-between my-3 p-2 bg-white shadow-sm rounded-xl"
              >
                <div className="flex justify-start gap-3 min-w-0">
                  {/* Show Image Thumbnail if exists */}
                  <div className="h-20 w-20 bg-gray-200 rounded-lg overflow-hidden">
                    {transaction.imageURLs &&
                    transaction.imageURLs.length > 0 ? (
                      <img
                        src={transaction.imageURLs[0]}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <i className="bx bx-image text-2xl"></i>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <p className="text-lg font-semibold text-gray-700 capitalize">
                      {transaction.category}
                    </p>
                    <p className="text-appPurple font-bold text-sm">
                      {convertDate(transaction.date)}
                    </p>
                    <p className="text-gray-500 text-sm truncate">
                      {transaction.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : /* ================= NEW TRANSACTION TAB ================= */
      tab === "new-shii" ? (
        <div className="grow p-2 pb-20 overflow-y-auto">
          <div className="flex w-full justify-between bg-white items-center py-2 sticky top-0 z-10">
            <button onClick={() => setTab("home")}>
              <i className="bx bx-arrow-back text-3xl"></i>
            </button>
            <h3 className="text-appPurple text-xl font-bold">Add New</h3>
            <div className="w-8"></div> {/* Spacer */}
          </div>

          <div className="my-5 w-full mx-auto flex justify-between h-12 rounded-3xl bg-gray-200 p-1">
            <button
              onClick={() => setExpOrInc("exp")}
              className={`${
                expOrInc == "exp"
                  ? "bg-appPurple text-white shadow-md"
                  : "text-gray-500"
              } flex-1 font-bold rounded-3xl transition-all`}
            >
              Expense
            </button>
            <button
              onClick={() => setExpOrInc("inc")}
              className={`${
                expOrInc == "inc"
                  ? "bg-appPurple text-white shadow-md"
                  : "text-gray-500"
              } flex-1 font-bold rounded-3xl transition-all`}
            >
              Income
            </button>
          </div>

          {/* EXPENSE FORM */}
          {expOrInc == "exp" ? (
            <form className="flex flex-col gap-4">
              <input
                onChange={(e) =>
                  setExpenseInfo({ ...expenseInfo, date: e.target.value })
                }
                value={expenseInfo.date}
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-appPurple"
                type="date"
              />
              <select
                onChange={(e) =>
                  setExpenseInfo({ ...expenseInfo, category: e.target.value })
                }
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-appPurple"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="groceries">Groceries</option>
                <option value="bills">Bills & Utilities</option>
                <option value="shopping">Shopping</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health & Fitness</option>
                <option value="education">Education</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>

              <input
                onChange={(e) =>
                  setExpenseInfo({
                    ...expenseInfo,
                    description: e.target.value,
                  })
                }
                value={expenseInfo.description}
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-appPurple"
                placeholder="Description (Optional)"
                type="text"
              />
              <input
                onChange={(e) =>
                  setExpenseInfo({ ...expenseInfo, amount: e.target.value })
                }
                value={expenseInfo.amount}
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none focus:ring-2 focus:ring-appPurple"
                placeholder="Amount"
                type="number"
              />

              <p className="font-bold text-gray-500">Receipts (Optional)</p>
              <div className="flex gap-3">
                {[
                  { ref: image1_ref, state: expenseInfo.image1, key: "image1" },
                  { ref: image2_ref, state: expenseInfo.image2, key: "image2" },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="h-24 w-24 border-2 border-dashed border-appPurple rounded-xl flex justify-center items-center overflow-hidden relative"
                  >
                    {img.state ? (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(img.state)}
                        alt=""
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => img.ref.current.click()}
                        className="text-appPurple text-3xl"
                      >
                        <i className="bx bx-plus"></i>
                      </button>
                    )}
                    <input
                      onChange={(e) =>
                        setExpenseInfo((prev) => ({
                          ...prev,
                          [img.key]: e.target.files[0],
                        }))
                      }
                      ref={img.ref}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setTab("home")}
                  className="flex-1 py-3 font-bold text-gray-500 bg-gray-200 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={async () => {
                    const successId = await uploadNewExpense({
                      ...expenseInfo,
                      type: "expense",
                    });
                    if (successId) {
                      setExpenseInfo({
                        date: new Date().toISOString().split("T")[0],
                        category: "",
                        description: "",
                        amount: "",
                        image1: null,
                        image2: null,
                      });
                      setTab("home");
                    }
                  }}
                  className="flex-1 py-3 font-bold text-white bg-appPurple rounded-2xl"
                >
                  {uploading ? "Saving..." : "Save Expense"}
                </button>
              </div>
            </form>
          ) : (
            /* INCOME FORM */
            <form className="flex flex-col gap-4">
              <input
                onChange={(e) =>
                  setIncomeInfo({ ...incomeInfo, date: e.target.value })
                }
                value={incomeInfo.date}
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none"
                type="date"
              />
              <select
                onChange={(e) =>
                  setIncomeInfo({ ...incomeInfo, category: e.target.value })
                }
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Source
                </option>
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
                <option value="business">Business</option>
                <option value="gift">Gift</option>
                <option value="others">Others</option>
              </select>

              <input
                onChange={(e) =>
                  setIncomeInfo({ ...incomeInfo, description: e.target.value })
                }
                value={incomeInfo.description}
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none"
                placeholder="Description (Optional)"
                type="text"
              />
              <input
                onChange={(e) =>
                  setIncomeInfo({ ...incomeInfo, amount: e.target.value })
                }
                value={incomeInfo.amount}
                className="p-4 w-full bg-gray-100 rounded-2xl font-semibold outline-none"
                placeholder="Amount"
                type="number"
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setTab("home")}
                  className="flex-1 py-3 font-bold text-gray-500 bg-gray-200 rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={uploading}
                  onClick={async () => {
                    const successId = await uploadNewExpense({
                      ...incomeInfo,
                      type: "income",
                    });
                    if (successId) {
                      setIncomeInfo({
                        date: new Date().toISOString().split("T")[0],
                        category: "",
                        description: "",
                        amount: "",
                        image1: null,
                        image2: null,
                      });
                      setTab("home");
                    }
                  }}
                  className="flex-1 py-3 font-bold text-white bg-appPurple rounded-2xl"
                >
                  {uploading ? "Saving..." : "Save Income"}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : /* ================= CHARTS TAB ================= */
      tab === "charts" ? (
        <div className="w-full p-2 pb-20 flex flex-col gap-4 overflow-y-auto">
          <div className="flex w-full justify-between bg-white items-center py-2 sticky top-0">
            <button onClick={() => setTab("home")}>
              <i className="bx bx-arrow-back text-3xl"></i>
            </button>
            <h3 className="text-appPurple text-xl font-bold">Analytics</h3>
            <div className="w-8"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border p-4 rounded-2xl text-center shadow-sm">
              <p className="text-gray-500 text-sm">Income</p>
              <p className="text-xl font-bold text-green-600">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="bg-white border p-4 rounded-2xl text-center shadow-sm">
              <p className="text-gray-500 text-sm">Expense</p>
              <p className="text-xl font-bold text-red-500">
                ${totalExpense.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Pass data to your chart components if they accept props, otherwise they might need updating too */}
          <TransactionChart />
          <ExpenseBreakdown />
          <IncomeBreakdown />
        </div>
      ) : tab == "settings" ? (
        <>
          <div className="grow p-4 pb-24 overflow-y-auto flex flex-col gap-6 bg-white">
            {/* Header */}
            <div className="flex w-full items-center gap-4 sticky top-0 bg-white z-10 py-2">
              <button
                onClick={() => setTab("home")}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <i className="bx bx-arrow-back text-2xl text-appPurple"></i>
              </button>
              <h3 className="text-appPurple text-xl font-bold">Settings</h3>
            </div>

            {/* 1. Profile Card */}
            <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex flex-col items-center">
              <div className="h-20 w-20 bg-appPurpleLight rounded-full flex items-center justify-center mb-3 text-appPurple border-4 border-white shadow-sm">
                <span className="text-3xl font-bold">
                  {userData?.name ? (
                    userData.name[0].toUpperCase()
                  ) : (
                    <i className="bx bx-user"></i>
                  )}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {userData?.name || "User"}
              </h2>
              <p className="text-gray-500 text-sm">{userData?.email}</p>
            </div>

            {/* 2. General Settings */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-gray-400 text-xs uppercase tracking-wider ml-2">
                General
              </p>

              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                {/* Currency (Visual Only) */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white text-green-600 rounded-xl shadow-sm">
                      <i className="bx bx-dollar text-xl"></i>
                    </div>
                    <span className="font-semibold text-gray-700">
                      Currency
                    </span>
                  </div>
                  <span className="text-gray-400 font-bold text-sm">USD</span>
                </div>

                {/* Export Data Button */}
                <button
                  onClick={() => {
                    if (!transactions || transactions.length === 0) {
                      alert("No data to export!");
                      return;
                    }

                    const headers = "Date,Category,Type,Amount,Description\n";
                    const rows = transactions
                      .map(
                        (t) =>
                          `${new Date(t.date).toLocaleDateString()},${
                            t.category
                          },${t.type},${t.amount},"${t.description || ""}"`
                      )
                      .join("\n");

                    const blob = new Blob([headers + rows], {
                      type: "text/csv",
                    });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `PhinTrackr_Export_${
                      new Date().toISOString().split("T")[0]
                    }.csv`;
                    a.click();
                  }}
                  className="w-full flex justify-between items-center p-4 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white text-blue-500 rounded-xl shadow-sm">
                      <i className="bx  bx-share text-xl"></i>
                    </div>
                    <span className="font-semibold text-gray-700">
                      Export CSV
                    </span>
                  </div>
                  <i className="bx bx-download text-xl text-gray-400"></i>
                </button>
              </div>
            </div>

            {/* 3. Account Actions */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-gray-400 text-xs uppercase tracking-wider ml-2">
                Account
              </p>

              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <button
                  onClick={async () => {
                    if (window.confirm("Log out of your account?")) {
                      try {
                        await signOut(auth);
                        // Optional: window.location.reload() if the state doesn't update automatically
                      } catch (error) {
                        console.error("Logout Error:", error);
                        alert("Failed to log out");
                      }
                    }
                  }}
                  className="w-full flex justify-between items-center p-4 hover:bg-red-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white text-red-500 rounded-xl shadow-sm">
                      <i className="bx  bx-arrow-out-right-square-half text-xl"></i>
                    </div>
                    <span className="font-semibold text-red-500">Log Out</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="text-center mt-4 mb-8">
              <p className="text-gray-300 text-xs font-bold">PhinTrackr v1.0</p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <Navbar page={tab} />
    </div>
  );
};

export default MainAppPage;
