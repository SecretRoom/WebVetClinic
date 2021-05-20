// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Divider, Segment } from 'semantic-ui-react'
import * as R from 'ramda'
import { NavLink } from 'react-router-dom'
import PatientsContent from '../../../components/Patients/Content'
import { isFetchingPatientsListS, patientsListS } from '../selectors'
import { selectPatientA } from '../../Patient/actions'

type PatientsContentContainerProps = {
  isFetching: boolean

  patientsList: any[]

  selectPatient: (id: string) => void
}

const PatientsContentContainer = ({
  isFetching,
  patientsList,
  selectPatient,
}: PatientsContentContainerProps): ReactElement => {
  const createPatientCard = (item: any): ReactElement => (
    <Segment
      key={Math.random().toString()}
      className="patient-card__segment"
      onClick={(): void => selectPatient(item._id)}
    >
      <NavLink className="patient-card" to={{ pathname: `/patients/${item._id}/examination`, state: { ...item } }}>
        <div className="patient-card__header">{item.fullName}</div>
        <Divider />
        <div className="patient-card__content">
          <div><span>Дата рождения:</span> {item.birthday}</div>
          <div><span>Номер:</span> {item.phone}</div>
          <div><span>ОМС:</span> {item.oms}</div>
          <div><span>СНИЛС:</span> {item.snils}</div>
        </div>
      </NavLink>
    </Segment>
  )

  const createPatientContent = (): ReactElement => {
    if (R.isEmpty(patientsList)) return <div>NO DATA</div>
    return (
      <div className="patients-content">
        {R.map(createPatientCard, patientsList)}
      </div>
    )
  }

  return (
    <PatientsContent
      isFetching={isFetching}
      createPatientContent={createPatientContent}
    />
  )
}

export default connect(
  (state) => ({
    patientsList: patientsListS(state),
    isFetching: isFetchingPatientsListS(state),
  }),
  {
    selectPatient: selectPatientA,
  },
)(PatientsContentContainer)
