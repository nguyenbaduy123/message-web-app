import React, { useState } from 'react'

import styles from './Auth.module.css'
import classNames from 'classnames/bind'
import userApi from '../../apis/userApi'
import { notification } from 'antd'

const s = classNames.bind(styles)

export const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await userApi.post('/login', {
        email: email,
        password: password
      })
      if(!data.data.error) {
        props.onFormSwitch('chat')
      } else {
        notification.error({
          message: 'Login Failed!',
          description: data.data.error,
          placement: 'top',
          duration: 1,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className={s('container')}>
      <div className={s('authForm')}>
        <h1>Login</h1>
        <form className={s('formRegister')} onSubmit={handleSubmit}>
          <label className={s('formLabel')} htmlFor="email">
            Email
          </label>
          <input
            className={s('formInput')}
            value={email}
            type="email"
            id="email"
            placeholder="abc@gmail.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={s('formLabel')} htmlFor="password">
            Password
          </label>
          <input
            className={s('formInput')}
            value={password}
            type="password"
            id="password"
            placeholder="********"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={s('formButton')} type="submit">
            Log In
          </button>
        </form>
        <button
          className={s('link-btn')}
          onClick={() => props.onFormSwitch('register')}
        >
          Don't have an account
        </button>
      </div>
    </div>
  )
}
