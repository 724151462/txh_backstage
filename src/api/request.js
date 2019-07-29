import axios from 'axios'
import qs from 'qs'
import Globe_VM from '../main'
import {
  getToken,
  removeToken
} from '@/utils/auth'


console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://255920k78z.qicp.vip/api/'
} else {
  //本地 开发环境
  axios.defaults.baseURL = '/api';
}
axios.defaults.timeout = 10000
axios.defaults.responseType = 'json'
let token = getToken()
console.log(token)
if(token) axios.defaults.headers = {token}

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  res => {
    if (res.data && Number(res.data.code) === 401) {
      removeToken()
      Globe_VM.$router.push({
        path: '/'
      })
    }
    if (res.data) {
      return Promise.reject(res.data)
    }
    return res
  },
  error => {
    return error
  }
)

export function commonsAjax(url, data, method, headers) {
  console.log(url)
  return new Promise((resolve, reject) => {
    let date = {
      url: url,
      method: method
    }
    if (getToken()) {
      date.headers = {
        token: getToken()
      }
    }
    if (data !== '' && method === 'get') {
      date.url += '?' + qs.stringify(data)
    }
    if (data !== '' && method === 'post') {
      date.data = data
    }
    if (data !== '' && method === 'delete') {
      date.data = data
    }
    if (data !== '' && method === 'put') {
      date.data = data
    }
    if (data !== '' && method === 'patch') {
      date.data = data
    }
    console.log(date)
    axios(date).then(res => {
      reject(res.data)
    }).catch(error => {
      resolve(error)
    })
  })
}