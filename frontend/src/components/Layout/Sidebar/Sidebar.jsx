import classNames from 'classnames/bind'
import { BsFillChatDotsFill, BsFillCalendar2Fill } from 'react-icons/bs'
import { FaFolder } from 'react-icons/fa'
import { AiOutlineBarChart } from 'react-icons/ai'

import styles from './Sidebar.module.css'

const s = classNames.bind(styles)

const Sidebar = () => {
  return (
    <div className={s('container')}>
      <BsFillChatDotsFill className={s('icons')} />
      <FaFolder className={s('icons')} />
      <FaFolder className={s('icons')} />
      <BsFillCalendar2Fill className={s('icons')} />
      <AiOutlineBarChart className={s('icons')} />
    </div>
  )
}

export default Sidebar
