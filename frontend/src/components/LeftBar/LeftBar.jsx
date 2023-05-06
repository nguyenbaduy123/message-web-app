import classNames from 'classnames/bind'
import { Input, Menu } from 'antd'

import styles from './LeftBar.module.css'
import { useContext, useState } from 'react'
import Card from '../Card/Card'
import { ChatContext } from '../../context/ChatContext'

const s = classNames.bind(styles)

function LeftBar() {
  const { currentConversationId, setCurrentConversationId, conversations } =
    useContext(ChatContext)

  const renderListConverstion = conversations.map((conversation) => (
    <Card key={conversation.id} conversation={conversation} />
  ))

  return (
    <div className={s('container')}>
      <Input />
      <div className="list-conversation">{renderListConverstion}</div>
    </div>
  )
}

export default LeftBar
