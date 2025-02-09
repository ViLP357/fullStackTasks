import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  //console.log("rb", request.then(response => response.data))
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const deleteBlog = async(id, token) => {
  const request = axios.delete(`${baseUrl}/${id}` , {
    headers: { Authorization: `Bearer ${token}` }})
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, deleteBlog }