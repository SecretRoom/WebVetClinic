// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { Loader } from 'semantic-ui-react'

import './style.sass'

type ScheduleAppointmentContentProps = {
  isFetching: boolean

  adoptedList: any[]
  plannedList: any[]

  createPatientContent: (type: string, list: any[]) => ReactElement
}

const ScheduleAppointmentContent = ({
  isFetching,
  plannedList,
  adoptedList,

  createPatientContent,
}: ScheduleAppointmentContentProps): ReactElement => (
  <>
    {isFetching ? (
      <div className="loader-scheduleAppointmentContent">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <div className="scheduleAppointment-content">
        {createPatientContent('Запланированные', plannedList)}
        {createPatientContent('Принятые', adoptedList)}
      </div>
    )}
  </>
)

export default ScheduleAppointmentContent
