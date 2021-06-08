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

  handleClickEye: () => void
  handleSignUp: (e: any) => void
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

  handleSignUp,
  handleClickEye,
  handleChangeInputs,
}: RegistryProps): ReactElement => (
  <main className="registry">
    <div className="registry-background">
      <div className="content">
        <div className="registry__form">
          <h2>
            <NavLink to="/login" className="link-back">
              <Popup
                size="small"
                position="left center"
                content="Вернуться на форму входа"
                trigger={(
                  <Icon name="arrow left" to="/login" color="grey" link />
                )}
              />
            </NavLink>
            Регистрация
          </h2>
          <Input
            fluid
            value={surname}
            placeholder="Фамилия"
            autoComplete="new-password"
            labelPosition="left corner"
            label={{ icon: 'asterisk' }}
            onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'surname', value)}
          />
          <Input
            fluid
            value={name}
            placeholder="Имя"
            autoComplete="new-password"
            labelPosition="left corner"
            label={{ icon: 'asterisk' }}
            onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'name', value)}
          />
          <Popup
            size="small"
            position="left center"
            content="Будет использоваться как логин"
            trigger={(
              <Input
                fluid
                id="phone"
                value={phone}
                placeholder="Телефон"
                autoComplete="new-password"
                labelPosition="left corner"
                label={{ icon: 'asterisk' }}
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'phone', value)}
              />
            )}
          />
          <Input
            fluid
            id="password"
            value={password}
            placeholder="Пароль"
            autoComplete="new-password"
            labelPosition="left corner"
            label={{ icon: 'asterisk' }}
            type={hiddenPassword ? 'password' : 'text'}
            onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'password', value)}
            icon={(
              <Icon
                link
                onClick={handleClickEye}
                name={hiddenPassword ? 'eye slash' : 'eye'}
              />
            )}
          />
          <div className="fields">
            <div className="field">
              <span>Дата рождения*</span>
              <DatePicker
                closeOnScroll
                selected={birthday}
                maxDate={new Date()}
                customInput={(
                  <Input
                    fluid
                    autoComplete="new-password"
                  />
                )}
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата рождения"
                onChange={(date: any, e: SyntheticEvent): void => handleChangeInputs(e as never, 'birthday', date)}
              />
            </div>
            <div className="field">
              <span>Пол*</span>
              <div className="sex">
                <Radio
                  label="Женский"
                  checked={sex === 'ж'}
                  onChange={(e: SyntheticEvent): void => handleChangeInputs(e as never, 'sex', 'ж')}
                />
                <Radio
                  label="Мужской"
                  checked={sex === 'м'}
                  onChange={(e: SyntheticEvent): void => handleChangeInputs(e as never, 'sex', 'м')}
                />
              </div>
            </div>
          </div>
          <Button
            fluid
            primary
            type="submit"
            disabled={error}
            className="btn_in"
            content="Зарегистрироваться"
            onClick={(e: any): void => handleSignUp(e)}
          />
        </div>
        <div className="logo" />
      </div>
    </div>
  </main>
)

export default Registry
