import React, { useContext } from 'react'
import { GiGraduateCap } from 'react-icons/gi'
import { IoLocationSharp } from 'react-icons/io5'
import { FaHome, FaSchool } from 'react-icons/fa'
import './About.scss'
import { ChatContext } from '../../context/ChatContext'

const About = () => {
  const { userInfo, setUserInfo } = useContext(ChatContext)

  return (
    <div className="about">
      <h2>About me</h2>

      <div className="description">
        <div>
          <FaSchool />
          <span>
            Studying tại{' '}
            {userInfo?.current_education || 'Đại học Bách Khoa Hà nội'}
          </span>
        </div>

        <div>
          <GiGraduateCap />
          <span>
            Đã học tại {userInfo?.studied_at || 'Đại học Bách Khoa Hà nội'}
          </span>
        </div>

        <div>
          <FaHome />
          <span>Sống tại {userInfo?.address || 'Thanh Hóa'}</span>
        </div>

        <div>
          <IoLocationSharp />
          <span>Đến từ {userInfo?.hometown || 'Thanh Hóa'}</span>
        </div>
      </div>
    </div>
  )
}

export default About
