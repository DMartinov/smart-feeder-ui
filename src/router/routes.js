import routeNames from './routeNames';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: routeNames.dashboard, component: () => import('pages/Index.vue') },
      { path: 'login', name: routeNames.login, component: () => import('pages/Login.vue') },
      { path: 'users', name: routeNames.users, component: () => import('pages/Users.vue') },
      { path: 'sign-up', name: routeNames.signUp, component: () => import('pages/SignUp.vue') },
    ],
  },

  // Always leave this as last one, hgfnh gf ngf nhfrnxhr jrx jyxt
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
