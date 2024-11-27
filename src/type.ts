// 返回的总数据
export interface BaseResponse<T = null> {
  code: number,
  msg: string,
  data: T
}

// 状态码
export type CaptchaRes = BaseResponse<{code: string}>

// 登录的参数
export interface LoginParams {
  username: string,
  padssword: string,
  code: string
}

// 登录
export type LoginRes = BaseResponse<{token: string}>

// 用户信息的参数
export type Permission = {
  name: string,
  path: string
}

// 用户信息
export type UserInfo = {
  age: number,
  avator: string,
  email: string,
  sex: string,
  username: string,
  _id: string,
  permission: Permission[],
  role: string[]
}

// 左侧菜单
export type MenuItem = {
  createTime: number,
  disabled: boolean,
  isBtn: boolean,
  name: string,
  path: string,
  pid: string,
  _id: string,
  children?: MenuItem[]
}

// 用户列表参数
export type UserListParams = {
  page: number,
  pagesize: number
}

// 用户列表信息
export type UserListItem = {
  _id: string,
  username: string,
  password: string,
  status: 0 | 1,
  age: number,
  avator: string,
  email: string,
  sex: string
}

// 用户列表
export type UserListRes = BaseResponse<{total: number, list: UserListItem[]}>