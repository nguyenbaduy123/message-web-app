import classNames from 'classnames/bind'
import { BsFillChatDotsFill, BsFillCalendar2Fill } from 'react-icons/bs'
import { FaFolder } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineBarChart } from 'react-icons/ai'

import { Link, useLocation } from 'react-router-dom'

import styles from './Sidebar.module.css'
import { useEffect, useState } from 'react'

const s = classNames.bind(styles)

const Sidebar = ({ currentTab }) => {
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
          onClick={() => setActiveName('')}
        />
      </Link>

      <Link
        to="/profile/about"
        className={s(`${activeName === 'profile' ? 'active' : ''}`)}
        onClick={() => setActiveName('profile')}
      >
        <CgProfile
          className={s('icons', { active: currentTab === 'edit-profile' })}
        />
      </Link>
    </div>
  )
}

export default Sidebar
