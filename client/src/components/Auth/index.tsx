// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'
import * as R from 'ramda'

import './style.sass'

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
    <Form className="login_form" onSubmit={(e: any): any => onSubmit(e)}>
      <Form.Field className="label_title">
        <h1>
          АВТОРИЗАЦИЯ
        </h1>
      </Form.Field>
      <Form.Field>
        <Form.Input
          error={
            errorName
              ? null
              : { content: 'Пожалуйста, введите имя пользователя', pointing: 'below' }
          }
          fluid
          id="username"
          onChange={(e: SyntheticEvent, data: any): void => handleChange(e as never, data)}
          value={userName}
          placeholder="Имя пользователя"
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          error={
            errorPass
              ? null
              : 'Пожалуйста, введите пароль'
          }
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
      </Form.Field>
      <Form.Field className="btn_in">
        <Checkbox label="Запомнить" />
        <Button
          content="Вход"
          primary
          type="submit"
          disabled={R.isEmpty(password) || R.isEmpty(userName)}
        />
      </Form.Field>
    </Form>
  </main>
)

export default Login
