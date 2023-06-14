import { useState } from 'react'
import classNames from 'classnames/bind'
import { Upload, message } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import styles from './EditProfile.module.css'
import axios from 'axios'

const s = classNames.bind(styles)

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
  console.log(file)
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const EditProfile = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  // const uploadImage = async (file) => {
  //   const cloudName = 'draqifekg'
  //   const uploadPreset = 'uiqlji3m'
  //   const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  //   const formData = new FormData()
  //   formData.append('file', file.fileList[0])
  //   formData.append('upload_preset', uploadPreset)

  //   axios
  //     .post(apiUrl, { formData })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const imageUrl = data.secure_url
  //       setImageUrl(imageUrl)
  //     })
  //     .catch((error) => {
  //       console.error('Document Can not upload image: ', error)
  //     })
  // }

  return (
    <div className={s('container')}>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        action="https://api.cloudinary.com/v1_1/draqifekg/image/upload"
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <div className={s('input-item')}>
        <label className={s('lable')} htmlFor="first-name">
          First name
        </label>
        <Input id="first-name" className="input" />
      </div>
      <div className={s('input-item')}>
        <label className={s('lable')} htmlFor="last-name">
          Last name
        </label>
        <Input id="last-name" className="input" />
      </div>
      <div className={s('input-item')}>
        <label className={s('lable')} htmlFor="password">
          Password
        </label>
        <Input id="password" className="input" />
      </div>
    </div>
  )
}

export default EditProfile
