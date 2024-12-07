import React, { useEffect } from 'react'
import { DataType } from '../StudentList'
import { ProForm, ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-components'


interface Props {
  onSearch: (params: DataType | undefined) => void,
  classNames: string[]
}

const Search: React.FC<Props> = ({
  onSearch,
  classNames
}) => {

  const [form] = ProForm.useForm()

  const handleSearch = async () => {
    const values = await form.validateFields()
    onSearch(values)
  }

  const handleReset = () => {
    form.resetFields()
    onSearch(undefined)
  }

  useEffect(() => {
    onSearch(undefined)
  }, [])

  return (
    <div>
      <QueryFilter defaultCollapsed split form={form} onFinish={handleSearch} onReset={handleReset}>
        <ProFormText name="username" label="姓名"  />
        <ProFormSelect
          name="sex"
          label="性别"
          mode="single"
          options={[{label: '男', value: '男'}, {label: '女', value: '女'}]}
        />
        <ProFormText name="age" label="年龄"  />
        <ProFormSelect
          name="className"
          label="班级"
          mode="single"
          options={classNames.map(className => ({label: className, value: className}))}
        />
      </QueryFilter>
    </div>
  )
}

export default Search
