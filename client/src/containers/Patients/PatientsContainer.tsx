// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import PatientsWorkSpace from '../../components/Patients'
import { fetchPatientsA } from './actions'

type PatientsWorkSpaceContainerProps = {
  fetchPatients: (arg0: undefined) => void
}

const PatientsWorkSpaceContainer = ({
  fetchPatients,
}: PatientsWorkSpaceContainerProps): ReactElement => {
  useEffect(() => {
    fetchPatients(undefined)
  }, [])
  return (
    <PatientsWorkSpace />
  )
}

export default connect(
  () => ({}),
  {
    fetchPatients: fetchPatientsA.request,
  },
)(PatientsWorkSpaceContainer)
