import React from 'react'
import "./login.scss"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';


const Login = () => {
  const {login}=React.useContext(AuthContext);
  const handleLogin=()=>{
    login();
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
            <input type='text' placeholder=' Username or Email'></input>
            <input type='password' placeholder='Password'></input>
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