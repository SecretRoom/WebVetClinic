// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'

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
      {/* <div className="userpic">
        <Icon name="user md" size="large" />
      </div> */}
      <div className="username">
        <h4>{shortName}</h4>
      </div>
    </div>
  )
  const options = [
    // <Dropdown.Item
    //   id="Личные данные"
    //   as={NavLink}
    //   to="/user/data"
    //   key="/user/data"
    // >
    //   Личные данные
    // </Dropdown.Item>,
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
      // className="profile-menu-wrapper"
      trigger={trigger}
      className="profile-menu-wrapper"
      options={options}
    />
  )
}

export default ProfileMenu
