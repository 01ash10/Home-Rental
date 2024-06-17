import React, { useEffect, useState } from 'react'
import "../styles/Register.scss"
import {useNavigate} from "react-router-dom"


const RegisterPage = () => {
const [formData, setFormData] =  useState({
    firstName:"",
    lastName: "",
    email: "",
    password: "",
    confirmPassword:"",
    profileImage: null
});
const handleChange = (e) => {
    const{name,value,files} = e.target
   setFormData({
    ...formData,
    [name]: value,
    [name]: name === "profileImage"? files[0] :value
   })
}

console.log(formData);

const [passwordMatch, setPasswordMatch] = useState(true)

const navigate = useNavigate();

useEffect(() => {
  setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword ==="")
})
const handleSubmit = async(e) => {
  e.preventDefault()


  try {
const register_form = new FormData()
for (var key in formData){
  register_form.append(key,formData[key])
}
const response = await fetch("http://localhost:3001/auth/register",
{method:"POST",
 body:  register_form,
})
if(response.ok){
  navigate("/login");
}
  }
  catch(err){
 console.log("Registration failede", err.message);
  }
}

  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form' onSubmit={handleSubmit} >
            <input type="text" 
            placeholder='first Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            required
            />
            <input type="text" 
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            required
            />
            <input type="email" 
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            />
            <input type="password" 
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            />
            <input type="password" 
            placeholder='Confirm Password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            />
            {!passwordMatch && (
              <p style={{color:"red"}}> Passwords are not a match</p>
            )}
            <input 
            id='image'
            type="file" 
            name='profileImage'
            accept='image/*'
            required
            style={{display:"none"}}
            onChange={handleChange}
              />

            <label htmlFor="image">
                <img src="/src/assets/addImage.png" alt="add profile photo" />
            <p>Upload your photo</p>
            </label>

            {formData.profileImage&& (
                <img src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{maxWidth: "50px"}} />
            )}
            <button type='submit' disabled={!passwordMatch} >Register</button>
        </form>
        <a href="/login"> Already have an account? </a>

      </div>
    </div>
  )
}

export default RegisterPage


