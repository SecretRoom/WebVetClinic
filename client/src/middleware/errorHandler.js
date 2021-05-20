import { v4 as uuidv4 } from 'uuid';
import * as actionsTypes from '../actions/index.ts';
import { APIError } from '../services/API/APIError';

export const errorHandler = (store) => (next) => (action) => {
  const error = action.payload;
  function byHTTPStatus(error) {
    if (error.status >= 500 && error.status < 600) {
      let text = error.data;
      // Если с ошибкой вернули json
      if (typeof error.data === 'object') {
        text = error.data.message
      }
      return store.dispatch({
        type: 'NOTIFICATION',
        payload: {
          id: uuidv4(),
          type: actionsTypes.NOTIFICATION_ERROR,
          text,
          statusText: error.statusText,
        },
      });
    } if (error.status >= 400 && error.status < 500) {
      return store.dispatch({
        type: 'NOTIFICATION',
        payload: {
          id: uuidv4(),
          type: actionsTypes.NOTIFICATION_ERROR,
          text: error.data,
          statusText: error.statusText,
        },
      });
    }
    return store.dispatch({
      type: 'NOTIFICATION',
      payload: {
        id: uuidv4(),
        type: actionsTypes.NOTIFICATION_ERROR,
        text: 'UNKNOWN_EXCEPTION',
        statusText: error.statusText,
      },
    });
  }

  function errorType(error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // HTTP ошибки
      if (Object.prototype.hasOwnProperty.call(error, 'response')) {
        return byHTTPStatus(error.response);
      }
      // OPERATION_FAILURE - ошибка выполнения операции(status: 1)
      if (error instanceof APIError) {
        return store.dispatch({
          type: 'NOTIFICATION',
          payload: {
            id: uuidv4(),
            type: actionsTypes.NOTIFICATION_ERROR,
            text: error.message,
            statusText: error.statusText,
          },
        });
        // return next(action);
      }
      // other Error, SyntaxError, ReferenceError, TypeError
      return store.dispatch({
        type: 'NOTIFICATION',
        payload: {
          id: uuidv4(),
          type: actionsTypes.NOTIFICATION_ERROR,
          text: error.message,
          statusText: error.message,
        },
      });
      // return next(action);
    }
    return store.dispatch({
      type: 'NOTIFICATION',
      payload: {
        id: uuidv4(),
        type: actionsTypes.NOTIFICATION_ERROR,
        text: 'UNKNOWN_EXCEPTION',
        statusText: error.statusText,
      },
    });
  }

  if (action.type === 'REQUEST_ERROR') {
    return errorType(error);
  }
  return next(action);
};
