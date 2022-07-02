import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/communication',
            component: () => import('@/components/Communication'),
            children: [
                {
                    path: 'model',
                    component: () => import('@/components/ModelTest')
                },
                {
                    path: 'event',
                    component: () => import('@/components/EventTest')
                },
            ]
        },
        {
            path: "*",
            redirect: "/communication"
        }
    ]
})

export default router