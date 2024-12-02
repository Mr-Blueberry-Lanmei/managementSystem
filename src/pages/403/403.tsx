import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const Forbidden: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="没有访问此页面的权限，请练习管理员申请权限！"
    extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
  />
)

export default Forbidden