// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect, useState } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'

import './style.sass'

type ProfileMenuProps = {
  fioEmpl: string
  posNameEmpl: string
  deptNameEmpl: string
  profNameEmpl: string

  onLogout: () => void
}
const ProfileMenu = ({
  fioEmpl,
  posNameEmpl,
  deptNameEmpl,
  profNameEmpl,

  onLogout,
}: ProfileMenuProps): ReactElement => {
  const [fio, setFio] = useState<string>('')

  useEffect(() => {
    const newFio = fioEmpl.match(/[a-zа-я]+/gi)
    switch (newFio?.length) {
      case 1:
        setFio(newFio[0])
        break;
      case 2:
        setFio(`${newFio[0]} ${newFio[1][0]}.`)
        break
      case 3:
        setFio(`${newFio[0]} ${newFio[1][0]}. ${newFio[2][0]}.`)
        break
      default:
        break;
    }
  }, [fioEmpl])
  const trigger = (
    <div className="profile-menu">
      <div className="userpic">
        <Icon name="user md" size="large" />
      </div>
      <div className="username">
        <h4>{fio}</h4>
      </div>
    </div>
  )
  const options = [
    <Dropdown.Item key="current-profile">
      <div className="current-profile">
        <div className="profile-info">
          <h2>Отделение</h2>
          <span>{deptNameEmpl}</span>
        </div>
        {profNameEmpl && (
          <div className="profile-info">
            <h2>Профиль</h2>
            <span>{profNameEmpl}</span>
          </div>
        )}
        <div className="profile-info">
          <h2>Должность</h2>
          <span>{posNameEmpl}</span>
        </div>
      </div>
    </Dropdown.Item>,
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
