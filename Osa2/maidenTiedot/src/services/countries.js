import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const find = (name) => {
    //console.log(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    find: find
}