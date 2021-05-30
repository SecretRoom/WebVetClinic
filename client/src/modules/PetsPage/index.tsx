// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PetContainer from '../../containers/Pets/Pet'

const PetPage = (): ReactElement => (
  <PetContainer />
)

export default PetPage
