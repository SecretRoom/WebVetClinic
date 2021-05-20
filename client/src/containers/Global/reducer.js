import moment from 'moment';
import {
  OFFLINE,
  ONLINE,
  GLOBAL_ERROR,
  REQUEST_ERROR,
  REQUEST_ERROR_OUT,
  CHANGE_DATE,
} from '../../actions/index.ts';

const initialState = {
  isOnline: navigator.onLine,
  date: moment().format('DD.MM.YYYY'),
  globalError: false,
  errorData: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ONLINE:
    case OFFLINE:
      return {
        ...state,
        isOnline: !state.isOnline,
      };
    case REQUEST_ERROR:
    case GLOBAL_ERROR:
      return {
        ...state,
        globalError: true,
        errorData: action.payload,
      };
    case REQUEST_ERROR_OUT:
      return {
        ...state,
        globalError: false,
        errorData: null,
      };
    case CHANGE_DATE:
      return {
        ...state,
        date: moment(action.payload.date).format('DD.MM.YYYY'),
      };
    default:
      return state;
  }
}

export function getDate(state) {
  return state.global.date;
}
