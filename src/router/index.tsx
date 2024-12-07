import LayoutPage from "../layout/Layout";
import Forbidden from "../pages/403/403";
import Notfound from "../pages/404/404";
import GroupList from "../pages/group/GroupList";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Permission from "../pages/permission/Permission";
import Personal from "../pages/personal/Personal";
import Role from "../pages/role/Role";
import StudentList from "../pages/student/StudentList";
import UserList from "../pages/userList/UserList";
import RoutePermission from "./RoutePermission";


const routes = [
  {
    path: '/',
    layout: true,
    element: <Home/>
  },
  {
    path: '/manage-group/group-list',
    isPermission: true,
    layout: true,
    element: <GroupList/>
  },
  {
    path: '/manage-group/group-students',
    isPermission: true,
    layout: true,
    element: <StudentList/>
  },
  {
    path: '/userManage/manage-page',
    isPermission: true,
    layout: true,
    element: <UserList/>
  },
  {
    path: '/userManage/menuManage',
    isPermission: true,
    layout: true,
    element: <Permission/>
  },
  {
    path: '/userManage/system',
    isPermission: true,
    layout: true,
    element: <Role/>
  },
  {
    path: '/userManage/personal',
    isPermission: true,
    layout: true,
    element: <Personal/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '*',
    element: <Notfound/>
  },
  {
    path: '/403',
    element: <Forbidden/>
  }
]

const formatRoutes = (routes: any) => {
  routes.forEach((item: any) => {
    if (item.layout) {
      item.element = <LayoutPage>{item.element}</LayoutPage>
    }
    // if (item.isPermission) {
    //   item.element = <RoutePermission>{item.element}</RoutePermission>
    // }
    if (item.children) {
      item.children = formatRoutes(item.children)
    }
  })
  return routes
}

export default formatRoutes(routes)
