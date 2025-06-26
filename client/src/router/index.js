import { createRouter, createWebHistory } from 'vue-router'
import StudentList from '@/views/Students/StudentList.vue'
import StudentForm from '@/views/Students/StudentForm.vue'
import AcademicModule from '@/views/AcademicModule.vue'

const routes = [
  {
    path: '/',
    name: 'AcademicModule',
    component: AcademicModule,
  },
  {
    path: '/students',
    name: 'StudentList',
    component: StudentList,
  },
  {
    path: '/students/create',
    name: 'StudentCreate',
    component: StudentForm,
  },
  {
    path: '/students/edit/:ra',
    name: 'StudentEdit',
    component: StudentForm,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/students',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
