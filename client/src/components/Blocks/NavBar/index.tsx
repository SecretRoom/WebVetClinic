// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import { connect } from 'react-redux'
import { Menu, Popup } from 'semantic-ui-react'
import ProfileMenu from './ProfileMenu/index'
import NavigateLinkGroup from './NavigateLinkGroup/index'
import './style.sass'
import { logoutA } from '../../../actions'
import { deptNameEmplS, fioEmplS, posNameEmplS, profNameEmplS } from '../../../selectors'

type NavBarProps = {
  fioEmpl: string
  posNameEmpl: string
  deptNameEmpl: string
  profNameEmpl: string

  onLogout: () => void
  [key: string]: any
}

const NavBar = ({
  fioEmpl,
  posNameEmpl,
  deptNameEmpl,
  profNameEmpl,

  onLogout,
}: NavBarProps): ReactElement => {
  // if (!profileList) return <nav className="navbar navbar-expand-lg navbar-light" />

  const trigger = (
    <Menu.Menu position="right">
      <Menu.Item className="main-navbar__item">
        <ProfileMenu
          fioEmpl={fioEmpl}
          posNameEmpl={posNameEmpl}
          deptNameEmpl={deptNameEmpl}
          profNameEmpl={profNameEmpl}
          onLogout={onLogout}
        />
      </Menu.Item>
    </Menu.Menu>
  )

  return (
    <Menu
      className="main-navbar bg-1"
      // ref={nav}
      size="mini"
    // onDoubleClick={({ target }) => {
    //   if (target.classList.contains('main-navbar')) {
    //     const className = Array.prototype.find.call(target.classList, cl => cl.match(/^bg/))
    //     target.classList.remove(className)
    //     let number = +className.match(/\d+/) + 1
    //     if (number === 15) {
    //       number = 0
    //     }
    //     target.classList.add(`bg-${number}`)
    //   }
    // }}
    >
      <NavigateLinkGroup />
      <Popup content={`${deptNameEmpl}${profNameEmpl && ` / ${profNameEmpl}`}`} position="left center" size="mini" trigger={trigger} />
    </Menu>
  )
}

export default connect(
  (state): any => ({
    fioEmpl: fioEmplS(state),
    posNameEmpl: posNameEmplS(state),
    deptNameEmpl: deptNameEmplS(state),
    profNameEmpl: profNameEmplS(state),
  }),
  {
    onLogout: logoutA,
  },
)(NavBar)
