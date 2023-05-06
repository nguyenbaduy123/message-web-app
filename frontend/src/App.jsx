import { useState } from 'react'
import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import MainChat from './components/MainChat/MainChat'
import {Login}  from './components/Auth/Login'
import {Register}  from './components/Auth/Register'

const s = classNames.bind(styles)

function App() {
  const [currentConversationId, setCurrentConversationId] = useState('test1')
  const [conversations, setConversations] = useState([
    {
      id: 'test1',
      groupId: '2',
      groupName: 'Duy',
      lastMessage: 'message 1',
      avatar:
        'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
      messages: [
        { id: 'message1', sender: '2', message: 'hi' },
        { id: 'message2', sender: '1', message: 'hello' },
      ],
    },
    {
      id: 'test2',
      groupId: '3',
      groupName: 'Dyu',
      lastMessage: 'message 2',
      avatar:
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
      messages: [
        { id: 'message3', sender: '3', message: 'hi 123' },
        { id: 'message4', sender: '1', message: 'hello 123' },
      ],
    },
  ])

  const getCurrentConversation = () => {
    return conversations.find(
      (conversation) => conversation.id === currentConversationId
    )
  }

  const [currentForm, setCurrentForm] = useState('login')
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };


  return (
    // <div className={s('container')}>
    //   <Layout>
    //     <main className={s('main-content')}>
    //       <div className={s('left-bar')}>
    //         <LeftBar
    //           currentConversationId={currentConversationId}
    //           setCurrentConversationId={setCurrentConversationId}
    //           conversations={conversations}
    //         />
    //       </div>
    //       <div className={s('main-chat')}>
    //         <MainChat
    //           conversations={conversations}
    //           setConversations={setConversations}
    //           currentConversation={getCurrentConversation()}
    //         />
    //       </div>
    //     </main>
    //   </Layout>
    // </div>
    <>
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
    }
    </>
    
  )
}

export default App
