// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import ReportsContent from '../../../components/Reports/Content'
import {
  isFetchingReportsS,
  countAdoptedPatReportsS,
  countAnalyzesReportsS,
  countCreateExamReportsS,
  countEditExamReportsS,
  countTicketsReportsS,
  adoptedPatS,
  analyzesS,
  createExamS,
  editExamS,
  ticketsS,
} from '../selectors'
import {
  fioEmplS,
  deptNameEmplS,
  posNameEmplS,
  profNameEmplS,
  catNameEmplS,
} from '../../UserService/selectors'

type ReportsContentContainerProps = {
  isFetching: boolean

  countTickets: string | number
  countAnalyzes: string | number
  countEditExam: string | number
  countCreateExam: string | number
  countAdoptedPat: string | number

  fioEmpl: string
  posNameEmpl: string
  catNameEmpl: string
  profNameEmpl: string
  deptNameEmpl: string

  adoptedPat: any[]
  analyzes: any[]
  createExam: any[]
  editExam: any[]
  tickets: any[]
}

const ReportsContentContainer = ({
  fioEmpl,
  isFetching,
  posNameEmpl,
  catNameEmpl,
  profNameEmpl,
  deptNameEmpl,
  adoptedPat,
  analyzes,
  createExam,
  editExam,
  tickets,
  countTickets,
  countAnalyzes,
  countEditExam,
  countAdoptedPat,
  countCreateExam,
}: ReportsContentContainerProps): ReactElement => {
  const [panes, setPanes] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<string | number>(0)

  const handleChangeActiveTab = (e: SyntheticEvent, activeIndex: string | number) => setActiveTab(activeIndex)

  const createPane = (title: string, list: any[]): any => ({
    menuItem: title,
    // eslint-disable-next-line react/display-name
    render: () => (
      <Tab.Pane>
        <LineChart
          width={500}
          height={300}
          data={list}
          margin={{
            top: 5,
            // right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" name={title} stroke="#82ca9d" fill="#82ca9d" strokeWidth={2} />
        </LineChart>
      </Tab.Pane>
    ),
  })

  useEffect(() => {
    setPanes([
      createPane('Количество принятых пациентов', adoptedPat),
      createPane('Количество назначенных анализов', analyzes),
      createPane('Количество выписанных направлений', tickets),
      createPane('Количество созданных осмотров', editExam),
      createPane('Количество отредактированных осмотров', createExam),
    ])
  }, [
    tickets,
    analyzes,
    editExam,
    createExam,
    adoptedPat,
  ])

  return (
    <ReportsContent
      panes={panes}
      fioEmpl={fioEmpl}
      activeTab={activeTab}
      posNameEmpl={posNameEmpl}
      catNameEmpl={catNameEmpl}
      profNameEmpl={profNameEmpl}
      deptNameEmpl={deptNameEmpl}
      isFetching={isFetching}
      countTickets={countTickets}
      countAnalyzes={countAnalyzes}
      countEditExam={countEditExam}
      countAdoptedPat={countAdoptedPat}
      countCreateExam={countCreateExam}
      handleChangeActiveTab={handleChangeActiveTab}

    />
  )
}

export default connect(
  (state) => ({
    fioEmpl: fioEmplS(state),
    adoptedPat: adoptedPatS(state),
    analyzes: analyzesS(state),
    createExam: createExamS(state),
    editExam: editExamS(state),
    tickets: ticketsS(state),
    posNameEmpl: posNameEmplS(state),
    catNameEmpl: catNameEmplS(state),
    profNameEmpl: profNameEmplS(state),
    deptNameEmpl: deptNameEmplS(state),
    isFetching: isFetchingReportsS(state),
    countTickets: countTicketsReportsS(state),
    countAnalyzes: countAnalyzesReportsS(state),
    countEditExam: countEditExamReportsS(state),
    countCreateExam: countCreateExamReportsS(state),
    countAdoptedPat: countAdoptedPatReportsS(state),
  }),
  {},
)(ReportsContentContainer)
