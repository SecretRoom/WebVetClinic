import { takeEvery, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import {
  authA, logoutA,
} from './actions';
import IndexedDB from '../../services/IndexedDB'

import OmsCompaniesAPI from '../../services/API/OmsCompanies'
import ExaminationAPI from '../../services/API/Examination'
import DiagnosesAPI from '../../services/API/Diagnoses'
import StaffAPI from '../../services/API/Staff'

import { NAME_INDEXED_DB } from '../../config';

import AuthAPI from '../../services/API/Auth'

import { getUserDataA } from '../../actions';

/**
 * Вход в приложение
 * @param action
 */
function* authSaga(action: ActionType<typeof authA.request>): SagaIterator {
  try {
    const { status, userID } = yield call([AuthAPI, AuthAPI.auth], action.payload)
    if (status !== '1') {
      const dataDiagnoses = yield call([ExaminationAPI, DiagnosesAPI.getDiagnoses])
      const dataOmsCompanies = yield call([OmsCompaniesAPI, OmsCompaniesAPI.getOmsCompanies])
      const dataExamTypes = yield call([ExaminationAPI, ExaminationAPI.getExamTypeList])
      const dataStaff = yield call([ExaminationAPI, StaffAPI.getStaff])

      if (
        dataOmsCompanies.status !== '1'
        && dataExamTypes.status !== '1'
        && dataDiagnoses.status !== '1'
        && dataStaff.status !== '1'
      ) {
        IndexedDB.createDB(
          NAME_INDEXED_DB.nameDB,
          {
            [NAME_INDEXED_DB.nameDS.examTypes]: dataExamTypes.items,
            [NAME_INDEXED_DB.nameDS.diagnoses]: dataDiagnoses.items,
            [NAME_INDEXED_DB.nameDS.omsCompanies]: dataOmsCompanies.items,
            [NAME_INDEXED_DB.nameDS.staff]: dataStaff.items,
          },
          NAME_INDEXED_DB.version,
        )
        sessionStorage.setItem('userID', userID)
        yield put(authA.success({ userID, isAuth: true }))
        yield put(getUserDataA.request())
      }
    }
  } catch (error) {
    yield put(authA.failure(error))
  }
}

// eslint-disable-next-line require-yield
function* logoutSaga(): SagaIterator {
  localStorage.clear()
  sessionStorage.clear()

  IndexedDB.deleteDB(NAME_INDEXED_DB.nameDB)
}

export default function* (): SagaIterator {
  yield takeEvery(authA.request, authSaga)
  yield takeEvery(logoutA, logoutSaga)
}
