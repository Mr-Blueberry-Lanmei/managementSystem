import { message, Modal } from 'antd'
import React, { useEffect, useRef } from 'react'
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components'
import { BetaSchemaForm } from '@ant-design/pro-components'
import { userCreateApi, userUpdateApi } from '../../../services'
import { UserListItem } from '../../../type'

interface Props {
  open: boolean,
  editInfo: UserListItem | null
  onCancel: () => void,
  refresh: () => void
}

type DataItem = {
  username: string,
  password: string,
  confirmPassword: string,
  status: boolean
}

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    fieldProps: {
      placeholder: '请输入用户名'
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入用户名',
        }
      ]
    },
    width: 'm'
  },
  {
    title: '密码',
    dataIndex: 'password',
    valueType: 'password',
    fieldProps: {
      placeholder: '请输入密码'
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入密码',
        }
      ]
    },
    width: 'm'
  },
  {
    title: '确认密码',
    dataIndex: 'confirmPassword',
    valueType: 'password',
    dependencies: ['password'],
    fieldProps: {
      placeholder: '请输入密码'
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请确认密码',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('两次密码不一致！'));
          },
        }),
      ]
    },
    width: 'm'
  },
  {
    title: '账号状态',
    dataIndex: 'status',
    width: 'm',
    valueType: 'switch',
    initialValue: true
  }
]

const UserModal: React.FC<Props> = (props) => {

  const formRef = useRef<ProFormInstance>()

  const onCreate = async (values: DataItem) => {
    try {
      await userCreateApi({
        username: values.username,
        password: values.password,
        status: values.status ? 1 : 0
      })
      message.success('用户创建成功！')
      props.onCancel()
    } catch (error) {
      console.log(error)
      message.error('用户创建失败，请重新添加')
    }
  }

  const onUpdate = async (values: DataItem) => {
    try {
      await userUpdateApi({
        id: props.editInfo!._id,
        username: values.username,
        password: values.password,
        status: values.status ? 1 : 0
      })
      message.success('用户编辑成功！')
      props.onCancel()
    } catch (error) {
      console.log(error)
      message.error('用户编辑失败，请重新编辑')
    }
  }

  useEffect(() => {
    if (props.open) {
      if (props.editInfo) {
        formRef.current?.setFieldsValue({
          ...props.editInfo,
          confirmPassword: props.editInfo.password
        })
      } else {
        formRef.current?.resetFields()
      }
    }
  }, [props.open])

  const onOk = async () => {
    try {
      const values = await formRef.current?.validateFieldsReturnFormatValue?.()
      if (props.editInfo) {
        onUpdate(values)
      } else {
        onCreate(values)
      }
      props.refresh()
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  return (
    <div>
      <Modal
        title={props.editInfo ? '编辑' : '新增'}
        open={props.open}
        onCancel={props.onCancel}
        okText="确定"
        cancelText="取消"
        onOk={() => onOk()}
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

export default UserModal
