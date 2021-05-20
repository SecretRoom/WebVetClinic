// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'

import './style.sass'
import ScheduleAppointmentFilterContainer from '../../containers/ScheduleAppointment/Filter'
import ScheduleAppointmentContentContainer from '../../containers/ScheduleAppointment/Content'

const ScheduleAppointmentWorkSpace = (): ReactElement => (
  <div id="scheduleAppointment-workspace">
    <ScheduleAppointmentFilterContainer />
    <ScheduleAppointmentContentContainer />
  </div>
)

export default ScheduleAppointmentWorkSpace
