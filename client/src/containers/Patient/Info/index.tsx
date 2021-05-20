// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import moment from 'moment'
import { Button, Segment } from 'semantic-ui-react'
import PatientInfo from '../../../components/Patient/Info'
import getStore from '../../../services/IndexedDB/getStore'
import { idPatS, isFetchingPatientS, patientInfoS, scheduleAnalyzesS } from '../selectors'
import { removeAnalysisA, updatePatientA } from '../actions'
import { examListS } from '../Examinations/selectors'
import { fetchExamListA } from '../Examinations/actions'

type PatientInfoContainerProps = {
  idPat: string

  isFetching: boolean

  examList: any[]
  patientInfo: any
  scheduleAnalyzes: any[]

  fetchExamList: () => void
  removeAnalysis: (id: string) => void
  updatePatient: (newData: any) => void
}

const PatientInfoContainer = ({
  idPat,
  examList,
  isFetching,
  patientInfo,
  scheduleAnalyzes,

  updatePatient,
  fetchExamList,
  removeAnalysis,
}: PatientInfoContainerProps): ReactElement => {
  const [oms, setOms] = useState<string>('')
  const [sex, setSex] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [snils, setSnils] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [omsCompany, setOmsCompany] = useState<string>('')
  const [patronymic, setPatronymic] = useState<string>('')

  const [birthday, setBirthday] = useState<Date | null>(null)

  const [isError, setIsError] = useState<boolean>(false)
  const [isIdent, setIsIdent] = useState<boolean>(false)
  const [isDisInput, setIsDisInput] = useState<boolean>(true)

  const [staff, setStaff] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [analyzes, setAnalyzes] = useState<any[]>([])
  const [omsCompanyList, setOmsCompanyList] = useState<any[]>([])

  const handleChangeInputs = (e: SyntheticEvent, field: string, value: any): void => {
    switch (field) {
      case 'sex':
        setSex(value)
        break
      case 'oms':
        setOms(prev => (R.test(/\D/, value) ? prev : R.slice(0, 16, value)))
        break
      case 'name':
        setName(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
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
        setSurname(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
        break
      case 'patronymic':
        setPatronymic(prev => (R.test(/[^a-zа-я]+/gi, value) ? prev : value))
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

  const handleClickEdit = (): void => setIsDisInput(prev => !prev)

  const handleClickSave = (): void => {
    updatePatient({
      oms,
      sex,
      name,
      phone,
      email,
      snils,
      surname,
      omsCompany,
      patronymic,
      birthday: moment(birthday).format('YYYY.MM.DD'),
    })
    setIsDisInput(prev => !prev)
  }

  const handleClickReset = (): void => {
    setOms(patientInfo.oms)
    setSex(patientInfo.sex)
    setName(patientInfo.name)
    setPhone(patientInfo.phone)
    setEmail(patientInfo.email)
    setSnils(patientInfo.snils)
    setSurname(patientInfo.surname)
    setOmsCompany(patientInfo.omsCompany)
    setPatronymic(patientInfo.patronymic)
    setBirthday(new Date(patientInfo.birthday) || new Date())
  }

  const handleClickCancel = (): void => {
    handleClickReset()
    setIsDisInput(prev => !prev)
  }

  const createCardGroupTickets = (list: any[]): ReactElement => {
    const findEmpl = (id: string) => {
      let empl: any
      let newFio: any
      if (!R.isEmpty(staff) && !R.isNil(staff)) {
        empl = JSON.parse(JSON.stringify(R.find(R.propEq('idEmpl', id))(staff) || {}))
        if (!R.isNil(empl) && !R.isEmpty(empl)) {
          newFio = empl.fioEmpl.match(/[a-zа-я]+/gi)
          switch (newFio?.length) {
            case 1:
              newFio = newFio[0]
              break
            case 2:
              newFio = `${newFio[0]} ${newFio[1][0]}.`
              break
            case 3:
              newFio = `${newFio[0]} ${newFio[1][0]}.${newFio[2][0]}.`
              break
            default:
              break;
          }
        }
      }
      return {
        newFio,
        dataEmpl: empl,
      }
    }

    const createCard = (item: any): ReactElement => (
      <div className="card-group__card" key={Math.random()}>
        <div className="field">
          <span>Дата направления</span>
          <span>{moment(item.dateCreate).format('DD.MM.YYYY HH:mm')}</span>
        </div>
        <div className="field">
          <span>Направивший врач</span>
          <span>{findEmpl(item.idEmplRef).newFio}</span>
        </div>
        <div className="field">
          <span>Направление в отделение</span>
          <span>{findEmpl(item.idEmpl).dataEmpl?.deptName}</span>
        </div>
        <div className="field">
          <span>Сотрудник</span>
          <span>{`${findEmpl(item.idEmpl).dataEmpl?.profName} / ${findEmpl(item.idEmpl).newFio}`}</span>
        </div>
      </div>
    )

    return (
      <Segment className="tickets">
        <h4>Направления</h4>
        <div className="card-group">
          {R.map(createCard, list)}
        </div>
      </Segment>
    )
  }

  const createCardGroupAnalyzes = (list: any[]): ReactElement => {
    const createCard = (item: any): ReactElement => (
      <div className={moment(item.date).isAfter(new Date()) ? 'card-group__card-act' : 'card-group__card'} key={Math.random()}>
        <div className="field">
          <span>Тип анализа</span>
          <span>{item.nameAnalysis}</span>
        </div>
        <div className="field">
          <span>Дата анализа</span>
          <span>{moment(item.date).format('DD.MM.YYYY HH:mm')}</span>
        </div>
        <div className="field">
          <span>Направивший врач</span>
          <span>{item.fioEmpl}</span>
        </div>
        <div className="field">
          <span>Сумма к оплате</span>
          <span>{item.sum}</span>
          {moment(item.date).isAfter(new Date()) && (
            <Button
              basic
              color="red"
              content="Отменить"
              onClick={(): void => removeAnalysis(item._id)}
            />
          )}
        </div>
      </div>
    )

    return (
      <Segment className="analyzes">
        <h4>Анализы</h4>
        <div className="card-group">
          {R.map(createCard, list)}
        </div>
      </Segment>
    )
  }

  useEffect(() => {
    if (!R.isEmpty(patientInfo) && !R.isNil(patientInfo)) {
      setOms(patientInfo.oms)
      setSex(patientInfo.sex)
      setName(patientInfo.name)
      setPhone(patientInfo.phone)
      setEmail(patientInfo.email)
      setSnils(patientInfo.snils)
      setSurname(patientInfo.surname)
      setOmsCompany(patientInfo.omsCompany)
      setPatronymic(patientInfo.patronymic)
      if (!R.isEmpty(patientInfo.birthday)) setBirthday(new Date(patientInfo.birthday))
    }
  }, [patientInfo])

  useEffect(() => {
    const propIdent = (): boolean => {
      const obj = R.whereEq(patientInfo)
      return obj({
        oms,
        sex,
        name,
        phone,
        idPat,
        email,
        snils,
        surname,
        omsCompany,
        patronymic,
        birthday: R.isNil(birthday) ? '' : moment(birthday).format('YYYY.MM.DD'),
      })
    }
    if (
      R.isEmpty(oms)
      || R.isEmpty(name)
      || R.isEmpty(phone)
      || R.isEmpty(email)
      || R.isEmpty(snils)
      || R.isEmpty(surname)
      || R.isEmpty(patronymic)
      || oms.length < 16
      || phone.length < 11
      || snils.length < 11
      || R.isNil(email.match(/\w+@[a-z]+\.[a-z]+/i))
    ) {
      setIsError(true)
    } else setIsError(false)
    setIsIdent(propIdent())
  }, [
    oms,
    sex,
    name,
    phone,
    idPat,
    email,
    snils,
    surname,
    omsCompany,
    patronymic,
    birthday,
  ])

  useEffect(() => {
    setTickets(R.flatten(R.map((item) => item.dataExam.tickets, examList)))
  }, [examList])

  useEffect(() => {
    const sortDate = R.sortBy(R.prop('date'))
    setAnalyzes(sortDate(R.filter((item) => item.idPat === idPat, scheduleAnalyzes)))
  }, [scheduleAnalyzes])

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
    getStore.staff(undefined).then((res) => {
      setStaff(res)
    })
    fetchExamList()
  }, [])

  return (
    <PatientInfo
      oms={oms}
      sex={sex}
      name={name}
      email={email}
      snils={snils}
      phone={phone}
      isIdent={isIdent}
      surname={surname}
      tickets={tickets}
      isError={isError}
      birthday={birthday}
      analyzes={analyzes}
      isDisInput={isDisInput}
      patronymic={patronymic}
      omsCompany={omsCompany}
      isFetching={isFetching}
      omsCompanyList={omsCompanyList}
      handleClickSave={handleClickSave}
      handleClickEdit={handleClickEdit}
      handleClickReset={handleClickReset}
      handleClickCancel={handleClickCancel}
      handleChangeInputs={handleChangeInputs}
      createCardGroupTickets={createCardGroupTickets}
      createCardGroupAnalyzes={createCardGroupAnalyzes}
    />
  )
}

export default connect(
  (state) => ({
    idPat: idPatS(state),
    examList: examListS(state),
    patientInfo: patientInfoS(state),
    isFetching: isFetchingPatientS(state),
    scheduleAnalyzes: scheduleAnalyzesS(state),
  }),
  {
    fetchExamList: fetchExamListA.request,
    updatePatient: updatePatientA.request,
    removeAnalysis: removeAnalysisA.request,
  },
)(PatientInfoContainer)
