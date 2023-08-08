import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../../pages/index'),
        // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('../../pages/not-found'),
    },
];

export default routes;