// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Icon, Input, Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';

import './style.sass'

type ReportsFilterProps = {
  isFetching: boolean

  dateTo: Date
  dateFor: Date

  handleResetFilter: () => void
  handleChangeDateTo: (date: Date) => void
  handleChangeDateFor: (date: Date) => void
}

const ReportsFilter = ({
  dateTo,
  dateFor,
  isFetching,

  handleResetFilter,
  handleChangeDateTo,
  handleChangeDateFor,
}: ReportsFilterProps): ReactElement => (
  <Segment
    className="reports-filter"
    onClick={(e: SyntheticEvent): void => e.preventDefault()}
  >
    <h4>Интервал отчетности</h4>
    <h4>от</h4>
    <DatePicker
      closeOnScroll
      selected={dateTo}
      maxDate={dateFor}
      disabled={isFetching}
      customInput={(
        <Input />
      )}
      dateFormat="dd.MM.yyyy"
      onChange={(date: Date): void => handleChangeDateTo(date)}
    />
    <h4>до</h4>
    <DatePicker
      closeOnScroll
      minDate={dateTo}
      selected={dateFor}
      disabled={isFetching}
      customInput={(
        <Input />
      )}
      dateFormat="dd.MM.yyyy"
      onChange={(date: Date): void => handleChangeDateFor(date)}
    />
    <Icon
      link
      color="grey"
      size="large"
      disabled={isFetching}
      name="undo alternate"
      title="Сброс фильтрации"
      onClick={(): void => handleResetFilter()}
    />
  </Segment>
)

export default ReportsFilter
