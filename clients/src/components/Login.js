import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
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
      console.log(res.data.token)
     setEmail('')
     setPassword('')
       localStorage.setItem("token",res.data.token)
     navigate("/expense")
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
        <p>forgot password click here...<Link to='/forgotpassword'><button>forgot password</button></Link></p>
       <p> Click to create account<Link to='/signup'><button>sign-up</button></Link></p>
      </form>
    
    </div>
  );
};

export default Login;