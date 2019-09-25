import Vue from 'vue'
import Router from 'vue-router'
import archetype from '@/app/archetype/archetype.routes'
import stage from '@/app/stage/stage.routes'
import story from '@/app/story/story.routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
      component: () => import(/* webpackChunkName: "init" */ '@/app/Index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: "init" */ '@/app/Home.vue')
        },
        {
          path: 'singup',
          name: 'singUp',
          component: () => import(/* webpackChunkName: "init" */ '@/app/SingUp.vue')
        },
        {
          path: 'singin',
          name: 'singIn',
          component: () => import(/* webpackChunkName: "init" */ '@/app/SingIn.vue')
        },
        {
          path: '404',
          name: '404',
          component: () => import(/* webpackChunkName: "init" */ '@/app/404.vue')
        },
        archetype,
        stage,
        story
      ]
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ]
})
