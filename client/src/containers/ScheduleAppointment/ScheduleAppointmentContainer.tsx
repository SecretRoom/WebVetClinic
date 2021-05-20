// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import ScheduleAppointmentWorkSpace from '../../components/ScheduleAppointment'
import { fetchScheduleAppointmentA } from './actions'

type ScheduleAppointmentWorkSpaceContainerProps = {
  fetchScheduleAppointment: (date: Date) => void
}

const ScheduleAppointmentWorkSpaceContainer = ({
  fetchScheduleAppointment,
}: ScheduleAppointmentWorkSpaceContainerProps): ReactElement => {
  useEffect(() => {
    fetchScheduleAppointment(new Date())
  }, [])
  return (
    <ScheduleAppointmentWorkSpace />
  )
}

export default connect(
  () => ({}),
  {
    fetchScheduleAppointment: fetchScheduleAppointmentA.request,
  },
)(ScheduleAppointmentWorkSpaceContainer)
