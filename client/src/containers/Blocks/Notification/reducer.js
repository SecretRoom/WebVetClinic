import { v4 as uuidv4 } from 'uuid';

const initialState = {
  error: false,
  notifications: [],
};

function addNotification(state, notify) {
  return {
    ...state,
    notifications: [...state.notifications, notify],
  };
}

function removeNotification(state, action) {
  const id = action.payload;
  const notifications = state.notifications.filter((notify) => notify.id !== id);
  return {
    ...state,
    notifications,
  };
}

function createNotification(type, message, confirm, cancel) {
  let text = '';
  if (typeof message === 'object') {
    try {
      text = message.message
    } catch {
      text = 'Неизвестаная ошибка'
    }
  } else {
    text = message
  }
  return {
    id: uuidv4(),
    type,
    text,
    confirm,
    cancel,
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'NOTIFICATION': {
      const { type, text } = action.payload;
      return addNotification(state, createNotification(type, text));
    }
    case 'NOTIFICATION_SHOW':
    case 'NOTIFICATION_SUCCESS':
    case 'NOTIFICATION_ERROR':
    case 'NOTIFICATION_WARNING':
    case 'NOTIFICATION_INFO':
      return addNotification(
        state,
        createNotification(action.type, action.payload.message),
      );
    case 'NOTIFICATION_CONFIRM':
      return addNotification(
        state,
        createNotification(
          action.type,
          action.payload.message,
          action.payload.confirm,
          action.payload.cancel,
        ),
      );
    case 'NOTIFICATION_RESET':
      return removeNotification(state, action);
    default:
      return state;
  }
}
