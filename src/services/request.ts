import { message } from "antd"
import axios from "axios"


const request = axios.create({
  timeout: 5000,
  baseURL: '/bw/api'  // 'https://zyxcl.xyz/exam_api'
})


request.interceptors.request.use(function(config){
   // 在发送请求之前处理公共参数
   config.headers.AUTHORIZATION =  localStorage.getItem('token')
   return config
  },function(error){
    return Promise.reject(error)
})

request.interceptors.response.use(function(response){
  return response
},function(error){
  if(error.status === 401){
    message.error('登录信息失效')
    localStorage.removeItem('token')
    setTimeout(()=>{
      window.location.href = '/login'
    },1000)
  }
  return Promise.reject(error)
})



export default request
