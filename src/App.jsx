import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import MainAppPage from './pages/MainAppPage'
import StatisticsPage from './components/StatisticsPage'
import { useAuth } from './context/AuthContext'
import Auth from './pages/Auth'

function App() {

  const { user } = useAuth()

  useEffect(() => {
    console.log('This is the user gotten from the AuthContext', user);
    console.log('Current user UID', user.uid);
    
  }, [])

  return (
    <div className='w-screen border-green-800'>
      {
        user ? (
          <MainAppPage />

        ) : (
          <Auth />
        )
      }

      {/* <StatisticsPage /> */}
    </div>
  )
}

export default App
