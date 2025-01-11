import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <RegisterPage/>
    </>
  )
}

export default App
