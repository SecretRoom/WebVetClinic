import { Map } from 'immutable'

/** Стэйт модуля */
export const examinationStateS = (state: RootStateInterface): Map<string, any> => state.examination

export const isFetchingExamS = (state: RootStateInterface): boolean => examinationStateS(state).get('isFetching')

export const examListS = (state: RootStateInterface): any => examinationStateS(state).get('examList')

export const selectedExamS = (state: RootStateInterface): string => examinationStateS(state).get('selectedExam')

export const selectedExamDataS = (state: RootStateInterface): any => examinationStateS(state).get('selectedExamData')

export const selectedIdExamTypeS = (state: RootStateInterface): string => examinationStateS(state).get('selectedExamData').idExamType

export const dataExamS = (state: RootStateInterface): any => examinationStateS(state).get('selectedExamData').dataExam

export const fioEditEmplExamS = (state: RootStateInterface): string => examinationStateS(state).get('selectedExamData').fioEditEmpl

export const editDateExamS = (state: RootStateInterface): string => examinationStateS(state).get('selectedExamData').editDateExam

