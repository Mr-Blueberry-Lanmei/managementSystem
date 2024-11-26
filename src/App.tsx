import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import router from './router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { getUserInfo } from './store/models/user'


const App: React.FC = () => {

  const routes = useRoutes(router)
  const loading = useSelector((state: RootState) => state.user.loading)
  const dispatch:AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className='app'>
      {routes}
    </div>
  )
}

export default App

