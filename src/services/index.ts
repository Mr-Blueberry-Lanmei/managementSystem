import { LoginParams } from "../type"
import request from "./request"



export const getCaptcha = () => {
  return request.get('/login/captcha')
}

export const loginApi = (params: LoginParams) => {
  return request.post('/login', params)
}

export const userInfoApi = () => {
  return request.get('/user/info')
}

export const menuListApi = () => {
  return request.get('/user/menulist')
}

export const userListApi = (params:{page:number,pagesize:number}) => {
  return request.get('/user/list',{params})
}