// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { Loader } from 'semantic-ui-react'

import './style.sass'

type PatientsContentProps = {
  isFetching: boolean
  createPatientContent: () => ReactElement
}

const PatientsContent = ({
  isFetching,
  createPatientContent,
}: PatientsContentProps): ReactElement => (
  <>
    {isFetching ? (
      <div className="loader-patientsContent">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      createPatientContent()
    )}
  </>
)

export default PatientsContent
