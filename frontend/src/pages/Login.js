import React from 'react'
import { NavLink } from 'react-router-dom'
import './style/login.css';
export default function Login() {

  
  return (
    <div class="login">
    <h1>Login</h1>
    <form method="post">
      <input
     
        type="text"
        name="u"
        placeholder="Admin"
        id="username"
        required="required"
      />
      <input
        type="password"
        name="p"
        placeholder="Admin"
        id="password"
        required="required"
      />
     <NavLink className="button"to="/dashboard">Let Me In </NavLink>
    </form>
  </div>
  )
}
