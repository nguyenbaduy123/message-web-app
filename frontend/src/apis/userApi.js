import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8080/api/user',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
})
