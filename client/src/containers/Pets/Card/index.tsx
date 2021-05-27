// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import DatePicker from 'react-datepicker';

import { Button, Dropdown, Image, Input, Segment } from 'semantic-ui-react'
import PetsCard from '../../../components/Pets/Card'
import { isFetchingPetsS, petsS } from '../selectors'
import PetsAPI from '../../../services/API/Pets'

type PetsCardContainerProps = {
  isFetching: boolean

  pets: any[]
}

const PetsCardContainer = ({
  pets,
  isFetching,
}:PetsCardContainerProps): ReactElement => {
  const [sex, setSex] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  const [birthday, setBirthday] = useState<Date | null>(null)

  const [photo, setPhoto] = useState<File | undefined>()

  const [isError, setIsError] = useState<boolean>(false)
  const [isIdent, setIsIdent] = useState<boolean>(false)
  const [isDisInput, setIsDisInput] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(true)

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'sex':
        setSex(value)
        break
      case 'nickname':
        setNickname(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'type':
        setType(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'weight':
        setWeight(prev => (R.test(/\D/, value) ? prev : value))
        break
      case 'height':
        setHeight(prev => (R.test(/\D/, value) ? prev : value))
        break
      case 'color':
        setColor(value)
        break
      case 'birthday':
        setBirthday(value)
        break
      default:
        break;
    }
  }

  const handleChangeOpenModal = ():void => setOpenModal(prev => !prev)

  const handleClickEdit = (): void => setIsDisInput(prev => !prev)

  const handleClickSave = (): void => {
    // updateUserData({
    //   sex,
    //   name,
    //   phone,
    //   email,
    //   surname,
    //   patronymic,
    //   birthday: moment(birthday).format('YYYY.MM.DD'),
    // })
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

  const handleCreateCard = (pet: any):ReactElement => {
    const imageSrc = async () => {
      const res = await fetch('/pets/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: pet.userID, petID: pet._id }),
      })
      const buffer = await res.arrayBuffer()
      const bytes = new Uint8Array(buffer)
      const blob = new Blob([bytes.buffer]);

      const image = document.getElementById(`image__${pet._id}`) as HTMLInputElement
      const reader = new FileReader();

      reader.addEventListener('load', ({ target }) => {
        if (!R.isNil(target)) image.src = String(target.result);
      });

      reader.readAsDataURL(blob);
    }
    imageSrc()
    return (
      <Segment className="card">
        <Image id={`image__${pet._id}`} src="" alt="" className="pet-photo" />
        <div className="fields">
          <div
            style={{
              display: 'grid',
              gridGap: '10px',
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
          >
            <div className={R.isEmpty(pet.nickname) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.nickname) && <span>Кличка</span>}
              <Input
                transparent
                value={pet.nickname}
                placeholder="Кличка"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'nickname', value)}
              />
            </div>
            <div className={R.isEmpty(pet.type) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.type) && <span>Вид</span>}
              <Input
                transparent
                value={pet.type}
                placeholder="Вид"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'type', value)}
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridGap: '10px',
              gridTemplateColumns: 'repeat(2, max-content)',
            }}
          >
            <div className={R.isEmpty(pet.color) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.color) && <span>Окрас</span>}
              <Input
                style={{ width: '191px' }}
                transparent
                value={pet.color}
                placeholder="Окрас"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'color', value)}
              />
            </div>
            <div className={R.isEmpty(pet.sex) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.sex) && <span>Пол</span>}
              <Dropdown
                basic
                compact
                value={pet.sex}
                placeholder="Пол"
                selectOnBlur={false}
                selectOnNavigation={false}
                onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'sex', value)}
                options={[
                  { key: 'м', value: 'м', text: 'мужской' },
                  { key: 'ж', value: 'ж', text: 'женский' },
                ]}
              />
            </div>
          </div>
          <div
            style={{
              display: 'grid',
              gridGap: '10px',
              gridTemplateColumns: 'repeat(3, max-content)',
            }}
          >
            <div className={R.isEmpty(pet.birthday) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.birthday) && <span>Дата рождения</span>}
              <DatePicker
                closeOnScroll
                selected={new Date(pet.birthday)}
                maxDate={new Date()}
                customInput={(
                  <Input
                    style={{ width: '119px' }}
                    transparent
                  />
                )}
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата рождения"
                onChange={(date: any, e: SyntheticEvent): void => handleChangeInputs(e as never, 'birthday', date)}
              />
            </div>
            <div className={R.isEmpty(pet.weight) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.weight) && <span>Вес</span>}
              <Input
                transparent
                style={{ width: '70px' }}
                value={pet.weight}
                placeholder="Вес"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'weight', value)}
              />
            </div>
            <div className={R.isEmpty(pet.height) ? 'field-empty' : 'field'}>
              {!R.isEmpty(pet.height) && <span>Рост</span>}
              <Input
                transparent
                style={{ width: '70px' }}
                value={pet.height}
                placeholder="Рост"
                onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'height', value)}
              />
            </div>
          </div>
        </div>
      </Segment>
    )
  }

  useEffect(() => {
    if (!openModal) {
      setSex('')
      setType('')
      setColor('')
      setWeight('')
      setHeight('')
      setNickname('')
      setBirthday(null)
      setPhoto(undefined)
    }
  }, [openModal])

  useEffect(() => {
    // const propIdent = (): boolean => {
    //   const obj = R.whereEq({
    //     sex: sexDef,
    //     name: nameDef,
    //     phone: phoneDef,
    //     email: emailDef,
    //     surname: surnameDef,
    //     patronymic: patronymicDef,
    //     birthday: R.isNil(birthdayDef) ? '' : moment(birthdayDef).format('YYYY.MM.DD'),
    //   })
    //   return obj({
    //     sex,
    //     name,
    //     phone,
    //     email,
    //     surname,
    //     patronymic,
    //     birthday: R.isNil(birthday) ? '' : moment(birthday).format('YYYY.MM.DD'),
    //   })
    // }
    // if (
    //   R.isEmpty(name)
    //   || R.isEmpty(phone)
    //   || R.isEmpty(patronymic)
    //   || phone.length < 11
    //   || (email ? R.isNil(email.match(/\w+@[a-z]+\.[a-z]+/i)) : false)
    // ) {
    //   setIsError(true)
    // } else setIsError(false)
    // setIsIdent(propIdent())
  }, [
    // sex,
    // name,
    // phone,
    // email,
    // surname,
    // patronymic,
    // birthday,
  ])

  return (
    <PetsCard
      sex={sex}
      pets={pets}
      type={type}
      color={color}
      photo={photo}
      weight={weight}
      height={height}
      nickname={nickname}
      birthday={birthday}
      openModal={openModal}
      isFetching={isFetching}
      handleCreateCard={handleCreateCard}
      handleChangeInputs={handleChangeInputs}
      handleChangeOpenModal={handleChangeOpenModal}
    />
  )
}

export default connect(
  (state) => ({
    pets: petsS(state),
    isFetching: isFetchingPetsS(state),
  }),
  {
  },
)(PetsCardContainer)
