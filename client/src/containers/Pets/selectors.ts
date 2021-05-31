import { Map } from 'immutable'

/** Стэйт модуля */
export const petsStateS = (state: RootStateInterface): Map<string, any> => state.pets

export const isFetchingPetsS = (state: RootStateInterface): boolean => petsStateS(state).get('isFetching')

export const petsS = (state: RootStateInterface): any[] => petsStateS(state).get('pets')

export const selectedPetS = (state: RootStateInterface): any => petsStateS(state).get('selectedPet')

export const selectedPetIDS = (state: RootStateInterface): string => petsStateS(state).get('selectedPet')._id

export const isFetchingServicesS = (state: RootStateInterface): boolean => petsStateS(state).get('isFetchingServices')

export const isFetchingAppointmentsS = (state: RootStateInterface): boolean => petsStateS(state).get('isFetchingAppointments')

export const servicesS = (state: RootStateInterface): any[] => petsStateS(state).get('services')

export const appointmentsS = (state: RootStateInterface): any[] => petsStateS(state).get('appointments')

