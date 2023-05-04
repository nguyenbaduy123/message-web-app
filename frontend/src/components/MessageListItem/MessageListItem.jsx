import classNames from 'classnames/bind'

import styles from './MessageListItem.module.css'

const s = classNames.bind(styles)

const MessageListItem = ({ message }) => {
  return (
    <div className={s('container', { me: message.sender === '1' })}>
      <span className={s('text')}>{message.message}</span>
    </div>
  )
}

export default MessageListItem
