import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../../pages/index'),
        // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    },
    {
        path: '/register',
        component: () => import('../../pages/registration'),
    },
    {
        path: '/signin',
        component: () => import('../../pages/authorization'),
    },
    {
        path: '/cart',
        component: () => import('../../pages/cart'),
    },
    {
        path: '/catalog',
        component: () => import('../../pages/catalog'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('../../pages/not-found'),
    },
];

export default routes;
