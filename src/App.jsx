import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className='text-red-400 text-2xl'>Does tailwind work?</p>
    </>
  )
}

export default App
