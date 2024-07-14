import { createWebHistory, createRouter } from 'vue-router'
import { NotePage } from '@/pages'

const routes = [
  { path: '/', component: NotePage },
  { path: '/notes', component: NotePage },
  { path: '/notes/:id', component: NotePage },
  { path: '/notes/search', component: NotePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
