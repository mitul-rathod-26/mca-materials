import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Users from './Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      {/* <Users name="john" age={26} city="Goa" />
      
      <Users name="tom" age={20} city="pune" />

      <Users name="john" age={26} city="Goa" /> */}



      {/* using props */}
      {/* <Users name="Jony" age="21" city="Goa" /> */}


      <div className="app-container">
        <Users />
      </div>
    </>
  )
}

export default App
