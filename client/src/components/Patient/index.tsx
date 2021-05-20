// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'
import './style.sass'
import PatientSideBarContainer from '../../containers/Patient/SideBar'

type PatientWorkSpaceProps = {
  activeTab: string | undefined

  setActiveTab: any

  switchContent: (tab: any) => ReactElement
}

const PatientWorkSpace = ({
  activeTab,
  setActiveTab,

  switchContent,
}: PatientWorkSpaceProps): ReactElement => (
  <div id="patient-workspace">
    <PatientSideBarContainer setActiveTab={setActiveTab} />
    {switchContent(activeTab)}
  </div>
)

export default PatientWorkSpace
