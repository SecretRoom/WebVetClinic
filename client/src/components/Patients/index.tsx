// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'

import './style.sass'
import PatientsFilterContainer from '../../containers/Patients/Filter'
import PatientsContentContainer from '../../containers/Patients/Content'

const PatientsWorkSpace = (): ReactElement => (
  <div id="patients-workspace">
    <PatientsFilterContainer />
    <PatientsContentContainer />
  </div>
)

export default PatientsWorkSpace
