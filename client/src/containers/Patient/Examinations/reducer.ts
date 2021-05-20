import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { createExamA, fetchExamListA, resetSelectedExamA, selectExamA } from './actions'

type examinationState = any

const INITIAL_STATE = Map<examinationState>({
  isFetching: false,
  examList: [],
  selectedExam: '',
  selectedExamData: {},
})

export default function reducer(
  state = INITIAL_STATE,
  action: ActionType<
    typeof fetchExamListA
    | typeof createExamA
    | typeof selectExamA
    | typeof resetSelectedExamA
  >): typeof INITIAL_STATE {
  switch (action.type) {
    case getType(fetchExamListA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(fetchExamListA.success): {
      return state
        .set('isFetching', false)
        .set('examList', action.payload)
    }
    case getType(fetchExamListA.failure): {
      return state
        .set('isFetching', false)
    }
    case getType(createExamA.request): {
      return state
        .set('isFetching', true)
    }
    case getType(createExamA.success): {
      return state
        .set('isFetching', false)
    }
    case getType(createExamA.failure): {
      return state
        .set('isFetching', false)
    }
    case getType(selectExamA.success): {
      return state
        .set('selectedExam', action.payload.selectedExam)
        .set('selectedExamData', action.payload.selectedExamData)
    }
    case getType(resetSelectedExamA): {
      return state
        .set('selectedExam', '')
        .set('selectedExamData', {})
    }
    default:
      return state
  }
}
