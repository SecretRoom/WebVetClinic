// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import * as R from 'ramda'
import PatientWorkSpace from '../../components/Patient'
import { fetchPatientA } from './actions'
import { idPatS } from './selectors'

import PatientExaminationsContainer from '../../containers/Patient/Examinations'
import PatientInfoContainer from '../../containers/Patient/Info'

type PatientWorkSpaceContainerProps = {
  idPat: string

  fetchPatient: () => void
}

const PatientWorkSpaceContainer = ({
  idPat,
  fetchPatient,
}: PatientWorkSpaceContainerProps): ReactElement => {
  const history = useHistory()
  const [activeTab, setActiveTab] = useState<string>()

  const switchContent = (tab: any): ReactElement => {
    switch (tab) {
      case '0':
        return (<PatientExaminationsContainer />)
      case '1':
        return (<PatientInfoContainer />)
      default:
        break;
    }

    return (<></>)
  }

  useEffect(() => {
    switch (activeTab) {
      case '0':
        history.push(`/patients/${idPat}/examination`)
        break;
      case '1':
        history.push(`/patients/${idPat}/info`)
        break;
      default:
        break;
    }
    if (!R.isNil(activeTab)) sessionStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  useEffect(() => {
    setActiveTab(sessionStorage.getItem('activeTab') || '0')
    fetchPatient()
  }, [])

  return (
    <PatientWorkSpace
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      switchContent={switchContent}
    />
  )
}

export default connect(
  (state) => ({
    idPat: idPatS(state),
  }),
  {
    fetchPatient: fetchPatientA.request,
  },
)(PatientWorkSpaceContainer)
