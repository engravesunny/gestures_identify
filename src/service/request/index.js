import axios from 'axios'
import { BASE_URL,TIMEOUT } from './config'
const request = axios.create({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})


request.interceptors.request.use(config=>{
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
},error=>{
    return Promise.reject(error)
})

request.interceptors.response.use(config=>{
    return config
},error=>{
    return Promise.reject(error)
})

export default request