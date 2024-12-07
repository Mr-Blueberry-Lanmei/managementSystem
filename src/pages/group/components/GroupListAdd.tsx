import { message, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components'
import { BetaSchemaForm } from '@ant-design/pro-components'
import { createGroupApi } from '../../../services'


interface Props {
  open: boolean,
  onCancel: () => void,
  refresh: () => void,
  teachers: string[],
  classifyType: string[]
}

type DataItem = {
  name: string,
  teacher: string,
  classify: string,
  createTime: number
}


const GroupListAdd: React.FC<Props> = (props) => {

  const formRef = useRef<ProFormInstance>()

  const onCreate = async (values: DataItem) => {
    try {
      await createGroupApi({
        name: values.name,
        classify: values.classify,
        teacher: values.teacher,
        students: [1, 2, 3]
      })
      message.success('班级创建成功！')
      props.onCancel()
      props.refresh()
    } catch (error) {
      message.error('班级创建失败，请重新添加')
    }
  }

  useEffect(() => {
    if (!props.open) {
      formRef.current?.resetFields()
    }
  }, [props.open])

  const columns: ProFormColumnsType<DataItem>[] = [
    {
      title: '班级名称',
      dataIndex: 'name',
      fieldProps: {
        placeholder: '请输入班级名称'
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入班级名称',
          }
        ]
      },
      width: 'm'
    },
    {
      title: '老师',
      dataIndex: 'teacher',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
        options: props.teachers.map((teacher) => ({label: teacher, value: teacher}))
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择老师',
          }
        ]
      },
      width: 'm'
    },
    {
      title: '班级进度',
      dataIndex: 'classify',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
        options: props.classifyType.map((classify) => ({label: classify, value: classify}))
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择课程',
          }
        ]
      },
      width: 'm'
    },
  ]

  return (
    <div>
      <Modal
        title='新增班级'
        open={props.open}
        onCancel={props.onCancel}
        okText="确定"
        cancelText="取消"
        onOk={async () => {
          try {
            const values = await formRef.current?.validateFieldsReturnFormatValue?.()
            onCreate(values)
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <BetaSchemaForm<DataItem>
          formRef={formRef}
          layoutType='Form'
          submitter={false}
          columns={columns}
        />
      </Modal>
    </div>
  )
}

export default GroupListAdd
