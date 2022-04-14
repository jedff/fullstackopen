import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

const checkAuth = async (tokenObj) => {
  const token = `Bearer ${tokenObj}`
  const config = {
    headers: { Authorization: token },
  }
  const { data } = await axios.get(baseUrl, config)
  return data
}

export default { login, checkAuth }
