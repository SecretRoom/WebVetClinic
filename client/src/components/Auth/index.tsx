// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Checkbox, Input, Icon } from 'semantic-ui-react'
import * as R from 'ramda'

import './style.sass'
import { NavLink } from 'react-router-dom'

type LoginProps = {
  password: string
  userName: string | null

  hiddenPassword: boolean

  errorName: any[]
  errorPass: any[]

  onSubmit: (e: any) => void
  handleChange: (e: SyntheticEvent, data: any) => void
  handleClickEye: () => void
}

const Login = ({
  password,
  userName,
  errorName,
  errorPass,
  hiddenPassword,

  onSubmit,
  handleChange,
  handleClickEye,
}: LoginProps): ReactElement => (
  <main className="auth">
    <div className="auth-background">
      <div className="content">
        <div className="login_form" onSubmit={(e: any): any => onSubmit(e)}>
          <h2>
            Авторизация
          </h2>
          <Input
            fluid
            id="username"
            onChange={(e: SyntheticEvent, data: any): void => handleChange(e as never, data)}
            value={userName}
            placeholder="Логин"
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
            onChange={(e: any, data: any): any => handleChange(e, data)}
            placeholder="Пароль"
          />
          <Checkbox label="Запомнить" />
          <Button.Group className="btn_in">
            <Button
              content="Вход"
              className="sing-in"
              disabled={R.isEmpty(password) || R.isEmpty(userName)}
            />
            <Button.Or />
            <Button
              as={NavLink}
              to="/registry"
              className="sing-up"
              content="Регистрация"
            />
          </Button.Group>
        </div>
        <div className="logo" />
      </div>

    </div>
  </main>
)

export default Login
