import { createContext, useEffect, useState } from 'react'
import messageApi from '../apis/messageApi'
import { useNavigate } from 'react-router-dom'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const [currentConversationId, setCurrentConversationId] = useState('1')
  const [conversations, setConversations] = useState([])
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
          setConversations([...res.data])
          setCurrentConversationId(res.data[0].id)
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
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
