// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { useHistory } from 'react-router'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'
import PatientExaminations from '../../../components/Patient/Examinations'
import getStore from '../../../services/IndexedDB/getStore'
import {
  examListS,
  isFetchingExamS,
  selectedExamS,
  dataExamS,
  selectedIdExamTypeS,
  selectedExamDataS,
} from './selectors'
import { createExamA, fetchExamListA, resetSelectedExamA, selectExamA, updateExamA } from './actions'
import { idPatS, fullNamePatS, patientInfoS } from '../selectors'
import AllergistExamContainer from './AllergistExam'
import NeurologistExamContainer from './NeurologistExam'
import SurgicalExamContainer from './SurgicalExam'

type PatientExaminationsContainerProps = {
  idPat: string
  fioPat: string
  selectedExam: string
  selectedExamType: string

  examList: any[]

  dataExam: any
  patientInfo: any
  selectedExamData: any

  isFetching: boolean

  fetchExamList: () => void
  resetSelectedExam: () => void
  updateExam: (data: any) => void
  selectExam: ({ id }: any) => void
  createExam: (idType: string) => void
}

const PatientExaminationsContainer = ({
  idPat,
  fioPat,
  examList,
  dataExam,
  isFetching,
  patientInfo,
  selectedExam,
  selectedExamData,
  selectedExamType,

  selectExam,
  updateExam,
  createExam,
  fetchExamList,
  resetSelectedExam,
}: PatientExaminationsContainerProps): ReactElement => {
  const [openPortal, setOpenPortal] = useState<boolean>(false)
  const [hiddenSidebar, setHiddenSidebar] = useState<boolean>(false)
  const [diagnosis, setDiagnosis] = useState<string>('')

  const [examTypes, setExamTypes] = useState<any[]>([])
  const [diagnoses, setDiagnoses] = useState<any[]>([])
  const [fullDiagnoses, setFullDiagnoses] = useState<any[]>([])
  const history = useHistory()

  const handleChangeHidden = (): void => setHiddenSidebar(prev => !prev)

  const handleChangeOpenPortal = (): void => setOpenPortal(prev => !prev)

  const createMenuItem = (list: any): any => {
    const createNew = (): ReactElement => (
      <Menu.Item
        as="a"
        key={Math.random().toString()}
        onClick={() => {
          handleChangeOpenPortal()
        }}
      >
        <Icon
          color="green"
          name="plus"
        />
      </Menu.Item>
    )
    const newlist = R.prepend(createNew(), R.map((item) => (
      <Menu.Item
        as="a"
        active={item.id === selectedExam}
        key={Math.random().toString()}
        onClick={() => {
          handleChangeHidden()
          selectExam({ id: item.id })
        }}
      >
        <h4>{item.examTypeName}</h4>
        <span>{`${item.dateExam} / ${item.fioCreateEmpl}`}</span>
      </Menu.Item>
    ), list))

    return newlist
  }

  const createExamTypeList = (): ReactElement[] => R.map(
    (item) => (
      <Menu.Item
        content={<h4>{item.name}</h4>}
        onClick={() => {
          createExam(item.id)
          handleChangeOpenPortal()
          handleChangeHidden()
        }}
        key={Math.random().toString()}
      />
    ),
    examTypes,
  )

  const getAge = (drogd: string, yearsText: boolean) => {
    const currentDate = new Date()
    const ageYears = ''
    let dateOfBirth: any = ''
    let years = ''
    let age = 0

    // Отличать даты будем по тому, где стоит год: в начале или в конце. Сперва переведем даты формата string в формат data.
    if (drogd) {
      // если формат 'гггг.мм.дд'
      dateOfBirth = new Date(drogd)
      // вычисление возраста на основе даты рождения и сегодняшней даты
      age = currentDate.getFullYear() - dateOfBirth.getFullYear()
      if (currentDate.getMonth() < dateOfBirth.getMonth()) age--
      if ((dateOfBirth.getMonth() === currentDate.getMonth()) && (currentDate.getDate() < dateOfBirth.getDate())) age--

      // вычисление лет/год
      if (yearsText) {
        if ((age >= 10 && age <= 19) || (age >= 110 && age <= 119)) {
          years = ' лет'
        } else if (age % 10 === 1) {
          years = ' год'
        } else if (age % 10 <= 4 && age % 10 >= 2) {
          years = ' года'
        } else {
          years = ' лет'
        }
      }

      return (ageYears.concat(age.toString(), years))
    }
    return null
  }

  const handleSearchDiagnosis = (e: SyntheticEvent, data: any): any => {
    const filterD = R.filter((item) => R.includes(data.searchQuery, item.text), fullDiagnoses)
    setDiagnoses(filterD.length > 100 ? R.slice(0, 100, filterD) : filterD)
  }

  const handleSelectDiagnosis = (e: SyntheticEvent, value: any): any => {
    setDiagnosis(value)
    updateExam({ diagnosis: value })
  }

  const createExamDataContent = (id: string): ReactElement => {
    const findExamType = R.find(R.propEq('id', id))(examTypes)
    if (R.isEmpty(id) || R.isNil(id)) {
      return (<div>Выберите или создайте осмотр</div>)
    }
    if (findExamType) {
      return (
        <>
          <Segment className="examination-header">
            <h3>{selectedExamData.examTypeName}</h3>
            <div className="patient-info">
              <div className="patient-info__text-fields">
                <span>Пациент</span>
                <span>{fioPat}</span>
              </div>
              <div className="patient-info__text-fields">
                <span>Возраст</span>
                <span>{getAge(patientInfo.birthday, true)}</span>
              </div>
            </div>
            <div className="exam-info">
              <div className="exam-info__text-fields">
                <span>Дата осмотра</span>
                <span>{
                  R.isEmpty(selectedExamData.editDateExam)
                    ? selectedExamData.dateExam
                    : selectedExamData.editDateExam
                }
                </span>
              </div>
              <div className="exam-info__text-fields">
                <span>Врач</span>
                <span>{
                  R.isEmpty(selectedExamData.fioEditEmpl)
                    ? selectedExamData.fioCreateEmpl
                    : selectedExamData.fioEditEmpl
                }
                </span>
              </div>
            </div>
            <div className="diagnoses">
              <div className={R.isEmpty(diagnosis) ? 'field-empty' : 'field'}>
                {!R.isEmpty(diagnosis) && <span>Диагноз</span>}
                <Dropdown
                  search
                  disabled={isFetching}
                  value={diagnosis}
                  options={diagnoses}
                  selectOnBlur={false}
                  placeholder="Диагноз"
                  className="diagnoses-drop"
                  selectOnNavigation={false}
                  basic={!R.isEmpty(diagnosis)}
                  selection={R.isEmpty(diagnosis)}
                  noResultsMessage="Диагноз не найден"
                  onSearchChange={(e: SyntheticEvent, data: any) => handleSearchDiagnosis(e as never, data)}
                  onChange={(e: SyntheticEvent, { value }: any): void => handleSelectDiagnosis(e as never, value)}
                />
              </div>
            </div>

          </Segment>
          {id === '60947aee7fe0c94b85a8183e' && <AllergistExamContainer />}
          {id === '60947ad77fe0c94b85a8183d' && <NeurologistExamContainer />}
          {id === '609346f53c5cc3ec95adba80' && <SurgicalExamContainer />}
        </>
      )
    }

    return (<div>Осмотр не найден</div>)
  }

  useEffect(() => {
    setDiagnosis(dataExam?.diagnosis || '')
  }, [dataExam])

  useEffect(() => {
    if (!R.isEmpty(selectedExam)) {
      history.push(`/patients/${idPat}/examination/${selectedExam}`)
    } else {
      history.push(`/patients/${idPat}/examination`)
    }
  }, [selectedExam])

  useEffect(() => {
    if (!R.isEmpty(fullDiagnoses)) setDiagnoses(R.slice(0, 100, fullDiagnoses))
  }, [fullDiagnoses])

  useEffect(() => {
    fetchExamList()
    getStore.examTypes(undefined).then((res) => setExamTypes(res))
    getStore.diagnoses(undefined).then((res) => setFullDiagnoses(
      R.map(item => ({
        text: item.id,
        content: item.fullname,
        value: item.id,
        key: item.id,
      }), res),
    ))
    return (() => {
      resetSelectedExam()
    })
  }, [])

  return (
    <PatientExaminations
      examList={examList}
      openPortal={openPortal}
      createExamDataContent={createExamDataContent}
      hiddenSidebar={hiddenSidebar}
      createMenuItem={createMenuItem}
      selectedExamType={selectedExamType}
      createExamTypeList={createExamTypeList}
      handleChangeHidden={handleChangeHidden}
      handleChangeOpenPortal={handleChangeOpenPortal}
    />
  )
}

export default connect(
  (state) => ({
    idPat: idPatS(state),
    examList: examListS(state),
    dataExam: dataExamS(state),
    fioPat: fullNamePatS(state),
    patientInfo: patientInfoS(state),
    selectedExam: selectedExamS(state),
    isFetching: isFetchingExamS(state),
    selectedExamData: selectedExamDataS(state),
    selectedExamType: selectedIdExamTypeS(state),
  }),
  {
    selectExam: selectExamA.request,
    createExam: createExamA.request,
    updateExam: updateExamA.request,
    resetSelectedExam: resetSelectedExamA,
    fetchExamList: fetchExamListA.request,
  },
)(PatientExaminationsContainer)
