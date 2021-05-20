// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import ScheduleAppointmentFilter from '../../../components/ScheduleAppointment/Filter'
import { addAppointmentA, fetchScheduleAppointmentA } from '../actions'
import { isFetchingScheduleAppointmentS } from '../selectors'
import getStore from '../../../services/IndexedDB/getStore'
import { fetchPatientsA } from '../../Patients/actions'
import { patientsListS } from '../../Patients/selectors'

type ScheduleAppointmentFilterContainerProps = {
  isFetching: boolean

  patientsDef: any[]

  fetchPatients: (arg0: undefined) => void
  addAppointment: (data: any) => void
  fetchScheduleAppointment: (date: Date) => void

  [key: string]: any
}

const ScheduleAppointmentFilterContainer = ({
  isFetching,
  patientsDef,

  fetchPatients,
  addAppointment,
  fetchScheduleAppointment,
}: ScheduleAppointmentFilterContainerProps): ReactElement => {
  const [date, setDate] = useState<Date>(new Date())

  const [isAddAppointmentModal, setIsAddAppointmentModal] = useState<boolean>(false)

  const [staff, setStaff] = useState<any>([])
  const [patients, setPatients] = useState<any>([])

  const [newAppointment, setNewAppointment] = useState<{
    date: Date | null,
    idEmpl: string,
    idPat: string
  }>({
    date: null,
    idPat: '',
    idEmpl: '',
  })

  const handleChangeNewAppointment = (e: SyntheticEvent, fieldName: string, value: string | Date): void => {
    setNewAppointment({
      ...newAppointment,
      [fieldName]: value,
    })
  }

  const handleChangeAppointmentModal = (): void => setIsAddAppointmentModal(prev => !prev)

  const handleChangeDate = (date: Date): void => setDate(date)

  const handleResetFilter = (): void => {
    handleChangeDate(new Date())
  }

  const handleClickUpdate = (): void => fetchScheduleAppointment(date)

  const handleCreateNewAppointment = (): void => {
    addAppointment(newAppointment)
    handleChangeAppointmentModal()
  }

  useEffect(() => {
    fetchScheduleAppointment(date)
  }, [date])

  useEffect(() => {
    setPatients(R.map((item) => ({
      key: item._id,
      value: item._id,
      text: item.fullName,
    }), patientsDef))
  }, [patientsDef])

  useEffect(() => {
    setNewAppointment({
      date: null,
      idPat: '',
      idEmpl: '',
    })
  }, [isAddAppointmentModal])

  useEffect(() => {
    fetchPatients(undefined)
    getStore.staff(undefined).then((res) => {
      setStaff(R.map((item) => ({
        key: item.idEmpl,
        value: item.idEmpl,
        text: `${item.fioEmpl} / ${item.profName}`,
      }), res))
    })
  }, [])

  return (
    <ScheduleAppointmentFilter
      date={date}
      staff={staff}
      patients={patients}
      isFetching={isFetching}
      newAppointment={newAppointment}
      handleChangeDate={handleChangeDate}
      handleClickUpdate={handleClickUpdate}
      handleResetFilter={handleResetFilter}
      isAddAppointmentModal={isAddAppointmentModal}
      handleCreateNewAppointment={handleCreateNewAppointment}
      handleChangeNewAppointment={handleChangeNewAppointment}
      handleChangeAppointmentModal={handleChangeAppointmentModal}
    />
  )
}

export default connect(
  (state): RootStateInterface => ({
    patientsDef: patientsListS(state),
    isFetching: isFetchingScheduleAppointmentS(state),
  }),
  {
    fetchPatients: fetchPatientsA.request,
    addAppointment: addAppointmentA.request,
    fetchScheduleAppointment: fetchScheduleAppointmentA.request,
  },
)(ScheduleAppointmentFilterContainer)
