import React from 'react'
import {
  Route,
} from 'react-router-dom'
import * as yup from 'yup'

import PrivateRoute from '../HOC/PrivateRoute'

import initialRouts from './routes'

class RoutsManager {
  constructor(initialRouts) {
    this.registeredPage = []
    this._init(initialRouts)
  }

  _init(initialRouts) {
    this.routeDataSchema = yup.object({
      order: yup.number(),
      title: yup.string(),
      path: yup.mixed(),
      component: yup.object(),
      render: yup.object(),
      rights: yup.object({
        show: yup.string(),
        edit: yup.string(),
      }).required().default({
        show: '',
        edit: '',
      }),
      profile: yup.string().default('ALL'),
      showNavLink: yup.boolean(),
      isPrivate: yup.boolean().required(),
      exact: yup.boolean().required(),
      dropdown: yup.boolean(),
      id: yup.string(),
    })

    this.routes = initialRouts.map(route => this.routeDataSchema.validateSync(route))
  }

  // Регистрация маршрутов
  registerPage(route) { // old
    this.registeredPage.push(this.routeDataSchema.validateSync(route))
  }

  registerRoute(route) {
    this.registerPage(route)
  }

  // Инициализация маршрутов
  initRoutes() {
    this.registeredPage.forEach(page => this.routes.unshift(page))
  }

  // Создание навигационных ссылок из зарегистрированных маршрутов
  createRoutesSet(rights) {
    if (!rights || rights.length === 0) {
      return this.routes.filter((route) => route.showNavLink && !route.rights.show)
    }
    return this.routes.filter((route) => {
      for (let i = 0; i < rights.length; i += 1) {
        if (route.showNavLink && ((route.rights.show === rights[i].nmrightsokr) || !route.rights.show)) {
          return route
        }
      }
      return false
    }).sort((prevRoute, nextRoute) => prevRoute.order - nextRoute.order)
  }

  // Создание компонентов react-router по имеющимся зарегистрированным маршрутам
  getRoutes({
    isAuthenticated,
  }) {
    let i = 0
    return this.routes.map((route) => {
      i += 1
      const {
        isPrivate, exact, path, component, render,
      } = route
      return React.createElement(isPrivate ? PrivateRoute : Route, {
        key: i,
        exact,
        path,
        isAuthenticated,
        component: component || render,
      })
    })
  }
}

const routsManager = new RoutsManager(initialRouts)

export default routsManager
