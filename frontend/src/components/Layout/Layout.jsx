import classNames from 'classnames/bind'
import styles from './Layout.module.css'
import Sidebar from './Sidebar/Sidebar'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../../context/ChatContext'
import messageApi from '../../apis/messageApi'

const s = classNames.bind(styles)

const Layout = ({ children, currentTab, expand, setExpand }) => {
  const {
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
          // setCurrentConversationId(res.data[0].id)
        } catch (error) {
          console.log(error)
        }
      })()
    })

    socket.on('receive_group_message', (data) => {
      console.log('>>> Receive group Message')
      setGroupConversation((prevConversations) =>
        prevConversations.map((conv) =>
          data.group_id === conv.id
            ? {
                ...conv,
                messages: [...conv.messages, { ...data }],
              }
            : conv
        )
      )
    })

    socket.on('receive_message', (data) => {
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          data.to_id === conv.id || data.from_id === conv.id
            ? {
                ...conv,
                messages: [...conv.messages, { ...data }],
              }
            : conv
        )
      )
    })

    return () => {
      socket.off('request-join')
      socket.off('listen-remove')
      socket.off('connected-listener')
      socket.off('receive_group_message')
      socket.off('receive_message')
    }
  }, [socket])

  useEffect(() => {
    socket.emit('connected', sessionStorage.getItem('id'))
  }, [])

  return (
    <div className={s('container')}>
      <Sidebar currentTab={currentTab} expand={expand} setExpand={setExpand} />
      <main className={s('main-content')}>{children}</main>
    </div>
  )
}

export default Layout
