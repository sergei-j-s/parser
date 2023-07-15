import Page404 from '@/pages/Page404.vue';

const page404 = [{
    path: '/:pathMatch(.*)*',
    name: '404',
    component: Page404,
    meta: {
        title: '404'
    }
}];

export { page404 };