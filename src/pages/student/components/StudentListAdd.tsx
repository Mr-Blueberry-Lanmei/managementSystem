import { BetaSchemaForm, ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components'
import { Button, Drawer, message } from 'antd'
import React, { useEffect, useRef } from 'react'
import { createStudentApi, groupListApi } from '../../../services'

interface Props {
  open: boolean,
  onCancel: () => void,
  refresh: () => void,
  classNames: string[]
}

type DataItem = {
  username: string,
  password: number,
  sex: '男' | '女',
  age: number,
  email: string,
  className: string,
  idCard: string,
  avator: string,
  status: 0 | 1
}

const StudentListAdd: React.FC<Props> = (props) => {

  const formRef = useRef<ProFormInstance>()

  const onCreate = async (values: DataItem) => {
    try {
      // console.log(values.className)
      const groupRes = await groupListApi({ name: values.className })
      // console.log(groupRes)
      if (groupRes.data?.data?.list && groupRes.data.data.list.length > 0) {
        const classId = groupRes.data.data.list[0]._id
        await createStudentApi({
          username: values.username,
          password: values.password * 1,
          sex: values.sex,
          age: values.age ,
          email: values.email,
          className: classId,
          avator: '',
          idCard: values.idCard,
          status: 1
        })
        // console.log('API响应', res)
        message.success('添加学生成功')
        props.onCancel()
        props.refresh()
      }
    } catch (error) {
      message.error('学生添加失败，请重新添加')
    }
  }

  useEffect(() => {
    if (props.open) {
      formRef.current?.resetFields()
    }
  }, [props.open])

  const columns: ProFormColumnsType<DataItem>[] = [
    {
      title: '姓名',
      dataIndex: 'username',
      fieldProps: {
        placeholder: '请输入姓名',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入姓名',
          }
        ]
      },
      width: '200px'
    },
    {
      title: '密码',
      dataIndex: 'password',
      valueType: "password",
      fieldProps: {
        placeholder: '请输入密码',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入密码',
          }
        ]
      },
      width: '150px'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
        options: [
          {label: '男', value: '男'},
          {label: '女', value: '女'}
        ]
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择性别',
          }
        ]
      },
      width: '80px'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      fieldProps: {
        placeholder: '请输入真实年龄'
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入真实年龄',
          }
        ]
      },
      width: '80px'
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      fieldProps: {
        placeholder: '请输入身份证号'
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入身份证号',
          },
          {
            pattern: /^[1-9]\d{5}[1-9]\d{3}(\d{4}|\d{3}X)$/,
            message: '请输入有效的身份证号'
          }
        ]
      },
      width: '300px'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      fieldProps: {
        placeholder: '请输入邮箱'
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '请输入有效的邮箱地址'
          }
        ]
      },
      width: '300px'
    },
    {
      title: '班级',
      dataIndex: 'className',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择',
        options: props.classNames.map((className) => ({label: className, value: className}))
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择班级',
          }
        ]
      },
      width: '150px'
    }
  ]

  return (
    <div>
      <Drawer
        title="添加学生"
        open={props.open}
        size="large"
        onClose={props.onCancel}
        destroyOnClose
        footer={(
          <Button
            type="primary"
            onClick={async () => {
              try {
                const values = await formRef.current?.validateFieldsReturnFormatValue?.()
                onCreate(values)
              } catch (error) {
                console.log(error)
              }
            }}
          >确定</Button>
        )}
      >
        <BetaSchemaForm<DataItem>
          formRef={formRef}
          layoutType='Form'
          submitter={false}
          columns={columns}
        /> 
      </Drawer>
    </div>
  )
}

export default StudentListAdd
