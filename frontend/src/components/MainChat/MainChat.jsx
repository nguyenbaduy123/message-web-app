import classNames from 'classnames/bind'
import { Input } from 'antd'

import styles from './MainChat.module.css'
import MessageList from '../MessageList/MessageList'
import { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { ChatContext } from '../../context/ChatContext'

const s = classNames.bind(styles)
const socket = io.connect('http://localhost:8080')

const MainChat = () => {
  const { conversations, setConversations, currentConversation } =
    useContext(ChatContext)

  const [currentText, setCurrentText] = useState('')
  const [messageArray, setMessageArray] = useState(currentConversation.messages)

  console.log(currentText)

  useEffect(() => {
    console.log(messageArray)
  }, [messageArray])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(socket.id)
      setMessageArray([...messageArray, data])

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === currentConversation.id
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    id: Math.random() + '',
                    sender: `${socket.id === data.socket_id ? '1' : '2'}`,
                    message: data.message,
                  },
                ],
              }
            : conv
        )
      )
      setCurrentText('')
      // alert(data.message)
    })
  }, [socket])

  const handleSend = () => {
    let text = currentText.trim()
    if (text === '') return
    const currentMsg = {
      id: 'message3',
      sender: '1',
      message: text,
      socket_id: socket.id,
    }
    socket.emit('send_message', currentMsg)
  }

  return (
    <div className={s('container')}>
      <div>This is header</div>
      <MessageList />
      <Input
        className={s('input')}
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        onPressEnter={handleSend}
        placeholder="Your message"
      />
    </div>
  )
}

export default MainChat
