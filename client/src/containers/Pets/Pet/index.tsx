// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Card, Segment } from 'semantic-ui-react'
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
  const [openModal, setOpenModal] = useState<boolean>(true)
  const [isDisSaveButton, setIsDisSaveButton] = useState<boolean>(true)

  const [empl, setEmpl] = useState<string>('')

  const [service, setService] = useState<any[]>([])
  const [staffList, setStaffList] = useState<any[]>([])
  const [servicesList, setServicesList] = useState<any[]>([])
  const [staffListDef, setStaffListDef] = useState<any[]>([])
  const [servicesListDef, setServicesListDef] = useState<any[]>([])

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

  const createScheduleAppointment = () : ReactElement => (
    <div />
  )

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
    if (!R.isEmpty(service)) {
      const staffService = R.map(
        (item) => JSON.parse(JSON.stringify(R.find(R.propEq('id', item))(servicesListDef))).staff,
        service,
      )
      setStaffList(
        R.filter(
          (elem: any) => R.all(R.equals(true))(R.map((list: any) => Boolean(R.includes(elem.id, list)), staffService)),
          staffListDef,
        ),
      )
    } else {
      setStaffList(staffListDef)
    }
  }, [service])

  useEffect(() => {
    if (!R.isEmpty(empl)) {
      setServicesList(R.filter((item) => R.includes(empl, item.staff), servicesListDef))
    } else {
      setServicesList(servicesListDef)
    }
  }, [empl])

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
