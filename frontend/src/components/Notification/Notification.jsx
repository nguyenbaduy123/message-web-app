import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Notification.module.css'
import userApi from '../../apis/userApi'
import axios from 'axios'
import { notification } from 'antd'

const s = classNames.bind(styles)

const Notification = () => {
  const [userRequest, setUserRequest] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await userApi.get('/request', {
          params: {
            id: sessionStorage.getItem('id'),
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        })

        const list = res.data.not_friend.filter((user) => user.accepted === 0)

        setUserRequest(list)
        console.log(res.data.not_friend)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    console.log(userRequest)
  }, [userRequest])

  const handleAccept = (item) => {
    console.log(item)

    setUserRequest((prevList) => prevList.filter((user) => user.id != item.id))

    const body = {
      user_id_1: item.id,
      user_id_2: parseInt(sessionStorage.getItem('id')),
      accepted: '1',
    }

    ;(async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/user/friend',
          body,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
        )

        notification.success({
          message: 'Thông báo',
          description: 'Kết bạn thành công',
          placement: 'top',
          duration: 1,
        })
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleRefuse = (item) => {
    setUserRequest((prevList) => prevList.filter((user) => user.id != item.id))

    const body = {
      user_id_1: item.id,
      user_id_2: parseInt(sessionStorage.getItem('id')),
      accepted: null,
    }

    ;(async () => {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/user/friend',
          body,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
        )

        notification.info({
          message: 'Thông báo',
          description: 'Đã xóa lời mời',
          placement: 'top',
          duration: 1,
        })
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <div className={s('notification')}>
      <div className={s('wrapper')}>
        <h2>Lời mời kết bạn</h2>

        <div className={s('wrap-container')}>
          <div className={s('container')}>
            {userRequest.map((item) => (
              <div className={s('item')}>
                <div className={s('image-wrapper')}>
                  <img src={`//localhost:8080/` + item?.image_url} alt="" />
                </div>

                <div className={s('content')}>
                  <div className={s('info')}>
                    <h2>{item?.fullname}</h2>
                    <p>{item.status}</p>
                  </div>

                  <div className={s('nav')}>
                    <div
                      className={s('add')}
                      onClick={() => handleAccept(item)}
                    >
                      <span>Xác nhận</span>
                    </div>

                    <div
                      className={s('remove')}
                      onClick={() => handleRefuse(item)}
                    >
                      <span>Hủy</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification
