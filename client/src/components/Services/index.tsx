// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import {
  Segment,
  Dropdown,
  Table,
  Header,
  Divider,
} from 'semantic-ui-react'
import * as R from 'ramda'

import './style.sass'

type ServicesProps = {
  pet: string
  sortColumn: string
  selectedEmpl: string
  sortDirection: 'ascending' | 'descending' | undefined

  pets: any[]
  staffList: any[]
  servicesList: any[]
  selectedServices: string[]

  handleSortColumn: (field: string) => void
  createScheduleAppointment: () => ReactElement
  createServicesRow: (list: any[]) => ReactElement[]
  handleChangePet: (e: SyntheticEvent, value: string) => void
  handleChangeEmpl: (e: SyntheticEvent, value: string) => void
}

const Services = ({
  pet,
  pets,
  staffList,
  sortColumn,
  selectedEmpl,
  servicesList,
  sortDirection,
  selectedServices,

  handleChangePet,
  handleChangeEmpl,
  handleSortColumn,
  createServicesRow,
  createScheduleAppointment,
}: ServicesProps): ReactElement => (
  <div className="services">
    <Table
      celled
      // basic
      sortable
      selectable
      className="services-table"
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            width={5}
            onClick={(): void => handleSortColumn('name')}
            sorted={sortColumn === 'name' ? sortDirection : undefined}
          >
            Наименование
          </Table.HeaderCell>
          <Table.HeaderCell
            width={3}
            onClick={(): void => handleSortColumn('price')}
            sorted={sortColumn === 'price' ? sortDirection : undefined}
          >
            Стоимость,₽
          </Table.HeaderCell>
          <Table.HeaderCell>Краткая информация об услуге</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{createServicesRow(servicesList)}</Table.Body>
    </Table>
    <Segment
      className="add-service"
      disabled={R.isEmpty(selectedServices)}
    >
      <Header
        size="large"
        content="Запись на услуги"
      />
      <Divider />
      <div className="drop">
        <div className="field">
          <span>Питомец</span>
          <Dropdown
            search
            selection
            clearable
            value={pet}
            selectOnBlur={false}
            selectOnNavigation={false}
            placeholder="Выберите питомца"
            disabled={R.isEmpty(selectedServices)}
            options={R.map((item) => ({ key: item._id, value: item._id, text: item.nickname }), pets)}
            onChange={(e: SyntheticEvent, { value }: any): void => handleChangePet(e as never, value)}
          />
        </div>
        <div className="field">
          <span>Врач</span>
          <Dropdown
            search
            selection
            clearable
            options={staffList}
            value={selectedEmpl}
            selectOnBlur={false}
            selectOnNavigation={false}
            placeholder="Выберите врача"
            disabled={R.isEmpty(selectedServices)}
            onChange={(e: SyntheticEvent, { value }: any): void => handleChangeEmpl(e as never, value)}
          />
        </div>
      </div>
      {createScheduleAppointment()}
    </Segment>

  </div>
)

export default Services
