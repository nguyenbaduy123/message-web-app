import React, { useContext } from 'react'
import styles from './Popover.module.css'
import classNames from 'classnames/bind'
import { IconContext } from 'react-icons'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoMdExit } from 'react-icons/io'
import { ChatContext } from '../../context/ChatContext'
import { notification } from 'antd'
import messageApi from '../../apis/messageApi'
import { useNavigate } from 'react-router-dom'

const s = classNames.bind(styles)

const Popover = ({
  active,
  id,
  screen,
  expand,
  setExpand,
  member,
  setMember,
  item,
}) => {
  const navigate = useNavigate()
  const {
    setCurrentConversationId,
    setCurrentGroupId,
    socket,
    currentGroupId,
    groupConversation,
    setGroupConversation,
  } = useContext(ChatContext)

  const handleChatRedirect = (e) => {
    setCurrentGroupId('0')
    setCurrentConversationId(id)
    setExpand(false)
  }

  const handleRemove = async (e) => {
    setMember(member.filter((user) => user.user_id != id))

    const body = {
      user_id: id,
      group_id: currentGroupId,
    }

    const userGroup = await messageApi.delete('user-group', {
      data: body,
    })
    console.log(userGroup)

    if (id != sessionStorage.getItem('id')) {
      socket.emit('remove-user', id, currentGroupId)
      notification.info({
        message: 'Thông báo',
        description: 'Xóa thành công',
        placement: 'top',
        duration: 1,
      })
    } else {
      socket.emit('leave-room', currentGroupId)
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
      notification.info({
        message: 'Thông báo',
        description: 'Đã rời nhóm',
        placement: 'top',
        duration: 1,
      })
    }
  }

  if (screen == 'profile')
    return (
      <div className={s('container', `${active ? 'active' : ''}`)}>
        <div className={s('wrapper')}>
          <div className={s('item')}>
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <div className={s('image')}>
                <AiOutlineMessage />
              </div>
            </IconContext.Provider>

            <div className={s('content')}>Nhắn tin</div>
          </div>

          <div className={s('item')}>
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <div className={s('image')}>
                <HiOutlineUserCircle />
              </div>
            </IconContext.Provider>

            <div className={s('content')}>Xem trang cá nhân</div>
          </div>

          <div className={s('item')}>
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <div className={s('image')}>
                <RiDeleteBin5Line />
              </div>
            </IconContext.Provider>

            <div className={s('content')}>Xóa bạn bè</div>
          </div>
        </div>
      </div>
    )
  else if (screen == 'right-bar') {
    if (id != sessionStorage.getItem('id'))
      return (
        <div className={s('container', `${active ? 'active' : ''}`)}>
          <div className={s('wrapper')}>
            <div className={s('item')} onClick={handleChatRedirect}>
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div className={s('image')}>
                  <AiOutlineMessage />
                </div>
              </IconContext.Provider>

              <div className={s('content')}>Nhắn tin</div>
            </div>

            <div
              className={s('item')}
              onClick={() =>
                navigate('/profile/about', {
                  state: { user_id: id, item: item },
                })
              }
            >
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div className={s('image')}>
                  <HiOutlineUserCircle />
                </div>
              </IconContext.Provider>

              <div className={s('content')}>Xem trang cá nhân</div>
            </div>

            <div className={s('item')} onClick={handleRemove}>
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div className={s('image')}>
                  <RiDeleteBin5Line />
                </div>
              </IconContext.Provider>

              <div className={s('content')}>Xóa khỏi nhóm</div>
            </div>
          </div>
        </div>
      )
    else
      return (
        <div className={s('container', `${active ? 'active' : ''}`)}>
          <div className={s('wrapper')}>
            <div
              className={s('item')}
              onClick={() => navigate('/profile/about')}
            >
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div className={s('image')}>
                  <HiOutlineUserCircle />
                </div>
              </IconContext.Provider>

              <div className={s('content')}>Xem trang cá nhân</div>
            </div>

            <div className={s('item')} onClick={handleRemove}>
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div className={s('image')}>
                  <IoMdExit />
                </div>
              </IconContext.Provider>

              <div className={s('content')}>Rời khỏi nhóm</div>
            </div>
          </div>
        </div>
      )
  }
}

export default Popover
