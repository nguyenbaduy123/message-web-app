import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import { ChatContextProvider } from './context/ChatContext'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Group from './components/Group/Group'
import EditProfile from './components/EditProfile/EditProfile'
import Chat from './components/MainChat/Chat'
import { useState } from 'react'
import RightBar from './components/RightBar/RightBar'

const s = classNames.bind(styles)

function App() {
  const [expand, setExpand] = useState(false)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ChatContextProvider>
          <div className={s('container')}>
            <Layout>
              <main className={s('main-content')}>
                <div className={s('left-bar')}>
                  <LeftBar expand={expand} setExpand={setExpand} />
                </div>
                <div className={s('main-chat', `${expand ? 'expand' : ''}`)}>
                  <Chat expand={expand} setExpand={setExpand} />
                  <Group />
                </div>

                {expand ? (
                  <div className={s('right-bar')}>
                    <RightBar className={s('right-bar')} />
                  </div>
                ) : null}
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
      path: '/edit-profile',
      element: (
        <div className={s('container')}>
          <Layout currentTab="edit-profile">
            <main className={s('main-content')}>
              <EditProfile />
            </main>
          </Layout>
        </div>
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
