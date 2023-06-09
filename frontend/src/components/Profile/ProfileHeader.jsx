import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './ProfileHeader.scss'
import { MdPhotoCamera } from 'react-icons/md'
import { IconContext } from 'react-icons/lib'
import { BsExclamationCircle } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { FiEdit } from 'react-icons/fi'
import { AiOutlineMessage } from 'react-icons/ai'
import { ChatContext } from '../../context/ChatContext'
import userApi from '../../apis/userApi'

const ProfileHeader = ({ expand, setExpand }) => {
  const [activeName, setActiveName] = useState('')
  const [activeEdit, setActiveEdit] = useState(false)
  const [activeEditInfo, setActiveEditInfo] = useState(false)
  const { userInfo, setUserInfo } = useContext(ChatContext)
  const [oldInfo, setOldInfo] = useState(null)
  const { setCurrentGroupId, setCurrentConversationId } =
    useContext(ChatContext)

  const location = useLocation()
  const navigate = useNavigate()
  const windowWidth = useRef(window.innerWidth)

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  useEffect(() => {
    console.log(oldInfo)
  }, [oldInfo])

  useEffect(() => {
    console.log(location.state)
    setOldInfo(userInfo)
  }, [])

  useEffect(() => {
    const array = location.pathname.split('/')

    setActiveName(array[2])
  }, [location])

  const checkState = () => {
    return (
      location?.state?.user_id == sessionStorage.getItem('id') ||
      location?.state?.user_id == null
    )
  }

  const handleRedirectMsg = (e) => {
    setCurrentGroupId('0')
    setCurrentConversationId(location?.state?.user_id)
    setExpand(false)
    navigate('/')
  }

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

  return (
    <div className="profile-header">
      <div className="bg">
        {checkState() ? (
          <img src={'//localhost:8080/' + userInfo?.bg_url} alt="" />
        ) : (
          <img
            src={'//localhost:8080/' + location?.state?.item?.bg_url}
            alt=""
          />
        )}

        {checkState() ? (
          <label>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleChangeBg(e)}
            />
            <IconContext.Provider value={{ size: '1.4rem' }}>
              <MdPhotoCamera />
            </IconContext.Provider>
            {windowWidth.current <= 600 ? '' : 'Change cover image'}
          </label>
        ) : (
          ''
        )}
      </div>

      {checkState() ? (
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
      ) : (
        <label className="avatar">
          <img
            src={'//localhost:8080/' + location?.state?.item?.image_url}
            alt=""
          />
        </label>
      )}

      <div className="info">
        {checkState() ? (
          <div
            className={`overview ${
              activeEditInfo === false ? '' : 'display-none'
            }`}
          >
            <h2>{userInfo?.fullname || sessionStorage.getItem('username')}</h2>
            <p>{userInfo?.status || 'Developer'}</p>
          </div>
        ) : (
          <div
            className={`overview ${
              activeEditInfo === false ? '' : 'display-none'
            }`}
          >
            <h2>{location?.state?.item?.fullname}</h2>
            <p>{location?.state?.item?.status}</p>
          </div>
        )}

        <div
          className={`overview ${
            activeEditInfo === true ? '' : 'display-none'
          }`}
        >
          <input
            type="text"
            value={userInfo?.fullname}
            onChange={(e) =>
              setUserInfo({ ...userInfo, fullname: e.target.value })
            }
          />
          <input
            type="text"
            value={userInfo?.status || ''}
            onChange={(e) =>
              setUserInfo({ ...userInfo, status: e.target.value })
            }
          />
        </div>

        {checkState() ? (
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
        ) : (
          <div
            className={`edit ${activeEdit === false ? '' : 'display-none'}`}
            onClick={handleRedirectMsg}
          >
            <IconContext.Provider value={{ size: '1.2rem' }}>
              <div className="icon">
                <AiOutlineMessage />
              </div>
            </IconContext.Provider>
            <span>Nhắn tin</span>
          </div>
        )}

        <div
          className={`edit save-profile ${
            activeEdit === true ? '' : 'display-none'
          }`}
          onClick={handleSaveEdit}
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
        {checkState() ? (
          <>
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
              to="./friend"
              className={`${activeName === 'friend' ? 'active' : ''}`}
              onClick={() => setActiveName('friend')}
            >
              <IconContext.Provider value={{ size: '1.2rem' }}>
                <div className="icon">
                  <HiOutlineUserGroup />
                </div>
              </IconContext.Provider>
              <span>Friends</span>
            </Link>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default ProfileHeader
