import React, { useEffect, useState } from 'react'
import { UserListItem } from '../../type'
import { userListApi, userRemoveApi } from '../../services'
import { Table, TableProps, Image, Space, Button, message } from 'antd'
import dayjs from 'dayjs'
import Search from './components/Search'
import UserModal from './components/UserModal'
import UserRoleModal from './components/UserRoleModal'
import PermissionLayout from '../../components/permissionLayout/PermissionLayout'


const UserList: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState<UserListItem[]>([])
  const [searchParams, setSearchParams] = useState({})
  const [show, setShow] = useState(false)
  const [showRole, setShowRole] = useState(false)
  const [editRow, setEditRow] = useState<UserListItem | null>(null)
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 5
  })

  const getList = async () => {
    setLoading(true)
    const res = await userListApi({...query, ...searchParams})
    setUserList(res.data.data.list)
    setTotal(res.data.data.total)
    setLoading(false)
  }

  const del = async (userId: string) => {
    await userRemoveApi({id: userId})
    message.success('删除成功')
    getList()
  }

  useEffect(() => {
    getList()
  }, [query, searchParams])

  const columns: TableProps<UserListItem>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
      fixed: 'left'
    },
    {
      title: '头像',
      dataIndex: 'avator',
      key: 'avator',
      render: (_, record) => <Image src={record.avator} width={100} />
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      width: 100
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key: 'status',
      width: 150
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 100
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 100
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => {
        return <Space>
          <Button type="primary" size="small" onClick={() => {
            setShowRole(true)
            setEditRow({...record})
          }}>分配角色</Button>
          <Button size="small" type="primary" onClick={() => {
            setEditRow({...record})
            setShow(true)
          }}>编辑</Button>
          <PermissionLayout permission='delUser'>
            <Button danger size="small" onClick={() => del(record._id)}>删除</Button>
          </PermissionLayout>
        </Space>
      }
    }
  ]

  return (
    <div>
      <Search onSearch = {params => {
        setSearchParams(params || {})
      }}/>
      <Button style={{marginBottom: '20px', }} size="large" type="primary" onClick={() => setShow(true)}>新增</Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={userList}
        rowKey="_id"
        pagination={{
          total,
          showTotal: (total, [a, b]) => `共${total}条数据${a}-${b} `,
          pageSizeOptions: [5, 10, 15, 20],
          current: query.page,
          pageSize: query.pagesize,
          onChange: (page: number, pagesize: number) => {
            setQuery({page, pagesize})
          }
        }}
      />
      <UserModal
        open={show}
        editInfo={editRow}
        onCancel={() => setShow(false)}
        refresh={() => getList()}
      />
      <UserRoleModal
        open={showRole}
        editInfo={editRow}
        onCancel={() => setShowRole(false)}
        refresh={() => getList()}
      />
    </div>
  )
}

export default UserList
