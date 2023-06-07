import axios from 'axios'
import jwt_decode from 'jwt-decode'
import userApi from '../../apis/userApi'

const axiosJWT = axios.create()

const refreshToken = async (refreshToken, setToken) => {
  try {
    const res = await userApi.post('/auth/refresh', {
      refreshToken: refreshToken,
    })

    setToken(res.data)

    return res.data
  } catch (err) {
    console.log(err)
  }
}
export default axiosJWT.interceptors.request.use(
  async (config) => {
    let currentDate = new Date()
    const decodedToken = jwt_decode(sessionStorage.getItem('accessToken'))

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken()
      config.headers['Authorization'] = 'Bearer ' + data.accessToken
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
