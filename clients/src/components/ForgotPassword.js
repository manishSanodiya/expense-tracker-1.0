import React, { useState } from 'react'
import './LoginForm.css';
import axios from 'axios';
const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('api/password/forgotpassword',{
            email: email
        }).then((response)=>{
          console.log(response)
        }).catch((err)=>console.log('error in forgotpassword', err))
       
    }
  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <label>enter your elmail id</label>
        <input type='email'  onChange={(e)=>setEmail(e.target.value)}/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default ForgotPassword
