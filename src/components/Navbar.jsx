import React from 'react'
import { useAppContext } from '../context/AppContext'



const Navbar = ({ page }) => {

  const { setTab } = useAppContext()

  return (
    <div className='w-full h-22 bg-gray-200 px-3 flex justify-between fixed left-0 right-0 bottom-0'>

      <div className='left flex-2 flex align-middle justify-between gap-0.5'>

        <button
          onClick={() => setTab('home')}
          className={`${page == 'home' ? 'bg-appPurple text-white' : ''} flex flex-1 flex-col align-middle gap-1 py-2`}>
          <i class='bxr  bx-home text-3xl'  ></i>
          Home
        </button>

        <button
          onClick={() => setTab('receipts')}
          className={`${page == 'receipts' ? 'bg-appPurple text-white' : ''} flex flex-1 flex-col align-middle gap-1 py-2`}>
          <i class='bxr  bx-receipt text-3xl'  ></i>
          Receipts
        </button>
      </div>

      <div className='flex-[1.7] flex align-middle justify-center relative'>
        <button
        onClick={() => setTab('new-shii')}
        className='absolute bottom-8 border bg-amber-600 flex align-middle justify-center text-white rounded-full p-4'>
          <i class='bxr  bx-plus text-4xl'></i>
        </button>
      </div>

      <div className='right flex-2 flex align-middle justify-between gap-2'>
        <button
          onClick={() => setTab('charts')}
          className={`${page == 'charts' ? 'bg-appPurple text-white' : ''} flex w-1/2 flex-col align-middle gap-1 py-2`}>
          <i class='bxr  bx-pie-chart text-3xl'  ></i>
          Charts
        </button>

        <button
          onClick={() => setTab('reminders')}
          className={`${page == 'reminders' ? 'bg-appPurple text-white' : ''} flex flex-1 flex-col align-middle gap-1 py-2`}>
          <i class='bxr  bx-bell text-3xl'></i>
          Settings
        </button>
      </div>
    </div>
  )
}

export default Navbar