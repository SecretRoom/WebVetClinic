// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import * as R from 'ramda'
import routsManager from '../../../../routes'

const NavigateLinkGroup = (): ReactElement => {
  const [mainLinks, setMainLinks] = useState<any[]>([])

  useEffect(() => {
    setMainLinks(R.filter((item: any) => item.showNavLink, routsManager.routes))
  }, [])

  return (
    <>
      {R.map(({ title, path }) => {
        return (
          <Menu.Item
            id={title}
            className="main-navbar__item"
            as={NavLink}
            to={path}
            key={path}
          >
            {title}
          </Menu.Item>
        )
      }, mainLinks)}
    </>
  )
}

export default NavigateLinkGroup
