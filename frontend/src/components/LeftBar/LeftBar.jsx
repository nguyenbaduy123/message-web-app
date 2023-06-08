import classNames from 'classnames/bind'
import { Input } from 'antd'
import { HiOutlineSearch } from 'react-icons/hi'

import styles from './LeftBar.module.css'
import { useContext } from 'react'
import Card from '../Card/Card'
import { ChatContext } from '../../context/ChatContext'
import { BiCommentAdd } from 'react-icons/bi'
import { IconContext } from 'react-icons'

const s = classNames.bind(styles)

function LeftBar() {
  const { conversations, groupPopUp, setGroupPopUp } = useContext(ChatContext)

  const renderListConverstion = conversations.map((conversation) => (
    <Card key={conversation.id} conversation={conversation} />
  ))

  return (
    <div className={s('container')}>
      <div className={s('chat-nav')}>
        <h2>Chat</h2>

        <IconContext.Provider value={{ size: '1.5rem' }}>
          <div
            className={s('add-group')}
            onClick={() => setGroupPopUp(!groupPopUp)}
          >
            <BiCommentAdd />
          </div>
        </IconContext.Provider>
      </div>
      <Input className={s('search-input')} prefix={<HiOutlineSearch />} />
      <div className={s('list-conversation')}>{renderListConverstion}</div>
    </div>
  )
}

export default LeftBar
