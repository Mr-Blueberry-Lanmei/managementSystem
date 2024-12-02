import React from 'react'
import { permissionListApi } from '../../services'
import { useRequest } from 'ahooks'
import { Table, Tag } from 'antd'

const Permission = () => {

  const {data, error, loading} = useRequest(permissionListApi)
  console.log(data?.data.data.list)

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '权限类型',
      dataIndex: "isBtn",
      key: "isBtn",
      render: (isBtn) => {
        return isBtn ? <Tag color="green">按钮权限</Tag> : <Tag color="blue">页面权限</Tag>
      }
    }
  ]

  if (error) {
    return <div>请求失败</div>
  }

  return (
    <div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data?.data.data.list}
        loading={loading}
      />
    </div>
  )
}

export default Permission
