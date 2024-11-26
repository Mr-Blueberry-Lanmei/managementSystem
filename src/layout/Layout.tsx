import React from 'react'
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout



const LayoutPage: React.FC<{children: React.ReactNode}> = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const menuList = useSelector((state: RootState) => state.user.menuList)

  const format = (list) => {
    if (!list || list.length === 0) return []
    return list.map(item => {
      const other = item.children ? {children: format(item.children)} : {}
      return {
        key: item.path,
        label: <Link to={item.path}>{item.name}</Link>,
        ...other
      }
    })
  }

  return (
    <Layout style={{height: '100vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Avatar src={userInfo?.avator} />
        <p style={{color: 'white'}}>{userInfo?.username}</p>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={format(menuList)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default LayoutPage
