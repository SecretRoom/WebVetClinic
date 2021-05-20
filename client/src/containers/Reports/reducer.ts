import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'

import { fetchReportA } from './actions'

type reportsState = any

const INITIAL_STATE = Map<reportsState>({
  isFetching: false,
  countAdoptedPat: '',
  countAnalyzes: '',
  countCreateExam: '',
  countEditExam: '',
  countTickets: '',
  adoptedPat: [],
  analyzes: [],
  createExam: [],
  editExam: [],
  tickets: [],
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof fetchReportA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(fetchReportA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(fetchReportA.success): {
      return state
        .set('isFetching', false)
        .set('countAdoptedPat', action.payload.countAdoptedPat)
        .set('countAnalyzes', action.payload.countAnalyzes)
        .set('countCreateExam', action.payload.countCreateExam)
        .set('countEditExam', action.payload.countEditExam)
        .set('countTickets', action.payload.countTickets)
        .set('adoptedPat', action.payload.adoptedPat)
        .set('analyzes', action.payload.analyzes)
        .set('createExam', action.payload.createExam)
        .set('editExam', action.payload.editExam)
        .set('tickets', action.payload.tickets)
    }
    case getType(fetchReportA.failure): {
      return state
        .set('isFetching', false)
    }
    default:
      return state
  }
}
