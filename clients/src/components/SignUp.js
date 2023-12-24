import React, { useState } from 'react';
import './LoginForm.css'; // Import your CSS file
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logInfo = {
    username: username,
    email: email,
    password: password,
  };

  const submitHandler = async(e) => {
    e.preventDefault();
   try{
   let res = await axios.post('api/user/addUser', logInfo)
     setUsername('')
     setEmail('')
     setPassword('')
   
   }catch(error){
        console.log("error while adding users",error)
   }
   
  };

  return (
    <div>
      <form onSubmit={submitHandler} className='form'>
        <label className='form-label'>Username</label>
        <input
          className='form-input'
          type='text'
          name='username'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder='Username'
        />
        <label className='form-label'>Email</label>
        <input
          className='form-input'
          type='text'
          name='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder='Email'
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;