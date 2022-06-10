// 该文件专门用于创建整个应用的路由器

import VueRouter from "vue-router"
import About from '../pages/About'
import Home from '../pages/Home'
import Message from '../pages/Message'
import News from '../pages/News'
import Detail from '../pages/Detail'

const router = new VueRouter({
    mode: 'history',  // 默认 'hash'，即路径带#
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: 'news',
                    component: News,
                    meta: {
                        isAuth: true,
                        title: '新闻'
                    },
                    // 路由独享守卫
                    beforeEnter: (to, from, next) => {
                        if(to.meta.isAuth) {
                            // 判断是否需要鉴权
                            if(localStorage.getItem('name') === 'yfl') {
                                next()
                            }else{
                                alert('非法访问')
                            }
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail/:id/:title',
                            component: Detail,

                            //props的第一种写法值为对象,该对象的所有key-value都会以props的形式传给detail组件(死数据)
                            /* props:{
                                a:1,
                                b:'hello'
                            } */
                            
                            //props的第二种写法，值为布尔值,布尔值为真，就会把该路由组件收到的所有params(注意如果是query参数不会奏效的)参数以props的形式传递给detail组件
                            /* props: true */

                            //props的第三种写法,值为函数  $route.query.id
                            props($route){
                                return {
                                    /* id: $route.query.id,
                                    title: $route.query.title */
                                    id: $route.params.id,
                                    title: $route.params.title
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

// 全局前置路由守卫--初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next)=>{
    if(to.meta.isAuth) {
        // 判断是否需要鉴权
        if(localStorage.getItem('name') === 'yfl') {
            next()
        }else{
            alert('非法访问')
        }
    } else {
        next()
    }
})

// 全局后置路由守卫--初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from)=>{
    console.log('后置路由守卫', to, from)
})

export default router