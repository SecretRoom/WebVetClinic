import { spawn } from 'redux-saga/effects';

import authSagas from '../containers/Auth/sagas';
import reportsSaga from '../containers/Reports/sagas';
import patientSagas from '../containers/Patient/sagas';
import patientsSagas from '../containers/Patients/sagas';
import userDataSagas from '../containers/UserService/sagas';
import examinationSagas from '../containers/Patient/Examinations/sagas';
import scheduleAppointmentSagas from '../containers/ScheduleAppointment/sagas';

export default function* rootSagas(): any {
  yield spawn(authSagas)
  yield spawn(reportsSaga)
  yield spawn(patientSagas)
  yield spawn(userDataSagas)
  yield spawn(patientsSagas)
  yield spawn(examinationSagas)
  yield spawn(scheduleAppointmentSagas)
}
