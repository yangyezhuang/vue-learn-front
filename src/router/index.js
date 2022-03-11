import Vue from 'vue'
import VueRouter from 'vue-router'

// 前台组件
import Index from '../views/Users/Index'
import Course from '../views/Users/Course'
import Category from "../views/Users/Category"
import About from "../views/Users/About"
import Detail from '../views/Users/Detail'
import Search from "../views/Users/Search"
import Player from "../views/Users/Player"
import User from '../views/Users/Users/User'

import UserInfo from "../views/Users/Users/UserInfo"
import UserCourse from "../views/Users/Users/UserCourse"
import UserData from "../views/Users/Users/UserData"

// admin后台组件
import Home from '../views/Admin/Home'
import Home2 from "../views/Admin/Home2"
import AdminLogin from '../views/Admin/Login'
import Users from "../views/Admin/Users/Users"
import AddUser from "../views/Admin/Users/AddUser"
import EditUser from "../views/Admin/Users/EditUser"
import Courses from "../views/Admin/Course/Courses"
import AddCourse from "../views/Admin/Course/AddCourse"
import EditCourse from "../views/Admin/Course/EditCourse"
import Comments from "../views/Admin/Comments/Comments"
import DataAnalyse from "../views/Admin/DataAnalyse"

import {Message} from "element-ui";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        meta: {
            requireAuth: true
        },
    },
    {
        path: '/courses',
        component: Course
    },
    {
        path: '/courses/detail/:id',
        component: Detail
    },
    {
        path: '/courses/search/:keyword',
        component: Search
    },
    {
        path: "/category",
        component: Category
    },
    {
        path: '/courses/:course_id/chapter/:chapter_id',
        component: Player
    },
    {
        path: '/user',
        component: User,
        children: [
            {path: 'info', component: UserInfo},
            {path: 'courses', component: UserCourse},
            {path: 'data', component: UserData}
        ]
    },
    {
        path: '/about',
        component: About
    },

    //  admin后台路由
    {
        path: '/adminLogin',
        component: AdminLogin
    },
    {
        path: '/admin',
        component: Home,
        children: [
            {path: 'users', component: Users},
            {path: 'home', component: Home2},
            {path: 'adduser', component: AddUser},
            {path: 'edituser/:uid', component: EditUser},
            {path: 'courses', component: Courses},
            {path: 'addCourse', component: AddCourse},
            {path: 'editCourse', component: EditCourse},
            {path: 'comments', component: Comments},
            {path: 'dataAnalyse', component: DataAnalyse}
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/course/:course_id/chapter/:chapter_id') {    //判断当前路由是否需要进行权限控制
        if (sessionStorage.getItem('token')) {    //权限控制的具体规则
            next()
        } else {
            Message.error('请先登陆')
        }
    } else {
        next() // 放行
    }
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router
