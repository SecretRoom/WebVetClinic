import { Map } from 'immutable'

/** Стэйт модуля */
export const reportsStateS = (state: RootStateInterface): Map<string, any> => state.reports

export const isFetchingReportsS = (state: RootStateInterface): boolean => reportsStateS(state).get('isFetching')

export const countAdoptedPatReportsS = (state: RootStateInterface): string | number => reportsStateS(state).get('countAdoptedPat')

export const countAnalyzesReportsS = (state: RootStateInterface): string | number => reportsStateS(state).get('countAnalyzes')

export const countCreateExamReportsS = (state: RootStateInterface): string | number => reportsStateS(state).get('countCreateExam')

export const countEditExamReportsS = (state: RootStateInterface): string | number => reportsStateS(state).get('countEditExam')

export const countTicketsReportsS = (state: RootStateInterface): string | number => reportsStateS(state).get('countTickets')

export const adoptedPatS = (state: RootStateInterface): any[] => reportsStateS(state).get('adoptedPat')

export const analyzesS = (state: RootStateInterface): any[] => reportsStateS(state).get('analyzes')

export const createExamS = (state: RootStateInterface): any[] => reportsStateS(state).get('createExam')

export const editExamS = (state: RootStateInterface): any[] => reportsStateS(state).get('editExam')

export const ticketsS = (state: RootStateInterface): any[] => reportsStateS(state).get('tickets')

