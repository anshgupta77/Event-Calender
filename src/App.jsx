import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CalendarApp from './CalenderApp'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CalendarApp />
    </>
  )
}

export default App
