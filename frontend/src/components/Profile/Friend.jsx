import React, { useState } from 'react'
import './Friend.scss'
import { IconContext } from 'react-icons'
import { BsThreeDots } from 'react-icons/bs'
import { Avatar } from 'antd'
import Popover from '../RightBar/Popover'

const Friend = () => {
  const [activePopOver, setActivePopOver] = useState(0)
  return (
    <div className="friend">
      <div className="friend-add">
        <h2>Your friend</h2>

        <div className="friend-list">
          <div className="member">
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
          </div>
        </div>
      </div>
      <div className="friend-not-add">
        <h2>New friend</h2>

        <div className="friend-list">
          <div className="member">
            <div className="user">
              <Avatar src={`//localhost:8080/default_avatar_0.jpg`} size={40} />

              <div className={'info'}>Lee Cuong</div>
            </div>

            <div className={'nav'}>
              <div className="add">
                <span>Add friend</span>
              </div>

              <div className="remove">
                <span>Xoá, gỡ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Friend
