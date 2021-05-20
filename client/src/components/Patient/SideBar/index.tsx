// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { Menu } from 'semantic-ui-react'

import './style.sass'

type PatientSideBarProps = {
  createMenuItems: () => ReactElement
}

const PatientSideBar = ({
  createMenuItems,
}: PatientSideBarProps): ReactElement => (
  <>
    <Menu
      vertical
      className="patient-sidebar"
    >
      {createMenuItems()}
    </Menu>
  </>
)

export default PatientSideBar
