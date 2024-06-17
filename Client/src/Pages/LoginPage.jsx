import React from 'react'
import "../styles/Login.scss"
import { setLogin } from '../redux/state';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
    const res = await fetch("http://localhost:3001/auth/login",
  {method: "POST",
  headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify({email,password})
})
   
const loggedIn = await res.json()

if(loggedIn) {
  dispatch (
   setLogin({
    user:loggedIn.user,
    token:loggedIn.token
   }) 
  )
  navigate("/")
}
    }catch(err){
console.log("Login failed", err.message)
    }
  }
  return (
    <div className='login'>
      <div className='login_content'>
        <form className='login_content_form' onSubmit={handleSubmit}>
          <input type="email"
            placeholder='Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password"
            placeholder='Password'
            value={password}
            onChange={(e) =>setPasssword( e.target.value)}

            required />
          <button type='submit'>LOG IN</button>
        </form>
        <a href="/register"> Don't have an account? Sign in here!</a>
      </div>

    </div>
  )
}

export default LoginPage
