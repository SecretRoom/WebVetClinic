// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Input, Segment, Loader, Image } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import * as R from 'ramda'
import './style.sass'

type PatientInfoProps = {
  sex: string
  oms: string
  name: string
  email: string
  snils: string
  phone: string
  surname: string
  patronymic: string
  omsCompany: string

  birthday: Date | null

  isIdent: boolean
  isError: boolean
  isDisInput: boolean
  isFetching: boolean

  tickets: any[]
  analyzes: any[]
  omsCompanyList: any[]

  handleClickEdit: () => void
  handleClickSave: () => void
  handleClickReset: () => void
  handleClickCancel: () => void
  createCardGroupTickets: (list: any[]) => ReactElement
  createCardGroupAnalyzes: (list: any[]) => ReactElement
  handleChangeInputs: (e: SyntheticEvent, field: string, { value }: any) => void
}

const PatientInfo = ({
  oms,
  sex,
  name,
  email,
  snils,
  phone,
  isIdent,
  surname,
  isError,
  tickets,
  birthday,
  analyzes,
  isDisInput,
  patronymic,
  omsCompany,
  isFetching,
  omsCompanyList,

  handleClickSave,
  handleClickEdit,
  handleClickReset,
  handleClickCancel,
  handleChangeInputs,
  createCardGroupTickets,
  createCardGroupAnalyzes,
}: PatientInfoProps): ReactElement => (
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
            <div className={R.isEmpty(snils) ? 'field-empty' : 'field'}>
              {!R.isEmpty(snils) && <span>СНИЛС</span>}
              <Input
                transparent
                value={snils}
                error={R.isEmpty(snils)}
                placeholder="СНИЛС"
                disabled={isFetching || isDisInput}
                onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'snils', value)}
              />
            </div>
            <div className={R.isEmpty(oms) ? 'field-empty' : 'field'}>
              {!R.isEmpty(oms) && <span>ОМС</span>}
              <Input
                transparent
                value={oms}
                error={R.isEmpty(oms)}
                placeholder="ОМС"
                disabled={isFetching || isDisInput}
                onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'oms', value)}
              />
            </div>
            <div className={R.isEmpty(omsCompany) ? 'field-empty' : 'field'}>
              {!R.isEmpty(omsCompany) && <span>Страховая компания</span>}
              <Dropdown
                basic
                compact
                value={omsCompany}
                selectOnBlur={false}
                disabled={isFetching || isDisInput}
                options={omsCompanyList}
                selectOnNavigation={false}
                placeholder="Страховая компания"
                onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'omsCompany', value)}
              />
            </div>
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
        <div className="patient-moreData">
          {createCardGroupTickets(tickets)}
          {createCardGroupAnalyzes(analyzes)}
        </div>
      </div>
    )}
  </>
)

export default PatientInfo
