// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Button, Card, Icon, Popup, Segment, Table } from 'semantic-ui-react'
import moment from 'moment'
import ScheduleAPI from '../../../services/API/Schedule'
import Pet from '../../../components/Pets/Pet'
import { addToScheduleA, getScheduleAppointmentA, getScheduleServiceA, removeFromScheduleA, selectPetA } from '../actions'
import {
  appointmentsS,
  isFetchingAppointmentsS,
  isFetchingPetsS,
  isFetchingServicesS,
  petsS,
  selectedPetIDS,
  selectedPetS,
  servicesS,
} from '../selectors'
import getStore from '../../../services/IndexedDB/getStore'

type PetContainerProps = {

  isFetching: boolean
  isFetchingServices: boolean
  isFetchingAppointments: boolean

  petInfo: any
  appointments: any[]

  getScheduleService: () => void
  addToSchedule: (data: any) => void
  getScheduleAppointment: () => void
  removeFromSchedule: (id: string) => void
}

const PetContainer = ({
  petInfo,
  isFetching,
  appointments,
  isFetchingServices,
  isFetchingAppointments,

  addToSchedule,
  getScheduleService,
  removeFromSchedule,
  getScheduleAppointment,
}: PetContainerProps): ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [empl, setEmpl] = useState<string>('')

  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [selectDate, setSelectDate] = useState<Date | null>(null)

  const [service, setService] = useState<any[]>([])
  const [staffList, setStaffList] = useState<any[]>([])
  const [servicesList, setServicesList] = useState<any[]>([])
  const [staffListDef, setStaffListDef] = useState<any[]>([])
  const [servicesListDef, setServicesListDef] = useState<any[]>([])
  const [scheduleAppointment, setScheduleAppointment] = useState<any[]>([])
  const [visitedAppointments, setVisitedAppointments] = useState<any[]>([])
  const [forthcomingAppointments, setForthcomingAppointments] = useState<any[]>([])

  const createAppointmentsCard = (list: any[]): ReactElement => (
    <>
      {R.map((item: any) => (
        <Card key={Math.random()} className="card">
          <Card.Content>
            <Card.Header>Специалист</Card.Header>
            <Card.Description>{item.emplProfName}</Card.Description>
            <Card.Description>{item.empl}</Card.Description>
          </Card.Content>
          {moment(item.date).isSameOrAfter(moment().format('DD.MM.YYYY HH:mm'), 'minute')
            && (
              <div className="remove-card">
                <Icon
                  link
                  size="big"
                  name="remove"
                  className="remove-card__icon"
                  onClick={(): void => removeFromSchedule(item.id)}
                />
              </div>
            )
          }
          <Card.Content>
            <Card.Header>Дата и время приема</Card.Header>
            <Card.Description>{item.date}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Стоимость приема{item.service.length ? ' с услугами' : ''}</Card.Header>
            <Card.Description>
              {item.price}р
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Услуги</Card.Header>
            <Card.Description>
              {item.service.length ? R.join(', ', item.service) : 'Отсутствуют'}
            </Card.Description>
          </Card.Content>
        </Card>
      ), list)}
    </>
  )

  const handleChangeOpenModal = (): void => setOpenModal(prev => !prev)

  const handleClickSave = (): void => {
    addToSchedule({
      emplID: empl,
      date: selectDate,
      serviceID: service,
    })
    handleChangeOpenModal()
  }

  const createScheduleAppointment = (): ReactElement => {
    const scheduleAppointmentDate = R.map(
      (elem: any) => elem.date, R.filter((item) => item.emplID === empl, scheduleAppointment),
    )
    const scheduleAppointmentDatePet = R.map(
      (elem: any) => elem.date, R.filter((item) => item.emplID === empl, appointments),
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
    ).add(day, 'd').add(item * 30, 'minute').isSame(selectDate)

    const isDisabled = (day: number, item: number): boolean => R.isEmpty(empl)
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
        servicesListDef,
      ),
    )

    return (
      <Table definition celled>
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
                  selectable
                  negative={isNegative(day, item)}
                  positive={isPositive(day, item)}
                  key={Math.random()}
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
              <div>
                <div>
                  <span>Выбранная дата приема: </span>
                  <span>{selectDate && moment(selectDate).format('DD.MM.YYYY HH:mm').toString()}</span>
                </div>
                <div>
                  <span>Итоговая сумма приема: </span>
                  <span>{R.add(R.sum(findServicePrice(service)), 700)}</span>
                </div>
              </div>
              <Button
                size="big"
                icon="pencil"
                content="Записаться"
                disabled={R.isEmpty(empl) || R.isNil(selectDate)}
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
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }

  const handleChangeService = (e: SyntheticEvent, value: any[]): void => {
    setService(value)
  }

  const handleChangeEmpl = (e: SyntheticEvent, value: string): void => {
    setEmpl(value)
  }

  useEffect(() => {
    if (!R.isEmpty(empl)) {
      setServicesList(R.filter((item) => R.includes(empl, item.staff), servicesListDef))
      if (!R.isEmpty(service)) {
        setService(
          prev => R.filter((item) => !!R.find(R.propEq('id', item), R.filter((item) => R.includes(empl, item.staff), servicesListDef)), prev),
        )
      }
    } else {
      setServicesList(servicesListDef)
    }
    setSelectDate(null)
  }, [empl])

  useEffect(() => {
    if (!openModal) {
      setEmpl('')
      setService([])
      setSelectDate(null)
      setScheduleDate(moment().toDate())
    } else {
      ScheduleAPI.getAppointment('').then((res: any) => {
        setScheduleAppointment(res.items)
      })
    }
  }, [openModal])

  useEffect(() => {
    setStaffList(staffListDef)
    setServicesList(servicesListDef)
  }, [staffListDef, servicesListDef])

  useEffect(() => {
    const sort = R.sortBy(R.prop('date'))
    setVisitedAppointments(
      R.filter((item: any) => moment(item.date).isBefore(moment().format('DD.MM.YYYY HH:mm'), 'minute'), appointments),
    )
    setForthcomingAppointments(
      sort(R.filter((item: any) => moment(item.date).isSameOrAfter(moment().format('DD.MM.YYYY HH:mm'), 'minute'), appointments)),
    )
  }, [appointments])

  useEffect(() => {
    getStore.staff(undefined).then((res) => {
      setStaffListDef(R.map((item) => ({
        id: item.id,
        value: item.id,
        text: item.fioEmpl,
        content: `${item.fioEmpl} - ${item.profName}`,
      }), res))
    })
    getStore.services(undefined).then((res) => {
      setServicesListDef(R.map((item) => ({
        id: item.id,
        value: item.id,
        text: item.name,
        price: item.price,
        staff: item.emplID,
        content: `${item.name} - ${item.price}`,
      }), res))
    })
    getScheduleService()
    getScheduleAppointment()
  }, [])

  return (
    <Pet
      empl={empl}
      petInfo={petInfo}
      service={service}
      staffList={staffList}
      openModal={openModal}
      isFetching={isFetching}
      servicesList={servicesList}
      handleChangeEmpl={handleChangeEmpl}
      isFetchingServices={isFetchingServices}
      visitedAppointments={visitedAppointments}
      handleChangeService={handleChangeService}
      handleChangeOpenModal={handleChangeOpenModal}
      createAppointmentsCard={createAppointmentsCard}
      isFetchingAppointments={isFetchingAppointments}
      forthcomingAppointments={forthcomingAppointments}
      createScheduleAppointment={createScheduleAppointment}
    />
  )
}

export default connect(
  (state) => ({
    services: servicesS(state),
    petInfo: selectedPetS(state),
    appointments: appointmentsS(state),
    isFetching: isFetchingPetsS(state),
    isFetchingServices: isFetchingServicesS(state),
    isFetchingAppointments: isFetchingAppointmentsS(state),
  }),
  {
    addToSchedule: addToScheduleA.request,
    removeFromSchedule: removeFromScheduleA.request,
    getScheduleService: getScheduleServiceA.request,
    getScheduleAppointment: getScheduleAppointmentA.request,
  },
)(PetContainer)
