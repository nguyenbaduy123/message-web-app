import React, { useContext, useState } from 'react'
import { GiGraduateCap } from 'react-icons/gi'
import { IoLocationSharp } from 'react-icons/io5'
import { FaHome, FaSchool } from 'react-icons/fa'
import './About.scss'
import { ChatContext } from '../../context/ChatContext'
import { useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { FiEdit } from 'react-icons/fi'
import userApi from '../../apis/userApi'

const About = () => {
  const { userInfo, setUserInfo } = useContext(ChatContext)
  const [active, setActive] = useState(false)
  const location = useLocation()

  const handleEdit = (e) => {
    setActive(!active)
  }

  const handleSave = (e) => {
    setActive(!active)
    ;(async () => {
      try {
        const res = await userApi.put(
          '/' + sessionStorage.getItem('id'),
          userInfo
        )

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const checkState = () => {
    return (
      location?.state?.user_id == sessionStorage.getItem('id') ||
      location?.state?.user_id == null
    )
  }

  return (
    <div className="about">
      <h2>About me</h2>

      {checkState() ? (
        <>
          {' '}
          <div
            className={`edit ${active ? 'unactive' : 'active'}`}
            onClick={handleEdit}
          >
            <IconContext.Provider value={{ size: '1.2rem' }}>
              <div className="icon">
                <FiEdit />
              </div>
            </IconContext.Provider>
            <span>Edit</span>
          </div>
          <div
            className={`edit ${active ? 'active' : 'unactive'}`}
            onClick={handleSave}
          >
            <IconContext.Provider value={{ size: '1.2rem' }}>
              <div className="icon">
                <FiEdit />
              </div>
            </IconContext.Provider>
            <span>Save</span>
          </div>
        </>
      ) : (
        ''
      )}

      <div class={`form__group field ${active ? 'active' : ''}`}>
        <input
          value={userInfo?.current_education}
          onChange={(e) =>
            setUserInfo({ ...userInfo, current_education: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Studying
        </label>
      </div>

      <div class={`form__group field ${active ? 'active' : ''}`}>
        <input
          value={userInfo?.studied_at}
          onChange={(e) =>
            setUserInfo({ ...userInfo, studied_at: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Đã học tại
        </label>
      </div>

      <div class={`form__group field ${active ? 'active' : ''}`}>
        <input
          value={userInfo?.address}
          onChange={(e) =>
            setUserInfo({ ...userInfo, address: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Sống tại
        </label>
      </div>

      <div class={`form__group field ${active ? 'active' : ''}`}>
        <input
          value={userInfo?.hometown}
          onChange={(e) =>
            setUserInfo({ ...userInfo, hometown: e.target.value })
          }
          type="input"
          class="form__field"
          placeholder="Name"
          name="name"
          id="name"
          required
        />
        <label for="name" class="form__label">
          Đến từ
        </label>
      </div>

      <div className={`description ${active ? 'unactive' : ''}`}>
        <div>
          <FaSchool />
          <span>
            Studying tại{' '}
            {location?.state?.item
              ? location?.state?.item?.current_education
              : userInfo?.current_education || 'Đại học Bách Khoa Hà nội'}
          </span>
        </div>

        <div>
          <GiGraduateCap />
          <span>
            Đã học tại{' '}
            {location?.state?.item
              ? location?.state?.item?.studied_at
              : userInfo?.studied_at || 'Đại học Bách Khoa Hà nội'}
          </span>
        </div>

        <div>
          <FaHome />
          <span>
            Sống tại{' '}
            {location?.state?.item
              ? location?.state?.item?.address
              : userInfo?.address || 'Thanh Hóa'}
          </span>
        </div>

        <div>
          <IoLocationSharp />
          <span>
            Đến từ{' '}
            {location?.state?.item
              ? location?.state?.item?.hometown
              : userInfo?.hometown || 'Thanh Hóa'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default About
