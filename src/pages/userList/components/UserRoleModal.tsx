import { Form, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { roleListApi, userUpdateApi } from '../../../services'
import { UserListItem } from '../../../type'

interface Props {
  open: boolean,
  editInfo: UserListItem | null
  onCancel: () => void,
  refresh: () => void
}


const UserRoleModal: React.FC<Props> = (props) => {

  const [options, setOptions] = useState<any[]>([])
  const [form] = Form.useForm()


  const onUpdate = async (values: any) => {
    try{
      await userUpdateApi({
        id: props.editInfo!._id,
        role: values.role
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
    form.setFieldValue('role', props.editInfo?.role)
   } else {
    form?.resetFields()
   }
  }, [props.open])

  const getRoleList = async () => {
    const res = await roleListApi()
    setOptions(res.data.data.list)
  }

  useEffect(() => {
    getRoleList()
  }, [])

  const onOk = async () => {
    try {
      const values = await form.validateFields()
      onUpdate(values)
      props.refresh()
    } catch (error) {
      console.error('分配角色失败:', error)
    }
  }

  return (
    <div>
      <Modal
        title='分配角色'
        open={props.open}
        onCancel={props.onCancel}
        okText="确定"
        cancelText="取消"
        onOk={() => onOk()}
      >
        <Form form={form}>
          <Form.Item name="role" rules={[{required: true, message: '请选择用户角色'}]}>
            <Select
              mode="multiple"
              fieldNames={{label: 'name', value: '_id'}}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserRoleModal
