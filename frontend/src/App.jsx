import { useState } from 'react'
import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import MainChat from './components/MainChat/MainChat'
import { ChatContextProvider } from './context/ChatContext'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'

const s = classNames.bind(styles)

function App() {
  const [currentForm, setCurrentForm] = useState('login')
  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  if (currentForm == 'login') {
    return <Login onFormSwitch={toggleForm} />
  } else if (currentForm == 'register') {
    return <Register onFormSwitch={toggleForm} />
  } else {
    return (
      <ChatContextProvider>
        <div className={s('container')}>
          <Layout>
            <main className={s('main-content')}>
              <div className={s('left-bar')}>
                <LeftBar />
              </div>
              <div className={s('main-chat')}>
                <MainChat />
              </div>
            </main>
          </Layout>
        </div>
      </ChatContextProvider>
    )
  }
}

export default App
