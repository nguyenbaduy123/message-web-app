import React, { useContext, useState } from 'react'

import styles from './Auth.module.css'
import classNames from 'classnames/bind'
import userApi from '../../apis/userApi'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../../context/ChatContext'
import messageApi from '../../apis/messageApi'

const s = classNames.bind(styles)

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    socket,
    setToken,
    setConversations,
    setCurrentConversationId,
    setGroupConversation,
    setUserInfo,
  } = useContext(ChatContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await userApi.post('/login', {
        email: email,
        password: password,
      })
      if (!data.data.error) {
        sessionStorage.setItem('username', data.data.user.fullname)
        sessionStorage.setItem('id', data.data.user.id)
        sessionStorage.setItem('accessToken', data.data.accessToken)
        console.log(data.data)
        setToken({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
        ;(async () => {
          try {
            const res = await messageApi.get('/private', {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  'accessToken'
                )}`,
              },
              params: {
                id: sessionStorage.getItem('id'),
              },
            })

            console.log(res.data)
            setConversations([...res.data])
            setCurrentConversationId(res.data[0].id)
          } catch (error) {
            console.log(error)
          }
        })()
        ;(async () => {
          try {
            const res = await messageApi.get('/group', {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  'accessToken'
                )}`,
              },
              params: {
                id: sessionStorage.getItem('id'),
              },
            })

            socket.emit('init-room', sessionStorage.getItem('id'), res.data)
            setGroupConversation([...res.data])
          } catch (error) {
            console.log(error)
          }
        })()
        ;(async () => {
          try {
            const res = await userApi.get('/' + sessionStorage.getItem('id'), {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  'accessToken'
                )}`,
              },
            })
            setUserInfo(res.data.user)
          } catch (error) {
            console.log(error)
          }
        })()
        navigate('/')
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
          onClick={() => {
            navigate('/register')
          }}
        >
          Don't have an account
        </button>
      </div>
    </div>
  )
}
