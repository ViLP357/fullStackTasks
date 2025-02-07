import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  console.log("ru", request.then(response => response.data))
  return request.then(response => response.data)
}


export default { getAll }