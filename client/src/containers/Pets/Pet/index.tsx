// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import Pet from '../../../components/Pets/Pet'
import { isFetchingPetsS, selectedPetIDS } from '../selectors'

type PetContainerProps = {
  petID: string

  isFetching: boolean
}

const PetContainer = ({
  petID,
  isFetching,
}: PetContainerProps): ReactElement => {
  return (
    <Pet
      isFetching={isFetching}
    />
  )
}

export default connect(
  (state) => ({
    petID: selectedPetIDS(state),
    isFetching: isFetchingPetsS(state),
  }),
  {
  },
)(PetContainer)
