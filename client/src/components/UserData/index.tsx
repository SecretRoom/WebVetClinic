// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import UserInfoContainer from '../../containers/UserData/Info'
import './style.sass'

type UserDataWorkSpaceProps = {
}

const UserDataWorkSpace = (): ReactElement => (
  <div id="userData-workspace">
    <UserInfoContainer />
  </div>
)

export default UserDataWorkSpace
