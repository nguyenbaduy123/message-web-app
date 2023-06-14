import React, { useContext } from 'react'
import styles from './GroupCard.module.css'
import classNames from 'classnames/bind'
import { ChatContext } from '../../context/ChatContext'
import { Avatar } from 'antd'

const s = classNames.bind(styles)

const GroupCard = ({ conversation }) => {
  const { currentGroupId, setCurrentGroupId, setCurrentConversationId } =
    useContext(ChatContext)

  return (
    <div
      className={s('container', {
        active: conversation?.id === currentGroupId,
      })}
      onClick={() => {
        setCurrentGroupId(conversation?.id)
        setCurrentConversationId('0')
      }}
    >
      <div className={s('information')}>
        <div className={s('avatar')}>
          <Avatar
            src={`//localhost:8080/` + conversation?.image_url}
            size={40}
          />
        </div>
        <div className={s('text')}>
          <div className={s('receiver')}>{conversation?.name}</div>
          <div className={s('last-message')}>
            {conversation?.messages[conversation?.messages.length - 1]?.message}
          </div>
          <div className={s('time')}>10:00 am</div>
        </div>
      </div>
    </div>
  )
}

export default GroupCard
