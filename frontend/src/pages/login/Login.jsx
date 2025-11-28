import React from 'react'
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import { useState } from 'react';


const Login = () => {
  const [inputs, setInputs]=useState({
    username:"",
    password:"",
  });

  const navigate=useNavigate();
  const handleChange=(e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const {login}=React.useContext(AuthContext);
  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/");
    }
    catch(err){
      alert(err.response?.data || "Something went wrong");
    }
  };
  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>EnMate</h1>
          <p>Best Ideas need Amazing People</p>
        </div>
        <div className='right'>
          <div className='logo'>
            <img src='https://45sknkzlnr.ucarecd.net/56f5887d-bb59-43ea-84b1-57d805971787/ChatGPTImageNov10202505_16_55PM.png'></img>
            <h2>Login to EnMate</h2>
          </div>
          <form>
            <input type='text' placeholder=' Username or Email' name="username" onChange={handleChange}></input>
            <input type='password' placeholder='Password' name="password" onChange={handleChange}></input>
            <button onClick={handleLogin}>Login</button>
            <Link to="/register">
              <p class="new-user">
                New to EnMate?<span>Register</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login