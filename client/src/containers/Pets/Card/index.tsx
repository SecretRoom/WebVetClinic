// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'

import { Button, Image, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import PetsCard from '../../../components/Pets/Card'
import { isFetchingPetsS, petsS } from '../selectors'
import { createPetA, selectPetA, updatePetA } from '../actions';

type PetsCardContainerProps = {
  isFetching: boolean

  petsDef: any[]

  createPet: (data: any) => void
  updatePet: (data: any) => void
  selectPet: (data: any) => void
}

const PetsCardContainer = ({
  petsDef,
  isFetching,

  createPet,
  updatePet,
  selectPet,
}: PetsCardContainerProps): ReactElement => {
  const [sex, setSex] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')

  const [birthday, setBirthday] = useState<Date | null>(null)

  const [photo, setPhoto] = useState<File>()

  const [selectedPet, setSelectedPet] = useState<any>({})
  const [pets, setPets] = useState<any[]>([])

  const [isIdent, setIsIdent] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isDisSaveButton, setIsDisSaveButton] = useState<boolean>(true)

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

  const handleChangeOpenModal = (): void => setOpenModal(prev => !prev)

  const handleClickSave = (): void => {
    if (isEdit) {
      updatePet({
        petID: selectedPet._id,
        sex,
        type,
        color,
        file: photo,
        weight,
        height,
        nickname,
        birthday,
      })
    } else {
      createPet({
        sex,
        type,
        color,
        file: photo,
        weight,
        height,
        nickname,
        birthday,
      })
    }
    handleChangeOpenModal()
  }

  const handleChangePhoto = (e: any): void => {
    if (e.target.files.length) {
      setPhoto(e.target.files[0])
      const imageSrc = async () => {
        const buffer = await e.target.files[0].arrayBuffer()
        const bytes = new Uint8Array(buffer)
        const blob = new Blob([bytes.buffer]);

        const image = document.getElementById('upload-photo') as HTMLInputElement
        const reader = new FileReader();

        reader.addEventListener('load', ({ target }) => {
          if (!R.isNil(target)) image.src = String(target.result);
        });

        reader.readAsDataURL(blob);
      }
      imageSrc()
    }
  }

  const handleClickEditCard = (pet: any): void => {
    handleChangeOpenModal()
    setSex(pet.sex)
    setIsEdit(true)
    setType(pet.type)
    setSelectedPet(pet)
    setColor(pet.color)
    setWeight(pet.weight)
    setHeight(pet.height)
    setNickname(pet.nickname)
    setBirthday(new Date(pet.birthday))
  }

  const handleCreateCard = (pet: any): ReactElement => {
    return (
      <Segment
        raised
        className="card"
        key={Math.random()}
      >
        <Image
          as={NavLink}
          onClick={(): void => selectPet(pet)}
          to={`/pets/${pet._id}`}
          id={`image__${pet._id}`}
          src={pet.photoSrc}
          alt=""
          className="pet-photo"
        />
        <div className="card-data">
          <div className="fields">
            <div className="field">
              <span>Кличка</span>
              <span>{pet.nickname}</span>
            </div>
            <div className="field">
              <span>Вид</span>
              <span>{pet.type}</span>
            </div>
            <div className="field">
              <span>Окрас</span>
              <span>{pet.color}</span>
            </div>
            <div className="field">
              <span>Пол</span>
              <span>{pet.sex === 'м' ? 'Мужской' : 'Женский'}</span>
            </div>
            <div className="field">
              <span>Дата рождения</span>
              <span>{moment(pet.birthday).format('DD.MM.YYYY').toString()}</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridColumnGap: '5px',
                width: '100%',
                height: 'max-content',
                gridTemplateColumns: 'repeat(2, 1fr)',
                alignItems: 'center',
              }}
            >
              <div
                className="field"
              >
                <span>Вес</span>
                <span>{pet.weight} кг</span>
              </div>
              <div
                className="field"
              >
                <span>Рост</span>
                <span>{pet.height} см</span>
              </div>
            </div>
          </div>
          <Button
            color="orange"
            content="Редактировать"
            className="button-edit"
            onClick={(): void => handleClickEditCard(pet)}
          />
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
      setIsEdit(false)
      setBirthday(null)
      setSelectedPet({})
      setPhoto(undefined)
    }
  }, [openModal])

  useEffect(() => {
    const propIdent = (): boolean => {
      const obj = R.whereEq({
        sex: selectedPet.sex,
        type: selectedPet.type,
        color: selectedPet.color,
        weight: selectedPet.weight,
        height: selectedPet.height,
        nickname: selectedPet.nickname,
        birthday: moment(selectedPet.birthday).format('YYYY.MM.DD'),
      })
      return obj({
        sex,
        type,
        color,
        weight,
        height,
        nickname,
        birthday: R.isNil(birthday) ? '' : moment(birthday).format('YYYY.MM.DD'),
      })
    }
    if (!isEdit) {
      if (
        R.isEmpty(sex)
        || R.isNil(photo)
        || R.isEmpty(type)
        || R.isEmpty(color)
        || R.isEmpty(weight)
        || R.isEmpty(height)
        || R.isNil(birthday)
        || R.isEmpty(nickname)
      ) {
        setIsDisSaveButton(true)
      } else setIsDisSaveButton(false)
      setIsIdent(false)
    } else {
      if (
        R.isEmpty(sex)
        || R.isEmpty(type)
        || R.isEmpty(color)
        || R.isEmpty(weight)
        || R.isEmpty(height)
        || R.isNil(birthday)
        || R.isEmpty(nickname)
      ) {
        setIsDisSaveButton(true)
      } else setIsDisSaveButton(false)
      setIsIdent(propIdent)
    }
  }, [
    sex,
    type,
    color,
    photo,
    isEdit,
    weight,
    height,
    nickname,
    birthday,
  ])

  useEffect(() => {
    if (isEdit && openModal && selectedPet) {
      const image = document.getElementById('upload-photo') as HTMLInputElement
      image.src = selectedPet.photoSrc
    }
  }, [isEdit, openModal, selectedPet])

  useEffect(() => {
    setPets(petsDef)
    const getPhoto = async () => {
      await R.forEach((pet: any) => {
        const reader = new FileReader();

        reader.addEventListener('load', ({ target }) => {
          if (!R.isNil(target)) {
            setPets(prev => R.map((item: any) => {
              if (item._id === pet._id) return ({ ...item, photoSrc: String(target.result) })
              return item
            }, prev))
          }
        })
        const imageSrc = async (item: any) => {
          const res = await fetch('/pets/photos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID: item.userID, petID: item._id }),
          })
          const buffer = await res.arrayBuffer()
          const bytes = new Uint8Array(buffer)
          const blob = new Blob([bytes.buffer]);

          reader.readAsDataURL(blob)
        }
        imageSrc(pet)
      }, petsDef)
    }
    getPhoto()
  }, [petsDef])

  return (
    <PetsCard
      sex={sex}
      pets={pets}
      type={type}
      color={color}
      photo={photo}
      isEdit={isEdit}
      weight={weight}
      height={height}
      isIdent={isIdent}
      nickname={nickname}
      birthday={birthday}
      openModal={openModal}
      isFetching={isFetching}
      isDisSaveButton={isDisSaveButton}
      handleClickSave={handleClickSave}
      handleCreateCard={handleCreateCard}
      handleChangePhoto={handleChangePhoto}
      handleChangeInputs={handleChangeInputs}
      handleChangeOpenModal={handleChangeOpenModal}
    />
  )
}

export default connect(
  (state) => ({
    petsDef: petsS(state),
    isFetching: isFetchingPetsS(state),
  }),
  {
    createPet: createPetA.request,
    updatePet: updatePetA.request,
    selectPet: selectPetA,
  },
)(PetsCardContainer)
