// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { registryA } from './actions'
import Registry from '../../components/Registry'

type RegistryContainerProps = {
  registry: (data: any) => void
}

const RegistryContainer = ({
  registry,
}: RegistryContainerProps): ReactElement => {
  const [sex, setSex] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<any>([])

  const [birthday, setBirthday] = useState<Date | null>(null)

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true)

  const handleSignUp = (e: any): void => {
    e.preventDefault()
    sessionStorage.setItem('login', phone || '')
    registry({
      login: phone,
      sex,
      name,
      phone,
      surname,
      password,
      birthday,
    })
  }

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'sex':
        setSex(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'name':
        setName(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'phone':
        setPhone(prev => (R.test(/\D/, value) ? prev : R.slice(0, 11, value)))
        break
      case 'surname':
        setSurname(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'birthday':
        setBirthday(value)
        break
      default:
        break;
    }
  }

  const handleClickEye = (): void => {
    setHiddenPassword((prevHiddenPassword) => !prevHiddenPassword)
    const input = document.getElementById('password')
    // eslint-disable-next-line no-unused-expressions
    input?.focus()
  }

  useEffect(() => {
    if (
      R.isNil(birthday)
      || R.isEmpty(sex)
      || R.isEmpty(name)
      || R.isEmpty(phone)
      || R.isEmpty(surname)
      || R.isEmpty(password)
    ) { setError(true) } else setError(false)
  }, [
    sex,
    name,
    phone,
    surname,
    password,
    birthday,
  ])

  return (
    <Registry
      sex={sex}
      name={name}
      phone={phone}
      surname={surname}
      password={password}
      error={error}
      birthday={birthday}
      hiddenPassword={hiddenPassword}
      handleSignUp={handleSignUp}
      handleChangeInputs={handleChangeInputs}
      handleClickEye={handleClickEye}
    />
  )
}

export default connect(
  () => ({}),
  {
    registry: registryA.request,
  },
)(RegistryContainer)
