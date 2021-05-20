/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import * as actionsTypes from '../actions/index.ts';

export const notification = (store) => (next) => (action) => {
  if (action.type === 'SHOW_MESSAGE') {
    // console.log('диспатч оповещения', action);
    store.dispatch({
      type: 'NOTIFICATION',
      payload: {
        id: uuidv4(),
        type: actionsTypes.NOTIFICATION_SUCCESS,
        text: action.payload.message,
        confirm: action.payload.confirm,
        cancel: action.payload.cancel,
      },
    });
  }
  if (action.type === 'SHOW_WARNING') {
    // console.log('диспатч оповещения', action);
    store.dispatch({
      type: 'NOTIFICATION',
      payload: {
        id: uuidv4(),
        type: actionsTypes.NOTIFICATION_WARNING,
        text: action.payload.message,
        confirm: action.payload.confirm,
        cancel: action.payload.cancel,
      },
    });
  }

  // if (!stopNext) {
  next(action);
};
