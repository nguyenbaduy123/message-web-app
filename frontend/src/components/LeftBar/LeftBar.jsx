import classNames from 'classnames/bind'
import { Input, Menu } from 'antd'

import styles from './LeftBar.module.css'
import { useState } from 'react'
import Card from '../Card/Card'

const s = classNames.bind(styles)

function LeftBar({
  currentConversationId,
  setCurrentConversationId,
  conversations,
}) {
  const renderListConverstion = conversations.map((conversation) => (
    <Card
      key={conversation.id}
      conversation={conversation}
      currentConversationId={currentConversationId}
      setCurrentConversationId={setCurrentConversationId}
    />
  ))

  return (
    <div className={s('container')}>
      <Input />
      <div className="list-conversation">{renderListConverstion}</div>
    </div>
  )
}

export default LeftBar
