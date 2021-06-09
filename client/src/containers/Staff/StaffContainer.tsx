// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Button, Card, Icon, Image, Popup, Table } from 'semantic-ui-react'
import moment from 'moment'
import ScheduleAPI from '../../services/API/Schedule'
import Staff from '../../components/Staff'
import getStore from '../../services/IndexedDB/getStore'
import { addToScheduleA, getScheduleAppointmentA } from '../Pets/actions'
import { petsS } from '../Pets/selectors'

type StaffContainerProps = {
  pets: any[]

  addToSchedule: (data: any) => void
  getScheduleAppointment: () => void
}

const StaffContainer = ({
  pets,

  addToSchedule,
  getScheduleAppointment,
}:StaffContainerProps): ReactElement => {
  const [pet, setPet] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [profile, setProfile] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [selectDate, setSelectDate] = useState<Date | null>(null)

  const [service, setService] = useState<any[]>([])
  const [selectedEmpl, setSelectedEmpl] = useState<any>({})
  const [servicesList, setServicesList] = useState<any[]>([])
  const [servicesListDef, setServicesListDef] = useState<any[]>([])
  const [scheduleAppointment, setScheduleAppointment] = useState<any[]>([])

  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [openFullFilter, setOpenFullFilter] = useState<boolean>(false)

  const [staffList, setStaffList] = useState<any[]>([])
  const [profileList, setProfileList] = useState<any[]>([])
  const [staffListDef, setStaffListDef] = useState<any[]>([])
  const [categoryList, setCategoryList] = useState<any[]>([])

  const handleChangeOpenModal = (): void => setOpenModal(prev => !prev)

  const handleResetFilter = (): void => {
    setName('')
    setSurname('')
    setPatronymic('')
    setProfile('')
    setCategory('')
    setStaffList(staffListDef)
  }

  const handleClickSave = (): void => {
    addToSchedule({
      petID: pet,
      emplID: selectedEmpl.id,
      date: selectDate,
      serviceID: service,
    })
    handleChangeOpenModal()
  }

  const handleUpdateList = (): void => {
    setIsFetching(true)
    const includesSurname = (elem: string) => (!R.isEmpty(surname) ? R.includes(R.toLower(surname), R.toLower(elem)) : true)
    const includesName = (elem: string) => (!R.isEmpty(name) ? R.includes(R.toLower(name), R.toLower(elem)) : true)
    const includesPatronymic = (elem: string) => (!R.isEmpty(patronymic) ? R.includes(R.toLower(patronymic), R.toLower(elem)) : true)
    const includesProfile = (elem: string) => (!R.isEmpty(profile) ? profile === elem : true)
    const includesCategory = (elem: string) => (!R.isEmpty(category) ? category === elem : true)
    if (openFullFilter) {
      setStaffList(
        R.filter(
          (item) => includesSurname(R.split(' ', item.fioEmpl)[0])
            && includesName(R.split(' ', item.fioEmpl)[1])
            && includesPatronymic(R.split(' ', item.fioEmpl)[2])
            && includesProfile(item.idProf)
            && includesCategory(item.idCat),
          staffListDef,
        ),
      )
    } else {
      setStaffList(
        R.filter(
          (item) => R.includes(R.toLower(fullName), R.toLower(item.fioEmpl)),
          staffListDef,
        ),
      )
    }
  }

  const handleChangeFullFilter = (): void => setOpenFullFilter(prev => !prev)

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'name':
        if (!R.test(/[^a-zа-я]+/gi, value) || R.isEmpty(value)) {
          setName(value)
        }
        break
      case 'surname':
        if (!R.test(/[^a-zа-я]+/gi, value) || R.isEmpty(value)) {
          setSurname(value)
        }
        break
      case 'patronymic':
        if (!R.test(/[^a-zа-я]+/gi, value) || R.isEmpty(value)) {
          setPatronymic(value)
        }
        break
      case 'fullName':
        if (!R.isEmpty(value)) {
          if (!R.test(/[^a-zа-я\s]+/gi, value)) {
            if (R.includes(R.match(/\s/gi, value).length, [0, 1, 2])) {
              setFullName(value)
            }
          }
        } else {
          setFullName(value)
        }
        break
      case 'profile':
        setProfile(value)
        break
      case 'category':
        setCategory(value)
        break
      default:
        break;
    }
  }

  const createStaffCard = (list: any[]): ReactElement[] => R.map((item: any) => (
    <Card
      raised
      key={Math.random()}
      className="staff-cards__card"
    >
      <Image
        fluid
        className="staff-cards__card-image"
        src={item.src}
      />
      <div className="staff-cards__card-data">
        <div className="field">
          <h4>ФИО</h4>
          <span>{item.fioEmpl}</span>
        </div>
        <div className="row">
          <div className="field">
            <h4>Профиль</h4>
            <span>{item.profName}</span>
          </div>
          <div className="field">
            <h4>Категория</h4>
            <span>{item.catName}</span>
          </div>
        </div>
        <div className="field">
          <h4>Образование</h4>
          <span>{item.education}</span>
        </div>
        <div className="field">
          <h4>Награды</h4>
          <span>{item.prize}</span>
        </div>
      </div>
      <div className="sign-button">
        <Popup
          position="top center"
          content="Записаться"
          trigger={(
            <Button
              circular
              icon="pencil"
              size="massive"
              color="orange"
              onClick={(): void => {
                setSelectedEmpl(item)
                handleChangeOpenModal()
              }}
            />
          )}
        />
      </div>
    </Card>
  ), list)

  const handleChangeService = (e: SyntheticEvent, value: any[]): void => {
    setService(value)
  }

  const handleChangePet = (e: SyntheticEvent, value: string): void => {
    setPet(value)
  }

  const createScheduleAppointment = (): ReactElement => {
    const scheduleAppointmentDate = R.map(
      (elem: any) => elem.date, R.filter((item) => item.emplID === selectedEmpl.id, scheduleAppointment),
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
    ).add(day, 'd').add(item * 30, 'minute').isSame(selectDate)

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
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }

  useEffect(() => {
    if (!fullName) handleUpdateList()
  }, [fullName])

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleUpdateList()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [
    name,
    surname,
    profile,
    category,
    fullName,
    patronymic,
  ])

  useEffect(() => {
    if (!R.isEmpty(selectedEmpl)) {
      setServicesList(R.filter((item) => Boolean(R.includes(selectedEmpl.id, item.staff)), servicesListDef))
      if (!R.isEmpty(service)) {
        setService(
          prev => R.filter(
            (item) => !!R.find(R.propEq('id', item), R.filter((item) => Boolean(R.includes(selectedEmpl.id, item.staff)), servicesListDef)),
            prev,
          ),
        )
      }
    } else {
      setServicesList(servicesListDef)
    }
    setSelectDate(null)
  }, [selectedEmpl])

  useEffect(() => {
    if (!openFullFilter) handleResetFilter()
  }, [openFullFilter])

  useEffect(() => {
    setIsFetching(false)
  }, [staffList])

  useEffect(() => {
    setStaffList(staffListDef)
  }, [staffListDef])

  useEffect(() => {
    if (!openModal) {
      setPet('')
      setService([])
      setSelectedEmpl({})
      setSelectDate(null)
      setScheduleDate(moment().toDate())
    } else {
      ScheduleAPI.getAppointment('').then((res: any) => {
        setScheduleAppointment(res.items)
      })
    }
  }, [openModal])

  useEffect(() => {
    setServicesList(servicesListDef)
  }, [servicesListDef])

  useEffect(() => {
    getStore.profile(undefined).then(
      (res) => setProfileList(R.map((item) => ({ value: item.id, key: item.id, text: item.name }), res)),
    )
    getStore.category(undefined).then(
      (res) => setCategoryList(R.map((item) => ({ value: item.id, key: item.id, text: item.name }), res)),
    )
    getStore.staff(undefined).then(
      (res) => setStaffListDef(res),
    )
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
    getScheduleAppointment()
  }, [])

  return (
    <Staff
      pet={pet}
      pets={pets}
      name={name}
      surname={surname}
      profile={profile}
      service={service}
      category={category}
      fullName={fullName}
      openModal={openModal}
      staffList={staffList}
      patronymic={patronymic}
      isFetching={isFetching}
      profileList={profileList}
      selectedEmpl={selectedEmpl}
      servicesList={servicesList}
      categoryList={categoryList}
      openFullFilter={openFullFilter}
      createStaffCard={createStaffCard}
      handleUpdateList={handleUpdateList}
      handleChangePet={handleChangePet}
      handleResetFilter={handleResetFilter}
      handleChangeInputs={handleChangeInputs}
      handleChangeService={handleChangeService}
      handleChangeOpenModal={handleChangeOpenModal}
      handleChangeFullFilter={handleChangeFullFilter}
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
    getScheduleAppointment: getScheduleAppointmentA.request,
  },
)(StaffContainer)
