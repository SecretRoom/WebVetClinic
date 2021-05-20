import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ActionType } from 'typesafe-actions';
import PatientAPI from '../../services/API/Patient'
import AnalyzesAPI from '../../services/API/Analyzes'
import { addAnalysisA, fetchAnalyzesListA, fetchAnalyzesScheduleA, fetchPatientA, removeAnalysisA, updatePatientA } from './actions';
import { idPatS } from './selectors';
import { idEmplS } from '../UserService/selectors';
import { selectedExamS } from './Examinations/selectors';

function* fetchPatientSaga(): SagaIterator {
  try {
    const idPat = yield select(state => idPatS(state))
    const { status, items } = yield call([PatientAPI, PatientAPI.getPatient], idPat)

    if (status !== '1') {
      yield put(fetchPatientA.success(items[0]))
      yield put(fetchAnalyzesListA.request())
      yield put(fetchAnalyzesScheduleA.request())
    }
  } catch (error) {
    yield put(fetchPatientA.failure(error))
  }
}

function* updatePatientSaga(action: ActionType<typeof updatePatientA.request>): SagaIterator {
  try {
    const idPat = yield select(state => idPatS(state))
    const { status } = yield call([PatientAPI, PatientAPI.updatePatient], idPat, action.payload)

    if (status !== '1') {
      yield put(updatePatientA.success())
      yield put(fetchPatientA.request())
    }
  } catch (error) {
    yield put(updatePatientA.failure(error))
  }
}

function* removeAnalysisSaga(action: ActionType<typeof removeAnalysisA.request>): SagaIterator {
  try {
    const { status } = yield call([AnalyzesAPI, AnalyzesAPI.removeAnalysis], action.payload)

    if (status !== '1') {
      yield put(removeAnalysisA.success())
      yield put(fetchAnalyzesScheduleA.request())
    }
  } catch (error) {
    yield put(removeAnalysisA.failure(error))
  }
}

function* addAnalysisSaga(action: ActionType<typeof addAnalysisA.request>): SagaIterator {
  try {
    const idPat = yield select(state => idPatS(state))
    const idEmpl = yield select(state => idEmplS(state))
    const idExam = yield select(state => selectedExamS(state))
    const { status } = yield call([AnalyzesAPI, AnalyzesAPI.addAnalysis], {
      ...action.payload,
      idPat,
      idEmpl,
      idExam,
    })

    if (status !== '1') {
      yield put(addAnalysisA.success())
      yield put(fetchAnalyzesScheduleA.request())
    }
  } catch (error) {
    yield put(addAnalysisA.failure(error))
  }
}

function* fetchScheduleAnalysesSaga(): SagaIterator {
  try {
    const idPat = yield select(state => idPatS(state))
    const { status, items } = yield call([AnalyzesAPI, AnalyzesAPI.getScheduleAnalyzes], { idPat })

    if (status !== '1') {
      yield put(fetchAnalyzesScheduleA.success(items))
    }
  } catch (error) {
    yield put(fetchAnalyzesScheduleA.failure(error))
  }
}

function* fetchAnalyzesListSaga(): SagaIterator {
  try {
    const { status, items } = yield call([AnalyzesAPI, AnalyzesAPI.getAnalyzesList])

    if (status !== '1') {
      yield put(fetchAnalyzesListA.success(items))
    }
  } catch (error) {
    yield put(fetchAnalyzesListA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(addAnalysisA.request, addAnalysisSaga)
  yield takeEvery(fetchPatientA.request, fetchPatientSaga)
  yield takeEvery(updatePatientA.request, updatePatientSaga)
  yield takeEvery(removeAnalysisA.request, removeAnalysisSaga)
  yield takeEvery(fetchAnalyzesListA.request, fetchAnalyzesListSaga)
  yield takeEvery(fetchAnalyzesScheduleA.request, fetchScheduleAnalysesSaga)
}
