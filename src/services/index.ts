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

// 修改个人信息接口
export const updateUserInfoApi = (data: {[key: string]: any}) => {
  return request.post<BaseResponse<UserInfo>>('/user/update/info', data)
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

// 查看班级接口
export const groupListApi = (params: any) => {
  return request.get<BaseResponse>('/studentGroup/list', {params})
}

// 班级编辑接口
export const updateGroupApi = (data: { id: string; [key: string]: any }) => {
  return request.post<BaseResponse>('/studentGroup/update', data)
}

// 删除班级接口
export const removeGroupApi = (data: {id: string}) => {
  return request.post<BaseResponse>('/studentGroup/remove', data)
}

// 创建班级接口
export const createGroupApi = (data: {[key: string]: any}) => {
  return request.post<BaseResponse>('/studentGroup/create', data)
}

// 查看学生接口
export const studentListApi = (params: any) => {
  return request.get<BaseResponse>('/student/list', {params})
}

// 学生编辑接口
export const updateStudentApi = (data: { id: string; [key: string]: any }) => {
  return request.post<BaseResponse>('/student/update', data)
}

// 删除学生接口
export const removeStudentApi = (data: {id: string}) => {
  return request.post<BaseResponse>('/student/remove', data)
}

// 添加学生接口
export const createStudentApi = (data: {[key: string]: any}) => {
  return request.post<BaseResponse>(`/student/create?${Date.now()}`, data)
}
