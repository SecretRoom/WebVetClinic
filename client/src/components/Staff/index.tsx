// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import {
  Button,
  Segment,
  Form,
  Input,
  Icon,
  Popup,
  Dropdown,
} from 'semantic-ui-react'
import * as R from 'ramda'

import './style.sass'

type StaffProps = {
  name: string
  surname: string
  profile: string
  category: string
  patronymic: string
  quickSearchValue: string

  isFetching: boolean
  openFullFilter: boolean

  profileList: any[]
  categoryList: any[]

  handleUpdateList: () => void
  handleResetFilter: () => void
  handleChangeFullFilter: () => void
  handleQuickSearch: (e: SyntheticEvent, data: any) => void
  handleChangeInputs: (e: SyntheticEvent, field: string, { value }: any) => void

}

const Staff = ({
  name,
  surname,
  profile,
  category,
  patronymic,
  isFetching,
  profileList,
  categoryList,
  openFullFilter,
  quickSearchValue,

  handleUpdateList,
  handleQuickSearch,
  handleResetFilter,
  handleChangeInputs,
  handleChangeFullFilter,
}:StaffProps): ReactElement => (
  <div className="staff">
    <div
      className="staff-filter"
    >
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
            icon={{
            name: 'close',
            color: 'grey',
            link: true,
            onClick: (e: SyntheticEvent) => handleQuickSearch(e as never, { value: '' }),
          }}
            value={quickSearchValue}
            onChange={(e: SyntheticEvent, data: any): void => handleQuickSearch(e as never, data)}
            placeholder="Поиск..."
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
          color="green"
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
                transparent
                value={profile}
                options={profileList}
                placeholder="Профиль"
                disabled={isFetching}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'profile', value)}
              />
            </div>
            <div className={R.isEmpty(category) ? 'field-empty' : 'field'}>
              {!R.isEmpty(category) && <span>Категория</span>}
              <Dropdown
                value={category}
                transparent
                options={categoryList}
                disabled={isFetching}
                placeholder="Категория"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'category', value)}
              />
            </div>
          </div>
          <div>
            <Button
              primary
              size="small"
              disabled={isFetching}
              content="Поиск пациентов"
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
    </div>
  </div>
)

export default Staff
