import classNames from 'classnames/bind'
import { Select, Dropdown, Space, Input } from 'antd'

import userApi from '../../apis/userApi'
import styles from './LeftBar.module.css'
import { useContext, useState } from 'react'
import Card from '../Card/Card'
import { ChatContext } from '../../context/ChatContext'
import { BiCommentAdd } from 'react-icons/bi'
import { IconContext } from 'react-icons'
import GroupCard from '../Card/GroupCard'

const { Option } = Select
const s = classNames.bind(styles)

function LeftBar({ expand, setExpand }) {
  const {
    setCurrentConversationId,
    setConversations,
    conversations,
    groupPopUp,
    setGroupPopUp,
    groupConversation,
  } = useContext(ChatContext)
  const [listSearch, setListSearch] = useState([])

  const renderListConverstion = conversations?.map((conversation) => (
    <Card
      key={conversation.id}
      conversation={conversation}
      expand={expand}
      setExpand={setExpand}
    />
  ))

  const handleSearch = async (e) => {
    let keyword = e.target.value
    if (!keyword.trim()) {
      setListSearch([])
      return
    }
    try {
      const data = await userApi.post('/search', {
        userId: sessionStorage.getItem('id'),
        keyword: keyword,
      })
      if (data.status === 200) {
        const users = data.data.result
        const dataToRender = users.map((u) => ({
          label: <div onClick={() => handleClick(u)}>{u.fullname}</div>,
          value: u.id,
        }))
        setListSearch(dataToRender)
      }
    } catch (error) {
      console.error('Search error: ', error)
    }
  }

  const handleClick = (user) => {
    const conversation = conversations.find((c) => c.id == user.id)
    if (conversation) {
      setCurrentConversationId(user.id)
    } else {
      setConversations([
        ...conversations,
        {
          id: user.id,
          messages: [],
          image_url: user.image_url,
          username: user.username,
        },
      ])
      setCurrentConversationId(user.id)
    }
  }
  const renderGroupConversation = groupConversation?.map((conversation) => (
    <GroupCard
      key={conversation.id}
      conversation={conversation}
      expand={expand}
      setExpand={setExpand}
    ></GroupCard>
  ))

  return (
    <div className={s('container')}>
      <div className={s('chat-nav')}>
        <h2>Chat</h2>

        <IconContext.Provider value={{ size: '1.5rem' }}>
          <div
            className={s('add-group')}
            onClick={() => setGroupPopUp(!groupPopUp)}
          >
            <BiCommentAdd />
          </div>
        </IconContext.Provider>
      </div>

      <Dropdown menu={{ items: listSearch }} trigger={['click']}>
        <Space>
          <Input placeholder="Search by name" onChange={handleSearch} />
        </Space>
      </Dropdown>
      <div className={s('list-conversation')}>{renderListConverstion}</div>
      <div className={s('list-conversation')}>{renderGroupConversation}</div>
    </div>
  )
}

export default LeftBar
