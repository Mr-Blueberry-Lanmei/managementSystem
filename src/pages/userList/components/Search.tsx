import React from 'react'
import { UserListItem } from '../../../type'
import { Button, Form, Input, Select, Space } from 'antd'
import style from './Search.module.scss'

interface Props {
  onSearch: (params: UserListItem | undefined) => void
}

const Search: React.FC<Props> = (props) => {

  const [form] = Form.useForm()

  return (
    <Form labelCol={{span: 6}} form={form}>
      <div className={style.row}>
        <Form.Item name="username" label="用户名">
          <Input/>
        </Form.Item>
        <Form.Item name="status" label="账号状态">
          <Select
            options={[
              {label: '启用', value: 1},
              {label: '禁用', value: 0}
            ]}
          />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input/>
        </Form.Item>
      </div>
      <div className={style.row}>
        <Form.Item name="age" label="年龄">
          <Input/>
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Input/>
        </Form.Item>
        <Form.Item name="creator" label="创建人">
          <Input/>
        </Form.Item>
      </div>
      <div className={style.row} style={{justifyContent: 'space-between'}}>
        <Form.Item name="lastOnlineTime" label="登录时间">
          <Input/>
        </Form.Item>
        <Space>
          <Button type="primary" onClick={() => {
            const params = form.getFieldsValue()
            props.onSearch({...params})
          }}>查询</Button>
          <Button onClick={() => {
            form.resetFields()
            props.onSearch(undefined)
          }}>重置</Button>
        </Space>
      </div>
    </Form>
  )
}

export default Search
