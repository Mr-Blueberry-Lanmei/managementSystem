import { BaseResponse, CaptchaRes, LoginParams, LoginRes, MenuItem, UserInfo, UserListItem, UserListParams, UserListRes } from "../type"
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

// 用户列表接口
export const userListApi = (params: UserListParams) => {
  return request.get<UserListRes>('/user/list', {params})
}

// 新增用户接口
type CreateUserParams = Pick<UserListItem, 'username' | 'password' | 'status'>
export const userCreateApi = (params: CreateUserParams) => {
  return request.post<BaseResponse>('/user/create', params)
}

// 删除用户接口
type RemoveUserParams = Partial<Omit<UserListItem, '_id'>> & {id: string}
export const userRemoveApi = (params: RemoveUserParams) => {
  return request.post('/user/remove', params)
}

// 编辑接口
type UpdateUserParams = Partial<Omit<UserListItem, '_id'>> & {id: string}
export const userUpdateApi = (params: UpdateUserParams) => {
  return request.post('/user/update', params)
}

// 分配角色接口
export const roleListApi = () => {
  return request.get<BaseResponse>('/role/list')
}

// 权限管理接口
export const permissionListApi = () => {
  return request.get<BaseResponse>('/permission/list')
}

// 编辑权限接口
export const updateRoleApi = (params: any) => {
  return request.post<BaseResponse>('/role/update', params)
}
