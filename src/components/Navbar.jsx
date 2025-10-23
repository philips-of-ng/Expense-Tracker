import React from 'react'

const Navbar = ({ page }) => {
  return (
    <div className='w-full border-2 border-blue-600 px-3 py-4 bg-gray-200 flex justify-between'>

      <div className='left flex-2 flex align-middle justify-between gap-2'>
        <button className='border-2 border-green-500 flex flex-col align-middle gap-1'>
          <i class='bxr  bx-bell text-3xl'></i>
          Reminders
        </button>

        <button className='border-2 border-green-500 flex flex-col align-middle gap-1'>
          <i class='bxr  bx-bell text-3xl'></i>
          Receipts
        </button>
      </div>

      <div className='flex-2 flex align-middle justify-center'>

      </div>

      <div className='right flex-2 flex align-middle justify-between gap-2'>
        <button className='border-2 border-green-500 flex flex-col align-middle gap-1'>
          <i class='bxr  bx-bell text-3xl'></i>
          Reminders
        </button>

        <button className='border-2 border-green-500 flex flex-col align-middle gap-1'>
          <i class='bxr  bx-bell text-3xl'></i>
          Receipts
        </button>
      </div>


    </div>
  )
}

export default Navbar