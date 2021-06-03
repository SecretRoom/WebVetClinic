// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Button, Card, Icon, Segment, Table } from 'semantic-ui-react'
import moment from 'moment'
import ScheduleAPI from '../../../services/API/Schedule'
import Pet from '../../../components/Pets/Pet'
import { addToScheduleA, getScheduleAppointmentA, getScheduleServiceA, selectPetA } from '../actions'
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
  services: any[]
  appointments: any[]

  addToSchedule: (data: any) => void
  getScheduleService: () => void
  getScheduleAppointment: () => void
}

const PetContainer = ({
  petInfo,
  services,
  isFetching,
  appointments,
  isFetchingServices,
  isFetchingAppointments,

  addToSchedule,
  getScheduleService,
  getScheduleAppointment,
}: PetContainerProps): ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isDisSaveButton, setIsDisSaveButton] = useState<boolean>(true)

  const [empl, setEmpl] = useState<string>('')

  const [service, setService] = useState<any[]>([])
  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [selectDate, setSelectDate] = useState<Date>()
  const [staffList, setStaffList] = useState<any[]>([])
  const [servicesList, setServicesList] = useState<any[]>([])
  const [staffListDef, setStaffListDef] = useState<any[]>([])
  const [servicesListDef, setServicesListDef] = useState<any[]>([])
  const [scheduleAppointment, setScheduleAppointment] = useState<any[]>([])

  const createServicesCard = (list: any[]): ReactElement => (
    <>
      {R.map((item: any) => (
        <Card key={Math.random()} className="card">
          <Card.Content>
            <Card.Header>Услуга</Card.Header>
            <Card.Description>{item.service}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Дата и время приема</Card.Header>
            <Card.Description>{item.date}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Специалист</Card.Header>
            <Card.Description>
              {item.empl}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Стоимость услуги</Card.Header>
            <Card.Description>
              {item.price}р
            </Card.Description>
          </Card.Content>
        </Card>
      ), list)}
    </>
  )

  const createAppointmentsCard = (list: any[]): ReactElement => (
    <>
      {R.map((item: any) => (
        <Card key={Math.random()} className="card">
          <Card.Content>
            <Card.Header>Специалист</Card.Header>
            <Card.Description>{item.emplProfName}</Card.Description>
            <Card.Description>{item.empl}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Дата и время приема</Card.Header>
            <Card.Description>{item.date}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Услуги</Card.Header>
            <Card.Description>
              {R.join(', ', item.service)}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Header>Стоимость приема с услугами</Card.Header>
            <Card.Description>
              {item.price}р
            </Card.Description>
          </Card.Content>
        </Card>
      ), list)}
    </>
  )

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
      if (isClose(
        moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute'),
      )
        && moment(
          moment(scheduleDate).day(1).hours(10).minutes(0),
        ).add(day, 'd').add(item * 30, 'minute').isSameOrAfter(moment())
      ) return <h3>Занято</h3>
      if (isPositive(day, item)) return <h3>Назначено</h3>
      return ''
    }
    return (
      <Table definition celled>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>
              {moment(scheduleDate).format('YYYY')}
            </Table.HeaderCell>
            {R.map((item) => (
              <Table.HeaderCell key={Math.random()}>
                {moment(moment(scheduleDate).day(1)).add(item, 'd').format('dd DD.MM')}
              </Table.HeaderCell>
            ), R.range(0, 7))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {R.map((item) => (
            <Table.Row key={Math.random()} textAlign="center">
              <Table.Cell key={Math.random()}>
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
                  active={isActive(day, item)}
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
            <Table.HeaderCell className="buttons">
              <Button
                size="small"
                floated="right"
                labelPosition="left"
                icon="angle double left"
                content="Предыдущий месяц"
                disabled={moment().isSameOrAfter(scheduleDate, 'M')}
                onClick={(): void => {
                  setScheduleDate(
                    prev => moment(prev).add(-1, 'M')
                      .toDate(),
                  )
                }}
              />
              <Button
                size="small"
                floated="right"
                icon="angle left"
                labelPosition="left"
                content="Предыдущая неделя"
                disabled={moment().isSameOrAfter(scheduleDate, 'day')}
                onClick={(): void => {
                  setScheduleDate(prev => moment(prev).add(-1, 'w').toDate())
                }}
              />
              <Button
                size="small"
                floated="right"
                icon="dot circle outline"
                disabled={moment().isSame(scheduleDate, 'day')}
                onClick={(): void => {
                  setScheduleDate(moment().toDate())
                }}
              />
              <Button
                size="small"
                floated="right"
                icon="angle right"
                labelPosition="right"
                content="Следующая неделя"
                onClick={(): void => {
                  setScheduleDate(prev => moment(prev).add(1, 'w').toDate())
                }}
              />
              <Button
                size="small"
                floated="right"
                labelPosition="right"
                icon="angle double right"
                content="Следующий месяц"
                onClick={(): void => {
                  setScheduleDate(
                    prev => moment(prev).add(1, 'M').date(1)
                      .toDate(),
                  )
                }}
              />
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

  const handleChangeOpenModal = (): void => setOpenModal(prev => !prev)

  const handleClickSave = (): void => {
    // if (isEdit) {
    //   updatePet({
    //     petID: selectedPet._id,
    //     sex,
    //     type,
    //     color,
    //     file: photo,
    //     weight,
    //     height,
    //     nickname,
    //     birthday,
    //   })
    // } else {
    //   createPet({
    //     sex,
    //     type,
    //     color,
    //     file: photo,
    //     weight,
    //     height,
    //     nickname,
    //     birthday,
    //   })
    // }
    handleChangeOpenModal()
  }

  useEffect(() => {
    // if (!R.isEmpty(service)) {
    // const staffService = R.map(
    //   (item) => JSON.parse(JSON.stringify(R.find(R.propEq('id', item))(servicesListDef) || { staff: [] })).staff,
    //   service,
    // )
    // setStaffList(
    //   R.filter(
    //     (elem: any) => R.all(R.equals(true))(R.map((list: any) => Boolean(R.includes(elem.id, list)), staffService)),
    //     staffListDef,
    //   ),
    // )
    // } else {
    //   setStaffList(staffListDef)
    // }
  }, [service])

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
  }, [empl])

  useEffect(() => {
    if (!openModal) {
      setEmpl('')
      setService([])
      setScheduleDate(moment().toDate())
    } else {
      ScheduleAPI.getAppointment('').then((res: any) => {
        setScheduleAppointment(res)
      })
    }
  }, [openModal])

  useEffect(() => {
    setStaffList(staffListDef)
    setServicesList(servicesListDef)
  }, [staffListDef, servicesListDef])

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
      services={services}
      staffList={staffList}
      openModal={openModal}
      isFetching={isFetching}
      appointments={appointments}
      servicesList={servicesList}
      handleChangeEmpl={handleChangeEmpl}
      isFetchingServices={isFetchingServices}
      createServicesCard={createServicesCard}
      handleChangeService={handleChangeService}
      handleChangeOpenModal={handleChangeOpenModal}
      createAppointmentsCard={createAppointmentsCard}
      isFetchingAppointments={isFetchingAppointments}
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
    getScheduleService: getScheduleServiceA.request,
    getScheduleAppointment: getScheduleAppointmentA.request,
  },
)(PetContainer)
