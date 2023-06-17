import React, { useEffect, useState } from 'react'
import './Friend.scss'
import { IconContext } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import { Avatar } from 'antd'
import Popover from '../RightBar/Popover'
import userApi from '../../apis/userApi'

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
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

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

              <div className={'nav'}>
                <div className="add">
                  <span>Thêm bạn</span>
                </div>

                <div className="remove">
                  <span>Xoá, gỡ</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Friend
