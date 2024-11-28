import React, { useLayoutEffect } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import router from './router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { getUserInfo } from './store/models/user'
import { Spin } from 'antd'


const App: React.FC = () => {
  const location = useLocation()
  const routes = useRoutes(router)
  const loading = useSelector((state: RootState) => state.user.loading)
  const dispatch:AppDispatch = useDispatch()

  useLayoutEffect(() => {
    if(location.pathname !=='/login'){
      dispatch(getUserInfo())
    }
  }, [])

  if (loading) {
    return <div style={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Spin size='large'/>
    </div>
  }

  return (
    <div className='app'>
      {routes}
    </div>
  )
}

export default App

