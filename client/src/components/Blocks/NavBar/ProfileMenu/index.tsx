// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { Dropdown } from 'semantic-ui-react'

import './style.sass'

type ProfileMenuProps = {
  shortName: string

  onLogout: () => void
}
const ProfileMenu = ({
  shortName,

  onLogout,
}: ProfileMenuProps): ReactElement => {
  const trigger = (
    <div className="profile-menu">
      <div className="username">
        <h4>{shortName}</h4>
      </div>
    </div>
  )
  const options = [
    <Dropdown.Divider key="divider" />,
    <Dropdown.Item
      key="logout"
      text="Выход"
      onClick={(): void => onLogout()}
      icon="sign out"
    />,
  ]
  return (
    <Dropdown
      trigger={trigger}
      className="profile-menu-wrapper"
      options={options}
    />
  )
}

export default ProfileMenu
