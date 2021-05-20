import { takeEvery, call, put, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { ActionType } from 'typesafe-actions';
import * as R from 'ramda'
import ReportsAPI from '../../services/API/Reports'
import { fetchReportA } from './actions';
import { idEmplS } from '../UserService/selectors';

function* fetchReportsSaga(action: ActionType<typeof fetchReportA.request>): SagaIterator {
  try {
    const idEmpl = yield select(state => idEmplS(state))
    if (!R.isEmpty(idEmpl) && !R.isEmpty(action.payload)) {
      const { status, items } = yield call([ReportsAPI, ReportsAPI.getReport], {
        ...action.payload,
        idEmpl,
      })
      if (status !== '1') {
        yield put(fetchReportA.success({
          countAdoptedPat: items[0].countAdoptedPat,
          countAnalyzes: items[0].countAnalyzes,
          countCreateExam: items[0].countCreateExam,
          countEditExam: items[0].countEditExam,
          countTickets: items[0].countTickets,
          adoptedPat: items[0].adoptedPat,
          analyzes: items[0].analyzes,
          createExam: items[0].createExam,
          editExam: items[0].editExam,
          tickets: items[0].tickets,
        }))
      }
    }
  } catch (error) {
    yield put(fetchReportA.failure(error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(fetchReportA.request, fetchReportsSaga)
}
