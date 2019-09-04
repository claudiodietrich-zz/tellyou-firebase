export default {
  path: '/',
  redirect: { name: 'home' },
  component: () => import(/* webpackChunkName: "home" */ '@/app/home/views/Index.vue'),
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@/app/home/views/Home.vue')
    },
    {
      path: 'singup',
      name: 'singUp',
      component: () => import(/* webpackChunkName: "home" */ '@/app/home/views/SingUp.vue')
    },
    {
      path: 'singin',
      name: 'singIn',
      component: () => import(/* webpackChunkName: "home" */ '@/app/home/views/SingIn.vue')
    }
  ]
}
