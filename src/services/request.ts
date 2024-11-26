import axios from "axios"


const request = axios.create({
  timeout: 5000,
  baseURL: '/bw/api'  // 'https://zyxcl.xyz/exam_api'
})



export default request
