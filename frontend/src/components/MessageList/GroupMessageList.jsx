import { useContext, useEffect, useRef } from 'react'
import classNames from 'classnames/bind'

import MessageListItem from '../MessageListItem/MessageListItem'
import styles from './MessageList.module.css'
import { ChatContext } from '../../context/ChatContext'
import GroupMessageListItem from '../MessageListItem/GroupMessageListItem'

const s = classNames.bind(styles)

const GroupMessageList = () => {
  const { currentGroupConversation } = useContext(ChatContext)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    container.scrollTop = container.scrollHeight
  }, [currentGroupConversation])

  return (
    <div className={s('container')} ref={containerRef}>
      {currentGroupConversation?.messages?.map((message, index) => (
        <GroupMessageListItem key={index} message={message} />
      ))}
    </div>
  )
}

export default GroupMessageList
