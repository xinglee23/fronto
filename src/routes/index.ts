import {createRouter, createWebHistory} from 'vue-router';

import Home from '../views/Home.vue';
import Editor from '../views/Editor.vue';
import Login from '../views/Login.vue';
import TemplateDetail from '../views/TemplateDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        withHeader: true,
        withFooter: true,
        isHome: true,
      },
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
      meta: {
        withHeader: true,
        isEditor: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/template/:id',
      name: 'template',
      component: TemplateDetail,
    },
  ],
});

export default router;
