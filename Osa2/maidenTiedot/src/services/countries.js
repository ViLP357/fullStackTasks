import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = import.meta.env.VITE_API_KEY

//api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e0bbe29d805279575a95b7b8e7eb131c

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const find = (name) => {
    //console.log(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}
const getWeather = (city, country) => {
    //console.log(`${apiBaseUrl}${city},${country}&APPID=${apiKey}`)
    const request = axios.get(`${apiBaseUrl}${city},${country}&APPID=${apiKey}`)
    //console.log("data in count.js ", request.data)
    return request.then(response => response.data)
}

export default {
    getAll: getAll,
    find: find,
    getWeather: getWeather
}