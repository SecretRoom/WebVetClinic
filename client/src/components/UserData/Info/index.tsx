// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Input, Segment, Loader, Image } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import * as R from 'ramda'
import './style.sass'

type UserInfoProps = {
  sex: string
  name: string
  email: string
  phone: string
  surname: string
  patronymic: string

  birthday: Date | null

  isIdent: boolean
  isError: boolean
  isDisInput: boolean
  isFetching: boolean

  handleClickEdit: () => void
  handleClickSave: () => void
  handleClickReset: () => void
  handleClickCancel: () => void
  handleChangeInputs: (e: SyntheticEvent, field: string, { value }: any) => void
}

const UserInfo = ({
  sex,
  name,
  email,
  phone,
  isIdent,
  surname,
  isError,
  birthday,
  isDisInput,
  patronymic,
  isFetching,

  handleClickSave,
  handleClickEdit,
  handleClickReset,
  handleClickCancel,
  handleChangeInputs,
}: UserInfoProps): ReactElement => (
  <>
    {isFetching ? (
      <div className="patient-info__loader">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <div
        className="patient-info__content"
      >
        <Segment
          className="patient-data"
        >
          <div className="fields__image-input">
            <Image
              wrapped
              size="small"
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
            />
            <div className="fields">
              <div className={R.isEmpty(surname) ? 'field-empty' : 'field'}>
                {!R.isEmpty(surname) && <span>Фамилия</span>}
                <Input
                  transparent
                  error={R.isEmpty(surname)}
                  value={surname}
                  placeholder="Фамилия"
                  disabled={isFetching || isDisInput}
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'surname', value)}
                />
              </div>
              <div className={R.isEmpty(name) ? 'field-empty' : 'field'}>
                {!R.isEmpty(name) && <span>Имя</span>}
                <Input
                  value={name}
                  transparent
                  error={R.isEmpty(name)}
                  placeholder="Имя"
                  disabled={isFetching || isDisInput}
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'name', value)}
                />
              </div>
              <div className={R.isEmpty(patronymic) ? 'field-empty' : 'field'}>
                {!R.isEmpty(patronymic) && <span>Отчество</span>}
                <Input
                  value={patronymic}
                  transparent
                  error={R.isEmpty(patronymic)}
                  placeholder="Отчество"
                  disabled={isFetching || isDisInput}
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'patronymic', value)}
                />
              </div>
            </div>
          </div>
          <div className="fields">
            <div className={R.isNil(birthday) ? 'field-empty' : 'field'}>
              {!R.isNil(birthday) && <span>Дата рождения</span>}
              <DatePicker
                disabled={isFetching || isDisInput}
                closeOnScroll
                selected={birthday}
                maxDate={new Date()}
                customInput={(
                  <Input
                    transparent
                  />
                )}
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата рождения"
                onChange={(date: any, e: SyntheticEvent): void => handleChangeInputs(e as never, 'birthday', date)}
              />
            </div>
            <div className={R.isEmpty(sex) ? 'field-empty' : 'field'}>
              {!R.isEmpty(sex) && <span>Пол</span>}
              <Dropdown
                basic
                compact
                value={sex}
                placeholder="Пол"
                selectOnBlur={false}
                disabled={isFetching || isDisInput}
                selectOnNavigation={false}
                onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'sex', value)}
                options={[
                  { key: 'м', value: 'м', text: 'мужской' },
                  { key: 'ж', value: 'ж', text: 'женский' },
                ]}
              />
            </div>
            <div className={R.isEmpty(email) ? 'field-empty' : 'field'}>
              {!R.isEmpty(email) && <span>Email</span>}
              <Input
                transparent
                error={R.isEmpty(email)}
                value={email}
                placeholder="Email"
                disabled={isFetching || isDisInput}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'email', value)}
              />
            </div>
            <div className={R.isEmpty(phone) ? 'field-empty' : 'field'}>
              {!R.isEmpty(phone) && <span>Номер</span>}
              <Input
                transparent
                value={phone}
                error={R.isEmpty(phone)}
                placeholder="Номер"
                disabled={isFetching || isDisInput}
                onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'phone', value)}
              />
            </div>
          </div>
          <div className="fields-any">
            {isDisInput ? (
              <Button
                icon="edit"
                size="small"
                color="green"
                content="Редактировать"
                labelPosition="right"
                onClick={(): void => handleClickEdit()}
                className="fields-any__button"
              />
            ) : (
              <div
                className="fields-any__buttons-group"
              >
                <Icon
                  name="save"
                  size="big"
                  color="green"
                  link={!isError && !isIdent}
                  disabled={isError || isIdent}
                  onClick={(): void => handleClickSave()}
                />
                <Icon
                  size="big"
                  color="grey"
                  link={!isIdent}
                  disabled={isIdent}
                  name="undo alternate"
                  onClick={(): void => handleClickReset()}
                />
                <Icon
                  link
                  size="big"
                  color="red"
                  name="cancel"
                  onClick={(): void => handleClickCancel()}
                />
              </div>
            )}
          </div>
        </Segment>
      </div>
    )}
  </>
)

export default UserInfo
