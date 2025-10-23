import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import AuthContextProvider from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'

const MainAppPage = () => {

  //this is used to set the active page -- home, receipts, charts, reminders
  const { tab, setTab } = useAppContext()


  // nav and tab for the transactions
  const [showingTrans, setShowingTrans] = useState('Today')

  const transactions = [
    {
      category: 'Shpping',
      specific: 'Clothes and Watch',
      amount: 205.56
    }
  ]


  return (
    <div className='flex flex-col justify-between border-4 border-green-600'>

      {
        tab === 'home' ? (
          <div className='grow p-2 pb-20'>

            <div>
              <p>Hello, <b>Philips</b></p>
              <h1 className='text-4xl font-bold text-appPurple'>$12, 550</h1>
            </div>

            <div className='h-50 w-full  bg-appPurple border-4 rounded-xl bg my-4 text-white p-3'>
              <h2 className='text-center'>October</h2>

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

              <div className='w-full flex justify-between align-middle gap-3'>

                <button onClick={() => setShowingTrans('Today')} className={`${showingTrans == 'Today' ? 'bg-appPurpleLight' : 'bg-gray-200'} flex-1 p-2 py-3 rounded-3xl`}>Today</button>

                <button onClick={() => setShowingTrans('Weekly')} className={`${showingTrans == 'Weekly' ? 'bg-appPurpleLight' : 'bg-gray-200'} flex-1 p-2 py-3 rounded-3xl`}>Weekly</button>

                <button onClick={() => setShowingTrans('Monthly')} className={`${showingTrans == 'Monthly' ? 'bg-appPurpleLight' : 'bg-gray-200'} flex-1 p-2 py-3 rounded-3xl`}>Monthly</button>

              </div>


              <h1>{showingTrans}</h1>

              {/* THIS DIV CONTAINS THE TRANSACTIONS */}
              <div className='overflow-y-scroll'>

                {
                  transactions.map((expense, index) => (
                    <>
                      <div key={index} className='one-trans flex justify-between align-middle py-3.5'>

                        <div className='flex align-middle justify-start gap-2.5'>
                          <div className='w-14 h-14 border-2 border-green-400 rounded-full'>

                          </div>

                          <div className=''>
                            <p className='text-xl font-semibold'>{expense.category}</p>
                            <p className='text-gray-500'>{expense.specific}</p>
                          </div>
                        </div>


                        <div className='flex align-middle'>
                          <span className='text-xl flex align-middle'>${expense.amount}</span>
                        </div>
                      </div>
                    </>
                  ))
                }

                <div className='one-trans flex justify-between align-middle py-3.5'>

                  <div className='flex align-middle justify-start gap-2.5'>
                    <div className='w-14 h-14 border-2 border-green-400 rounded-full'>

                    </div>

                    <div className=''>
                      <p className='text-xl font-semibold'>Shopping</p>
                      <p className='text-gray-500'>Clothes and Watch</p>
                    </div>
                  </div>


                  <div className='flex align-middle'>
                    <span className='text-xl flex align-middle'>$205.85</span>
                  </div>
                </div>


                <div className='one-trans flex justify-between align-middle py-3.5'>

                  <div className='flex align-middle justify-start gap-2.5'>
                    <div className='w-14 h-14 border-2 border-green-400 rounded-full'>

                    </div>

                    <div className=''>
                      <p className='text-xl font-semibold'>Shopping</p>
                      <p className='text-gray-500'>Clothes and Watch</p>
                    </div>
                  </div>


                  <div className='flex align-middle'>
                    <span className='text-xl flex align-middle'>$205.85</span>
                  </div>
                </div>


                <div className='one-trans flex justify-between align-middle py-3.5'>

                  <div className='flex align-middle justify-start gap-2.5'>
                    <div className='w-14 h-14 border-2 border-green-400 rounded-full'>

                    </div>

                    <div className=''>
                      <p className='text-xl font-semibold'>Shopping</p>
                      <p className='text-gray-500'>Clothes and Watch</p>
                    </div>
                  </div>


                  <div className='flex align-middle'>
                    <span className='text-xl flex align-middle'>$205.85</span>
                  </div>
                </div>


                <div className='one-trans flex justify-between align-middle py-3.5'>

                  <div className='flex align-middle justify-start gap-2.5'>
                    <div className='w-14 h-14 border-2 border-green-400 rounded-full'>

                    </div>

                    <div className=''>
                      <p className='text-xl font-semibold'>Shopping</p>
                      <p className='text-gray-500'>Clothes and Watch</p>
                    </div>
                  </div>


                  <div className='flex align-middle'>
                    <span className='text-xl flex align-middle'>$205.85</span>
                  </div>
                </div>





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