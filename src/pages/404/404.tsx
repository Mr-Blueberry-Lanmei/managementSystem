import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Notfound: React.FC = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/"><Button type="primary">去首页</Button></Link>}
      />
    </div>
  )
}

export default Notfound
