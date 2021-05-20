import React from 'react'
import {
  Redirect,
} from 'react-router-dom'

import TestPage from '../modules/TestPage'
import LoginPage from '../modules/LoginPage/index.tsx'
import PatientPage from '../modules/PatientPage/index.tsx'
import ReportsPage from '../modules/ReportsPage/index.tsx'
import PatientsPage from '../modules/PatientsPage/index.tsx'
import ScheduleAppointmentPage from '../modules/ScheduleAppointmentPage/index.tsx'

const routes = [
  {
    title: 'Пациенты',
    path: '/patients',
    component: PatientsPage,
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    showNavLink: true,
    isPrivate: false,
    exact: true,
  },
  {
    title: 'График приема',
    path: '/schedule',
    component: ScheduleAppointmentPage,
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    showNavLink: true,
    isPrivate: false,
    exact: true,
  },
  {
    title: 'Отчеты',
    path: '/reports',
    component: ReportsPage,
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    showNavLink: true,
    isPrivate: false,
    exact: true,
  },
  {
    title: '',
    path: '/patients/:id',
    component: PatientPage,
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    showNavLink: false,
    isPrivate: false,
    exact: false,
  },
  {
    title: 'test',
    path: '/test',
    component: TestPage,
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    showNavLink: false,
    isPrivate: false,
    exact: true,
  },
  {
    title: '',
    path: '/',
    render: () => (
      <Redirect
        to="/login"
      />
    ),
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    isPrivate: false,
    exact: true,
  },
  {
    title: '',
    path: '/login',
    component: LoginPage,
    rights: {
      show: '',
      edit: '',
    },
    profile: 'ALL',
    showNavLink: false,
    isPrivate: false,
    exact: true,
  },
]

export default routes
