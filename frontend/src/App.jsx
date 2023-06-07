import classNames from 'classnames/bind'

import styles from './App.module.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import MainChat from './components/MainChat/MainChat'
import { ChatContextProvider } from './context/ChatContext'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const s = classNames.bind(styles)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ChatContextProvider>
        <div className={s('container')}>
          <Layout>
            <main className={s('main-content')}>
              <div className={s('left-bar')}>
                <LeftBar />
              </div>
              <div className={s('main-chat')}>
                <MainChat />
              </div>
            </main>
          </Layout>
        </div>
      </ChatContextProvider>
    ),
  },

  {
    path: '/login',
    element: (
      <ChatContextProvider>
        <Login />
      </ChatContextProvider>
    ),
  },

  {
    path: '/register',
    element: (
      <ChatContextProvider>
        <Register />
      </ChatContextProvider>
    ),
  },
])

function App() {
  // const [currentForm, setCurrentForm] = useState(
  //   !sessionStorage.getItem('username') ? 'login' : ''
  // )
  // const toggleForm = (formName) => {
  //   setCurrentForm(formName)
  // }

  // if (currentForm === 'login') {
  //   return <Login onFormSwitch={toggleForm} />
  // } else if (currentForm === 'register') {
  //   return <Register onFormSwitch={toggleForm} />
  // } else {
  //   return (
  //     <ChatContextProvider>
  //       <div className={s('container')}>
  //         <Layout>
  //           <main className={s('main-content')}>
  //             <div className={s('left-bar')}>
  //               <LeftBar />
  //             </div>
  //             <div className={s('main-chat')}>
  //               <MainChat />
  //             </div>
  //           </main>
  //         </Layout>
  //       </div>
  //     </ChatContextProvider>
  //   )
  // }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
