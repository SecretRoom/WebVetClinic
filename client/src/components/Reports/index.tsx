// eslint-disable-next-line no-use-before-define
import React, { ReactElement } from 'react'

import './style.sass'
import ReportsFilterContainer from '../../containers/Reports/Filter'
import ReportsContentContainer from '../../containers/Reports/Content'

const ReportsWorkSpace = (): ReactElement => (
  <div id="reports-workspace">
    <ReportsFilterContainer />
    <ReportsContentContainer />
  </div>
)

export default ReportsWorkSpace
