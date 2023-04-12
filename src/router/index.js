import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import('../view/home/index.vue')
    },
    {
        path:'/snake',
        name:'snake',
        component:()=>import('../view/snake/index.vue')
    },
    {
        path:'/box',
        name:'box',
        component:()=>import('../view/pushBox/index.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
