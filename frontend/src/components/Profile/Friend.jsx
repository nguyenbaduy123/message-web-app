import React, { useEffect, useState } from 'react'
import './Friend.scss'
import { IconContext } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import { Avatar, notification } from 'antd'
import Popover from '../RightBar/Popover'
import userApi from '../../apis/userApi'
import axios from 'axios'

const Friend = () => {
  const [activePopOver, setActivePopOver] = useState(0)
  const [friendList, setFriendList] = useState([])
  const [notFriendList, setNotFriendList] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await userApi.get('/friend', {
          params: {
            id: sessionStorage.getItem('id'),
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        })

        setFriendList(res.data.friend)
        setNotFriendList(res.data.not_friend)
        console.log(res.data.not_friend)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const handleAddFriend = (e, item) => {
    setNotFriendList((prevList) =>
      prevList.map((user) =>
        user.id !== item.id ? user : { ...user, accepted: 0 }
      )
    )

    const body = {
      user_id_1: parseInt(sessionStorage.getItem('id')),
      user_id_2: item.id,
      accepted: '0',
    }
    ;(async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/user/friend',
          body,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
        )
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleRemoveFriend = (e, item) => {
    setNotFriendList((prevList) =>
      prevList.filter((user) => user.id !== item.id)
    )
  }

  const handleUndoRequest = (e, item) => {
    setNotFriendList((prevList) =>
      prevList.map((user) =>
        user.id !== item.id ? user : { ...user, accepted: null }
      )
    )

    const body = {
      user_id_1: parseInt(sessionStorage.getItem('id')),
      user_id_2: item.id,
      accepted: null,
    }

    ;(async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/user/friend',
          body,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
        )

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <div className="friend">
      <div className="friend-add">
        <h2>Your friend</h2>

        <div className="friend-list">
          {/* <div className="member">
            <div className="user">
              <Avatar src={`//localhost:8080/default_avatar_0.jpg`} size={40} />

              <div className={'info'}>Lee Cuong</div>
            </div>

            <div
              className={'nav'}
              onClick={() => {
                setActivePopOver(!activePopOver)
              }}
            >
              <IconContext.Provider value={{ size: '1.4rem' }}>
                <BsThreeDots />
              </IconContext.Provider>
            </div>
            <Popover active={'active'} id={1} screen="profile"></Popover>
          </div> */}

          {friendList.map((item) => (
            <div className="member">
              <div className="user">
                <Avatar src={`//localhost:8080/` + item.image_url} size={40} />

                <div className={'info'}>{item.fullname}</div>
              </div>

              <div
                className={'nav'}
                onClick={() => {
                  setActivePopOver(!activePopOver)
                }}
              >
                <IconContext.Provider value={{ size: '1.4rem' }}>
                  <BsThreeDots />
                </IconContext.Provider>
              </div>
              {/* <Popover active={'active'} id={1} screen="profile"></Popover> */}
            </div>
          ))}
        </div>
      </div>
      <div className="friend-not-add">
        <h2>Add friend</h2>

        <div className="friend-list">
          {/* <div className="member">
            <div className="user">
              <Avatar src={`//localhost:8080/default_avatar_0.jpg`} size={40} />

              <div className={'info'}>Lee Cuong</div>
            </div>

            <div className={'nav'}>
              <div className="add">
                <span>Thêm bạn</span>
              </div>

              <div className="remove">
                <span>Xoá, gỡ</span>
              </div>
            </div>
          </div> */}

          {notFriendList.map((item) => (
            <div className="member">
              <div className="user">
                <Avatar src={`//localhost:8080/` + item.image_url} size={40} />

                <div className={'info'}>{item.fullname}</div>
              </div>

              {item.accepted == null ? (
                <div className={'nav'}>
                  <div
                    className="add"
                    onClick={(e) => handleAddFriend(e, item)}
                  >
                    <span>Thêm bạn</span>
                  </div>

                  <div
                    className="remove"
                    onClick={(e) => handleRemoveFriend(e, item)}
                  >
                    <span>Xoá, gỡ</span>
                  </div>
                </div>
              ) : (
                <div className={'nav'}>
                  <div
                    className="request"
                    onClick={(e) => handleUndoRequest(e, item)}
                  >
                    <span>Đã gửi yêu cầu</span>
                  </div>
                </div>
              )}

              {/* <div className={'nav'}>
                <div className="add" onClick={(e) => handleAddFriend(e, item)}>
                  <span>Thêm bạn</span>
                </div>

                <div
                  className="remove"
                  onClick={(e) => handleRemoveFriend(e, item)}
                >
                  <span>Xoá, gỡ</span>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Friend
