import { useState } from 'react'
import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import MainChat from './components/MainChat/MainChat'
import { ChatContextProvider } from './context/ChatContext'

const s = classNames.bind(styles)

function App() {
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

export default App
