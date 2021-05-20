import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ActionType } from 'typesafe-actions';
import PatientsAPI from '../../services/API/Patients'
import { fetchPatientsA } from './actions';

function* fetchPatientsSaga(action: ActionType<typeof fetchPatientsA.request>): SagaIterator {
  try {
    const { status, items } = yield call([PatientsAPI, PatientsAPI.getPatients], action?.payload)

    if (status !== '1') {
      yield put(fetchPatientsA.success(items))
    }
  } catch (error) {
    yield put(fetchPatientsA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(fetchPatientsA.request, fetchPatientsSaga)
}
