import LayoutPage from "../layout/Layout";
import Notfound from "../pages/404/404";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import UserList from "../pages/userList/UserList";


export default [
  {
    path: '/',
    element: (
      <LayoutPage>
        <Home/>
      </LayoutPage>
    )
  },
  {
    path: '/userManage/manage-page',
    element: (
      <LayoutPage>
        <UserList/>
      </LayoutPage>
    )
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '*',
    element: <Notfound/>
  }
]