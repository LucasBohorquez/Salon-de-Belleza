import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Productos from './pages/Productos'

function App() {
  return(
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Productos' element={<Productos/>}/>
    </Routes>
    </>
  )
}
export default App
