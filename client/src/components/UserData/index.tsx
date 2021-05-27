// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import UserInfoContainer from '../../containers/UserData/Info'
import PetsCardContainer from '../../containers/Pets/Card'
import './style.sass'

const UserDataWorkSpace = (): ReactElement => (
  <div id="userData-workspace">
    <UserInfoContainer />
    <PetsCardContainer />
  </div>
)

export default UserDataWorkSpace
