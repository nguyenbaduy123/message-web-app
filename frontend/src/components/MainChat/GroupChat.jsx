import { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { Avatar, Input } from 'antd'
import { BsFillCameraVideoFill, BsFillTelephoneFill } from 'react-icons/bs'
import { AiFillInfoCircle } from 'react-icons/ai'

import styles from './MainChat.module.css'
import { ChatContext } from '../../context/ChatContext'
import messageApi from '../../apis/messageApi'
import GroupMessageList from '../MessageList/GroupMessageList'
import { MdOutlinePhotoLibrary } from 'react-icons/md'
import { IconContext } from 'react-icons/lib'
import { IoMdCloseCircle } from 'react-icons/io'

const s = classNames.bind(styles)

const { TextArea } = Input
const MAX_ROWS = 5

const GroupChat = ({ expand, setExpand }) => {
  const userId = sessionStorage.getItem('id')
  const { setGroupConversation, currentGroupConversation, userInfo, socket } =
    useContext(ChatContext)

  const [currentText, setCurrentText] = useState('')
  const [file, setFile] = useState(null)
  const fileRef = useRef()

  useEffect(() => {
    // socket.on('receive_group_message', (data) => {
    //   console.log('>>> Receive group Message')
    //   setGroupConversation((prevConversations) =>
    //     prevConversations.map((conv) =>
    //       data.group_id === conv.id
    //         ? {
    //             ...conv,
    //             messages: [...conv.messages, { ...data }],
    //           }
    //         : conv
    //     )
    //   )
    //   setCurrentText('')
    // })
    // return () => socket.off('receive_group_message')
  }, [socket])

  const handleSend = async () => {
    let text = currentText.trim()
    if (text === '') return
    const currentMsg = {
      user_id: parseInt(sessionStorage.getItem('id')),
      group_id: currentGroupConversation.id,
      fullname: userInfo?.fullname,
      message: text,
      image_url: userInfo?.image_url,
      created_at: new Date(),
      updated_at: new Date(),
      message_img: file?.name || null,
    }
    socket.emit('send_group_message', currentMsg)
    try {
      const data = await messageApi.post('/group', currentMsg)
      console.log('Insert success')

      console.log(data)

      const formData = new FormData()
      if (file != null) {
        formData.set('file', file)
        formData.set('id', data.data.id)

        const result = await messageApi.post('group-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        setFile(null)
        fileRef.current.value = null
      } else {
        console.log('File null')
      }
    } catch (error) {
      console.log(error)
    }

    setCurrentText('')
  }

  const handleExpand = (e) => {
    setExpand(!expand)
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (!event.shiftKey) {
        event.preventDefault()
        handleSend(event.target.value)
      }
    }
  }

  const handleMessageImg = (e) => {
    if (e.target.files) {
      if (
        e.target.files[0]?.type === 'image/png' ||
        e.target.files[0]?.type === 'image/jpeg'
      ) {
        setFile(e.target.files[0])
      }
    }
  }

  const removeImg = (e) => {
    setFile(null)
    fileRef.current.value = null
  }

  return (
    <div className={s('container')}>
      <div>
        <div className={s('header')}>
          <div className={s('group')}>
            <Avatar
              src={`//localhost:8080/` + currentGroupConversation?.image_url}
              size={52}
            />
            <div className={s('info-text')}>
              <div className={s('name')}>{currentGroupConversation?.name}</div>
              <div className={s('state')}>Online</div>
            </div>
          </div>
          <div className={s('icons')}>
            <BsFillTelephoneFill size={20} />
            <BsFillCameraVideoFill size={20} />
            <AiFillInfoCircle size={20} onClick={handleExpand} />
          </div>
        </div>
        <GroupMessageList />
      </div>
      <div className={s('chat-nav')}>
        <TextArea
          className={s('input')}
          resize="none"
          autoSize={{ minRows: 0, maxRows: MAX_ROWS }}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Your message"
          onKeyDown={handleKeyDown}
          style={{ resize: 'none' }}
        />
        {file ? (
          <div className={s('preview-image')}>
            <div className={s('remove-img')} onClick={removeImg}>
              <IconContext.Provider
                value={{ size: '1.5rem', color: 'rgb(49, 51, 56, 0.9)' }}
              >
                <IoMdCloseCircle />
              </IconContext.Provider>
            </div>
            <img src={URL.createObjectURL(file)} alt="" />
          </div>
        ) : (
          ''
        )}

        <div className={s('photo-wrapper')}>
          <label>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleMessageImg(e)}
              ref={fileRef}
            />
            <IconContext.Provider value={{ size: '1.5rem', color: '#218dfa' }}>
              <MdOutlinePhotoLibrary />
            </IconContext.Provider>
          </label>
        </div>
      </div>
    </div>
  )
}

export default GroupChat
