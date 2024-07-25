import { createWebHistory, createRouter } from 'vue-router'
import { Note } from '@/pages'

const routes = [
  { path: '/', component: Note },
  { path: '/notes', component: Note },
  { path: '/notes/:id', component: Note },
  { path: '/notes/search', component: Note }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
