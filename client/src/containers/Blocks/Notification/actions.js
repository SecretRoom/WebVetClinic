export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';
export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';
export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export const NOTIFICATION_WARNING = 'NOTIFICATION_WARNING';
export const NOTIFICATION_INFO = 'NOTIFICATION_INFO';
export const NOTIFICATION_CONFIRM = 'NOTIFICATION_CONFIRM';

export const notification = {
  show: (message) => ({
    type: NOTIFICATION_SHOW,
    payload: {
      message,
    },
  }),

  success: (message) => ({
    type: NOTIFICATION_SUCCESS,
    payload: {
      message,
    },
  }),

  error: (message) => ({
    type: NOTIFICATION_ERROR,
    payload: {
      message,
    },
  }),

  warning: (message) => ({
    type: NOTIFICATION_WARNING,
    payload: {
      message,
    },
  }),

  info: (message) => ({
    type: NOTIFICATION_INFO,
    payload: {
      message,
    },
  }),

  confirm: (message, confirm, cancel) => ({
    type: NOTIFICATION_CONFIRM,
    payload: {
      message,
      confirm,
      cancel,
    },
  }),
};

export const notificationReset = (id) => ({
  type: 'NOTIFICATION_RESET',
  payload: id,
});
