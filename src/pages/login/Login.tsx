import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText
} from '@ant-design/pro-components';
import { Form, Input, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginParams } from '../../type';
import { getCaptcha, loginApi } from '../../services';
import { getUserInfo } from '../../store/models/user';

const codeStyle: CSSProperties = {
  display: 'flex'
}
const codeImgStyle: CSSProperties = {
  width: '100px',
  flexShrink: 0,
  background: 'white',
  marginLeft: '15px',
  borderRadius: '10px'
}


const Page = () => {

  const { token } = theme.useToken()
  const dispatch: AppDispatch = useDispatch()
  const [codeImg, setCodeImg] = useState('')
  const navigate = useNavigate()

  const onFinish = async (valuses: LoginParams) => {
    const res = await loginApi(valuses)
    if (res.data.code === 200) {
      message.success('登录成功')
      localStorage.setItem('token', res.data.data.token)
      dispatch(getUserInfo())
      navigate('/')
    } else if (res.data.code === 1005) {
      message.error('验证码错误')
      refreshCode()
    } else {
      message.error(res.data.msg)
    }
  }

  const refreshCode = async () => {
    const res = await getCaptcha()
    setCodeImg(res.data.data.code)
  }

  useEffect(() => {
    refreshCode()
  }, [])

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://img.ixintu.com/upload/jpg/20210527/2facb0918acc9028d04fd98877f12bd4_49279_800_800.jpg!ys"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Management System"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="全球最强的权限管理平台"
        onFinish={onFinish}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'用户名: admin or user'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'密码: ant.design'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Form.Item name="code" rules={[
          {
            required: true,
            message: '请输入验证码！'
          }
        ]}>
          <div style={codeStyle}>
            <Input size='large' placeholder='输入验证码' />
            <img style={codeImgStyle} onClick={refreshCode} src={codeImg} alt="" />
          </div>
        </Form.Item>  
      </LoginFormPage>
    </div>
  );
};

const Login = () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
export default Login