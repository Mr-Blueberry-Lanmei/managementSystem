import React, { useEffect, useState } from 'react';
import { Button, Input, message, Popconfirm, Select, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { groupListApi, removeGroupApi, updateGroupApi } from '../../services';
import dayjs from 'dayjs';
import GroupListAdd from './components/GroupListAdd';
import Search from './components/Search';

export interface DataType {
  _id: string;
  name: string;
  teacher: string;
  classify: string;
  createTime: number
}


const GroupList: React.FC = () => {

  const [data, setData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 5
  })
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editData, setEditData] = useState<DataType | null>(null)
  const [teachers, setTeachers] = useState<string[]>([])
  const [classifyType, setClassifyType] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const [searchParams, setSearchParams] = useState({})

  const getList = async () => {
    setLoading(true)
    const res = await groupListApi({page: 1, pagesize: 99999})
    // console.log(res)
    setData(res.data.data?.list)
    // console.log(data)
    setTotal(res.data.data?.total)
    
    const list = res.data.data?.list
    const allTeachers = Array.from(new Set(list.map(item => item.teacher)))
    const allClassifyType = Array.from(new Set(list.map(item => item.classify)))
    setTeachers(allTeachers)
    setClassifyType(allClassifyType)

    setLoading(false)
  }

  const getPageList = async () => {
    setLoading(true)
    const res = await groupListApi({...query, ...searchParams})
    setData(res.data.data?.list)
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
      const res = await updateGroupApi({
        id: editData._id,
        name: editData.name,
        teacher: editData.teacher,
        classify: editData.classify
      })
      if (res.data.code === 200) {
        message.success('编辑成功')
        getPageList()
        setEditKey(null)
        setEditData(null)
      }
    } else {
      message.error('编辑失败')
    }
  }

  const handleDelete = async (data: DataType) => {
    const res = await removeGroupApi({id: data._id})
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
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Input
            value={editData?.name}
            onChange={e => setEditData({...editData, name: e.target.value})}
          />
        ) : (
          text
        )
      }
    },
    {
      title: '老师',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Select
            value={editData?.teacher}
            onChange={value => setEditData({...editData, teacher: value})}
            style={{width: '100%'}}
          >
            {teachers.map(teacher =>
              <Select.Option key={teacher} value={teacher}>{teacher}</Select.Option>
            )}
          </Select>
        ) : (
          text
        )
      }
    },
    {
      title: '科目类型',
      dataIndex: 'classify',
      key: 'classify',
      render: (text, record) => {
        return isEdit(record._id) ? (
          <Select
            value={editData?.classify}
            onChange={value => setEditData({...editData, classify: value})}
            style={{width: '100%'}}
          >
            {classifyType.map(classify =>
              <Select.Option key={classify} value={classify}>{classify}</Select.Option>
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
            <a>查看</a>
          </Space>
        )
      }
    }
  ]
  
  
  return (
    <div>
      <div style={{marginBottom: '50px'}}>
        <Search teachers={teachers} classifyType={classifyType} onSearch = {params => {
          setSearchParams(params || {})
        }}/>
      </div>
      <div>
        <Button style={{marginBottom: '20px', marginLeft: '1200px'}} size="large" type="primary" onClick={() => setShow(true)}>新增班级</Button>
        <Table<DataType>
          loading={loading}
          columns={columns}
          dataSource={data}
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
        <GroupListAdd
          open={show}
          onCancel={() => setShow(false)}
          refresh={() => getPageList()}
          teachers={teachers}
          classifyType={classifyType}
        />
      </div>
    </div>
  )
}

export default GroupList
