import classNames from 'classnames/bind'
import { Select } from 'antd'
import { HiOutlineSearch } from 'react-icons/hi'

import userApi from '../../apis/userApi'
import styles from './LeftBar.module.css'
import { useContext, useState } from 'react'
import Card from '../Card/Card'
import { ChatContext } from '../../context/ChatContext'
import { BiCommentAdd } from 'react-icons/bi'
import { IconContext } from 'react-icons'

const s = classNames.bind(styles)

function LeftBar() {
  const { conversations, groupPopUp, setGroupPopUp } = useContext(ChatContext)
  const [listSearch, setListSearch] = useState([])

  const renderListConverstion = conversations.map((conversation) => (
    <Card key={conversation.id} conversation={conversation} />
  ))

  const handleSearch = async (keyword) => {
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
          label: u.fullname,
          value: u.id,
        }))
        setListSearch(dataToRender)
      }
    } catch (error) {
      console.error('Search error: ', error)
    }
  }

  const choosePerson = (value) => {}

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
      <Select
        style={{ minWidth: '100%' }}
        showSearch
        placeholder="Search by name"
        onChange={choosePerson}
        onSearch={handleSearch}
        options={listSearch}
      />
      <div className={s('list-conversation')}>{renderListConverstion}</div>
    </div>
  )
}

export default LeftBar
