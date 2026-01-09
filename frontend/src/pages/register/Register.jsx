import React, { useState } from 'react'
import "./register.scss"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs]=useState({
    username:"",
    email:"",
    password:"",
    name:""
  });


  const handleChange=(e)=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleClick=async(e)=>{
    e.preventDefault();

    try{
      await axios.post("http://192.168.1.5:8800/api/auth/register", inputs);
      alert("User Created Successfully");
      navigate("/login");
    }
    catch(err){
      alert(err.response.data);
    }
  }

  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
            <h2>Welcome to</h2>
          <h1>EnMate</h1>
          <p>Step into the world full of people who can team up with you</p>
        </div>
        <div className='right'>
          <div className='logo'>
            <img src='https://45sknkzlnr.ucarecd.net/56f5887d-bb59-43ea-84b1-57d805971787/ChatGPTImageNov10202505_16_55PM.png'></img>
            <h2>Create your Account</h2>
            <p>Enter your information to get started</p>
          </div>
          <form>
            <input type='text' placeholder='Username' name="username" onChange={handleChange}></input>
            <input type='text' placeholder=' Email'name="email" onChange={handleChange}></input>
            <input type='text' placeholder='Full Name'name="name" onChange={handleChange}></input>
            <input type='password' placeholder='Password'name="password" onChange={handleChange}></input>
            <button onClick={handleClick}>Register</button>
            <Link to="/login">
                <p class="old-user">
                Already have an account?<span>Login</span>
                </p>
            </Link>
          </form>
        </div>  
      </div>
    </div>
  )
}

export default Register