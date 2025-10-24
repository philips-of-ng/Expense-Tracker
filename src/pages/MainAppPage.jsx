import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import AuthContextProvider from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'

import transactions from '../assets/assets'
import TransactionChart from '../components/TransactionChart'

const MainAppPage = () => {

  //this is used to set the active page -- home, receipts, charts, reminders
  const { tab, setTab } = useAppContext()


  // nav and tab for the transactions
  const [showingTrans, setShowingTrans] = useState('Today')

  const convertDate = (date) => {
    const short = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return short
  }


  function getTodayTransactions(transactions) {
    const today = new Date();
    return transactions.filter(t => {
      const d = new Date(t.date);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }


  function getThisWeekTransactions(transactions) {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return transactions.filter(t => {
      const d = new Date(t.date);
      return d >= startOfWeek && d < endOfWeek;
    });
  }


  function getThisMonthTransactions(transactions) {
    const today = new Date();
    return transactions.filter(t => {
      const d = new Date(t.date);
      return (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }

  const todayTransactions = getTodayTransactions(transactions)
  const thisWeekTransactions = getThisWeekTransactions(transactions)
  const thisMonthTransactions = getThisMonthTransactions(transactions)



  // THE FOLLOWING CODE IS FOR THE ADD NEW PAGE
  // THE FOLLOWING CODE IS FOR THE ADD NEW PAGE
  const [expOrInc, setExpOrInc] = useState('exp')


  const image1_ref = useRef()
  const image2_ref = useRef()

  const [expenseInfo, setExpenseInfo] = useState({
    date: '',
    category: '',
    description: '',
    amount: null,
    image1: null,
    image2: null
  })

  useEffect(() => {
    console.log('Updating expense info', expenseInfo);
  }, [expenseInfo])


  const image1_inc_ref = useRef(null);
  const image2_inc_ref = useRef(null);

  const [incomeInfo, setIncomeInfo] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    image1: null,
    image2: null
  });

  useEffect(() => {
    console.log('Updating Income info', incomeInfo);
  }, [incomeInfo])


  // SETTING UP THE CHART


  return (
    <div className='flex flex-col justify-between border-4 border-green-600'>

      {
        tab === 'home' ? (
          <div className='grow p-2 pb-20'>



            <div className='h-50 w-full  bg-appPurple border-4 rounded-xl bg my-4 text-white p-3'>

              <div className='flex justify-between'>
                <div>
                  <p>Hello, <b>Philips</b></p>
                  <h1 className='text-4xl font-bold'>$12,550.55</h1>
                </div>

                <h2 className='text-center'>October, 2025</h2>
              </div>


              <div className='w-full p-4 flex justify-between align-baseline'>

                <div className='text-center'>
                  <span className='text-amber-500'>Exp</span>
                  <p>25000</p>
                </div>

                <div className='text-center'>
                  <span className='text-amber-500'>Exp</span>
                  <p>25000</p>
                </div>

                <div className='text-center'>
                  <span className='text-amber-500'>Exp</span>
                  <p>25000</p>
                </div>




              </div>
            </div>

            {/* AFTER THE DASHBOARD */}

            <div>

              <div className='w-full flex justify-between align-middle gap-3 sticky top-0 left-0 right-0 py-4 bg-white'>

                <button onClick={() => setShowingTrans('Today')} className={`${showingTrans == 'Today' ? 'bg-appPurpleLight' : 'bg-gray-200'} flex-1 p-2 py-3 rounded-3xl`}>Today</button>

                <button onClick={() => setShowingTrans('Weekly')} className={`${showingTrans == 'Weekly' ? 'bg-appPurpleLight' : 'bg-gray-200'} flex-1 p-2 py-3 rounded-3xl`}>Weekly</button>

                <button onClick={() => setShowingTrans('Monthly')} className={`${showingTrans == 'Monthly' ? 'bg-appPurpleLight' : 'bg-gray-200'} flex-1 p-2 py-3 rounded-3xl`}>Monthly</button>

              </div>


              <h1>{showingTrans}</h1>

              {/* THIS DIV CONTAINS THE TRANSACTIONS */}
              <div className='overflow-y-scroll'>

                {
                  showingTrans == 'Today' ? (
                    <>
                      {
                        todayTransactions.map((expense, index) => (
                          <>
                            <div key={index} className='one-trans flex justify-between align-middle py-3.5'>

                              <div className='flex align-middle justify-start gap-2.5 min-w-0'>
                                <div className='min-w-14 min-h-14 border-2 border-green-400 rounded-full'>

                                </div>

                                <div className='min-w-0'>
                                  <p className='text-xl font-semibold'>{expense.title}</p>
                                  <p className='text-gray-500 truncate'>{expense.description}</p>
                                </div>
                              </div>


                              <div className='flex align-middle'>
                                <span className='text-xl flex align-middle'>${expense.amount}</span>
                              </div>
                            </div>
                          </>
                        ))
                      }
                    </>
                  ) : showingTrans == 'Weekly' ? (
                    <>
                      {
                        thisWeekTransactions.map((expense, index) => (
                          <>
                            <div key={index} className='one-trans flex justify-between align-middle py-3.5'>

                              <div className='flex align-middle justify-start gap-2.5 min-w-0'>
                                <div className='min-w-14 min-h-14 border-2 border-green-400 rounded-full'>

                                </div>

                                <div className='min-w-0'>
                                  <p className='text-xl font-semibold'>{expense.title}</p>
                                  <p className='text-gray-500 truncate'>{expense.description}</p>
                                </div>
                              </div>


                              <div className='flex align-middle'>
                                <span className='text-xl flex align-middle'>${expense.amount}</span>
                              </div>
                            </div>
                          </>
                        ))
                      }
                    </>
                  ) : showingTrans == 'Monthly' ? (
                    <>
                      {
                        thisMonthTransactions.map((expense, index) => (
                          <>
                            <div key={index} className='one-trans flex justify-between align-middle py-3.5'>

                              <div className='flex align-middle justify-start gap-2.5 min-w-0'>
                                <div className='min-w-14 min-h-14 border-2 border-green-400 rounded-full'>

                                </div>

                                <div className='min-w-0'>
                                  <p className='text-xl font-semibold'>{expense.title}</p>
                                  <p className='text-gray-500 truncate'>{expense.description}</p>
                                </div>
                              </div>


                              <div className='flex align-middle'>
                                <span className='text-xl flex align-middle'>${expense.amount}</span>
                              </div>
                            </div>
                          </>
                        ))
                      }
                    </>
                  ) : ''
                }



              </div>

            </div>

          </div>
        ) : tab == 'receipts' ? (
          <div className='grow p-2 pb-20'>

            {/* TOP BAR */}
            <div className='flex w-full justify-between bg-white align-middle py-2 sticky top-0 left-0 right-0'>
              <button>
                <i className='bxr bx-arrow-left-stroke text-3xl'  ></i>
              </button>

              <h3 className='text-appPurple text-center text-xl font-bold'>Receipts</h3>

              <button>
                <i className='bxr  bx-cog text-3xl'></i>
              </button>
            </div>

            {/* SEARCH SYSTEM */}
            <div className='w-full flex align-middle justify-between my-5 bg-gray-200 rounded-3xl h-10 px-4'>
              <input className='w-[80%] outline-0' type="text" />

              <button className=''>
                <i className='bxr  bx-search text-2xl'  ></i>
              </button>
            </div>

            {/* List of receipts */}

            <div className='border-2 border-green-500'>


              {
                transactions.map((expense, index) => (
                  <div key={index} className='one-receipt flex justify-between my-2'>
                    <div className='flex justify-start align-middle gap-2 min-w-0'>

                      <div className='min-h-20 min-w-20 border-2 border-blue-600'>

                      </div>

                      <div className='min-w-0'>
                        <p className='text-lg font-semibold text-gray-600'>{expense.title}</p>
                        <p className='text-appPurple font-bold'>{convertDate(expense.date)}</p>
                        <p className='text-gray-500 truncate'>{expense.description}</p>
                      </div>

                    </div>

                    <div>
                      <button></button>
                    </div>
                  </div>
                ))
              }


            </div>

          </div>
        ) : tab == 'new-shii' ? (
          <div className='grow p-2 pb-20'>

            {/* TOP BAR */}
            <div className='flex w-full justify-between bg-white align-middle py-2 sticky top-0 left-0 right-0'>
              <button>
                <i className='bxr bx-arrow-left-stroke text-3xl'  ></i>
              </button>

              <h3 className='text-appPurple text-center text-xl font-bold'>New {`${expOrInc == 'exp' ? 'Expense' : 'Income'}`}</h3>

              <button>
                <i className='bxr  bx-cog text-3xl'></i>
              </button>
            </div>


            {/* Main shii */}

            <div className='my-5 w-5/6 mx-auto flex justify-between align-middle h-10 rounded-3xl bg-gray-300'>
              <button
                onClick={() => setExpOrInc('exp')}
                className={`${expOrInc == 'exp' ? 'bg-appPurple text-white' : ''} flex-1 font-bold rounded-tl-3xl rounded-bl-3xl`}>Expense</button>

              <button
                onClick={() => setExpOrInc('inc')}
                className={`${expOrInc == 'inc' ? 'bg-appPurple text-white' : ''} flex-1 font-bold rounded-br-3xl rounded-tr-3xl`}>Income</button>
            </div>

            {/* THIS IS THE EXPENSE AND INCOME FORMS */}

            <div className='border-2 border-green-500'>
              {
                expOrInc == 'exp' ? (
                  <form>
                    <input
                      onChange={(e) => {
                        const theDate = e.target.value
                        const finalDate = new Date(theDate).toISOString()
                        setExpenseInfo((prev) => ({ ...prev, date: finalDate }))
                      }}
                      className="p-2 px-4 w-full bg-gray-300 rounded-3xl mb-4 placeholder:text-appPurple font-bold"
                      type="date"
                    />

                    <select
                      onChange={(e) => {
                        const category = e.target.value
                        setExpenseInfo((prev) => ({ ...prev, category: category }))
                      }}
                      className="p-2 px-4 w-full bg-gray-300 rounded-3xl mb-5 placeholder:text-appPurple font-bold"
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
                      onChange={(e) => {
                        const descr = e.target.value
                        setExpenseInfo((prev) => ({ ...prev, description: descr }))
                      }}
                      className='p-2 px-4 w-full bg-gray-300 rounded-3xl mb-5 placeholder:text-gray-500 font-semibold' placeholder='Description (Optional)' type="text" />


                    <input
                      onChange={(e) => {
                        const amount = e.target.value
                        setExpenseInfo((prev) => ({ ...prev, amount: Number.parseFloat(amount) }))
                      }}
                      className='p-2 px-4 w-full bg-gray-300 rounded-3xl placeholder:text-gray-500 font-semibold' placeholder='Amount' type="text" />

                    <p className='my-3 font-bold text-gray-500'>Expense Receipt Images</p>

                    <div className='flex justify-between align-middle gap-3'>

                      <div className='flex justify-center align-middle h-30 flex-1 border-2 border-appPurple'>
                        {
                          expenseInfo.image1 ? (
                            <img className='w-full object-center' src={URL.createObjectURL(expenseInfo.image1)} alt="" />
                          ) : (
                            <>
                              <button onClick={() => image1_ref.current.click()} type='button'>
                                <i className='bxr  bx-plus'></i>
                              </button>

                              <input
                                onChange={(e) => {
                                  setExpenseInfo((prev) => ({ ...prev, image1: e.target.files[0] }))
                                }}
                                ref={image1_ref} type="file" accept='image/*'
                                className='hidden' />
                            </>
                          )
                        }
                      </div>


                      <div className='flex justify-center align-middle h-30 flex-1 border-2 border-appPurple'>
                        {
                          expenseInfo.image2 ? (
                            <img className='w-full object-center' src={URL.createObjectURL(expenseInfo.image2)} alt="" />
                          ) : (
                            <>
                              <button onClick={() => image2_ref.current.click()} type='button'>
                                <i className='bxr  bx-plus'></i>
                              </button>

                              <input
                                onChange={(e) => {
                                  setExpenseInfo((prev) => ({ ...prev, image2: e.target.files[0] }))
                                }}
                                ref={image2_ref} type="file" accept='image/*'
                                className='hidden' />
                            </>
                          )
                        }
                      </div>
                    </div>

                    <div className='flex justify-between align-middle gap-3 my-5'>

                      <button className='text-lg font-semibold text-white bg-appPurple flex-1 p-1 rounded-3xl'>Cancel</button>
                      <button className='text-lg font-semibold text-white bg-appPurple flex-1 p-1 rounded-3xl'>Save</button>

                    </div>

                  </form>
                ) : expOrInc == 'inc' ? (
                  <form>
                    <input
                      onChange={(e) => {
                        const theDate = e.target.value;
                        const finalDate = new Date(theDate).toISOString();
                        setIncomeInfo((prev) => ({ ...prev, date: finalDate }));
                      }}
                      className="p-2 px-4 w-full bg-gray-300 rounded-3xl mb-4 placeholder:text-appPurple font-bold"
                      type="date"
                    />

                    <select
                      onChange={(e) => {
                        const category = e.target.value;
                        setIncomeInfo((prev) => ({ ...prev, category: category }));
                      }}
                      className="p-2 px-4 w-full bg-gray-300 rounded-3xl mb-5 placeholder:text-appPurple font-bold"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Income Source
                      </option>
                      <option value="salary">Salary</option>
                      <option value="freelance">Freelance / Side Jobs</option>
                      <option value="business">Business</option>
                      <option value="investment">Investment</option>
                      <option value="gift">Gifts & Donations</option>
                      <option value="rental">Rental Income</option>
                      <option value="refund">Refunds / Reimbursements</option>
                      <option value="allowance">Allowance / Stipend</option>
                      <option value="others">Others</option>
                    </select>

                    <input
                      onChange={(e) => {
                        const descr = e.target.value;
                        setIncomeInfo((prev) => ({ ...prev, description: descr }));
                      }}
                      className="p-2 px-4 w-full bg-gray-300 rounded-3xl mb-5 placeholder:text-gray-500 font-semibold"
                      placeholder="Description (Optional)"
                      type="text"
                    />

                    <input
                      onChange={(e) => {
                        const amount = e.target.value;
                        setIncomeInfo((prev) => ({
                          ...prev,
                          amount: Number.parseFloat(amount)
                        }));
                      }}
                      className="p-2 px-4 w-full bg-gray-300 rounded-3xl placeholder:text-gray-500 font-semibold"
                      placeholder="Amount"
                      type="text"
                    />

                    <p className="my-3 font-bold text-gray-500">Income Proof Images</p>

                    <div className="flex justify-between align-middle gap-3">
                      <div className="flex justify-center align-middle h-30 flex-1 border-2 border-appPurple">
                        {incomeInfo.image1 ? (
                          <img
                            className="w-full object-center"
                            src={URL.createObjectURL(incomeInfo.image1)}
                            alt=""
                          />
                        ) : (
                          <>
                            <button onClick={() => image1_inc_ref.current.click()} type="button">
                              <i className="bxr bx-plus"></i>
                            </button>

                            <input
                              onChange={(e) => {
                                setIncomeInfo((prev) => ({
                                  ...prev,
                                  image1: e.target.files[0]
                                }));
                              }}
                              ref={image1_inc_ref}
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                          </>
                        )}
                      </div>

                      <div className="flex justify-center align-middle h-30 flex-1 border-2 border-appPurple">
                        {incomeInfo.image2 ? (
                          <img
                            className="w-full object-center"
                            src={URL.createObjectURL(incomeInfo.image2)}
                            alt=""
                          />
                        ) : (
                          <>
                            <button onClick={() => image2_inc_ref.current.click()} type="button">
                              <i className="bxr bx-plus"></i>
                            </button>

                            <input
                              onChange={(e) => {
                                setIncomeInfo((prev) => ({
                                  ...prev,
                                  image2: e.target.files[0]
                                }));
                              }}
                              ref={image2_inc_ref}
                              type="file"
                              accept="image/*"
                              className="hidden"
                            />
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between align-middle gap-3 my-5">
                      <button className="text-lg font-semibold text-white bg-appPurple flex-1 p-1 rounded-3xl">
                        Cancel
                      </button>
                      <button className="text-lg font-semibold text-white bg-appPurple flex-1 p-1 rounded-3xl">
                        Save
                      </button>
                    </div>
                  </form>

                ) : ''
              }

            </div>

          </div>
        ) : tab == 'charts' ? (
          <div className="w-full p-2 flex flex-col gap-6">

            {/* Page Title */}
            <div className='flex w-full justify-between bg-white align-middle py-2 sticky top-0 left-0 right-0'>
              <button>
                <i className='bxr bx-arrow-left-stroke text-3xl'  ></i>
              </button>

              <h3 className='text-appPurple text-center text-xl font-bold'>Charts</h3>

              <button>
                <i className='bxr  bx-cog text-3xl'></i>
              </button>
            </div>


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
                {/* <p className="text-gray-500 text-sm">

                </p> */}

                <TransactionChart />


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
        ) : ''
      }

      <Navbar page={tab} />
    </div>
  )
}

export default MainAppPage