import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

import { rootReducer as createRootReducer } from '../reducers/index.ts'

import {
  notification, errorHandler,
} from '../middleware'

import rootSagas from '../sagas/index.ts'

const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history), // root reducer with router state
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      sagaMiddleware,
      // protocol,
      notification,
      errorHandler,
    ),

    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
)
sagaMiddleware.run(rootSagas)

export default store
