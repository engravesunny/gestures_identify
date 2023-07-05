import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../view/home/index.vue')
    },
    {
        path: '/snake',
        name: 'snake',
        component: () => import('../view/snake/index.vue')
    },
    {
        path: '/box',
        name: 'box',
        component: () => import('../view/pushBox/index.vue')
    },
    {
        path: '/three',
        name: 'three',
        component: () => import('../view/three/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
