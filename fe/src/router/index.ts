import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue')
  },
  {
    path: '/record/:id',
    name: 'RecordDetail',
    component: () => import('@/views/RecordDetail.vue')
  },
  {
    path: '/create-record',
    name: 'CreateRecord',
    component: () => import('@/views/CreateRecord.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
