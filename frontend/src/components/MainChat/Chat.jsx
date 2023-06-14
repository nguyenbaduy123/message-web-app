import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import MainChat from './MainChat'
import GroupChat from './GroupChat'

const Chat = () => {
  const { currentConversationId, currentGroupId } = useContext(ChatContext)

  if (currentConversationId != 0) return <MainChat />
  else return <GroupChat />
}

export default Chat
