// eslint-disable-next-line no-use-before-define
import React, { ReactElement, useEffect } from 'react'
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
  useEffect(() => {
    getScheduleService()
    getScheduleAppointment()
  }, [])

  const createServicesCard = (list: any[]): ReactElement => (
    <Card.Group className="cards">
      {R.map((item) => (
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
    </Card.Group>
  )
  const createAppointmentsCard = (list: any[]): ReactElement => (
    <Card.Group className="cards">
      {R.map((item) => (
        <Card key={Math.random()} className="card">
          <Card.Content>
            <Card.Header>Специалист</Card.Header>
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
    </Card.Group>
  )

  return (
    <Pet
      petInfo={petInfo}
      services={services}
      isFetching={isFetching}
      appointments={appointments}
      isFetchingServices={isFetchingServices}
      createServicesCard={createServicesCard}
      createAppointmentsCard={createAppointmentsCard}
      isFetchingAppointments={isFetchingAppointments}
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
