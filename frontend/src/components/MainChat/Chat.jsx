import React, { useContext, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import MainChat from './MainChat'
import GroupChat from './GroupChat'
import { notification } from 'antd'
import messageApi from '../../apis/messageApi'

const Chat = ({ expand, setExpand }) => {
  const {
    currentConversationId,
    setGroupConversation,
    socket,
    setCurrentConversationId,
    setCurrentGroupId,
    setConversations,
  } = useContext(ChatContext)
  useEffect(() => {
    socket.on('request-join', (group_id) => {
      console.log('>>> Join room')
      ;(async () => {
        const res3 = await messageApi.get('/group', {
          params: {
            id: sessionStorage.getItem('id'),
          },
        })

        setGroupConversation([...res3.data])
      })()

      socket.emit('accept-join', sessionStorage.getItem('id'), group_id)
    })

    socket.on('listen-remove', (group_id) => {
      setCurrentGroupId('0')
      setExpand(false)
      ;(async () => {
        try {
          const res = await messageApi.get('/group', {
            params: {
              id: sessionStorage.getItem('id'),
            },
          })
          setGroupConversation([...res.data])
        } catch (error) {
          console.log(error)
        }
      })()
      console.log('>>> Leave room ' + group_id)
      socket.emit('leave-room', group_id)
    })

    socket.on('connected-listener', () => {
      ;(async () => {
        try {
          const res = await messageApi.get('/private', {
            params: {
              id: sessionStorage.getItem('id'),
            },
          })
          console.log(res)
          setConversations([...res.data])
          setCurrentConversationId(res.data[0].id)
        } catch (error) {
          console.log(error)
        }
      })()
    })

    return () => {
      socket.off('request-join')
      socket.off('listen-remove')
    }
  }, [socket])

  useEffect(() => {
    socket.emit('connected', sessionStorage.getItem('id'))
  }, [])

  if (currentConversationId != 0)
    return <MainChat expand={expand} setExpand={setExpand} />
  else return <GroupChat expand={expand} setExpand={setExpand} />
}

export default Chat
