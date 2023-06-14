import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Group.module.css'
import classNames from 'classnames/bind'
import { ChatContext } from '../../context/ChatContext'
import { IconContext } from 'react-icons'
import { BsX } from 'react-icons/bs'
import { notification } from 'antd'
import messageApi from '../../apis/messageApi'

const s = classNames.bind(styles)

const Group = () => {
  const { groupPopUp, setGroupPopUp, conversations, socket } =
    useContext(ChatContext)
  const [groupName, setGroupName] = useState('')
  const [memberList, setMemberList] = useState()
  const [choosenMember, setChoosenMember] = useState([])
  const [file, setFile] = useState(null)
  const memberRef = useRef()

  useEffect(() => {
    console.log(conversations)
  }, [conversations])

  useEffect(() => {
    console.log(choosenMember)
  }, [choosenMember])

  const handleChange = (e) => {
    const value = e.target.value

    setGroupName(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleMember = (e) => {
    const value = e.target.value

    if (value == null || value == '') {
      setMemberList([])
    } else {
      const data = conversations.filter(
        (item) => item.fullname.indexOf(value) !== -1
      )

      setMemberList(() => data)
    }
  }

  const removeMember = (item) => {
    setChoosenMember((choosenMember) => {
      return choosenMember.filter((member) => member !== item)
    })
  }

  function handleAddMember(item) {
    setMemberList([])
    memberRef.current.value = ''
    const isExist = choosenMember.filter((member) => member === item)

    if (isExist.length > 0) return choosenMember

    setChoosenMember((choosenMember) => {
      return [...choosenMember, item]
    })
  }

  const cancelForm = () => {
    setGroupName('')
    setChoosenMember([])
    setGroupPopUp(!groupPopUp)
  }

  const createGroup = async () => {
    if (groupName.trim() === '') {
      notification.error({
        message: 'Login Failed!',
        description: 'Chưa nhập tên nhóm',
        placement: 'top',
        duration: 1,
      })
    } else {
      const data = await messageApi.post('new-group', {
        name: groupName,
        number_member: choosenMember.length + 1,
      })

      console.log(data)

      let member = choosenMember.map((item) => {
        return {
          user_id: item.id,
          group_id: data.data.id,
        }
      })

      member = [
        ...member,
        {
          user_id: parseInt(sessionStorage.getItem('id')),
          group_id: data.data.id,
        },
      ]

      const memberRes = await messageApi.post('user-group', member)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('id', data.data.id)

      messageApi.post('upload-avatar', formData)

      if (data) {
        notification.success({
          message: 'Create group',
          description: 'Success',
          placement: 'top',
          duration: 1,
        })
      }

      setGroupName('')
      setChoosenMember([])
      setGroupPopUp(!groupPopUp)
    }
  }

  const handleFileUpload = (e) => {
    // console.log(e.target.files)
    setFile(e.target.files[0])
  }

  return groupPopUp ? (
    <div className={s('group-pop-up')}>
      <h3>Tạo nhóm của bạn</h3>

      <form onSubmit={handleSubmit}>
        <div className={s('group-name')}>
          <label className={s('group-label')}>Tên nhóm</label>

          <input type="text" name="group-name" onChange={handleChange} />
        </div>

        <div className={s('group-avatar')}>
          <label className={s('avatar-label')}>Ảnh đại diện nhóm</label>
          <input type="file" onChange={handleFileUpload} />
        </div>

        <div className={s('group-member')}>
          <label className={s('member-label')}>Thêm thành viên</label>

          <div>
            <input
              type="text"
              name="member-name"
              onChange={handleMember}
              ref={memberRef}
            />
          </div>

          <div className={s('list-user')}>
            {memberList?.map((item) => (
              <div
                className={s('dropdown-member')}
                onClick={() => handleAddMember(item)}
              >
                <div className={s('dropdown-details')}>
                  <div className={s('img')}>
                    <img src={item.image_url} alt="" />
                  </div>

                  <p>{item.fullname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s('dropdown')}>
          {/* <div className={s('dropdown-member')}>
            <div className={s('dropdown-details')}>
              <div className={s('img')}>
                <img
                  src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/340102593_1671418876634272_7202750476793864828_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rZ-RDzXm3Z4AX8iq1pq&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDJaJFSv8_C0jPaSw_4ZeKHmCH4DvFtf-DTVKZ0FSgjAg&oe=6484CE1F"
                  alt=""
                />
              </div>

              <p>Nguyễn Thế Vũ</p>
            </div>

            <IconContext.Provider value={{ size: '1.5rem' }}>
              <div className={s('remove')}>
                <BsX />
              </div>
            </IconContext.Provider>
          </div> */}

          {choosenMember?.map((item) => (
            <div className={s('dropdown-member')}>
              <div className={s('dropdown-details')}>
                <div className={s('img')}>
                  <img src={item.image_url} alt="" />
                </div>

                <p>{item.fullname}</p>
              </div>

              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div className={s('remove')} onClick={() => removeMember(item)}>
                  <BsX />
                </div>
              </IconContext.Provider>
            </div>
          ))}
        </div>

        <div className={s('group-btn')}>
          <button onClick={cancelForm}>Hủy</button>
          <button onClick={createGroup}>Xác nhận</button>
        </div>
      </form>
    </div>
  ) : (
    ''
  )
}

export default Group
