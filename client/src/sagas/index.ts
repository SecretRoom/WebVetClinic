import { spawn } from 'redux-saga/effects';

import authSagas from '../containers/Auth/sagas';
import registrySagas from '../containers/Registry/sagas';
import userDataSagas from '../containers/UserData/sagas';
import petsSagas from '../containers/Pets/sagas';

export default function* rootSagas(): any {
  yield spawn(authSagas)
  yield spawn(petsSagas)
  yield spawn(registrySagas)
  yield spawn(userDataSagas)
}
