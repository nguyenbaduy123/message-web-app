import React, { useState } from "react";
import styles from './Auth.module.css'
import classNames from 'classnames/bind'

const s = classNames.bind(styles)

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  return (
    <div className= {s('authForm')} >
      <h1>Login</h1>
      <form className={s('formRegister')} onSubmit={handleSubmit}>
        <label className={s('formLabel')} htmlFor="email">Email</label>
        <input className={s('formInput')} value={email} type="email" id='email' placeholder='abc@gmail.com' name='email' onChange={(e) => setEmail(e.target.value)} />

        <label className={s('formLabel')} htmlFor="password">Password</label>
        <input className={s('formInput')} value={password} type="password" id='password' placeholder='********' name='password' onChange={(e) => setPassword(e.target.value)} />
        <button className={s('formButton')} type="submit">Log In</button>
      </form>
      <button className={s('link-btn')} onClick={() => props.onFormSwitch('register')}>Don't have an account</button>
    </div>
  )
}