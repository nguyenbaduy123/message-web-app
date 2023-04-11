import { Layout as DefaultLayout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import classNames from 'classnames/bind'
import styles from './Layout.module.css'
import { BsFillChatDotsFill, BsFillCalendar2Fill } from 'react-icons/bs'
import { FaFolder } from 'react-icons/fa'
import { AiOutlineBarChart } from 'react-icons/ai'

const s = classNames.bind(styles)

const Layout = ({ children }) => {
  return (
    <DefaultLayout hasSider={true} className={s('layout')}>
      <Sider width={100} className={s('sider')}>
        <div>
          <BsFillChatDotsFill className={s('icons')} />
        </div>
        <div>
          <FaFolder className={s('icons')} />
        </div>
        <div>
          <FaFolder className={s('icons')} />
        </div>
        <div>
          <BsFillCalendar2Fill className={s('icons')} />
        </div>
        <div>
          <AiOutlineBarChart className={s('icons')} />
        </div>
      </Sider>
      <Content className={s('content')}>{children}</Content>
    </DefaultLayout>
  )
}

export default Layout
