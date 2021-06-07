/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Input, Radio, Icon, Popup } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';

import './style.sass'
import { NavLink } from 'react-router-dom'

type RegistryProps = {
  sex: string
  name: string
  phone: string
  surname: string
  password: string

  birthday: Date | null

  error: boolean
  hiddenPassword: boolean

  onSubmit: (e: any) => void
  handleClickEye: () => void
  handleChangeInputs: (e: SyntheticEvent, field: string, value: string | Date) => void
}

const Registry = ({
  sex,
  name,
  error,
  phone,
  surname,
  password,
  birthday,
  hiddenPassword,

  onSubmit,
  handleClickEye,
  handleChangeInputs,
}: RegistryProps): ReactElement => (
  <main className="registry">
    <div className="registry-background">
      <NavLink to="/login" className="link-back">
        <Icon name="arrow left" to="/login" color="grey" link size="huge" />
      </NavLink>
      <div className="content">
        <div className="registry__form">
          <h2>
            Регистрация
          </h2>
          <div className="fields">
            <div className="field">
              {surname ? <span>Фамилия</span> : <span />}
              <Input
                fluid
                value={surname}
                placeholder="Фамилия"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'surname', value)}
              />
            </div>
            <div className="field">
              {name ? <span>Имя</span> : <span />}
              <Input
                fluid
                value={name}
                placeholder="Имя"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'name', value)}
              />
            </div>
          </div>
          <div>
            <Popup
              content="Будет использоваться как логин"
              position="left center"
              size="small"
              trigger={(
                <Input
                  fluid
                  id="phone"
                  value={phone}
                  label="Телефон"
                  placeholder="Телефон"
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'phone', value)}
                />
              )}
            />
            <Input
              fluid
              type={hiddenPassword ? 'password' : 'text'}
              id="password"
              icon={(
                <Icon
                  link
                  onClick={handleClickEye}
                  name={hiddenPassword ? 'eye slash' : 'eye'}
                />
          )}
              autoComplete="on"
              value={password}
              label="Пароль"
              placeholder="Пароль"
              onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'password', value)}
            />
          </div>
          <div>
            <DatePicker
              closeOnScroll
              selected={birthday}
              maxDate={new Date()}
              customInput={(
                <Input label="Дата рождения" style={{ width: '160px' }} />
          )}
              dateFormat="dd.MM.yyyy"
              placeholderText="Дата рождения"
              onChange={(date: any, e: SyntheticEvent): void => handleChangeInputs(e as never, 'birthday', date)}
            />
            <div style={{ padding: '0 7px', paddingLeft: '20px' }}>
              <label
                style={{
              fontSize: '13px',
              fontWeight: 'bold',
            }}
              >
                Пол
              </label>
              <div className="sex">
                <Radio
                  label="Женский"
                  placeholder="Пол"
                  checked={sex === 'ж'}
                  onChange={(e: SyntheticEvent): void => handleChangeInputs(e as never, 'sex', 'ж')}
                />
                <Radio
                  label="Мужской"
                  placeholder="Пол"
                  checked={sex === 'м'}
                  onChange={(e: SyntheticEvent): void => handleChangeInputs(e as never, 'sex', 'м')}
                />
              </div>
            </div>
          </div>
          <Button
            className="btn_in"
            primary
            type="submit"
            disabled={error}
            content="Зарегистрироваться"
          />
        </div>
        <div className="logo" />
      </div>
    </div>
  </main>
)

export default Registry
