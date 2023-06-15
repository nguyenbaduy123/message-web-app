import { useEffect, useState } from 'react'
import { Upload, message, Input, Button } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind'
import styles from './EditProfile.module.css'
import axios from 'axios'
import userApi from '../../apis/userApi'

const s = classNames.bind(styles)

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const EditProfile = () => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem('id')
      try {
        const response = await userApi.get(`/${userId}`)
        const data = response.data
        if (data.success) {
          const user = data.user
          setName(user.fullname)
          setImageUrl(user.image_url)
        }
      } catch (error) {
        console.error('Fetch user error: ', error)
      }
    }
    fetchUser()
  }, [])

  const handleChange = (info) => {
    const file = info.file
    if (file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (file.status === 'done') {
      getBase64(file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const handleCustomRequest = async ({ file }) => {
    const cloudName = 'draqifekg'
    const uploadPreset = 'uiqlji3m'
    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset) // Replace with your upload preset

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        onUploadProgress: (progressEvent) => {},
      })

      const imgUrl = response.data.secure_url
      setImageUrl(imgUrl)
    } catch (error) {
      message.error('Upload failed.')
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <div className={s('container')}>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={handleCustomRequest}
        onChange={handleChange}
      >
        {imageUrl && !loading ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <div className={s('input-item')}>
        <label className={s('label')} htmlFor="name">
          Last name
        </label>
        <Input
          id="name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={s('input-item')}>
        <label className={s('label')} htmlFor="password">
          Password
        </label>
        <Input id="password" className="input" />
      </div>
      <Button className={s('save-btn')} type="primary" size="large">
        Save
      </Button>
    </div>
  )
}

export default EditProfile
