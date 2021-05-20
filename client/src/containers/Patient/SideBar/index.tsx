// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import PatientSideBar from '../../../components/Patient/SideBar'
import { idPatS } from '../selectors'

type PatientSideBarContainerProps = {
  idPat: string

  setActiveTab: any
}

const PatientSideBarContainer = ({
  idPat,
  setActiveTab,
}: PatientSideBarContainerProps): ReactElement => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false)

  const handleChangeOpenSidebar = (): void => setOpenSidebar(prev => !prev)

  const createMenuItems = (): ReactElement => (
    <>
      <Menu.Item
        as="a"
        className="patient-sidebar__item"
        onClick={(): void => handleChangeOpenSidebar()}
      >
        <div>
          <Icon
            inverted
            size="big"
            name={openSidebar ? 'angle double left' : 'angle double right'}
          />
        </div>
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        onClick={() => setActiveTab('0')}
        className="patient-sidebar__item"
        to={{ pathname: `/patients/${idPat}/examination` }}
      >
        <div>
          <Icon
            inverted
            size="big"
            name="list alternate outline"
          />
          {openSidebar && (<h4>Осмотры</h4>)}
        </div>
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        onClick={() => setActiveTab('1')}
        className="patient-sidebar__item"
        to={{ pathname: `/patients/${idPat}/info` }}

      >
        <div>
          <Icon
            inverted
            size="big"
            name="id card outline"
          />
          {openSidebar && (<h4>Информация</h4>)}
        </div>
      </Menu.Item>
    </>
  )
  return (
    <PatientSideBar
      createMenuItems={createMenuItems}
    />
  )
}

export default connect(
  (state) => ({
    idPat: idPatS(state),
  }),
  {},
)(PatientSideBarContainer)
