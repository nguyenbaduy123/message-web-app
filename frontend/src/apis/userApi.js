import axios from 'axios'

const userApi = axios.create({
  baseURL: 'http://localhost:8080/api/user',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
})

userApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('Request config', config)

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default userApi
