import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchNetwork from './Components/SearchNetwork'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SearchNetwork></SearchNetwork>
    </>
  )
}

export default App
