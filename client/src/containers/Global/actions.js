export const ONLINE = 'ONLINE';
export const OFFLINE = 'OFFLINE';
export const CHANGE_DATE = 'CHANGE_DATE';
export const GLOBAL_ERROR = 'GLOBAL_ERROR';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_ERROR_OUT = 'REQUEST_ERROR_OUT';

export function changeDate(date) {
  return {
    type: CHANGE_DATE,
    payload: {
      date,
    },
  };
}

export function globalErrorCatcher(data) {
  return {
    type: GLOBAL_ERROR,
    payload: data,
  };
}

export function requestError(data) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_ERROR,
      payload: data,
    });
    setTimeout(() => dispatch({
      type: REQUEST_ERROR_OUT,
    }), 5000);
  };
}
