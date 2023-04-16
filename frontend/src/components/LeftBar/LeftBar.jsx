import './leftbar.scss'
import { BiSearch } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'
import Card from '../Card/Card'
import { useEffect, useState } from 'react'

function LeftBar() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((json) => {
        setUserData(json.friend)
      })
  }, [])

  return (
    <div className="leftbar">
      <div className="chat-group">
        <div className="search">
          <IconContext.Provider value={{ size: '1.4rem' }}>
            <div className="search-icon">
              <BiSearch />
            </div>
          </IconContext.Provider>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="card-list">
          {userData.map((item, index) => (
            <Card active={index === 0 ? 'card-active' : ''} data={item}></Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftBar
