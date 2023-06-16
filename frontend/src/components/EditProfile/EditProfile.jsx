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
  const [fullname, setFullname] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem('id')
      try {
        const response = await userApi.get(`/${userId}`)
        const data = response.data
        if (data.success) {
          const user = data.user
          setFullname(user.fullname)
          setImageUrl(user.image_url)
        }
      } catch (error) {
        console.error('Fetch user error: ', error)
      }
    }
    fetchUser()
  }, [])

  const handleCustomRequest = async ({ file }) => {
    setLoading(true)
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
      })

      const imgUrl = response.data.secure_url
      setImageUrl(imgUrl)
    } catch (error) {
      message.error('Upload failed.')
    }
    setLoading(false)
  }

  const handleSave = async () => {
    const userId = sessionStorage.getItem('id')
    try {
      const result = await userApi.put(`/${userId}`, {
        fullname: fullname,
        image_url: imageUrl,
      })
    } catch (error) {
      console.error('Update user error: ', error)
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
      <div className={s('avatar')}>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={handleCustomRequest}
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
      </div>
      <div className={s('input-item')}>
        <label htmlFor="name" className={s('label')}>
          Full name
        </label>
        <Input
          id="name"
          className="input"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className={s('btn-action')}>
        <Button
          className={s('save-btn')}
          type="primary"
          size="large"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default EditProfile
