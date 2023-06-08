import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Group.module.css'
import classNames from 'classnames/bind'
import { ChatContext } from '../../context/ChatContext'
import { IconContext } from 'react-icons'
import { BsX } from 'react-icons/bs'

const s = classNames.bind(styles)

const Group = () => {
  const { groupPopUp, setGroupPopUp, conversations } = useContext(ChatContext)
  const [formValue, setFormValue] = useState({})
  const [memberList, setMemberList] = useState()
  const [choosenMember, setChoosenMember] = useState([])
  const memberRef = useRef()

  useEffect(() => {
    console.log(conversations)
  }, [conversations])

  useEffect(() => {
    console.log(choosenMember)
  }, [choosenMember])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormValue({ ...formValue, groupname: value })
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
    setFormValue({})
    setChoosenMember([])
    setGroupPopUp(!groupPopUp)
  }

  return groupPopUp ? (
    <div className={s('group-pop-up')}>
      <h3>Tạo nhóm của bạn</h3>

      <form onSubmit={handleSubmit}>
        <div className={s('group-name')}>
          <label className={s('group-label')}>Tên nhóm</label>

          <input type="text" name="group-name" onChange={handleChange} />
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
          <button>Xác nhận</button>
        </div>
      </form>
    </div>
  ) : (
    ''
  )
}

export default Group
