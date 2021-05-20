// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import PatientsFilter from '../../../components/Patients/Filter'
import { fetchPatientsA } from '../actions'
import { isFetchingPatientsListS } from '../selectors'
import getStore from '../../../services/IndexedDB/getStore'

type PatientsFilterContainerProps = {
  isFetching: boolean

  fetchPatients: (data: any) => void

  [key: string]: any
}

const PatientsFilterContainer = ({
  isFetching,

  fetchPatients,
}: PatientsFilterContainerProps): ReactElement => {
  const [sex, setSex] = useState<string>('')
  const [oms, setOms] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [snils, setSnils] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')
  const [omsCompany, setOmsCompany] = useState<string>('')

  const [omsCompanyList, setOmsCompanyList] = useState<any[]>([])

  const [birthday, setBirthday] = useState<Date | null>(null)

  const [openFullFilter, setOpenFullFilter] = useState<boolean>(false)

  const handleQuickSearch = (e: SyntheticEvent, { value }: any) => {
    if (!R.isEmpty(value)) {
      if (value[0].match(/\d/)) {
        setOms(R.replace(/\D/, '', value))
        setFullName('')
      } else if (value[0].match(/[a-zа-я]/gi)) {
        setOms('')
        setFullName(R.replace(/[^a-zа-я]/i, '', value))
      }
    } else if (!R.isEmpty(oms) || !R.isEmpty(fullName)) {
      setOms('')
      setFullName('')
      fetchPatients(null)
    }
  }

  const handleResetFilter = (): void => {
    setOms('')
    setSex('')
    setName('')
    setEmail('')
    setSnils('')
    setPhone('')
    setSurname('')
    setFullName('')
    setPatronymic('')
    setOmsCompany('')
    setBirthday(null)
    fetchPatients(null)
  }

  const handleUpdateList = (): void => fetchPatients({
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
  })

  const handleChangeFullFilter = (): void => setOpenFullFilter(prev => !prev)

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'sex':
        setSex(value)
        break
      case 'oms':
        setOms(prev => (R.test(/\D/, value) ? prev : R.slice(0, 16, value)))
        break
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break
      case 'snils':
        setSnils(prev => (R.test(/\D/, value) ? prev : R.slice(0, 11, value)))
        break
      case 'phone':
        setPhone(prev => (R.test(/\D/, value) ? prev : R.slice(0, 11, value)))
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
      case 'omsCompany':
        setOmsCompany(value)
        break
      case 'birthday':
        setBirthday(value)
        break
      default:
        break;
    }
  }

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        fetchPatients({
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
        })
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [
    sex,
    oms,
    name,
    email,
    snils,
    phone,
    surname,
    fullName,
    birthday,
    patronymic,
    omsCompany,
  ])

  useEffect(() => {
    getStore.omsCopanies(undefined).then((res) => {
      setOmsCompanyList(R.map(
        (item: any): any => ({
          key: item.id,
          text: item.name,
          value: item.id,
        }),
        res,
      ))
    })
  }, [])

  return (
    <PatientsFilter
      oms={oms}
      sex={sex}
      name={name}
      email={email}
      snils={snils}
      phone={phone}
      surname={surname}
      birthday={birthday}
      patronymic={patronymic}
      omsCompany={omsCompany}
      isFetching={isFetching}
      omsCompanyList={omsCompanyList}
      openFullFilter={openFullFilter}
      quickSearchValue={oms || fullName}
      handleUpdateList={handleUpdateList}
      handleQuickSearch={handleQuickSearch}
      handleResetFilter={handleResetFilter}
      handleChangeInputs={handleChangeInputs}
      handleChangeFullFilter={handleChangeFullFilter}
    />
  )
}

export default connect(
  (state): RootStateInterface => ({
    isFetching: isFetchingPatientsListS(state),
  }),
  {
    fetchPatients: fetchPatientsA.request,
  },
)(PatientsFilterContainer)
