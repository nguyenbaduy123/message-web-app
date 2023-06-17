import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import './ProfileHeader.scss'
import { MdPhotoCamera } from 'react-icons/md'
import { IconContext } from 'react-icons/lib'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { BsExclamationCircle } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { HiOutlinePhoto } from 'react-icons/hi2'
import { FiEdit } from 'react-icons/fi'
import axios from 'axios'
import { ChatContext } from '../../context/ChatContext'
import userApi from '../../apis/userApi'

const ProfileHeader = () => {
  const [activeName, setActiveName] = useState('')
  const [activeEdit, setActiveEdit] = useState(false)
  const [activeEditInfo, setActiveEditInfo] = useState(false)
  const { userInfo, setUserInfo } = useContext(ChatContext)
  const [oldInfo, setOldInfo] = useState(null)

  const location = useLocation()

  useEffect(() => {
    setOldInfo(userInfo)
  }, [userInfo])

  useEffect(() => {
    const array = location.pathname.split('/')

    setActiveName(array[2])
  }, [location])

  const handleChangeBg = (e) => {
    console.log(e.target.files[0])
    if (e.target.files) {
      if (
        e.target.files[0].type === 'image/png' ||
        e.target.files[0].type === 'image/jpeg'
      ) {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('id', sessionStorage.getItem('id'))
        ;(async () => {
          try {
            const res = await userApi.post('upload-bg', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })

            console.log(res)
            setUserInfo({
              ...userInfo,
              bg_url: res.data.filename,
            })
          } catch (error) {
            console.log(error)
          }
        })()
      }
    }
  }

  const handleChangeAvatar = (e) => {
    console.log(e.target.files[0])
    if (e.target.files) {
      if (
        e.target.files[0].type === 'image/png' ||
        e.target.files[0].type === 'image/jpeg'
      ) {
        const formData = new FormData()
        formData.set('file', e.target.files[0])
        formData.set('id', sessionStorage.getItem('id'))
        ;(async () => {
          try {
            const res = await userApi.post('upload-avatar', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })

            console.log(res)
            setUserInfo({
              ...userInfo,
              image_url: res.data.filename,
            })
          } catch (error) {
            console.log(error)
          }
        })()
      }
    }
  }

  const handleClickEdit = (e) => {
    setActiveEdit(true)
    setActiveEditInfo(true)
  }

  const handleCancelEdit = (e) => {
    setUserInfo({
      ...userInfo,
      fullname: oldInfo?.fullname,
      hometown: oldInfo?.hometown,
    })
    setActiveEdit(false)
    setActiveEditInfo(false)
  }

  const handleSaveEdit = (e) => {
    setActiveEdit(false)
    setActiveEditInfo(false)

    console.log(userInfo)
    ;(async () => {
      try {
        const res = await axios.put(
          'http://localhost:8080/api/v1/user',
          userInfo
        )

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <div className="profile-header">
      <div className="bg">
        <img src={'//localhost:8080/' + userInfo?.bg_url} alt="" />

        <label>
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleChangeBg(e)}
          />
          <IconContext.Provider value={{ size: '1.4rem' }}>
            <MdPhotoCamera />
          </IconContext.Provider>
          Change cover image
        </label>
      </div>

      <label className="avatar">
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleChangeAvatar(e)}
        />
        <img src={'//localhost:8080/' + userInfo?.image_url} alt="" />
        <span>
          <IconContext.Provider value={{ size: '1.5rem' }}>
            <MdPhotoCamera />
          </IconContext.Provider>
        </span>
      </label>

      <div className="info">
        <div
          className={`overview ${
            activeEditInfo === false ? '' : 'display-none'
          }`}
        >
          <h2>{userInfo?.fullname || sessionStorage.getItem('username')}</h2>
          <p>{userInfo?.address || 'Hanoi, Vietnam'}</p>
        </div>

        <div
          className={`overview ${
            activeEditInfo === true ? '' : 'display-none'
          }`}
        >
          <input
            type="text"
            value={userInfo?.fullname || sessionStorage.getItem('username')}
            // onChange={(e) =>
            //   setUserInfo({ ...userInfo, fullname: e.target.value })
            // }
          />
          <input
            type="text"
            value={userInfo?.address || 'Hanoi, Vietnam'}
            // onChange={(e) =>
            //   setUserInfo({ ...userInfo, hometown: e.target.value })
            // }
          />
        </div>

        <div
          className={`edit ${activeEdit === false ? '' : 'display-none'}`}
          onClick={handleClickEdit}
        >
          <IconContext.Provider value={{ size: '1.2rem' }}>
            <div className="icon">
              <FiEdit />
            </div>
          </IconContext.Provider>
          <span>Edit profile</span>
        </div>

        <div
          className={`edit save-profile ${
            activeEdit === true ? '' : 'display-none'
          }`}
          // onClick={handleSaveEdit}
        >
          <span>Save profile</span>
        </div>

        <div
          className={`edit cancel ${activeEdit === true ? '' : 'display-none'}`}
          onClick={handleCancelEdit}
        >
          <span>Cancel</span>
        </div>
      </div>

      <div className="navigator">
        <Link
          to="./about"
          className={`${activeName === 'about' ? 'active' : ''}`}
          onClick={() => setActiveName('about')}
        >
          <IconContext.Provider value={{ size: '1.2rem' }}>
            <div className="icon">
              <BsExclamationCircle />
            </div>
          </IconContext.Provider>
          <span>About</span>
        </Link>

        <Link
          to="./friends"
          className={`${activeName === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveName('friends')}
        >
          <IconContext.Provider value={{ size: '1.2rem' }}>
            <div className="icon">
              <HiOutlineUserGroup />
            </div>
          </IconContext.Provider>
          <span>Friends</span>
        </Link>
      </div>
    </div>
  )
}

export default ProfileHeader
