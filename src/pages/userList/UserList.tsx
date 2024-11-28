import React, {useState, useEffect} from 'react'
import { userListApi } from '../../services'
import {userListItem, userParams} from '../../type'



const UserList: React.FC = () => {
  const [userList, setUserList] = useState<userListItem[]>([])
  const [params, setParams] = useState<userParams>({
    page:1,
    pagesize:5
  })
  
  const getList = async() => {
    const res = await userListApi(params)
    console.log(res.data.data)
  }

  useEffect(() => {
    getList()
  }, [params])


  return (
    <div>
      用户列表
    </div>
  )
}

export default UserList
