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
      {R.map((item) => (
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

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      // case 'sex':
      //   setSex(value)
      //   break
      // case 'nickname':
      //   setNickname(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
      //   break
      // case 'type':
      //   setType(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
      //   break
      // case 'weight':
      //   setWeight(prev => (R.test(/\D/, value) ? prev : value))
      //   break
      // case 'height':
      //   setHeight(prev => (R.test(/\D/, value) ? prev : value))
      //   break
      // case 'color':
      //   setColor(value)
      //   break
      // case 'birthday':
      //   setBirthday(value)
      //   break
      default:
        break;
    }
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
    getScheduleService()
    getScheduleAppointment()
  }, [])

  return (
    <Pet
      petInfo={petInfo}
      services={services}
      openModal={openModal}
      isFetching={isFetching}
      appointments={appointments}
      isFetchingServices={isFetchingServices}
      createServicesCard={createServicesCard}
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
