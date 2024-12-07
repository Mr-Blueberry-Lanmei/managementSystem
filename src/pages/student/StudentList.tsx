import React, { useEffect, useState } from 'react'
import { groupListApi, removeStudentApi, studentListApi, updateStudentApi } from '../../services'
import { Button, Input, message, Popconfirm, Select, Space, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import StudentListAdd from './components/StudentListAdd'
import Search from './components/Search'

export interface DataType {
  _id: string,
  username: string,
  sex: '男' | '女',
  age: number,
  className: string
  createTime: number
}

const StudentList: React.FC = () => {

  const [studentData, setStudentData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 5
  })
  const [classNames, setClassNames] = useState<string[]>([])
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editData, setEditData] = useState<DataType | null>(null)
  const [show, setShow] = useState(false)
  const [searchParams, setSearchParams] = useState({})

  const getList = async () => {
    setLoading(true)
    const res = await studentListApi({page: 1, pagesize: 99999})
    // console.log(res)
    setStudentData(res.data.data?.list)
    setTotal(res.data.data?.total)

    const Res = await groupListApi({page: 1, pagesize: 99999})
    const list = Res.data.data?.list
    const allClassNames = Array.from(new Set(list.map(item => item.name)))
    setClassNames(allClassNames)

    setLoading(false)
  }

  const getPageList = async () => {
    setLoading(true)
    const res = await studentListApi({...query, ...searchParams})
    setStudentData(res.data.data?.list)
    setTotal(res.data.data?.total)
    setLoading(false)
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    getPageList()
  }, [query, searchParams])

  const isEdit = (_id: string) => editKey === _id

  const handleEdit = (record: DataType) => {
    setEditKey(record._id)
    setEditData(record)
  }

  const handleCancel = () => {
    setEditKey(null)
    setEditData(null)
  }

  const handleSave = async () => {
    if (editData) {
      const res = await updateStudentApi({
        id: editData._id,
        username: editData.username,
        sex: editData.sex,
        className: editData.className
      })
      if (res.data.code === 200) {
        message.success('编辑成功')
        getPageList()
        setEditKey(null)
        setEditData(null)
      } else {
        message.error('编辑失败')
      }
    }
  }

  const handleDelete = async (data: DataType) => {
    const res = await removeStudentApi({id: data._id})
    if (res.data.code === 200) {
      message.success('删除成功')
      getPageList()
    } else {
      message.error('删除失败')
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => index + 1
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Input
            value={editData?.username}
            onChange={e => setEditData({...editData, username: e.target.value})}
          />
        ) : (
          text
        )
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Select
            value={editData?.sex}
            onChange={value => setEditData({...editData, sex: value})}
          >
            <Select.Option value="男">男</Select.Option>
            <Select.Option value="女">女</Select.Option>
          </Select>
        ) : (
          text
        )
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Input
            value={editData?.age}
            onChange={e => setEditData({...editData, age: e.target.value * 1})}
          />
        ) : (
          text
        )
      }
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Select
            value={editData?.className}
            onChange={value => setEditData({...editData, className: value})}
            style={{width: '100%'}}
          >
            {classNames.map(className =>
              <Select.Option key={className} value={className}>{className}</Select.Option>
            )}
          </Select>
        ) : (
          text
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time: number) => dayjs(time).format('YY-MM-DD')
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return isEdit(record._id) ? (
          <Space size='middle'>
            <Button type="primary" onClick={handleSave}>保存</Button>
            <Button onClick={handleCancel}>取消</Button>
            <Popconfirm
              title='确认删除?'
              onConfirm={() => handleDelete(record)}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space size='middle'>
            <a onClick={() => handleEdit(record)}>编辑</a>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <div style={{marginBottom: '50px'}}>
        <Search classNames={classNames} onSearch = {params => {
          setSearchParams(params || {})
        }}/>
      </div>
      <div>
        <Button style={{marginBottom: '20px', marginLeft: '1200px'}} size="large" type="primary" onClick={() => setShow(true)}>添加学生</Button>
        <Table<DataType>
          loading={loading}
          columns={columns}
          dataSource={studentData}
          rowKey="_id"
          pagination={{
            total,
            showTotal: (total, [a, b]) => `共${total}条数据${a}-${b}`,
            pageSizeOptions: [5, 10, 15, 20],
            current: query.page,
            pageSize: query.pagesize,
            onChange: (page: number, pagesize: number) => {
              setQuery({page, pagesize})
            }
          }}
        />
        <StudentListAdd
          open={show}
          onCancel={() => setShow(false)}
          refresh={() => getPageList()}
          classNames={classNames}
        />
      </div>
    </div>
  )
}

export default StudentList
