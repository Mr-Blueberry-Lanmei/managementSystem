import { BaseResponse, CaptchaRes, LoginParams, LoginRes, MenuItem, UserInfo, UserListParams, UserListRes } from "../type"
import request from "./request"


// 验证码接口
export const getCaptcha = () => {
  return request.get<CaptchaRes>('/login/captcha')
}

// 登录接口
export const loginApi = (params: LoginParams) => {
  return request.post<LoginRes>('/login', params)
}

// 个人信息接口
export const userInfoApi = () => {
  return request.get<BaseResponse<UserInfo>>('/user/info')
}

// 左侧菜单接口
export const menuListApi = () => {
  return request.get<BaseResponse<{list: MenuItem[]}>>('/user/menulist')
}

// 用户列表
export const userListApi = (params: UserListParams) => {
  return request.get<UserListRes>('/user/list', {params})
}