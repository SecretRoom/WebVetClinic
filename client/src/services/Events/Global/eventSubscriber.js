/* eslint-disable no-console */
import eventEmitter from './eventEmitter';
import { requestError } from '../../../actions/index.ts';

export class GlobalEvent {
  constructor(store, eventEmitter) {
    this.store = store;
    this.errorHandler = eventEmitter;
    this._init();
  }

  _init() {
    this._submitOnError();
  }

  _submitOnError() {
    this.errorHandler.on(
      'REQUEST_ERROR',
      (event) => {
        console.log(event);
        this.store.dispatch(requestError(event));
      },
    );
    this.errorHandler.on(
      'SHOW_MESSAGE',
      (event) => {
        console.log(event);
        this.store.dispatch({ type: 'SHOW_MESSAGE', payload: event });
      },
    );
    this.errorHandler.on(
      'SHOW_WARNING',
      (event) => {
        console.log(event);
        this.store.dispatch({ type: 'SHOW_WARNING', payload: event });
      },
    );
    return true;
  }
}

const submitOnGlobalEvent = (eventEmitter) => (store) => new GlobalEvent(store, eventEmitter);
export default submitOnGlobalEvent(eventEmitter);
