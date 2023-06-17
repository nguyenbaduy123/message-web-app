import React from 'react'
import { Outlet } from 'react-router-dom'
import './Profile.scss'
import ProfileHeader from './ProfileHeader'

const Profile = () => {
  return (
    <div className="profile">
      <ProfileHeader></ProfileHeader>
      <Outlet></Outlet>
    </div>
  )
}

export default Profile
