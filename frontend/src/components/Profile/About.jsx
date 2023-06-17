import React from 'react'
import { GiGraduateCap } from 'react-icons/gi'
import { IoLocationSharp } from 'react-icons/io5'
import { FaHome, FaSchool } from 'react-icons/fa'
import './About.scss'

const About = () => {
  return (
    <div className="about">
      <h2>About me</h2>

      <div className="description">
        <div>
          <FaSchool />
          <span>Studying tại THPT Chuyên Lam Sơn</span>
        </div>

        <div>
          <GiGraduateCap />
          <span>Đã học tại tại THPT Chuyên Lam Sơn</span>
        </div>

        <div>
          <FaHome />
          <span>Sống tại Thanh Hóa</span>
        </div>

        <div>
          <IoLocationSharp />
          <span>Đến từ Thanh Hóa</span>
        </div>
      </div>
    </div>
  )
}

export default About
