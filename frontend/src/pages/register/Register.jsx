import React from 'react'
import "./register.scss"
import { Link } from "react-router-dom";


const Register = () => {
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
            <input type='text' placeholder=' Email'></input>
            <input type='text' placeholder='Full Name'></input>
            <input type='password' placeholder='Password'></input>
            <button>Register</button>
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