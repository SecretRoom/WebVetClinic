// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import DatePicker from 'react-datepicker';
import { Button, Dropdown, Icon, Input, Segment, Loader, Image, Modal, Label, Card, Header, Divider, Popup } from 'semantic-ui-react'
import * as R from 'ramda'
import './style.sass'
import moment from 'moment';

type PetProps = {
  openModal: boolean
  isFetching: boolean
  isFetchingServices: boolean
  isFetchingAppointments: boolean

  petInfo: any
  services: any[]
  appointments: any[]

  handleChangeOpenModal: () => void
  createServicesCard: (list: any []) => ReactElement
  createAppointmentsCard: (list: any []) => ReactElement
  createScheduleAppointment: () => ReactElement
}

const Pet = ({
  petInfo,
  services,
  openModal,
  isFetching,
  appointments,
  isFetchingServices,
  isFetchingAppointments,

  createServicesCard,
  handleChangeOpenModal,
  createAppointmentsCard,
  createScheduleAppointment,
}: PetProps): ReactElement => (
  <>
    {isFetching || R.isNil(petInfo.nickname) ? (
      <div className="pet__loader">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <div className="pet__content">
        <Card
          raised
          key={Math.random()}
          className="pet__content-info"
        >
          <Image
            src={petInfo.photoSrc}
            alt=""
            className="pet-photo"
          />
          <Card.Content className="fields-top">
            <div className="field">
              <span>Кличка</span>
              <span>{petInfo.nickname}</span>
            </div>
            <div className="field">
              <span>Вид</span>
              <span>{petInfo.type}</span>
            </div>
            <div className="field">
              <span>Пол</span>
              <span>{petInfo.sex === 'м' ? 'Мужской' : 'Женский'}</span>
            </div>
          </Card.Content>
          <Card.Content className="field">
            <span>Окрас</span>
            <span>{petInfo.color}</span>
          </Card.Content>
          <Card.Content className="fields-bottom">
            <div className="field">
              <span>Дата рождения</span>
              <span>{moment(petInfo.birthday).format('DD.MM.YYYY').toString()}</span>
            </div>
            <div className="field">
              <span>Вес</span>
              <span>{petInfo.weight} кг</span>
            </div>
            <div className="field">
              <span>Рост</span>
              <span>{petInfo.height} см</span>
            </div>
          </Card.Content>
        </Card>
        <Segment
          raised
          className="pet__content-data"
        >
          <div className="pet__content-data__row">
            <div className="pet__content-data__row-header">
              <Header as="h2">
                Посещения
              </Header>
            </div>
            <Segment
              placeholder
              className="cards"
              loading={isFetchingAppointments}
            >
              {R.isEmpty(appointments)
                ? (
                  <Header as="h2" className="no-data" icon color="grey">
                    <Icon name="inbox" />
                    Посещения отсутвуют
                  </Header>
                  )
                : createAppointmentsCard(appointments)
              }
            </Segment>
          </div>
          <Divider />
          <div className="pet__content-data__row">
            <div className="pet__content-data__row-header">
              <Header as="h2">
                Услуги
              </Header>
            </div>
            <Segment
              placeholder
              className="cards"
              loading={isFetchingServices}
            >
              {R.isEmpty(services)
                ? (
                  <Header as="h2" className="no-data" icon color="grey">
                    <Icon name="inbox" />
                    Услуги остутсвуют
                  </Header>
                  )
                : createServicesCard(services)
              }
            </Segment>
          </div>
        </Segment>
        <Modal
          size="tiny"
          open={openModal}
          className="schedule-modal"
          onClose={(e: SyntheticEvent): void => {
            e.stopPropagation()
            handleChangeOpenModal()
          }}
          trigger={(
            <Button
              animated
              color="orange"
              className="schedule__trigger-button"
              onClick={handleChangeOpenModal}
            >
              <Button.Content
                hidden
                color="orange"
              >
                <span>Записаться на прием или услугу</span>
              </Button.Content>
              <Button.Content
                visible
              >
                <Icon
                  name="pencil"
                  size="big"
                />
              </Button.Content>
            </Button>
          )}
        >
          <Modal.Header content="Запись на прием или услугу" />
          <Modal.Content content={(
            <>
              <Dropdown />
              <Dropdown />
              {createScheduleAppointment()}
            </>
          )}
          />
        </Modal>

      </div>
    )}
  </>
)

export default Pet
