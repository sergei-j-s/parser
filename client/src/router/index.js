import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

export default router;