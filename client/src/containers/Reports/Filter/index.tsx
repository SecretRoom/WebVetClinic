// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ReportsFilter from '../../../components/Reports/Filter'
import { fetchReportA } from '../actions'
import { isFetchingReportsS } from '../selectors'

type ReportsFilterContainerProps = {
  isFetching: boolean

  fetchReport: (date: {
    dateTo: Date,
    dateFor: Date,
  }) => void

  [key: string]: any
}

const ReportsFilterContainer = ({
  isFetching,

  fetchReport,
}: ReportsFilterContainerProps): ReactElement => {
  const [dateTo, setDateTo] = useState<Date>(new Date())
  const [dateFor, setDateFor] = useState<Date>(new Date())

  const handleChangeDateTo = (date: Date): void => setDateTo(date)

  const handleChangeDateFor = (date: Date): void => setDateFor(date)

  const handleResetFilter = (): void => {
    handleChangeDateTo(new Date())
    handleChangeDateFor(new Date())
  }

  useEffect(() => {
    fetchReport({
      dateTo: moment(dateTo).hour(0).minute(0).second(0)
        .toDate(),
      dateFor: moment(dateFor).hour(23).minute(59).second(59)
        .toDate(),
    })
  }, [dateTo, dateFor])

  return (
    <ReportsFilter
      dateTo={dateTo}
      dateFor={dateFor}
      isFetching={isFetching}
      handleResetFilter={handleResetFilter}
      handleChangeDateTo={handleChangeDateTo}
      handleChangeDateFor={handleChangeDateFor}
    />
  )
}

export default connect(
  (state): RootStateInterface => ({
    isFetching: isFetchingReportsS(state),
  }),
  {
    fetchReport: fetchReportA.request,
  },
)(ReportsFilterContainer)
