import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ActionType } from 'typesafe-actions';
import * as R from 'ramda'
import ExaminationAPI from '../../../services/API/Examination'
import { createExamA, fetchExamListA, selectExamA, updateExamA } from './actions';
import { idPatS } from '../selectors';
import { idEmplS } from '../../UserService/selectors';
import { examListS, selectedExamS } from './selectors';

function* fetchExamListSaga(): SagaIterator {
  try {
    const idPat = yield select(state => idPatS(state))
    const selectedExam = yield select(state => selectedExamS(state))
    const { status, items } = yield call([ExaminationAPI, ExaminationAPI.getExamList], idPat)
    if (status !== '1') {
      yield put(fetchExamListA.success(items))
      if (selectedExam) {
        yield put(selectExamA.request({ id: selectedExam }))
      }
    }
  } catch (error) {
    yield put(fetchExamListA.failure(error))
  }
}

function* createExamSaga(action: ActionType<typeof createExamA.request>): SagaIterator {
  try {
    const idPat = yield select(state => idPatS(state))
    const idEmpl = yield select(state => idEmplS(state))
    const { status, id, newData } = yield call([ExaminationAPI, ExaminationAPI.createExam], {
      idPat,
      idCreateEmpl: idEmpl,
      idExamType: action.payload,
      dateExam: new Date(),
    })

    if (status !== '1') {
      yield put(fetchExamListA.request())
      yield put(createExamA.success())
      yield put(selectExamA.request({ id, newData }))
    }
  } catch (error) {
    yield put(createExamA.failure(error))
  }
}

function* updateExamSaga(action: ActionType<typeof updateExamA.request>): SagaIterator {
  try {
    const idEditEmpl = yield select(state => idEmplS(state))
    const idExam = yield select(state => selectedExamS(state))
    const { status } = yield call([ExaminationAPI, ExaminationAPI.updateExam], {
      idExam,
      idEditEmpl,
      dataExam: action.payload,
    })

    if (status !== '1') {
      yield put(updateExamA.success())
      yield put(fetchExamListA.request())
    }
  } catch (error) {
    yield put(updateExamA.failure(error))
  }
}

function* selectExamSaga(action: ActionType<typeof selectExamA.request>): SagaIterator {
  try {
    if (!R.isEmpty(action.payload.id)) {
      const examList = yield select(state => examListS(state))
      const findExam = JSON.parse(JSON.stringify(R.find(R.propEq('id', action.payload.id))(examList) || action.payload.newData))
      yield put(selectExamA.success({
        selectedExam: action.payload.id,
        selectedExamData: findExam,
      }))
    } else {
      yield put(selectExamA.success({
        selectedExam: '',
        selectedExamData: {},
      }))
    }
  } catch (error) {
    yield put(selectExamA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(createExamA.request, createExamSaga)
  yield takeEvery(selectExamA.request, selectExamSaga)
  yield takeEvery(updateExamA.request, updateExamSaga)
  yield takeEvery(fetchExamListA.request, fetchExamListSaga)
}
