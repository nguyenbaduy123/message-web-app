import { useContext } from 'react'
import classNames from 'classnames/bind'
import { Avatar } from 'antd'

import styles from './Card.module.css'
import { ChatContext } from '../../context/ChatContext'

const s = classNames.bind(styles)

const Card = ({ conversation }) => {
  const { currentConversationId, setCurrentConversationId } =
    useContext(ChatContext)

  return (
    <div
      className={s('container', {
        active: conversation.id === currentConversationId,
      })}
      onClick={() => setCurrentConversationId(conversation.id)}
    >
      <div className={s('information')}>
        <div className={s('avatar')}>
          <Avatar src={conversation.avatar} />
        </div>
        <div className={s('text')}>
          <div className={s('receiver')}>{conversation.groupName}</div>
          <div className={s('last-message')}>{conversation.lastMessage}</div>
          <div className={s('time')}>10:00 am</div>
        </div>
      </div>
    </div>
  )
}

export default Card
