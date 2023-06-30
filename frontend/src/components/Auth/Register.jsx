import React, { useState } from 'react'
import styles from './Auth.module.css'
import classNames from 'classnames/bind'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

import userApi from '../../apis/userApi'
import axios from 'axios'

const s = classNames.bind(styles)

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.post('http://localhost:8080/api/user/', {
        email: email,
        username: userName,
        password: password,
        fullname: fullName,
      })
      if (data.status === 200) {
        notification.success({
          message: 'Register',
          description: 'Success',
          placement: 'top',
          duration: 1,
        })

        navigate('/login')
        // props.onFormSwitch('login')
      }
    } catch (error) {
      console.error('Register error: ', error)
    }
  }

  return (
    <>
      {/* <div className={s('container')}>
        <div className={s('authForm')}>
          <h1>Register</h1>
          <form className={s('formRegister')} onSubmit={handleSubmit}>
            <label className={s('formLabel')} htmlFor="username">
              User Name
            </label>
            <input
              className={s('formInput')}
              value={userName}
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              placeholder="User Name"
            />

            <label className={s('formLabel')} htmlFor="fullname">
              Full Name
            </label>
            <input
              className={s('formInput')}
              value={fullName}
              name="fullname"
              onChange={(e) => setFullName(e.target.value)}
              id="fullname"
              placeholder="Full Name"
            />

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
              Register
            </button>
          </form>

          <button className={s('link-btn')} onClick={() => navigate('/login')}>
            Already have an account? Login here.
          </button>
        </div>
      </div> */}

      <div className={s('app')}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className={s('formInput')}>
            <label>Username</label>
            <input
              value={userName}
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              id="username"
              placeholder="Username"
            />
          </div>

          <div className={s('formInput')}>
            <label>Fullname</label>
            <input
              value={fullName}
              name="fullname"
              onChange={(e) => setFullName(e.target.value)}
              id="fullname"
              placeholder="Full Name"
            />
          </div>

          <div className={s('formInput')}>
            <label>Password</label>
            <input
              value={email}
              type="email"
              id="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={s('formInput')}>
            <label>Password</label>
            <input
              value={password}
              type="password"
              id="password"
              placeholder="Your password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button>Register</button>

          <div className={s('link-btn')} onClick={() => navigate('/login')}>
            Already have an account? Login here.
          </div>
        </form>
      </div>
    </>
  )
}
