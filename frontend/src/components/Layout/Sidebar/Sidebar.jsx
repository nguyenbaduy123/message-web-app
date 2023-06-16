import classNames from 'classnames/bind'
import { BsFillChatDotsFill, BsFillCalendar2Fill } from 'react-icons/bs'
import { FaFolder } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineBarChart } from 'react-icons/ai'

import { Link } from 'react-router-dom'

import styles from './Sidebar.module.css'

const s = classNames.bind(styles)

const Sidebar = ({ currentTab }) => {
  return (
    <div className={s('container')}>
      <Link to="/">
        <BsFillChatDotsFill
          className={s('icons', { active: currentTab === 'chat' })}
        />
      </Link>
      <Link to="edit-profile">
        <CgProfile
          className={s('icons', { active: currentTab === 'edit-profile' })}
        />
      </Link>
    </div>
  )
}

export default Sidebar
