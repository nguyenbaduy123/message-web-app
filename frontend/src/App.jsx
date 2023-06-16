import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import MainChat from './components/MainChat/MainChat'
import { ChatContextProvider } from './context/ChatContext'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Group from './components/Group/Group'
import EditProfile from './components/EditProfile/EditProfile'
import Chat from './components/MainChat/Chat'

const s = classNames.bind(styles)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ChatContextProvider>
        <div className={s('container')}>
          <Layout currentTab="chat">
            <main className={s('main-content')}>
              <div className={s('left-bar')}>
                <LeftBar />
              </div>
              <div className={s('main-chat')}>
                <Chat />
                <Group />
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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
