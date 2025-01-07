import { useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import './App.css'
import Login from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Login/>
    </>
  )
}

export default App
