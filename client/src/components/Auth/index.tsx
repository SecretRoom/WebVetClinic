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

  handleClickEye: () => void
  handleSignIn: (e: any) => void
  handleChange: (e: SyntheticEvent, data: any) => void
}

const Login = ({
  password,
  userName,
  hiddenPassword,

  handleSignIn,
  handleChange,
  handleClickEye,
}: LoginProps): ReactElement => (
  <main className="auth">
    <div className="auth-background">
      <div className="content">
        <div className="login_form">
          <h2>
            Авторизация
          </h2>
          <Input
            fluid
            id="username"
            value={userName}
            placeholder="Логин"
            onChange={(e: SyntheticEvent, data: any): void => handleChange(e as never, data)}
          />
          <Input
            fluid
            id="password"
            value={password}
            autoComplete="on"
            placeholder="Пароль"
            type={hiddenPassword ? 'password' : 'text'}
            onChange={(e: any, data: any): any => handleChange(e, data)}
            icon={(
              <Icon
                link
                onClick={handleClickEye}
                name={hiddenPassword ? 'eye slash' : 'eye'}
              />
            )}
          />
          <Checkbox label="Запомнить" />
          <Button.Group className="btn_in">
            <Button
              content="Вход"
              className="sing-in"
              onClick={(e: any): void => handleSignIn(e)}
              disabled={R.isEmpty(password) || R.isEmpty(userName)}
            />
            <Button.Or text="|" />
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
