import { useContext } from 'react'
import classNames from 'classnames/bind'
import { Avatar } from 'antd'

import styles from './Card.module.css'
import { ChatContext } from '../../context/ChatContext'

const s = classNames.bind(styles)

const Card = ({ conversation, expand, setExpand }) => {
  const { currentConversationId, setCurrentConversationId, setCurrentGroupId } =
    useContext(ChatContext)

  return (
    <div
      className={s('container', {
        active: conversation?.id === currentConversationId,
      })}
      onClick={() => {
        setCurrentConversationId(conversation?.id)
        setCurrentGroupId('0')
        setExpand(false)
      }}
    >
      <div className={s('information')}>
        <div className={s('avatar')}>
          <Avatar
            src={'//localhost:8080/' + conversation?.image_url}
            size={40}
          />
        </div>
        <div className={s('text')}>
          <div className={s('receiver')}>{conversation?.fullname}</div>
          <div className={s('last-message')}>
            {conversation?.messages[conversation?.messages.length - 1]?.message}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
