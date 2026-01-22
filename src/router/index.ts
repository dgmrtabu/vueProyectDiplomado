import AuthLayouts from '@/layouts/AuthLayouts.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayouts,
    children: [
      { path: 'login', name: 'login', component: LoginView },
      { path: 'register', name: 'register', component: RegisterView },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardLayout,
    children: [
      // {
      //   path: '/profile',
      //   name: 'profile',
      //   component: PerfilView,
      // },
      // {
      //   path: '/tasks',
      //   name: 'tasks',
      //   component: () => import('@/views/dashboard/TasksView.vue'),
      // },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
