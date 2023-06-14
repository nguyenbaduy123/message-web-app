import classNames from 'classnames/bind'

import styles from './MessageListItem.module.css'

const s = classNames.bind(styles)

const GroupMessageListItem = ({ message }) => {
  const displayMessage = message.message.replace(/\n/g, '<br/>')
  return (
    <div
      className={s('container', {
        me: message.user_id == sessionStorage.getItem('id'),
      })}
    >
      <span
        className={s('text')}
        dangerouslySetInnerHTML={{ __html: displayMessage }}
      ></span>
    </div>
  )
}

export default GroupMessageListItem
