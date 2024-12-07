import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUserInfo, updateUserInfo } from '../../store/models/user';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Personal: React.FC = () => {

  const dispatch: AppDispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | undefined>(userInfo?.avator)
  const [isModal, setIsModal] = useState(false)
  const [form] = Form.useForm()
  

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserInfo())
    }
  }, [dispatch, userInfo])

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, async (url) => {
        setImageUrl(url)
        message.success('图片上传成功')
        if (userInfo) {
          dispatch(updateUserInfo({...userInfo, avator: url}))
          dispatch(getUserInfo())
          setLoading(false)
        }
      })
    }
  }

  const handleEdit = () => {
    if (userInfo) {
      form.setFieldsValue({
        username: userInfo.username,
        sex: userInfo.sex,
        age: userInfo.age,
        email: userInfo.email
      })
    }
    setIsModal(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      dispatch(updateUserInfo({...userInfo, ...values, avator: imageUrl}))
      setIsModal(false)
      message.success('编辑成功')
      dispatch(getUserInfo())
    } catch (error) {
      console.log(error)
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://zyxcl.xyz/exam_api/profile"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', marginBottom: '30px' }}>
        <p style={{ width: '30%' }}>用户名称：{userInfo?.username}</p>
        <p style={{ width: '30%', marginLeft: '30px' }}>性别：{userInfo?.sex}</p>
        <p style={{ width: '30%', marginLeft: '30px' }}>年龄：{userInfo?.age}</p>
        <p style={{ width: '30%', marginTop: '20px' }}>邮箱：{userInfo?.email}</p>
      </div>

      <Button type="primary" size="large" onClick={handleEdit}>点击编辑</Button>

      <Modal
        title="编辑个人信息"
        open={isModal}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={() => setIsModal(false)}
      >
        <Form form={form}>
          <Form.Item label="用户名称" name="username" initialValue={userInfo?.username} rules={[{required: true, message: '请输入用户名'}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="性别" name="sex" initialValue={userInfo?.sex} rules={[{required: true, message: '请选择性别'}]}>
            <Select>
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="年龄" name="age" initialValue={userInfo?.age} rules={[{required: true, message: '请输入年龄'}]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="邮箱" name="email" initialValue={userInfo?.email} rules={[{required: true, message: '请输入邮箱'}]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Personal
