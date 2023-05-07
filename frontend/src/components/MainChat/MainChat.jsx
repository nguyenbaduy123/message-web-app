import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { Avatar, Input } from 'antd'
import io from 'socket.io-client'
import { BsFillCameraVideoFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaEllipsisH } from 'react-icons/fa'

import styles from './MainChat.module.css'
import MessageList from '../MessageList/MessageList'
import { ChatContext } from '../../context/ChatContext'

const s = classNames.bind(styles)
const socket = io.connect('http://localhost:8080')

const { TextArea } = Input
const MAX_ROWS = 5

const MainChat = () => {
  const { conversations, setConversations, currentConversation } =
    useContext(ChatContext)

  const [currentText, setCurrentText] = useState('')
  const [rows, setRows] = useState(1)

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          data.conversationId === conv.id
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
    })
  }, [socket])

  const handleSend = () => {
    let text = currentText.trim()
    if (text === '') return
    console.log(currentConversation.id)
    const currentMsg = {
      conversationId: currentConversation.id,
      id: 'message3',
      sender: '1',
      message: text,
      socket_id: socket.id,
    }
    socket.emit('send_message', currentMsg)
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      handleSend(event.target.value)
    } else if (event.keyCode === 13 && event.shiftKey) {
      setCurrentText(currentText + '\n')
      setRows(Math.min(rows + 1, MAX_ROWS))
      event.preventDefault()
    } else if (
      event.keyCode === 8 &&
      currentText.charAt(currentText.length - 1) === '\n'
    ) {
      const trimmedValue = currentText.trim()
      const newRows = trimmedValue.split('\n').length
      setRows(Math.max(newRows, 1))
    } else if (
      event.keyCode === 8 &&
      rows > 1 &&
      currentText.length % (rows - 1) === 0
    ) {
      setRows(rows - 1)
    }
  }

  return (
    <div className={s('container')}>
      <div>
        <div className={s('header')}>
          <div className={s('group')}>
            <Avatar src={currentConversation.avatar} size={52} />
            <div className={s('info-text')}>
              <div className={s('name')}>{currentConversation.groupName}</div>
              <div className={s('state')}>Online</div>
            </div>
          </div>
          <div className={s('icons')}>
            <BsFillTelephoneFill size={18} />
            <BsFillCameraVideoFill size={18} />
            <FaEllipsisH size={18} />
          </div>
        </div>
        <MessageList />
      </div>
      <TextArea
        className={s('input')}
        resize="none"
        rows={rows}
        autoSize={{ minRows: 0, maxRows: MAX_ROWS }}
        value={currentText}
        onChange={(e) => setCurrentText(e.target.value)}
        placeholder="Your message"
        onKeyDown={handleKeyDown}
        style={{ resize: 'none' }}
      />
    </div>
  )
}

export default MainChat
