import classNames from 'classnames/bind'

import styles from './MessageListItem.module.css'

const s = classNames.bind(styles)

const MessageListItem = ({ message }) => {
  const displayMessage = message.message.replace(/\n/g, '<br/>')
  return (
    <div
      className={s('container', {
        me: message.from_id === sessionStorage.getItem('id'),
      })}
    >
      <div>{message.from_id}</div>
      <div>{sessionStorage.getItem('id')}</div>
      <span
        className={s('text')}
        dangerouslySetInnerHTML={{ __html: displayMessage }}
      ></span>
    </div>
  )
}

export default MessageListItem
