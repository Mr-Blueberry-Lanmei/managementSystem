export interface BasResponse<T>{
  code:number
  msg:string
  data:T
}

export type CaptchaRes = BasResponse<{code: string}>

export interface LoginParams {
  username: string,
  padssword: string,
  code: string
}

export type LoginRes = BasResponse<{token:string}>


//用户列表
export type userListItem = {
  _id: string
  username:string
  password:string
  status: 1 | 0,
  __v: number
}

export type userListData = {
  total:number
  list:userListItem[]
  page:number
  pagesize:number
  totalPage:number
}

export type userListRes = BasResponse<userListData>

export type userParams = {
  page:number
  pagesize:number
}
