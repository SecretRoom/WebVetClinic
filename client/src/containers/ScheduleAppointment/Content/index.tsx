// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Divider, Icon, Segment } from 'semantic-ui-react'
import * as R from 'ramda'
import { NavLink } from 'react-router-dom'
import ScheduleAppointmentContent from '../../../components/ScheduleAppointment/Content'
import { adoptedListS, isFetchingScheduleAppointmentS, plannedListS } from '../selectors'
import { selectPatientA } from '../../Patient/actions'

type ScheduleAppointmentContentContainerProps = {
  isFetching: boolean

  plannedList: any[]
  adoptedList: any[]

  selectPatient: (id: string) => void
}

const ScheduleAppointmentContentContainer = ({
  isFetching,
  adoptedList,
  plannedList,

  selectPatient,
}: ScheduleAppointmentContentContainerProps): ReactElement => {
  const createPatientCard = (item: any): ReactElement => (
    <Segment
      key={Math.random().toString()}
      className="patient-card__segment"
      onClick={(): void => selectPatient(item.idPat)}
    >
      <NavLink className="patient-card" to={{ pathname: `/patients/${item.idPat}/examination`, state: { ...item } }}>
        <div className="patient-card__header">{item.fioPat}</div>
        <Divider />
        <div className="patient-card__content">
          <div><span>Время приема:</span> {item.date}</div>
        </div>
      </NavLink>
    </Segment>
  )

  const createPatientContent = (type: string, list: any[]): ReactElement => {
    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <h3>{type}</h3>
        {R.isEmpty(list) ? (
          <div style={{
            display: 'grid',
            justifyItems: 'center',
          }}
          >
            <Icon name="archive" size="massive" color="grey" />
          </div>
        ) : (
          <div className="scheduleAppointment-content__list">
            {R.map(createPatientCard, list)}
          </div>
        )}
      </div>
    )
  }

  return (
    <ScheduleAppointmentContent
      isFetching={isFetching}
      adoptedList={adoptedList}
      plannedList={plannedList}
      createPatientContent={createPatientContent}
    />
  )
}

export default connect(
  (state) => ({
    plannedList: plannedListS(state),
    adoptedList: adoptedListS(state),
    isFetching: isFetchingScheduleAppointmentS(state),
  }),
  {
    selectPatient: selectPatientA,
  },
)(ScheduleAppointmentContentContainer)
