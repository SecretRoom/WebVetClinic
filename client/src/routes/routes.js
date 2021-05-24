import React from 'react'
import {
  Redirect,
} from 'react-router-dom'

import TestPage from '../modules/TestPage'
import LoginPage from '../modules/LoginPage/index.tsx'
import UserDataPage from '../modules/UserDataPage/index.tsx'
import RegistryPage from '../modules/RegistryPage/index.tsx'

const routes = [
  // {
  //   title: 'Отчеты',
  //   path: '/reports',
  //   component: ReportsPage,
  //   rights: {
  //     show: '',
  //     edit: '',
  //   },
  //   profile: 'ALL',
  //   showNavLink: true,
  //   isPrivate: false,
  //   exact: true,
  // },
  {
    title: 'Личные данные',
    path: '/user/data',
    component: UserDataPage,
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
  {
    title: '',
    path: '/registry',
    component: RegistryPage,
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
