// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Menu, Popup } from 'semantic-ui-react'
import ProfileMenu from './ProfileMenu/index'
import NavigateLinkGroup from './NavigateLinkGroup/index'
import './style.sass'
import { logoutA } from '../../../actions'
import { shortNameS } from '../../../selectors'

type NavBarProps = {
  shortName: string

  onLogout: () => void
  [key: string]: any
}

const NavBar = ({
  shortName,

  onLogout,
}: NavBarProps): ReactElement => {
  return (
    <Menu
      className="main-navbar bg-1"
      size="mini"
    >
      <NavigateLinkGroup />
      <Menu.Menu position="right">
        <Menu.Item className="main-navbar__item">
          <ProfileMenu
            shortName={shortName}
            onLogout={onLogout}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default connect(
  (state): any => ({
    shortName: shortNameS(state),
  }),
  {
    onLogout: logoutA,
  },
)(NavBar)
