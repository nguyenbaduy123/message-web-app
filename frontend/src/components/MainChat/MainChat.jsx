import classNames from 'classnames/bind'

import styles from './MainChat.module.css'
import MessageList from './MessageList/MessageList'

const s = classNames.bind(styles)

const MainChat = ({ conversations, setConversations, currentConversation }) => {
  console.log(currentConversation)
  return (
    <div className={s('container')}>
      <div>This is header</div>
      <MessageList currentConversation={currentConversation} />
    </div>
  )
}

export default MainChat
