import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Auth/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Auth/RegisterView.vue'),
    meta: { public: true },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/Auth/ResetPasswordView.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: () => import('../views/AcademicModule.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AcademicHome',
        component: () => import('../components/academic/academicHome.vue'),
      },
      {
        path: 'students',
        name: 'StudentList',
        component: () => import('../views/Students/StudentList.vue'),
        meta: { roles: ['admin'] },
      },
      {
        path: 'students/create',
        name: 'StudentCreate',
        component: () => import('../views/Students/StudentForm.vue'),
        meta: { roles: ['admin'] },
      },
      {
        path: 'students/edit/:ra',
        name: 'StudentEdit',
        component: () => import('../views/Students/StudentForm.vue'),
        meta: { roles: ['admin'] },
        props: true,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.public) {
    return next()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.roles) {
    const userRole = authStore.userRole
    if (!userRole || !to.meta.roles.includes(userRole)) {
      return next('/')
    }
  }

  next()
})

export default router
