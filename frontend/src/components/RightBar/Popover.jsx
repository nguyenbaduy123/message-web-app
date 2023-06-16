import React from 'react'
import styles from './Popover.module.css'
import classNames from 'classnames/bind'
import { IconContext } from 'react-icons'
import { AiOutlineMessage } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoMdExit } from 'react-icons/io'

const s = classNames.bind(styles)

const Popover = ({ active, id }) => {
  if (id != sessionStorage.getItem('id'))
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

            <div className={s('content')}>Xóa khỏi nhóm</div>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className={s('container', `${active ? 'active' : ''}`)}>
        <div className={s('wrapper')}>
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
                <IoMdExit />
              </div>
            </IconContext.Provider>

            <div className={s('content')}>Rời khỏi nhóm</div>
          </div>
        </div>
      </div>
    )
}

export default Popover
