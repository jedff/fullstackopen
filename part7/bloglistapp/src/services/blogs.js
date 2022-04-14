import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const { data } = await axios.get(baseUrl, config)
  return data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

const like = async (id, blogObject) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, blogObject)
  return data
}

const comment = async (id, commentObj) => {
  const { data } = await axios.post(`${baseUrl}/${id}/comments`, commentObj)
  return data
}

export default { getAll, create, remove, like, comment, setToken }
