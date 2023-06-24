import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import MainChat from './MainChat'
import GroupChat from './GroupChat'
import { notification } from 'antd'
import messageApi from '../../apis/messageApi'

const Chat = ({ expand, setExpand }) => {
  const { currentConversationId } = useContext(ChatContext)

  if (currentConversationId != 0)
    return <MainChat expand={expand} setExpand={setExpand} />
  else return <GroupChat expand={expand} setExpand={setExpand} />
}

export default Chat
