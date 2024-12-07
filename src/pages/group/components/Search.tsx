import React, { useEffect } from 'react'
import { DataType } from '../GroupList'
import { ProForm, ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-components'

interface Props {
  onSearch: (params: DataType | undefined) => void,
  teachers: string[],
  classifyType: string[]
}

const Search: React.FC<Props> = ({
  onSearch,
  teachers,
  classifyType
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
        <ProFormText name="name" label="班级名称"  />
        <ProFormSelect
          name="teacher"
          label="老师"
          mode="single"
          options={teachers.map(teacher => ({label: teacher, value: teacher}))}
        />
        <ProFormSelect
          name="classify"
          label="科目类型"
          mode="single"
          options={classifyType.map(classify => ({label: classify, value: classify}))}
        />
      </QueryFilter>
    </div>
  )
}

export default Search
