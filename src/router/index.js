import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import baca from '../views/baca.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/baca/:id',
    component: baca
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
