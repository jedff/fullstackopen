import axios from 'axios'

const baseUrl = '/api/persons'

export const getAll = () => {
  return axios.get(baseUrl)
              .then(response => response.data)
}

export const addNew = newObj => {
  return axios.post(baseUrl, newObj)
              .then(response => response.data)
}

export const updatePerson = (personId, newObj) => {
  return axios.put(`${baseUrl}/${personId}`, newObj)
              .then(response => response.data)
}

export const deletePerson = personId => {
  return axios.delete(`${baseUrl}/${personId}`)
              .then(response => response.data)
}
