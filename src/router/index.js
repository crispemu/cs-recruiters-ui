import Vue from 'vue'
import Router from 'vue-router'
import Applicant from '@/components/Applicant'
import ApplicantGrid from '@/components/ApplicantGrid'
import Home from '@/components/Home'
import ProcessEdit from '@/components/ProcessEdit'
import ProcessGrid from '@/components/ProcessGrid'
import Interview from '@/components/Interview'
import InterviewGrid from '@/components/InterviewGrid'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Applicant',
      name: 'Applicant',
      component: Applicant,
      props: true
    },
    {
      path: '/ApplicantGrid',
      name: 'ApplicantGrid',
      component: ApplicantGrid,
      props: true
    },
    {
      path: '/ProcessEdit',
      name: 'ProcessEdit',
      component: ProcessEdit,
      props: true
    },
    {
      path: '/ProcessGrid',
      name: 'ProcessGrid',
      component: ProcessGrid,
      props: true
    },
    {
      path: '/Interview',
      name: 'Interview',
      component: Interview,
      props: true
    },
    {
      path: '/InterviewGrid',
      name: 'InterviewGrid',
      component: InterviewGrid,
      props: true
    }
    ,
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      props: true
    }
  ]
})
