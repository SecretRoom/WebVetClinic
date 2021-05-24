// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import UserDataWorkSpace from '../../components/UserData'

type UserDataWorkSpaceContainerProps = {
}

const UserDataWorkSpaceContainer = (): ReactElement => {
  return (
    <UserDataWorkSpace />
  )
}

export default connect(
  (state) => ({
  }),
  {
  },
)(UserDataWorkSpaceContainer)
