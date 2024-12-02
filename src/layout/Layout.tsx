import React, { useState } from 'react'
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Link, useNavigate } from 'react-router-dom'
import { MenuItem } from '../type'

const { Header, Content, Sider } = Layout


const LayoutPage: React.FC<{children: React.ReactNode}> = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const menuList = useSelector((state: RootState) => state.user.menuList)
  const navigate = useNavigate()
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>(['首页'])


  const format = (list: MenuItem[], parentPath: string[] = []): any[] => {
    if (!list || list.length === 0) return []
    return list.map(item => {
      const currentPath = [...parentPath, item.name]
      const other = item.children ? {children: format(item.children, currentPath)} : {}
      return {
        key: item.path,
        label: item.children ? item.name : <span onClick={() => {
          setBreadcrumbItems(currentPath)
          navigate(item.path)
        }}>{item.name}</span>,
        ...other
      }
    })
  }

  const userMenu = {
    items: [
      { key: '/', label: '个人设置' },
      { key: 'login', label: '退出登录' },
    ],
    onClick: ({ key }: { key: string }) => {
      if (key === '/') {
        navigate('/')
      } else if (key === 'login') {
        navigate('/login')
      }
    },
  }

  return (
    <Layout style={{height: '100vh'}}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px' }}>
        <div className="demo-logo" />
        <Dropdown menu={userMenu} placement='bottom'>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
            <Avatar src={userInfo?.avator} />
            <p style={{ color: 'white', margin: 0 }}>{userInfo?.username}</p>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['/']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[{ label: <Link to="/">首页</Link>, key: '/' }].concat(format(menuList))}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', display: 'block', overflow: 'auto' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={breadcrumbItems.map((item, index) => ({
              title: item,
              key: index
            }))}
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
