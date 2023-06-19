import React from 'react'
import { Outlet } from 'react-router-dom'
import './Profile.scss'
import ProfileHeader from './ProfileHeader'

const Profile = ({ expand, setExpand }) => {
  return (
    <div className="profile">
      <ProfileHeader expand={expand} setExpand={setExpand}></ProfileHeader>
      <Outlet></Outlet>
    </div>
  )
}

export default Profile
