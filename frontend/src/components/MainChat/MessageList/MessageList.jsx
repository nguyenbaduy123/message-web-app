import classNames from 'classnames/bind'
import MessageListItem from './MessageListItem/MessageListItem'

import styles from './MessageList.module.css'

const s = classNames.bind(styles)

const MessageList = ({ currentConversation }) => {
  return (
    <div className={s('container')}>
      {currentConversation.messages.map((message) => (
        <MessageListItem key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
