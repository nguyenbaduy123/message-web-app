import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { Avatar, Input } from 'antd'
import io from 'socket.io-client'
import { BsFillCameraVideoFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaEllipsisH } from 'react-icons/fa'

import styles from './MainChat.module.css'
import MessageList from '../MessageList/MessageList'
import { ChatContext } from '../../context/ChatContext'
import messageApi from '../../apis/messageApi'

const s = classNames.bind(styles)

const { TextArea } = Input
const MAX_ROWS = 5

const MainChat = ({ expand, setExpand }) => {
  const userId = sessionStorage.getItem('id')
  const { setConversations, currentConversation, socket } =
    useContext(ChatContext)

  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          data.to_id === conv.id || data.from_id === conv.id
            ? {
                ...conv,
                messages: [...conv.messages, { ...data }],
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
    const currentMsg = {
      from_id: parseInt(sessionStorage.getItem('id')),
      to_id: currentConversation.id,
      message: text,
      created_at: new Date(),
      updated_at: new Date(),
    }
    socket.emit('send_message', currentMsg)
    ;(async () => {
      try {
        const data = messageApi.post('/private', currentMsg)
        console.log('Insert success')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (!event.shiftKey) {
        event.preventDefault()
        handleSend(event.target.value)
      }
    }
  }

  return (
    <div className={s('container')}>
      <div>
        <div className={s('header')}>
          <div className={s('group')}>
            <Avatar src={currentConversation?.image_url} size={52} />
            <div className={s('info-text')}>
              <div className={s('name')}>{currentConversation?.username}</div>
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
