// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import Staff from '../../components/Staff'
import getStore from '../../services/IndexedDB/getStore'

type StaffContainerProps = {
}

const StaffContainer = (): ReactElement => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')
  const [profile, setProfile] = useState<string>('')
  const [category, setCategory] = useState<string>('')

  const [openFullFilter, setOpenFullFilter] = useState<boolean>(false)

  const [profileList, setProfileList] = useState<any[]>([])
  const [categoryList, setCategoryList] = useState<any[]>([])

  const handleQuickSearch = (e: SyntheticEvent, { value }: any) => {
    // if (!R.isEmpty(value)) {
    //   if (value[0].match(/\d/)) {
    //     setOms(R.replace(/\D/, '', value))
    //     setFullName('')
    //   } else if (value[0].match(/[a-zа-я]/gi)) {
    //     setOms('')
    //     setFullName(R.replace(/[^a-zа-я]/i, '', value))
    //   }
    // } else if (!R.isEmpty(oms) || !R.isEmpty(fullName)) {
    //   setOms('')
    //   setFullName('')
    // }
  }

  const handleResetFilter = (): void => {
    setName('')
    setSurname('')
    setFullName('')
    setPatronymic('')
  }

  // eslint-disable-next-line no-console
  const handleUpdateList = (): void => console.log('update');
  /* fetchPatients({
    sex,
    oms,
    name,
    email,
    snils,
    phone,
    surname,
    fullName,
    patronymic,
    omsCompany,
    birthday: R.isNil(birthday) ? '' : moment(birthday).format('DD.MM.YYYY').toString(),
  }) */

  const handleChangeFullFilter = (): void => setOpenFullFilter(prev => !prev)

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'name':
        setName(value)
        break
      case 'surname':
        setSurname(value)
        break
      case 'fullName':
        setFullName(value)
        break
      case 'patronymic':
        setPatronymic(value)
        break
      default:
        break;
    }
  }

  // useEffect(() => {
  //   const listener = (event: any) => {
  //     if (event.code === 'Enter' || event.code === 'NumpadEnter') {
  //       fetchPatients({
  //         sex,
  //         oms,
  //         name,
  //         email,
  //         snils,
  //         phone,
  //         surname,
  //         fullName,
  //         patronymic,
  //         omsCompany,
  //         birthday: R.isNil(birthday) ? '' : moment(birthday).format('DD.MM.YYYY').toString(),
  //       })
  //     }
  //   }
  //   document.addEventListener('keydown', listener)
  //   return () => {
  //     document.removeEventListener('keydown', listener)
  //   }
  // }, [
  //   sex,
  //   oms,
  //   name,
  //   email,
  //   snils,
  //   phone,
  //   surname,
  //   fullName,
  //   birthday,
  //   patronymic,
  //   omsCompany,
  // ])

  useEffect(() => {
    getStore.profile(undefined).then(
      (res) => setProfileList(R.map((item) => ({ id: item.id, key: item.id, text: item.name }), res)),
    )
    getStore.category(undefined).then(
      (res) => setCategoryList(R.map((item) => ({ id: item.id, key: item.id, text: item.name }), res)),
    )
  }, [])

  return (
    <Staff
      name={name}
      surname={surname}
      profile={profile}
      category={category}
      isFetching={false}
      patronymic={patronymic}
      profileList={profileList}
      categoryList={categoryList}
      quickSearchValue={fullName}
      openFullFilter={openFullFilter}
      handleUpdateList={handleUpdateList}
      handleQuickSearch={handleQuickSearch}
      handleResetFilter={handleResetFilter}
      handleChangeInputs={handleChangeInputs}
      handleChangeFullFilter={handleChangeFullFilter}

    />
  )
}

export default connect(
  (state) => ({}),
  {},
)(StaffContainer)
