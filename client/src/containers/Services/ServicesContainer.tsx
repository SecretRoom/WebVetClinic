// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Button, Icon, Popup, Table } from 'semantic-ui-react'
import moment from 'moment'
import ScheduleAPI from '../../services/API/Schedule'
import Services from '../../components/Services'
import getStore from '../../services/IndexedDB/getStore'
import { addToScheduleA } from '../Pets/actions'
import { petsS } from '../Pets/selectors'

type ServicesContainerProps = {
  pets: any[]

  addToSchedule: (data: any) => void
}

const ServicesContainer = ({
  pets,

  addToSchedule,
}:ServicesContainerProps): ReactElement => {
  const [pet, setPet] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('')
  const [selectedEmpl, setSelectedEmpl] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | undefined>(undefined)

  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [selectDate, setSelectDate] = useState<Date | null>(null)

  const [servicesList, setServicesList] = useState<any[]>([])
  const [selectedServices, setSelectedServices] = useState<any[]>([])
  const [scheduleAppointment, setScheduleAppointment] = useState<any[]>([])

  const [staffList, setStaffList] = useState<any[]>([])
  const [staffListDef, setStaffListDef] = useState<any[]>([])

  const handleSortColumn = (field: string) => {
    if (field === sortColumn) {
      setSortDirection(prev => (prev === 'ascending' ? 'descending' : 'ascending'))
    } else {
      setSortColumn(field)
      setSortDirection('ascending')
    }
  }

  const handleFetchAppointment = () => ScheduleAPI.getAppointment('').then((res: any) => {
    setScheduleAppointment(res.items)
  })

  const handleSelectService = (e: PointerEvent, newSelectedID: string): void => {
    if (e.ctrlKey) {
      setSelectedServices(
        prev => (R.includes(newSelectedID, prev)
          ? R.filter((id) => id !== newSelectedID, prev)
          : R.append(newSelectedID, prev)),
      )
    } else {
      setSelectedServices([newSelectedID])
    }
  }

  const handleClickSave = (): void => {
    addToSchedule({
      petID: pet,
      emplID: selectedEmpl,
      date: selectDate,
      serviceID: selectedServices,
    })
    setSelectDate(null)
    handleFetchAppointment()
  }

  const createServicesRow = (list: any[]): ReactElement[] => R.map((item: any) => (
    <Table.Row
      key={Math.random()}
      active={R.includes(item.id, selectedServices)}
      onClick={(e: PointerEvent): void => handleSelectService(e, item.id)}
    >
      <Table.Cell width={5}>
        {item.name}
      </Table.Cell>
      <Table.Cell width={3}>
        {item.price}
      </Table.Cell>
      <Table.Cell>{item.info || 'Информация об услуге'}</Table.Cell>
    </Table.Row>
  ), list)

  const handleChangeEmpl = (e: SyntheticEvent, value: string): void => {
    setSelectedEmpl(value)
  }

  const handleChangePet = (e: SyntheticEvent, value: string): void => {
    setPet(value)
  }

  const createScheduleAppointment = (): ReactElement => {
    const scheduleAppointmentDate = R.map(
      (elem: any) => elem.date, R.filter((item) => item.emplID === selectedEmpl, scheduleAppointment),
    )
    const scheduleAppointmentDatePet = R.map(
      (elem: any) => elem.date, R.filter((item: any) => item.petID === pet, scheduleAppointment),
    )

    const isClose = (date: any): boolean => R.includes(moment(date).format('DD.MM.YYYY HH:mm').toString(), scheduleAppointmentDate)

    const isPet = (date: any): boolean => R.includes(moment(date).format('DD.MM.YYYY HH:mm').toString(), scheduleAppointmentDatePet)

    const isNegative = (day: number, item: number): boolean => (
      isClose(
        moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute'),
      )
      && !isPet(
        moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute'),
      )
    )
      || moment(
        moment(scheduleDate).day(1).hours(10).minutes(0),
      ).add(day, 'd').add(item * 30, 'minute').isBefore(moment())

    const isPositive = (day: number, item: number): boolean => isPet(
      moment(
        moment(scheduleDate).day(1).hours(10).minutes(0),
      ).add(day, 'd').add(item * 30, 'minute'),
    ) && moment(
      moment(scheduleDate).day(1).hours(10).minutes(0),
    ).add(day, 'd').add(item * 30, 'minute').isSameOrAfter(moment())

    const isActive = (day: number, item: number): boolean => moment(
        moment(scheduleDate).day(1).hours(10).minutes(0),
      ).add(day, 'd').add(item * 30, 'minute').isSame(selectDate, 'minutes')

    const isDisabled = (day: number, item: number): boolean => R.isEmpty(pet)
      || isClose(
        moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute'),
      ) || moment(
        moment(scheduleDate).day(1).hours(10).minutes(0),
      ).add(day, 'd').add(item * 30, 'minute').isBefore(moment())
      || isPositive(day, item)

    const createContent = (day: number, item: number): ReactElement | string => {
      if (isPositive(day, item)) return <h3>Назначено</h3>
      if (isClose(
        moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute'),
      )
        && moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute').isSameOrAfter(moment())
      ) return <h3>Занято</h3>
      return ''
    }

    const findServicePrice = (selectService: any) => R.map(
      (item: any) => +item.price,
      R.filter(
        (elem: any) => Boolean(R.includes(elem.id, selectService)),
        servicesList,
      ),
    )

    return (
      <Table definition celled collapsing compact>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>
              {moment(scheduleDate).format('YYYY')}
            </Table.HeaderCell>
            {R.map((item) => (
              <Table.HeaderCell
                key={Math.random()}
                className={
                  moment(moment(scheduleDate).day(1)).add(item, 'd').isSame(selectDate, 'day') && selectDate ? 'select-date' : ''
                }
              >
                {moment(moment(scheduleDate).day(1)).add(item, 'd').format('dd DD.MM')}
              </Table.HeaderCell>
            ), R.range(0, 7))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {R.map((item) => (
            <Table.Row key={Math.random()} textAlign="center">
              <Table.Cell
                key={Math.random()}
                className={
                  moment().hours(10).minutes(0).add(item * 30, 'minute')
                    .isSame(moment().hours(moment(selectDate).hour()).minutes(moment(selectDate).minute())) && selectDate ? 'select-date' : ''
                }
              >
                {moment().hours(10).minutes(0).add(item * 30, 'minute')
                  .format('HH:mm')}
              </Table.Cell>
              {R.map((day) => (
                <Table.Cell
                  key={Math.random()}
                  negative={isNegative(day, item)}
                  positive={isPositive(day, item)}
                  selectable={!R.isEmpty(selectedServices)}
                  onClick={(): void => {
                    setSelectDate(
                      moment(
                        moment(scheduleDate).day(1).hours(10).minutes(0),
                      ).add(day, 'd').add(item * 30, 'minute').toDate(),
                    )
                  }}
                  className={isActive(day, item) ? 'select-date' : ''}
                  disabled={isDisabled(day, item)}
                >
                  {createContent(day, item)}
                </Table.Cell>
              ), R.range(0, 7))}
            </Table.Row>
          ), R.range(0, 20))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell className="active">
              <div className="active-text">
                <div>
                  <span>Выбранная дата приема: </span>
                  <span>{selectDate && moment(selectDate).format('DD.MM.YYYY HH:mm').toString()}</span>
                </div>
                <div>
                  <span>Итоговая сумма приема: </span>
                  <span>{!R.isEmpty(selectedServices) && R.add(R.sum(findServicePrice(selectedServices)), 700)}</span>
                </div>
              </div>
              <div className="active-button">
                <Button
                  size="big"
                  icon="pencil"
                  content="Записаться"
                  disabled={R.isEmpty(pet) || R.isNil(selectDate)}
                  onClick={(): void => handleClickSave()}
                />
                <Button.Group size="big">
                  <Popup
                    position="left center"
                    content="Предыдущий месяц"
                    trigger={(
                      <Button
                        icon
                        disabled={moment().isSameOrAfter(scheduleDate, 'M')}
                        onClick={(): void => {
                        setScheduleDate(
                          prev => moment(prev).add(-1, 'M')
                          .toDate(),
                        )
                      }}
                      >
                        <Icon name="angle double left" />
                      </Button>
                  )}
                  />
                  <Popup
                    position="top right"
                    content="Предыдущая неделя"
                    trigger={(
                      <Button
                        icon
                        disabled={moment().isSameOrAfter(scheduleDate, 'day')}
                        onClick={(): void => {
                        setScheduleDate(prev => moment(prev).add(-1, 'w').toDate())
                      }}
                      >
                        <Icon name="angle left" />
                      </Button>
                  )}
                  />
                  <Popup
                    position="top center"
                    content="Текущая неделя"
                    trigger={(
                      <Button
                        icon
                        disabled={moment().isSame(scheduleDate, 'day')}
                        onClick={(): void => {
                        setScheduleDate(moment().toDate())
                      }}
                      >
                        <Icon name="dot circle outline" />
                      </Button>
                  )}
                  />
                  <Popup
                    position="top left"
                    content="Следующая неделя"
                    trigger={(
                      <Button
                        icon
                        onClick={(): void => {
                        setScheduleDate(prev => moment(prev).add(1, 'w').toDate())
                      }}
                      >
                        <Icon name="angle right" />
                      </Button>
                  )}
                  />
                  <Popup
                    position="right center"
                    content="Следующий месяц"
                    trigger={(
                      <Button
                        icon
                        onClick={(): void => {
                        setScheduleDate(
                          prev => moment(prev).add(1, 'M').date(1)
                          .toDate(),
                        )
                      }}
                      >
                        <Icon name="angle double right" />
                      </Button>
                  )}
                  />
                </Button.Group>
              </div>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }

  useEffect(() => {
    const byDirection = sortDirection === 'ascending' ? R.ascend(R.prop(sortColumn)) : R.descend(R.prop(sortColumn))
    setServicesList(prev => R.sort(byDirection, prev))
  }, [sortColumn, sortDirection])

  useEffect(() => {
    if (!R.isEmpty(selectedServices)) {
      const staffService = R.map((item: any) => item.emplID, R.filter((elem) => R.includes(elem.id, selectedServices), servicesList))
      setStaffList(R.filter((item) => R.all(R.includes(item.id))(staffService), staffListDef))
    } else {
      setStaffList(staffListDef)
    }
    setSelectedEmpl('')
  }, [selectedServices])

  useEffect(() => {
    setSelectDate(null)
  }, [selectedEmpl, pet])

  useEffect(() => {
    setStaffList(staffListDef)
  }, [staffListDef])

  useEffect(() => {
    getStore.staff(undefined).then((res) => {
      setStaffListDef(R.map((item) => ({
        id: item.id,
        value: item.id,
        text: item.fioEmpl,
        content: `${item.fioEmpl} - ${item.profName}`,
      }), res))
    })
    const byName = R.ascend(R.prop('name'))
    getStore.services(undefined).then((res) => setServicesList(R.sort(byName, R.map((item) => ({ ...item, price: +item.price }), res))))
    handleFetchAppointment()
  }, [])

  return (
    <Services
      pet={pet}
      pets={pets}
      staffList={staffList}
      sortColumn={sortColumn}
      selectedEmpl={selectedEmpl}
      servicesList={servicesList}
      sortDirection={sortDirection}
      handleChangePet={handleChangePet}
      selectedServices={selectedServices}
      handleSortColumn={handleSortColumn}
      handleChangeEmpl={handleChangeEmpl}
      createServicesRow={createServicesRow}
      createScheduleAppointment={createScheduleAppointment}
    />
  )
}

export default connect(
  (state) => ({
    pets: petsS(state),
  }),
  {
    addToSchedule: addToScheduleA.request,
  },
)(ServicesContainer)
