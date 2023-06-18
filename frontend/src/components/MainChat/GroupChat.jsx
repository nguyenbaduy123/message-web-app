import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import { Avatar, Input } from 'antd'
import { BsFillCameraVideoFill, BsFillTelephoneFill } from 'react-icons/bs'
import { FaEllipsisH } from 'react-icons/fa'
import { AiFillInfoCircle } from 'react-icons/ai'

import styles from './MainChat.module.css'
import MessageList from '../MessageList/MessageList'
import { ChatContext } from '../../context/ChatContext'
import messageApi from '../../apis/messageApi'
import GroupMessageList from '../MessageList/GroupMessageList'

const s = classNames.bind(styles)

const { TextArea } = Input
const MAX_ROWS = 5

const GroupChat = ({ expand, setExpand }) => {
  const userId = sessionStorage.getItem('id')
  const { setGroupConversation, currentGroupConversation, socket } =
    useContext(ChatContext)

  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    socket.on('receive_group_message', (data) => {
      console.log(data)
      setGroupConversation((prevConversations) =>
        prevConversations.map((conv) =>
          data.group_id === conv.id
            ? {
                ...conv,
                messages: [...conv.messages, { ...data }],
              }
            : conv
        )
      )
      setCurrentText('')
    })

    return () => socket.off('receive_group_message')
  }, [socket])

  const handleSend = () => {
    let text = currentText.trim()
    if (text === '') return
    const currentMsg = {
      user_id: parseInt(sessionStorage.getItem('id')),
      group_id: currentGroupConversation.id,
      message: text,
      created_at: new Date(),
      updated_at: new Date(),
    }
    socket.emit('send_group_message', currentMsg)
    ;(async () => {
      try {
        const data = messageApi.post('/group', currentMsg)
        console.log('Insert success')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleExpand = (e) => {
    setExpand(!expand)
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
            <Avatar
              src={`//localhost:8080/` + currentGroupConversation?.image_url}
              size={52}
            />
            <div className={s('info-text')}>
              <div className={s('name')}>{currentGroupConversation?.name}</div>
              <div className={s('state')}>Online</div>
            </div>
          </div>
          <div className={s('icons')}>
            <BsFillTelephoneFill size={20} />
            <BsFillCameraVideoFill size={20} />
            <AiFillInfoCircle size={20} onClick={handleExpand} />
          </div>
        </div>
        <GroupMessageList />
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

export default GroupChat
