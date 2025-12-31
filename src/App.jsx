import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cooking from './components/cooking/cooking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Cooking/>
  
    </>
  )
}

export default App
