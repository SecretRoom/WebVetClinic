/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { ConnectedRouter } from 'connected-react-router'
import ru from 'date-fns/locale/ru';
import { BrowserRouter } from 'react-router-dom'
import moment from 'moment'
import store, { history } from './store/configureStore'
import * as serviceWorker from './serviceWorker'

import App from './containers/App.tsx'

import submitOnGlobalEvent from './services/Events/Global/eventSubscriber';
import './style/normalize.css'
import 'react-datepicker/dist/react-datepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'semantic-ui-less/semantic.less'
import './style/react-datepicker.css'
import './style/base.sass'
import './style/index.sass'

import './routes/init'
import 'semantic-ui-css/semantic.min.css'

moment.locale('ru')
submitOnGlobalEvent(store)
registerLocale('ru', ru)
setDefaultLocale(ru)

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.register()
