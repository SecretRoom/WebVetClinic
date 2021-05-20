// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect } from 'react'
import { connect } from 'react-redux'
import ReportsWorkSpace from '../../components/Reports'
import { fetchReportA } from './actions'

type ReportsWorkSpaceContainerProps = {
  fetchReport: (date: {
    dateTo: Date,
    dateFor: Date,
  }) => void
}

const ReportsWorkSpaceContainer = ({
  fetchReport,
}: ReportsWorkSpaceContainerProps): ReactElement => {
  useEffect(() => {
    fetchReport({ dateTo: new Date(), dateFor: new Date() })
  }, [])
  return (
    <ReportsWorkSpace />
  )
}

export default connect(
  () => ({}),
  {
    fetchReport: fetchReportA.request,
  },
)(ReportsWorkSpaceContainer)
