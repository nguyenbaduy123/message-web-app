import classNames from 'classnames/bind'
import { Input } from 'antd'

import styles from './MainChat.module.css'
import MessageList from '../MessageList/MessageList'
import { useState } from 'react'

const s = classNames.bind(styles)

const MainChat = ({ conversations, setConversations, currentConversation }) => {
  const [currentText, setCurrentText] = useState('')

  const handleSend = () => {
    let text = currentText.trim()
    if (text === '') return

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === currentConversation.id
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Math.random() + '',
                  sender: '1',
                  message: text,
                },
              ],
            }
          : conv
      )
    )
    setCurrentText('')
  }

  return (
    <div className={s('container')}>
      <div>This is header</div>
      <MessageList currentConversation={currentConversation} />
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
