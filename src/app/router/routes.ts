import { RouteRecordRaw } from 'vue-router';

export const ROUTES_NAMES = {
    MAIN: 'main',
    REGISTER: 'register',
    SIGNIN: 'signin',
    CART: 'cart',
    CATALOG: 'catalog',
    PROFILE: 'profile',
    PRODUCT: 'product',
    NOT_FOUND: 'not-found',
} as const;

const routes: RouteRecordRaw[] = [
    {
        name: ROUTES_NAMES.MAIN,
        path: '/',
        component: () => import('../../pages/index'),
        // children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    },
    {
        name: ROUTES_NAMES.REGISTER,
        path: '/register',
        component: () => import('../../pages/registration'),
    },
    {
        name: ROUTES_NAMES.SIGNIN,
        path: '/signin',
        component: () => import('../../pages/authorization'),
    },
    {
        name: ROUTES_NAMES.CART,
        path: '/cart',
        component: () => import('../../pages/cart'),
    },
    {
        name: ROUTES_NAMES.CATALOG,
        path: '/catalog',
        component: () => import('../../pages/catalog'),
    },
    {
        name: ROUTES_NAMES.PROFILE,
        path: '/profile',
        component: () => import('../../pages/profile'),
    },
    {
        name: ROUTES_NAMES.PRODUCT,
        path: '/catalog/:id',
        component: () => import('../../pages/product'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        name: ROUTES_NAMES.NOT_FOUND,
        path: '/:catchAll(.*)*',
        component: () => import('../../pages/not-found'),
    },
];

export default routes;
