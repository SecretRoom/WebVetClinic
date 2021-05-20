import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Button } from 'semantic-ui-react';

import './style.sass'

const timer = {}

function Notification({ notifications, reset, timeout }) {
  function setTimeout(id) {
    if (timer[id]) return

    timer[id] = window.setTimeout(() => {
      reset(id)
    }, timeout)
  }

  function getConfigByType(type) {
    switch (type) {
      case 'NOTIFICATION_SHOW':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
            </svg>
          ),
          style: {
            backgroundColor: '#396ea8',
            opacity: 0.9,
          },
        }
      case 'NOTIFICATION_SUCCESS':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                d="M19.77 5.03l1.4 1.4L8.43
              19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77
              5.03m0-2.83L8.43 13.54l-4.2-4.2L0 13.57 8.43 22 24 6.43 19.77 2.2z"
              />
            </svg>
          ),
          style: {
            backgroundColor: '#2ecc71',
            opacity: 0.9,
          },
        }
      case 'NOTIFICATION_ERROR':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path
                d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47
              2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
              />
            </svg>
          ),
          style: {
            backgroundColor: '#e74c3c',
            opacity: 0.9,
          },
        }
      case 'NOTIFICATION_WARNING':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          ),
          style: {
            backgroundColor: '#ff9c24',
            opacity: 0.9,
          },
        }
      case 'NOTIFICATION_INFO':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
              <path
                d="M18
                16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5
                1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5
                0h-2v-2h2v2zm0-4h-2V8h2v4zm-1 10c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2z"
              />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          ),
          style: {
            color: '#333',
            border: '1px solid #396ea8s',
            backgroundColor: '#eee',
            opacity: 0.9,
          },
        }
      case 'NOTIFICATION_CONFIRM':
        return {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="36" height="36" viewBox="0 0 24 24">
              <path
                d="M18
                16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5
                1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-5 0h-2v-2h2v2zm0-4h-2V8h2v4zm-1 10c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2z"
              />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </svg>
          ),
          style: {
            color: '#333',
            backgroundColor: '#FFF',
            // border: '3px solid tomato',
            // opacity: 1
          },
        }
      default:
        return {}
    }
  }

  const handleConfirm = (id, confirm) => {
    confirm()
    reset(id)
    return true
  }

  const handleCancel = (id, cancel) => {
    cancel()
    reset(id)
    return false
  }

  const handleClose = ({ target }) => {
    const notify = target.id
    clearTimeout(timer[notify])
    delete timer[notify]
    reset(notify)
    return false
  }

  const confirm = (id, config) => {
    const { text, confirm, cancel } = notifications.find(notify => notify.id === id)

    return (
      <CSSTransition
        key={id}
        timeout={300}
      >
        <div className="notification_dimmer">
          <div id={id} className="notification_confirm" key={id} style={config.style}>
            <div className="notification_message">
              <i>{config.icon}</i>
              <p>{text}</p>
            </div>
            <div className="notification_button">
              <Button size="mini" negative onClick={() => handleConfirm(id, confirm)}>
                Да
              </Button>
              <Button size="mini" onClick={() => handleCancel(id, cancel)}>
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </CSSTransition>
    )
  }

  const notificationList = () => notifications.map(notify => {
    const { id, type } = notify
    const config = getConfigByType(type)

    if (type === 'NOTIFICATION_CONFIRM') {
      return confirm(id, config)
    }

    setTimeout(id)

    return (
      <CSSTransition
        key={id}
        className="notification"
        timeout={500}
      >
        <div
          role="presentation"
          id={id}
          // className="notification"
          style={config.style}
          onClick={handleClose}
        >
          <i>{config.icon}</i>
          <div>
            {notify.statusText && (
              <>
                <h1>{notify.statusText}</h1>
                <br />
              </>
            )}
            <p className="notification__text">{notify.text}</p>
          </div>
          {/* <Icon onClick={handleClose} size="large" className="notification__icon--close" name="close" /> */}
        </div>
      </CSSTransition>
    )
  })

  return <TransitionGroup id="notifications">{notificationList()}</TransitionGroup>
}

Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    confirm: PropTypes.func,
    cancel: PropTypes.func,
  })).isRequired,
  reset: PropTypes.func.isRequired,
  timeout: PropTypes.number,
}

Notification.defaultProps = {
  timeout: 6000,
}

export default Notification
