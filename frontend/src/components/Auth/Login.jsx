import React, { useState } from "react";
import styles from './Auth.css'

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  return (
    <div className="authForm " >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input value={email} type="email" id='email' placeholder='abc@gmail.com' name='email' onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input value={password} type="password" id='password' placeholder='********' name='password' onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account</button>
    </div>
  )
}