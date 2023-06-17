import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Group.module.css'
import classNames from 'classnames/bind'
import { ChatContext } from '../../context/ChatContext'
import { IconContext } from 'react-icons'
import { BsX } from 'react-icons/bs'
import { ConfigProvider, notification, Select, theme, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import messageApi from '../../apis/messageApi'

const s = classNames.bind(styles)

const Group = () => {
  const {
    groupPopUp,
    setGroupPopUp,
    conversations,
    socket,
    setGroupConversation,
  } = useContext(ChatContext)
  const [groupName, setGroupName] = useState('')
  const [memberList, setMemberList] = useState([])
  const [choosenMember, setChoosenMember] = useState([])
  const [file, setFile] = useState(null)
  const [fileList, setFileList] = useState([])
  const memberRef = useRef()

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
    setFileList([])
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
      formData.set('id', data.data.id)
      formData.set('file', file)
      const avatar = await messageApi.post('upload-avatar', formData)

      console.log(avatar)

      if (data) {
        notification.success({
          message: 'Create group',
          description: 'Success',
          placement: 'top',
          duration: 1,
        })
      }

      ;(async () => {
        try {
          const res = await messageApi.get('/group', {
            params: {
              id: sessionStorage.getItem('id'),
            },
          })
          console.log(res)
          setGroupConversation([...res.data])
        } catch (error) {
          console.log(error)
        }
      })()

      socket.emit(
        'create-room',
        sessionStorage.getItem('id'),
        data.data.id,
        choosenMember
      )

      setGroupName('')
      setChoosenMember([])
      setGroupPopUp(!groupPopUp)
    }
  }

  // const handleFileUpload = (e) => {
  //   // console.log(e.target.files)
  //   setFile(e.target.files[0])
  // }

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
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
          {/* <input type="file" onChange={handleFileUpload} /> */}
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={(file) => {
                  setFile(file)
                  return false
                }}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </ConfigProvider>
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
                    <img src={`//localhost:8080/` + item.image_url} alt="" />
                  </div>

                  <p>{item.fullname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s('dropdown')}>
          {choosenMember?.map((item) => (
            <div className={s('dropdown-member')}>
              <div className={s('dropdown-details')}>
                <div className={s('img')}>
                  <img src={`//localhost:8080/` + item.image_url} alt="" />
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
