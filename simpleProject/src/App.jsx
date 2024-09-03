import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import SearchNetwork from './Components/SearchNetwork'
import Configurations from './Configuration/Configurations'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Configurations></Configurations>
    </>
  )
}

export default App
