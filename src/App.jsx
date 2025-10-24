import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import MainAppPage from './pages/MainAppPage'
import StatisticsPage from './components/StatisticsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen border-green-800'>
      <MainAppPage />

      {/* <StatisticsPage /> */}
    </div>
  )
}

export default App
