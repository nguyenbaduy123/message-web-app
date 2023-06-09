import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import { ChatContextProvider } from './context/ChatContext'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Group from './components/Group/Group'
import Chat from './components/MainChat/Chat'
import { useState } from 'react'
import RightBar from './components/RightBar/RightBar'
import Profile from './components/Profile/Profile'
import About from './components/Profile/About'
import Friend from './components/Profile/Friend'
import Notification from './components/Notification/Notification'

const s = classNames.bind(styles)

function App() {
  const [expand, setExpand] = useState(false)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ChatContextProvider>
          <div className={s('container')}>
            <Layout expand={expand} setExpand={setExpand}>
              <main className={s('main-content', 'chat-mobile')}>
                <div className={s('left-bar', 'left-bar-mobile')}>
                  <LeftBar expand={expand} setExpand={setExpand} />
                </div>

                <div className={s('chat-wrap')}>
                  <div className={s('main-chat', `${expand ? 'expand' : ''}`)}>
                    <Chat expand={expand} setExpand={setExpand} />
                    <Group />
                  </div>

                  {expand ? (
                    <div className={s('right-bar')}>
                      <RightBar
                        className={s('right-bar')}
                        expand={expand}
                        setExpand={setExpand}
                      />
                    </div>
                  ) : null}
                </div>
              </main>
            </Layout>
          </div>
        </ChatContextProvider>
      ),
    },

    {
      path: '/login',
      element: (
        <ChatContextProvider>
          <Login />
        </ChatContextProvider>
      ),
    },

    {
      path: '/register',
      element: (
        <ChatContextProvider>
          <Register />
        </ChatContextProvider>
      ),
    },
    {
      path: '/profile',
      element: (
        <ChatContextProvider>
          <div className={s('container')}>
            <Layout expand={expand} setExpand={setExpand}>
              <main className={s('main-content')}>
                <Profile expand={expand} setExpand={setExpand} />
              </main>
            </Layout>
          </div>
        </ChatContextProvider>
      ),
      children: [
        {
          path: 'about',
          element: <About />,
        },

        {
          path: 'friend',
          element: <Friend expand={expand} setExpand={setExpand} />,
        },
      ],
    },

    {
      path: '/notification',
      element: (
        <ChatContextProvider>
          <div className={s('container')}>
            <Layout expand={expand} setExpand={setExpand}>
              <main className={s('main-content')}>
                <Notification></Notification>
              </main>
            </Layout>
          </div>
        </ChatContextProvider>
      ),
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
