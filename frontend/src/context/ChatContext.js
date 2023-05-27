import { createContext, useEffect, useState } from 'react'
import messageApi from '../apis/messageApi'

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {
  const [currentConversationId, setCurrentConversationId] = useState('1')
  const [conversations, setConversations] = useState([])

  const getCurrentConversation = () => {
    return conversations.find(
      (conversation) => conversation.id === currentConversationId
    )
  }

  useEffect(() => {
    (async () => {
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
  }, [])

  return (
    <ChatContext.Provider
      value={{
        currentConversationId,
        setCurrentConversationId,
        conversations,
        setConversations,
        currentConversation: getCurrentConversation(),
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
