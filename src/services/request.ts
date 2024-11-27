import { message } from "antd"
import axios from "axios"


const request = axios.create({
  timeout: 5000,
  baseURL: '/bw/api'  // 'https://zyxcl.xyz/exam_api'
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前处理公共参数
  config.headers.AUTHORIZATION = localStorage.getItem('token')
  return config
}, function (error) {
  // 请求错误
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 内的状态码会触发
  return response
}, function (error) {
  // 超出 2xx 的状态吗会触发
  console.log(error)
  if (error.status === 401) {
    message.error('登录信息失效，请重新登录')
    localStorage.removeItem('token')
    setTimeout(() => {
      window.location.href = '/login'
    }, 2000)
  }
  return Promise.reject(error)
})


export default request
