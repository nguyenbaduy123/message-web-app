import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import MainChat from './MainChat'
import GroupChat from './GroupChat'

const Chat = (props) => {
  const { currentConversationId, currentGroupId, socket } =
    useContext(ChatContext)
  useEffect(() => {
    socket.on('request-join', (group_id) => {
      socket.emit('accept-join', sessionStorage.getItem('id'), group_id)
    })
  }, [socket])

  useEffect(() => {
    socket.emit('connected', sessionStorage.getItem('id'))
  }, [])

  if (currentConversationId != 0)
    return <MainChat expand={props.expand} setExpand={props.setExpand} />
  else return <GroupChat expand={props.expand} setExpand={props.setExpand} />
}

export default Chat
