// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Loader, Segment, Tab } from 'semantic-ui-react'

import './style.sass'

type ScheduleAppointmentContentProps = {
  isFetching: boolean

  activeTab: string | number
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

  panes: any[]

  handleChangeActiveTab: (e: SyntheticEvent, activeIndex: string | number) => void
}

const ScheduleAppointmentContent = ({
  panes,
  fioEmpl,
  activeTab,
  isFetching,
  posNameEmpl,
  catNameEmpl,
  profNameEmpl,
  deptNameEmpl,
  countTickets,
  countAnalyzes,
  countEditExam,
  countAdoptedPat,
  countCreateExam,

  handleChangeActiveTab,
}: ScheduleAppointmentContentProps): ReactElement => (
  <>
    {isFetching ? (
      <div className="loader-reportsContent">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <Segment className="reports-content">
        <h2>Отчет</h2>
        <div className="reports-content__data">
          <div className="fields">
            <div className="field">
              <h4>Отделение</h4>
              <span>{deptNameEmpl}</span>
            </div>
            <div className="field">
              <h4>Профиль</h4>
              <span>{profNameEmpl}</span>
            </div>
            <div className="field">
              <h4>Сотрудник</h4>
              <span>{fioEmpl}</span>
            </div>
            <div className="field">
              <h4>Должность</h4>
              <span>{posNameEmpl}</span>
            </div>
            <div className="field">
              <h4>Категория</h4>
              <span>{catNameEmpl}</span>
            </div>
            <div className="field">
              <h4>Количество принятых пациентов</h4>
              <span>{countAdoptedPat}</span>
            </div>
            <div className="field">
              <h4>Количество назначенных анализов</h4>
              <span>{countAnalyzes}</span>
            </div>
            <div className="field">
              <h4>Количество выписанных направлений</h4>
              <span>{countTickets}</span>
            </div>
            <div className="field">
              <h4>Количество созданных осмотров</h4>
              <span>{countCreateExam}</span>
            </div>
            <div className="field">
              <h4>Количество отредактированных осмотров</h4>
              <span>{countEditExam}</span>
            </div>
          </div>
          <Tab
            panes={panes}
            menuPosition="right"
            className="tab-chart"
            activeIndex={activeTab}
            onTabChange={(e: SyntheticEvent, { activeIndex }: any): void => handleChangeActiveTab(e as never, activeIndex)}
            menu={{ vertical: true, secondary: true, pointing: true }}
          />
        </div>
      </Segment>
    )}
  </>
)

export default ScheduleAppointmentContent
