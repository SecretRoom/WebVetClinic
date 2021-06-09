// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import {
  Button,
  Segment,
  Input,
  Icon,
  Dropdown,
  Modal,
} from 'semantic-ui-react'
import * as R from 'ramda'

import './style.sass'

type StaffProps = {
  pet: string
  name: string
  surname: string
  profile: string
  category: string
  fullName: string
  patronymic: string

  openModal: boolean
  isFetching: boolean
  openFullFilter: boolean

  pets: any[]
  service: any[]
  staffList: any[]
  selectedEmpl: any
  profileList: any[]
  servicesList: any[]
  categoryList: any[]

  handleUpdateList: () => void
  handleResetFilter: () => void
  handleChangeOpenModal: () => void
  handleChangeFullFilter: () => void
  createScheduleAppointment: () => ReactElement
  createStaffCard: (list: any[]) => ReactElement[]
  handleChangePet: (e: SyntheticEvent, value: string) => void
  handleChangeService: (e: SyntheticEvent, value: any[]) => void
  handleChangeInputs: (e: SyntheticEvent, field: string, { value }: any) => void
}

const Staff = ({
  pet,
  pets,
  name,
  surname,
  profile,
  service,
  category,
  fullName,
  openModal,
  staffList,
  patronymic,
  isFetching,
  profileList,
  selectedEmpl,
  servicesList,
  categoryList,
  openFullFilter,

  createStaffCard,
  handleUpdateList,
  handleChangePet,
  handleResetFilter,
  handleChangeInputs,
  handleChangeService,
  handleChangeOpenModal,
  handleChangeFullFilter,
  createScheduleAppointment,
}: StaffProps): ReactElement => (
  <div className="staff">
    <Segment.Group className="staff-filter">
      <Segment
        className="staff-filter__quick"
        onClick={(e: SyntheticEvent): void => e.preventDefault()}
      >
        <div className="find-staff">
          <h4>
            Поиск по ФИО
          </h4>
          <Input
            transparent
            disabled={isFetching || openFullFilter}
            icon={!openFullFilter && {
              disabled: isFetching,
              name: 'close',
              color: 'grey',
              link: true,
              onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'fullName', ''),
            }}
            value={fullName}
            placeholder="Поиск..."
            onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'fullName', value)}
          />
        </div>
        <Icon
          link
          color={openFullFilter ? 'black' : 'grey'}
          size="large"
          name="filter"
          title="Расширенный фильтр"
          onClick={(): void => handleChangeFullFilter()}
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
      {openFullFilter && (
        <Segment
          className="staff-filter__full"
          color="orange"
        >
          <div className="fields">
            <div className={R.isEmpty(surname) ? 'field-empty' : 'field'}>
              {!R.isEmpty(surname) && <span>Фамилия</span>}
              <Input
                transparent
                value={surname}
                placeholder="Фамилия"
                disabled={isFetching}
                icon={!R.isEmpty(surname) && {
                  name: 'close',
                  color: 'grey',
                  link: true,
                  onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'surname', ''),
                }}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'surname', value)}
              />
            </div>
            <div className={R.isEmpty(name) ? 'field-empty' : 'field'}>
              {!R.isEmpty(name) && <span>Имя</span>}
              <Input
                value={name}
                transparent
                disabled={isFetching}
                icon={!R.isEmpty(name) && {
                  name: 'close',
                  color: 'grey',
                  link: true,
                  onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'name', ''),
                }}
                placeholder="Имя"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'name', value)}
              />
            </div>
            <div className={R.isEmpty(patronymic) ? 'field-empty' : 'field'}>
              {!R.isEmpty(patronymic) && <span>Отчество</span>}
              <Input
                value={patronymic}
                transparent
                placeholder="Отчество"
                disabled={isFetching}
                icon={!R.isEmpty(patronymic) && {
                  name: 'close',
                  color: 'grey',
                  link: true,
                  onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'patronymic', ''),
                }}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'patronymic', value)}
              />
            </div>
          </div>
          <div className="fields">
            <div className={R.isEmpty(profile) ? 'field-empty' : 'field'}>
              {!R.isEmpty(profile) && <span>Профиль</span>}
              <Dropdown
                clearable
                transparent
                value={profile}
                selectOnBlur={false}
                options={profileList}
                placeholder="Профиль"
                disabled={isFetching}
                selectOnNavigation={false}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'profile', value)}
              />
            </div>
            <div className={R.isEmpty(category) ? 'field-empty' : 'field'}>
              {!R.isEmpty(category) && <span>Категория</span>}
              <Dropdown
                clearable
                transparent
                value={category}
                selectOnBlur={false}
                disabled={isFetching}
                options={categoryList}
                placeholder="Категория"
                selectOnNavigation={false}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'category', value)}
              />
            </div>
          </div>
          <div>
            <Button
              primary
              size="small"
              disabled={isFetching}
              content="Поиск сотрудников"
              onClick={(): void => handleUpdateList()}
            />
            <Button
              primary
              size="small"
              disabled={isFetching}
              content="Сброс фильтра"
              onClick={(): void => handleResetFilter()}
            />
          </div>
        </Segment>
      )}
    </Segment.Group>
    <div className="staff-cards">
      {createStaffCard(staffList)}
    </div>
    <Modal
      size="large"
      open={openModal}
      className="schedule-modal__staff"
      onClose={(e: SyntheticEvent): void => {
        e.stopPropagation()
        handleChangeOpenModal()
      }}
    >
      <Modal.Header
        content={(
          <>
            <span>Запись на прием или услугу</span>
            <Icon name="arrow right" />
            <span>{selectedEmpl.profName}</span>
            <Icon name="arrow right" />
            <span>{selectedEmpl.fioEmpl}</span>
          </>
        )}
      />
      <Modal.Content
        content={(
          <>
            <div className="drop">
              <div className="field">
                <span>Питомец</span>
                <Dropdown
                  search
                  selection
                  clearable
                  value={pet}
                  placeholder="Выберите питомца"
                  selectOnBlur={false}
                  options={R.map((item) => ({ key: item._id, value: item._id, text: item.nickname }), pets)}
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangePet(e as never, value)}
                />
              </div>
              <div className="field">
                <span>Услуги</span>
                <Dropdown
                  search
                  multiple
                  selection
                  clearable
                  value={service}
                  selectOnBlur={false}
                  options={servicesList}
                  placeholder="Выберите услуги"
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeService(e as never, value)}
                />
              </div>
            </div>
            {openModal && createScheduleAppointment()}
          </>
        )}
      />
    </Modal>
  </div>
)

export default Staff
