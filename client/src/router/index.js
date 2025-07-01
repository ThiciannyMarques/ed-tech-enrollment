import { createRouter, createWebHistory } from 'vue-router'
import AcademicModule from '../views/AcademicModule'
import StudentList from '../views/Students/StudentList.vue'
import StudentForm from '../views/Students/StudentForm.vue'

const routes = [
  {
    path: '/',
    component: AcademicModule,
    children: [
      {
        path: '',
        name: 'AcademicHome',
        component: () => import('../components/academic/academicHome.vue'),
      },
      {
        path: 'students',
        name: 'StudentList',
        component: StudentList,
      },
      {
        path: 'students/create',
        name: 'StudentCreate',
        component: StudentForm,
      },
      {
        path: 'students/edit/:ra',
        name: 'StudentEdit',
        component: StudentForm,
        props: true,
      },
    ],
  },
  {
    path: '/',
    redirect: '/',
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

export default router
