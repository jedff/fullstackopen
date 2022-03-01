import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const { data }  =  await axios.get(baseUrl)
  return data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.delete(`${baseUrl}/${id}`, config)
  return data
}

const like = async (id, blogObject) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, blogObject)
  return data

}

export default { getAll, create, remove, like, setToken }

