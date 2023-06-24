import classNames from 'classnames/bind'

import styles from './MessageListItem.module.css'
import { Avatar } from 'antd'
import moment from 'moment'

const s = classNames.bind(styles)

const MessageListItem = ({ message }) => {
  const displayMessage = message.message.replace(/\n/g, '<br/>')
  return (
    <div className={s('container')}>
      {message.from_id != sessionStorage.getItem('id') && (
        <div className={s('avatar-small')}>
          <Avatar src={`http://localhost:8080/${message.image_url}`} />
        </div>
      )}
      <div
        className={s('message', {
          me: message.from_id == sessionStorage.getItem('id'),
        })}
      >
        <div className={s('send-info')}>
          <span className={s('name')}>{message?.fullname}</span>
          <span className={s('time')}>
            {moment(message?.created_at).format('LT')}
          </span>
        </div>
        <div style={{ display: 'block' }}>
          <div
            className={s('text')}
            dangerouslySetInnerHTML={{ __html: displayMessage }}
          />
        </div>

        {message?.message_img ? (
          <div className={s('image-wrapper')}>
            <div className={s('image')}>
              <img src={'//localhost:8080/' + message?.message_img} alt="" />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default MessageListItem
