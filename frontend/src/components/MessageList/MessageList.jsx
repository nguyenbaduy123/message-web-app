import { useContext, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'

import MessageListItem from '../MessageListItem/MessageListItem'
import styles from './MessageList.module.css'
import { ChatContext } from '../../context/ChatContext'

const s = classNames.bind(styles)

const MessageList = () => {
  const { currentConversation } = useContext(ChatContext)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    container.scrollTop = container.scrollHeight
  }, [currentConversation])

  return (
    <div className={s('container')} ref={containerRef}>
      {currentConversation.messages.map((message) => (
        <MessageListItem key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
