import React, { useContext, useEffect, useState } from 'react'
import styles from './RightBar.module.css'
import classNames from 'classnames/bind'
import { Avatar, ConfigProvider, Select, theme } from 'antd'
import { ChatContext } from '../../context/ChatContext'
import { IconContext } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import messageApi from '../../apis/messageApi'
import Popover from './Popover'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdPhotoCamera } from 'react-icons/md'

const s = classNames.bind(styles)

const RightBar = ({ expand, setExpand }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const {
    currentGroupConversation,
    conversations,
    currentGroupId,
    socket,
    setGroupConversation,
  } = useContext(ChatContext)
  const [options, setOptions] = useState(null)
  const [filter, setFilter] = useState(null)
  const [member, setMember] = useState([])
  const [activePopOver, setActivePopOver] = useState(0)
  const [activeEdit, setActiveEdit] = useState(false)
  const [groupName, setGroupName] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await messageApi.get('/member', {
          params: {
            id: currentGroupConversation.id,
          },
        })

        setMember(res.data)
        setOptions(
          conversations.filter((item) => {
            return !res.data.some((user) => {
              return item.id === user.user_id
            })
          })
        )
      } catch (error) {
        console.log(error)
      }
    })()

    setGroupName(currentGroupConversation?.name)
  }, [])

  useEffect(() => {
    console.log(options)
    setFilter(options?.filter((o) => !selectedItems.includes(o)))
  }, [options])

  useEffect(() => {
    console.log(member)
  }, [member])

  const addUserGroup = async (e) => {
    console.log(selectedItems)

    const data = [
      {
        group_id: currentGroupId,
        user_id: selectedItems,
      },
    ]

    const res = await messageApi.post('user-group', data)

    const result = await messageApi.get('/member', {
      params: {
        id: currentGroupId,
      },
    })

    setMember(result.data)
    setOptions(
      conversations.filter((item) => {
        return !result.data.some((user) => {
          return item.id === user.user_id
        })
      })
    )

    setSelectedItems([])

    const user = conversations.filter((item) => item.id === selectedItems)

    socket.emit(
      'create-room',
      sessionStorage.getItem('id'),
      currentGroupId,
      user
    )

    console.log(res)
  }

  const handleEditName = async (e) => {
    if (activeEdit == true) {
      setGroupConversation((prevConversation) =>
        prevConversation.map((conv) =>
          conv.id === currentGroupConversation.id
            ? {
                ...conv,
                name: groupName,
              }
            : conv
        )
      )

      const res = await messageApi.put('/group', {
        id: currentGroupConversation?.id,
        name: groupName,
      })

      console.log(res)
    }

    setActiveEdit(!activeEdit)
  }

  const handleChangeAvatar = (e) => {
    console.log(e.target.files[0])
    if (e.target.files) {
      if (
        e.target.files[0].type === 'image/png' ||
        e.target.files[0].type === 'image/jpeg'
      ) {
        const formData = new FormData()
        formData.set('file', e.target.files[0])
        formData.set('id', currentGroupConversation?.id)
        ;(async () => {
          try {
            const res = await messageApi.post('upload-avatar', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })

            setGroupConversation((prevConversation) =>
              prevConversation.map((conv) =>
                conv.id === currentGroupConversation.id
                  ? {
                      ...conv,
                      image_url: e.target.files[0].name,
                    }
                  : conv
              )
            )
          } catch (error) {
            console.log(error)
          }
        })()
      }
    }
  }

  return (
    <div className={s('container')}>
      <div className={s('image-wrapper')}>
        <label className={s('avatar-wrapper')}>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleChangeAvatar(e)}
          />
          <Avatar
            src={`//localhost:8080/` + currentGroupConversation?.image_url}
            size={80}
          />
          <span className={s('avatar-icon')}>
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <MdPhotoCamera />
            </IconContext.Provider>
          </span>
        </label>

        <div className={s('info-text')}>
          <div className={s('name', `${activeEdit ? 'display-none' : ''}`)}>
            {currentGroupConversation?.name}
          </div>
          <div
            className={s('edit-name', `${activeEdit ? '' : 'display-none'}`)}
          >
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName((prev) => e.target.value)}
            />
          </div>

          <div className={s('edit-icon')} onClick={(e) => handleEditName(e)}>
            <IconContext.Provider value={{ size: '1.2rem' }}>
              <AiOutlineEdit></AiOutlineEdit>
            </IconContext.Provider>
          </div>
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
            placeholder="Inserted member"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
              width: '80%',
            }}
            options={filter?.map((item) => ({
              value: item.id,
              label: item.fullname,
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
