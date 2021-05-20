// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Modal, Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import * as R from 'ramda'

import './style.sass'
import moment from 'moment';

type ScheduleAppointmentFilterProps = {
  date: Date

  isFetching: boolean
  isAddAppointmentModal: boolean

  staff: any[]
  patients: any[]

  newAppointment: {
    date: Date | null,
    idEmpl: string,
    idPat: string
  }

  handleClickUpdate: () => void
  handleResetFilter: () => void
  handleChangeDate: (date: Date) => void
  handleCreateNewAppointment: () => void
  handleChangeAppointmentModal: () => void
  handleChangeNewAppointment: (e: SyntheticEvent, fieldName: string, value: any) => void
}

const ScheduleAppointmentFilter = ({
  date,
  staff,
  patients,
  isFetching,
  newAppointment,
  isAddAppointmentModal,

  handleChangeDate,
  handleClickUpdate,
  handleResetFilter,
  handleChangeNewAppointment,
  handleCreateNewAppointment,
  handleChangeAppointmentModal,
}: ScheduleAppointmentFilterProps): ReactElement => (
  <Segment
    className="scheduleAppointment-filter"
    onClick={(e: SyntheticEvent): void => e.preventDefault()}
  >
    <h4>Дата приема</h4>
    <Button.Group
      basic
      size="small"
      color="green"
    >
      <Button
        icon="left arrow"
        disabled={isFetching}
        title="Предыдущий день"
        onClick={(): void => handleChangeDate(moment(date).add(-1, 'd').toDate())}
      />
      <DatePicker
        closeOnScroll
        selected={date}
        disabled={isFetching}
        customInput={(
          <Button content={moment(date).format('DD.MM.YYYY')} />
        )}
        dateFormat="dd.MM.yyyy"
        onChange={(date: Date): void => handleChangeDate(date)}
      />
      <Button
        title="Сегодня"
        disabled={isFetching}
        icon="dot circle outline"
        onClick={(): void => handleResetFilter()}
      />
      <Button
        icon="right arrow"
        disabled={isFetching}
        title="Следующий день"
        onClick={(): void => handleChangeDate(moment(date).add(1, 'd').toDate())}
      />
    </Button.Group>
    <Icon
      link
      color="grey"
      size="large"
      loading={isFetching}
      disabled={isFetching}
      name="sync alternate"
      title="Обновить расписание"
      onClick={(): void => handleClickUpdate()}
    />
    <Modal
      size="mini"
      className="appointment__header-modal"
      trigger={(
        <Button
          basic
          size="small"
          icon="plus"
          color="green"
          content="Записать"
          onClick={() => handleChangeAppointmentModal()}
        />
      )}
      open={isAddAppointmentModal}
      onClose={() => handleChangeAppointmentModal()}
    >
      <Modal.Header className="appointment__header-modal__header">
        Запись пациента на прием
      </Modal.Header>
      <Modal.Content className="appointment__header-modal__content">
        <Dropdown
          fluid
          search
          selection
          options={patients}
          selectOnBlur={false}
          placeholder="Пациенты"
          selectOnNavigation={false}
          value={newAppointment.idPat}
          noResultsMessage="Пациент не найден"
          onChange={(e: SyntheticEvent, { value }: any): void => handleChangeNewAppointment(e as never, 'idPat', value)}
        />
        <Dropdown
          fluid
          search
          selection
          options={staff}
          selectOnBlur={false}
          placeholder="Сотрудники"
          selectOnNavigation={false}
          value={newAppointment.idEmpl}
          noResultsMessage="Сотрудник не найден"
          onChange={(e: SyntheticEvent, { value }: any): void => handleChangeNewAppointment(e as never, 'idEmpl', value)}
        />
        <DatePicker
          closeOnScroll
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          minTime={new Date()}
          maxTime={moment().hours(23).minutes(59).toDate()}
          minDate={new Date()}
          dateFormat="dd.MM.yyyy HH:mm"
          placeholderText="Дата приема"
          selected={newAppointment.date}
          onChange={(date: any, e: SyntheticEvent): void => handleChangeNewAppointment(e as never, 'date', date)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          disabled={
            R.isNil(newAppointment.date)
            || R.isEmpty(newAppointment.idPat)
            || R.isEmpty(newAppointment.idEmpl)
          }
          content="Записать"
          onClick={(): void => handleCreateNewAppointment()}
        />
      </Modal.Actions>

    </Modal>
  </Segment>
)

export default ScheduleAppointmentFilter
