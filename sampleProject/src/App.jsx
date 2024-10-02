import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Todoie_App/Header'
import TodoItem from './Todoie_App/TodoItem'
import Button from './Todoie_App/Button'
import Counter from './Components/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='todo-container'>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
      <Counter></Counter>
      {/* <Header header="TODO"/>
      <TodoItem text="Eat"/>
      <TodoItem completed={true} text="Code"/>
      <TodoItem text="Play"/>
      <TodoItem text="Study"/>
      <TodoItem text="Sleep Again"/>
      <Button/> */}
    </div>
  )
}

export default App
