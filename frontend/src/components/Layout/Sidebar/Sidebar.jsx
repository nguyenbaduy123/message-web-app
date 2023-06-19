import classNames from 'classnames/bind'
import { BsFillChatDotsFill, BsFillCalendar2Fill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiLogOut } from 'react-icons/bi'

import { Link, useLocation } from 'react-router-dom'

import styles from './Sidebar.module.css'
import { useEffect, useState } from 'react'

const s = classNames.bind(styles)

const Sidebar = ({ currentTab, expand, setExpand }) => {
  const [activeName, setActiveName] = useState('home')
  const location = useLocation()

  useEffect(() => {
    const array = location.pathname.split('/')

    setActiveName(array[1])
  }, [location])

  return (
    <div className={s('container')}>
      <Link to="/" className={s(`${activeName === '' ? 'active' : ''}`)}>
        <BsFillChatDotsFill
          className={s('icons', { active: currentTab === 'chat' })}
          onClick={() => {
            setExpand(false)
            setActiveName('')
          }}
        />
      </Link>

      <Link
        to="/profile/about"
        className={s(`${activeName === 'profile' ? 'active' : ''}`)}
        onClick={() => {
          setExpand(false)
          setActiveName('profile')
        }}
      >
        <CgProfile
          className={s('icons', { active: currentTab === 'edit-profile' })}
        />
      </Link>

      <Link
        to="/notification"
        className={s(`${activeName === 'notification' ? 'active' : ''}`)}
        onClick={() => {
          setExpand(false)
          setActiveName('notification')
        }}
      >
        <IoMdNotificationsOutline
          className={s('icons', { active: currentTab === 'notification' })}
        />
      </Link>

      <Link
        to="/login"
        className={s(`${activeName === 'logout' ? 'active' : ''}`)}
        onClick={() => {
          setExpand(false)
          sessionStorage.clear()
          setActiveName('logout')
        }}
      >
        <BiLogOut className={s('icons', { active: currentTab === 'logout' })} />
      </Link>
    </div>
  )
}

export default Sidebar
