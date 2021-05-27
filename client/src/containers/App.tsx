// eslint-disable-next-line no-use-before-define
import React, { Suspense, useEffect } from 'react'
import {
  Switch, useHistory,
} from 'react-router-dom'
import * as R from 'ramda'
import { setConfig } from 'react-hot-loader'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import routeManager from '../routes'
import { NOTIFICATION_DELAY } from '../config'

import Notification from './Blocks/Notification'

import GlobalError from '../components/Blocks/GlobalError'
import Layout from '../components/Blocks/Layout'
import Spinner from '../components/Common/Spinner'
import { fullNameS, isAuthenticatedS, isFetchingS } from '../selectors'
import NavBar from '../components/Blocks/NavBar/index'
import { getUserDataA } from './UserData/actions'
import { errorDataS, globalErrorS } from './Global/selectors'

setConfig({
  reloadHooks: false,
});

type AppProps = {
  fullName: string

  globalError: boolean
  isAuthenticated: boolean
  isFetchingUserData: boolean

  errorData: any

  getUserData: () => void
}

const App = ({
  fullName,
  errorData,
  getUserData,
  globalError,
  isFetchingUserData,
  isAuthenticated,
}: AppProps) => {
  const history = useHistory()

  const _init = () => {
    // Иницилизация маршрутов зарегистрированных страниц
    routeManager.initRoutes()
    if (isAuthenticated) {
      // Получение данных пользователя
      getUserData()
    } else {
      history.push('/login')
    }
  }

  useEffect(() => {
    _init()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      if (R.includes(history.location.pathname, ['/login', '/registry'])) {
        history.push('/user/data')
      } else {
        history.push(history.location.pathname)
      }
    } else {
      history.push('/')
    }
  }, [isAuthenticated])

  if (isFetchingUserData && R.isEmpty(fullName)) {
    return (
      <Dimmer active inverted>
        <Loader size="massive" inverted content="Загрузка" />
      </Dimmer>
    )
  }

  return (
    <>
      {isAuthenticated && (
        <NavBar />
      )}

      {globalError && (
        <GlobalError data={errorData} />
      )}
      <Suspense fallback={<Spinner />}>
        <Layout>
          <Switch>
            {routeManager.getRoutes({ isAuthenticated })}
          </Switch>
        </Layout>
      </Suspense>
      <Notification timeout={NOTIFICATION_DELAY} />
    </>
  )
}

export default connect(
  (state): RootStateInterface => ({
    isAuthenticated: isAuthenticatedS(state),
    globalError: globalErrorS(state),
    errorData: errorDataS(state),
    fullName: fullNameS(state),
    isFetchingUserData: isFetchingS(state),
  }),
  {
    getUserData: getUserDataA.request,
  },
)(App)
