// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import PetContainer from '../../containers/Pets/Pet'
import './style.sass'

const PetsWorkSpace = (): ReactElement => (
  <div id="pets-workspace">
    <PetContainer />
  </div>
)

export default PetsWorkSpace
