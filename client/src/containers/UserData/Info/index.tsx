// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import UserInfo from '../../../components/UserData/Info'

import {
  surnameS,
  nameS,
  patronymicS,
  birthdayS,
  sexS,
  phoneS,
  emailS,
  isFetchingS,
} from '../selectors'
import { updateUserDataA } from '../actions'

type UserInfoContainerProps = {
  sexDef: string
  nameDef: string
  phoneDef: string
  emailDef: string
  surnameDef: string
  birthdayDef: string
  patronymicDef: string

  isFetching: boolean

  updateUserData: (data: any) => void
}

const UserInfoContainer = ({
  sexDef,
  nameDef,
  phoneDef,
  emailDef,
  surnameDef,
  isFetching,
  birthdayDef,
  patronymicDef,

  updateUserData,
}: UserInfoContainerProps): ReactElement => {
  const [sex, setSex] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')

  const [birthday, setBirthday] = useState<Date | null>(null)

  const [isError, setIsError] = useState<boolean>(false)
  const [isIdent, setIsIdent] = useState<boolean>(false)
  const [isDisInput, setIsDisInput] = useState<boolean>(true)

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'sex':
        setSex(value)
        break
      case 'name':
        setName(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'email':
        setEmail(value)
        break
      case 'phone':
        setPhone(prev => (R.test(/\D/, value) ? prev : R.slice(0, 11, value)))
        break
      case 'surname':
        setSurname(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'patronymic':
        setPatronymic(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'birthday':
        setBirthday(value)
        break
      default:
        break;
    }
  }

  const handleClickEdit = (): void => setIsDisInput(prev => !prev)

  const handleClickSave = (): void => {
    updateUserData({
      sex,
      name,
      phone,
      email,
      surname,
      patronymic,
      birthday: moment(birthday).format('YYYY.MM.DD'),
    })
    setIsDisInput(prev => !prev)
  }

  const handleClickReset = (): void => {
    // setOms(patientInfo.oms)
    // setSex(patientInfo.sex)
    // setName(patientInfo.name)
    // setPhone(patientInfo.phone)
    // setEmail(patientInfo.email)
    // setSnils(patientInfo.snils)
    // setSurname(patientInfo.surname)
    // setOmsCompany(patientInfo.omsCompany)
    // setPatronymic(patientInfo.patronymic)
    // setBirthday(new Date(patientInfo.birthday) || new Date())
  }

  const handleClickCancel = (): void => {
    handleClickReset()
    setIsDisInput(prev => !prev)
  }

  useEffect(() => {
    const propIdent = (): boolean => {
      const obj = R.whereEq({
        sex: sexDef,
        name: nameDef,
        phone: phoneDef,
        email: emailDef,
        surname: surnameDef,
        patronymic: patronymicDef,
        birthday: R.isNil(birthdayDef) ? '' : moment(birthdayDef).format('YYYY.MM.DD'),
      })
      return obj({
        sex,
        name,
        phone,
        email,
        surname,
        patronymic,
        birthday: R.isNil(birthday) ? '' : moment(birthday).format('YYYY.MM.DD'),
      })
    }
    if (
      R.isEmpty(name)
      || R.isEmpty(phone)
      || R.isEmpty(patronymic)
      || phone.length < 11
      || (email ? R.isNil(email.match(/\w+@[a-z]+\.[a-z]+/i)) : false)
    ) {
      setIsError(true)
    } else setIsError(false)
    setIsIdent(propIdent())
  }, [
    sex,
    name,
    phone,
    email,
    surname,
    patronymic,
    birthday,
  ])

  useEffect(() => {
    setSex(sexDef || '')
    setName(nameDef || '')
    setPhone(phoneDef || '')
    setEmail(emailDef || '')
    setSurname(surnameDef || '')
    setPatronymic(patronymicDef || '')
    setBirthday(new Date(birthdayDef) || null)
  }, [])

  return (
    <UserInfo
      sex={sex}
      name={name}
      email={email}
      phone={phone}
      isIdent={isIdent}
      surname={surname}
      isError={isError}
      birthday={birthday}
      isDisInput={isDisInput}
      patronymic={patronymic}
      isFetching={isFetching}
      handleClickSave={handleClickSave}
      handleClickEdit={handleClickEdit}
      handleClickReset={handleClickReset}
      handleClickCancel={handleClickCancel}
      handleChangeInputs={handleChangeInputs}
    />
  )
}

export default connect(
  (state) => ({
    sexDef: sexS(state),
    nameDef: nameS(state),
    phoneDef: phoneS(state),
    emailDef: emailS(state),
    surnameDef: surnameS(state),
    birthdayDef: birthdayS(state),
    isFetching: isFetchingS(state),
    patronymicDef: patronymicS(state),
  }),
  {
    updateUserData: updateUserDataA.request,
  },
)(UserInfoContainer)
