import { Map } from 'immutable'

/** Стэйт модуля */
export const scheduleAppointmentStateS = (state: RootStateInterface): Map<string, any> => state.scheduleAppointment

export const isFetchingScheduleAppointmentS = (state: RootStateInterface): boolean => scheduleAppointmentStateS(state).get('isFetching')

export const plannedListS = (state: RootStateInterface): any[] => scheduleAppointmentStateS(state).get('planned')

export const adoptedListS = (state: RootStateInterface): any[] => scheduleAppointmentStateS(state).get('adopted')
export const filterDateS = (state: RootStateInterface): Date => scheduleAppointmentStateS(state).get('filterDate')
