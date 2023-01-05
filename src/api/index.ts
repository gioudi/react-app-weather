import axios from 'axios'

const apiURL = axios.create({
  baseURL: 'http://api.openweathermap.org',
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiURL
