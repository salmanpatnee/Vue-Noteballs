import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import StatsView from '@/views/StatsView.vue'
import NotesEdit from '@/views/NotesEditView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/note/:id/edit',
    name: 'notes.edit',
    component: NotesEdit,
    props: true
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
