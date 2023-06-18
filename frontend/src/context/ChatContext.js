import { createContext, useEffect, useState } from 'react'
import messageApi from '../apis/messageApi'
import { redirect, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import userApi from '../apis/userApi'

export const ChatContext = createContext()

const socket = io.connect('http://localhost:8080')
export const ChatContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState()
  const [currentConversationId, setCurrentConversationId] = useState('1')
  const [conversations, setConversations] = useState([])
  const [currentGroupId, setCurrentGroupId] = useState('0')
  const [groupConversation, setGroupConversation] = useState([])
  const [token, setToken] = useState({
    accessToken: '',
    refreshToken: '',
  })
  const [groupPopUp, setGroupPopUp] = useState(false)
  const navigate = useNavigate()

  const getCurrentConversation = () => {
    return conversations.find(
      (conversation) => conversation.id === currentConversationId
    )
  }

  const getCurrentGroupConversation = () => {
    return groupConversation.find(
      (conversations) => conversations.id === currentGroupId
    )
  }

  useEffect(() => {
    if (sessionStorage.getItem('username') == null) {
      navigate('/login')
    } else {
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
      ;(async () => {
        try {
          const res = await messageApi.get('/group', {
            params: {
              id: sessionStorage.getItem('id'),
            },
          })
          socket.emit('init-room', sessionStorage.getItem('id'), res.data)
          setGroupConversation([...res.data])
        } catch (error) {
          console.log(error)
        }
      })()
      ;(async () => {
        try {
          const res = await userApi.get('/' + sessionStorage.getItem('id'))
          setUserInfo(res.data.user)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [])

  return (
    <ChatContext.Provider
      value={{
        currentConversationId,
        setCurrentConversationId,
        conversations,
        setConversations,
        currentConversation: getCurrentConversation(),
        token,
        setToken,
        groupPopUp,
        setGroupPopUp,
        socket,
        groupConversation,
        setGroupConversation,
        currentGroupId,
        setCurrentGroupId,
        currentGroupConversation: getCurrentGroupConversation(),
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
