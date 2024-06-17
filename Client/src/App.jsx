import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import CreateListing from './Pages/CreateListing';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>

        </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
