// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import Pet from '../../../components/Pets/Pet'
import { selectPetA } from '../actions'
import { isFetchingPetsS, petsS, selectedPetIDS, selectedPetS } from '../selectors'

type PetContainerProps = {
  petInfo: any

  isFetching: boolean
}

const PetContainer = ({
  petInfo,
  isFetching,
}: PetContainerProps): ReactElement => {
  return (
    <Pet
      petInfo={petInfo}
      isFetching={isFetching}
    />
  )
}

export default connect(
  (state) => ({
    petInfo: selectedPetS(state),
    isFetching: isFetchingPetsS(state),
  }),
  {
  },
)(PetContainer)
