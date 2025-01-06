import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = import.meta.env.VITE_API_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const find = (name) => {
    //console.log(
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}
const getWeather = (city, country) => {
    
    const request = axios.get(`${apiBaseUrl}${city},${country}&APPID=${apiKey}`)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    find: find,
    getWeather: getWeather
}