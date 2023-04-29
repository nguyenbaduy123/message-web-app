import classNames from 'classnames/bind'
import styles from './Layout.module.css'
import Sidebar from './Sidebar/Sidebar'

const s = classNames.bind(styles)

const Layout = ({ children }) => {
  return (
    <div className={s('container')}>
      <Sidebar />
      <main className={s('main-content')}>{children}</main>
    </div>
  )
}

export default Layout
