import React, { useContext, useEffect, useState } from 'react'
import styles from './RightBar.module.css'
import classNames from 'classnames/bind'
import { Avatar, ConfigProvider, Select, theme } from 'antd'
import { ChatContext } from '../../context/ChatContext'
import { IconContext } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import messageApi from '../../apis/messageApi'
import Popover from './Popover'

const s = classNames.bind(styles)

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
const RightBar = ({ expand, setExpand }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))
  const { currentGroupConversation } = useContext(ChatContext)
  const [member, setMember] = useState([])
  const [activePopOver, setActivePopOver] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await messageApi.get('/member', {
          params: {
            id: currentGroupConversation.id,
          },
        })

        setMember(res.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    console.log(member)
  }, [member])

  const addUserGroup = (e) => {
    console.log('add')
  }

  return (
    <div className={s('container')}>
      <div className={s('image-wrapper')}>
        <Avatar
          src={`//localhost:8080/` + currentGroupConversation?.image_url}
          size={80}
        />

        <div className={s('info-text')}>
          <div className={s('name')}>{currentGroupConversation?.name}</div>
          <div className={s('state')}>Online</div>
        </div>
      </div>

      <div className={s('search')}>
        {/* <IconContext.Provider value={{ size: '1.2rem' }}>
          <div className={s('search-wrapper')}>
            <HiOutlineSearch />
          </div>
        </IconContext.Provider>

        <p>Tìm kiếm</p> */}
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <Select
            placeholder="Inserted are removed"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
              width: '80%',
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </ConfigProvider>

        <div className={s('add')} onClick={addUserGroup}>
          <span>Add</span>
        </div>
      </div>

      <div className={s('member-list')}>
        <h3>Thành viên trong đoạn chat</h3>

        {member.map((item) => (
          <div className={s('member')}>
            <div className={s('user')}>
              <Avatar src={`//localhost:8080/` + item?.image_url} size={40} />

              <div className={s('info')}>{item.fullname}</div>
            </div>

            <div
              className={s('nav')}
              onClick={() => {
                if (activePopOver === item.user_id) setActivePopOver(0)
                else setActivePopOver(item.user_id)
              }}
            >
              <IconContext.Provider value={{ size: '1.4rem' }}>
                <BsThreeDots />
              </IconContext.Provider>
            </div>
            <Popover
              active={activePopOver === item.user_id ? 'active' : ''}
              id={item.user_id}
              screen="right-bar"
              expand={expand}
              setExpand={setExpand}
              member={member}
              setMember={setMember}
              item={item}
            ></Popover>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightBar
