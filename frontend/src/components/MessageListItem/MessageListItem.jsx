import classNames from 'classnames/bind'

import styles from './MessageListItem.module.css'

const s = classNames.bind(styles)

const MessageListItem = ({ message }) => {
  const displayMessage = message.message.replace(/\n/g, '<br/>')
  return (
    <div className={s('container', { me: message.sender === '1' })}>
      <span
        className={s('text')}
        dangerouslySetInnerHTML={{ __html: displayMessage }}
      ></span>
    </div>
  )
}

export default MessageListItem
