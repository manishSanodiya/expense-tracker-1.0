import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const logInfo = {
    email: email,
   
    password: password,
  };
  

  const submitHandler = async(e) => {
    e.preventDefault();
  try{
    const res = await axios.post('api/user/login',logInfo)
      console.log(res.data.message)
     setEmail('')
     setPassword('')
  }catch(error){
    console.log('error logging in ',error.message)
  }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <label className='form-label'>Email</label>
        <input
          className='form-input'
          type='text'
          name='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='Username'
          
        />
        <label className='form-label'>Password</label>
        <input
          className='form-input'
          type='password'
          name='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Password'
        />
        <button className='form-button' type='submit'>
          Login
        </button>
      </form>
      <Link to='/signup'><button>sign-up</button></Link>
    </div>
  );
};

export default Login;