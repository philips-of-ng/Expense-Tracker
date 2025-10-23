import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import AuthContextProvider from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'

import transactions from '../assets/assets'

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


  const [expOrInc, setExpOrInc] = useState('exp')

  return (
    <div className='flex flex-col justify-between border-4 border-green-600'>

      {
        tab === 'home' ? (
          <div className='grow p-2 pb-20'>



            <div className='h-50 w-full  bg-appPurple border-4 rounded-xl bg my-4 text-white p-3'>

              <div className='flex justify-between'>
                <div>
                  <p>Hello, <b>Philips</b></p>
                  <h1 className='text-4xl font-bold'>$12, 550</h1>
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
                <i class='bxr bx-arrow-left-stroke text-3xl'  ></i>
              </button>

              <h3 className='text-appPurple text-center text-xl font-bold'>Receipts</h3>

              <button>
                <i class='bxr  bx-cog text-3xl'></i>
              </button>
            </div>

            {/* SEARCH SYSTEM */}
            <div className='w-full flex align-middle justify-between my-5 bg-gray-200 rounded-3xl h-10 px-4'>
              <input className='w-[80%] outline-0' type="text" />

              <button className=''>
                <i class='bxr  bx-search text-2xl'  ></i>
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
                <i class='bxr bx-arrow-left-stroke text-3xl'  ></i>
              </button>

              <h3 className='text-appPurple text-center text-xl font-bold'>New Transaction</h3>

              <button>
                <i class='bxr  bx-cog text-3xl'></i>
              </button>
            </div>


            {/* Main shii */}

            <div className='my-5 w-4/5 mx-auto flex justify-between align-middle border-2 border-red-600 h-10 rounded-3xl bg-gray-300'>
              <button
                onClick={() => setExpOrInc('exp')}
                className={`${expOrInc == 'exp' ? 'bg-appPurple text-white' : ''} flex-1 font-bold rounded-tl-3xl rounded-bl-3xl`}>Expense</button>

              <button
                onClick={() => setExpOrInc('inc')}
                className={`${expOrInc == 'inc' ? 'bg-appPurple text-white' : ''} flex-1 font-bold rounded-br-3xl rounded-tr-3xl`}>Income</button>
            </div>

            <div className='border-2 border-green-500'>


              <input
                className="p-2 px-4 w-full bg-gray-300 rounded-3xl mb-4 placeholder:text-appPurple font-bold"
                type="date"
              />

              <select
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


              <input className='p-2 px-4 w-full bg-gray-300 rounded-3xl mb-5 placeholder:text-gray-500 font-semibold' placeholder='Description (Optional)' type="text" />


              <input className='p-2 px-4 w-full bg-gray-300 rounded-3xl placeholder:text-gray-500 font-semibold' placeholder='Description (Optional)' type="text" />

              <p>Expense Receipt Images</p>

              <div className='flex justify-between align-middle'>

              </div>
            </div>




          </div>
        ) : ''
      }

      <Navbar page={tab} />
    </div>
  )
}

export default MainAppPage