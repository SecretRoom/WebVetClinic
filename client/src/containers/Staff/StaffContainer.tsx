// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { Image, Segment } from 'semantic-ui-react'
import Staff from '../../components/Staff'
import getStore from '../../services/IndexedDB/getStore'

type StaffContainerProps = {
}

const StaffContainer = (): ReactElement => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [profile, setProfile] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')

  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [openFullFilter, setOpenFullFilter] = useState<boolean>(false)

  const [staffList, setStaffList] = useState<any[]>([])
  const [profileList, setProfileList] = useState<any[]>([])
  const [staffListDef, setStaffListDef] = useState<any[]>([])
  const [categoryList, setCategoryList] = useState<any[]>([])

  const handleResetFilter = (): void => {
    setIsFetching(true)
    setName('')
    setSurname('')
    setPatronymic('')
    setProfile('')
    setCategory('')
    setStaffList(staffListDef)
  }

  const handleUpdateList = (): void => {
    setIsFetching(true)
    const includesSurname = (elem: string) => (!R.isEmpty(surname) ? R.includes(surname, elem) : true)
    const includesName = (elem: string) => (!R.isEmpty(name) ? R.includes(name, elem) : true)
    const includesPatronymic = (elem: string) => (!R.isEmpty(patronymic) ? R.includes(patronymic, elem) : true)
    const includesProfile = (elem: string) => (!R.isEmpty(profile) ? profile === elem : true)
    const includesCategory = (elem: string) => (!R.isEmpty(category) ? category === elem : true)
    if (openFullFilter) {
      setStaffList(
        R.filter(
          (item) => includesSurname(R.split(' ', item.fioEmpl)[0])
            && includesName(R.split(' ', item.fioEmpl)[1])
            && includesPatronymic(R.split(' ', item.fioEmpl)[2])
            && includesProfile(item.idProf)
            && includesCategory(item.idCat),
          staffListDef,
        ),
      )
    } else {
      setStaffList(
        R.filter(
          (item) => R.includes(fullName, item.fioEmpl),
          staffListDef,
        ),
      )
    }
  }

  const handleChangeFullFilter = (): void => setOpenFullFilter(prev => !prev)

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'name':
        if (!R.test(/[^a-zа-я]+/gi, value) || R.isEmpty(value)) {
          setName(value)
        }
        break
      case 'surname':
        if (!R.test(/[^a-zа-я]+/gi, value) || R.isEmpty(value)) {
          setSurname(value)
        }
        break
      case 'patronymic':
        if (!R.test(/[^a-zа-я]+/gi, value) || R.isEmpty(value)) {
          setPatronymic(value)
        }
        break
      case 'fullName':
        if (!R.isEmpty(value)) {
          if (!R.test(/[^a-zа-я\s]+/gi, value)) {
            if (R.includes(R.match(/\s/gi, value).length, [0, 1, 2])) {
              setFullName(value)
            }
          }
        } else {
          setFullName(value)
        }
        break
      case 'profile':
        setProfile(value)
        break
      case 'category':
        setCategory(value)
        break
      default:
        break;
    }
  }

  const createStaffCard = (list: any[]): ReactElement[] => R.map((item) => (
    <Segment className="staff-cards__card" key={Math.random()}>
      <Image
        className="staff-cards__card-image"
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
      />
    </Segment>
  ), list)

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleUpdateList()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [
    name,
    surname,
    profile,
    category,
    fullName,
    patronymic,
  ])

  useEffect(() => {
    if (!openFullFilter) handleResetFilter()
  }, [openFullFilter])

  useEffect(() => {
    setIsFetching(false)
  }, [staffList])

  useEffect(() => {
    setStaffList(staffListDef)
  }, [staffListDef])

  useEffect(() => {
    getStore.profile(undefined).then(
      (res) => setProfileList(R.map((item) => ({ value: item.id, key: item.id, text: item.name }), res)),
    )
    getStore.category(undefined).then(
      (res) => setCategoryList(R.map((item) => ({ value: item.id, key: item.id, text: item.name }), res)),
    )
    getStore.staff(undefined).then((res) => setStaffListDef(res))
  }, [])

  return (
    <Staff
      name={name}
      surname={surname}
      profile={profile}
      category={category}
      fullName={fullName}
      staffList={staffList}
      isFetching={isFetching}
      patronymic={patronymic}
      profileList={profileList}
      categoryList={categoryList}
      openFullFilter={openFullFilter}
      createStaffCard={createStaffCard}
      handleUpdateList={handleUpdateList}
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
