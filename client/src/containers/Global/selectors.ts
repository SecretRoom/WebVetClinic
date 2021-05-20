/** Стэйт модуля */
// export const globalStateS = (state: RootStateInterface): Map<string, any> => state.global

export const isOnlineS = (state: RootStateInterface): boolean => state.global.isOnline

export const currentDateS = (state: RootStateInterface): string => state.global.date

export const globalErrorS = (state: RootStateInterface): boolean => state.global.globalError

export const errorDataS = (state: RootStateInterface): any => state.global.errorData
