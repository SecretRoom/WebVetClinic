// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import * as R from 'ramda'
import {
  Button,
  Dropdown,
  Grid,
  Input,
  Modal,
  Segment,
  Tab,
  TextArea,
} from 'semantic-ui-react'
import './style.sass'
import DatePicker from 'react-datepicker'

type NeurologistExamProps = {
  anamnesis: string
  complaints: string
  conclusion: string
  recommendations: string

  newTicket: { idEmpl: string, text: string }

  isFetching: boolean
  isAddTicketModal: boolean
  isAddAnalysisModal: boolean

  staff: any[]
  tickets: any[]
  analyzesList: any[]
  scheduleAnalyzes: any[]

  newAnalysis: {
    date: string,
    count: string,
    idAnalysis: string
  }

  handleUpdateExam: () => void
  handleCreateNewTicket: () => void
  handleChangeTicketModal: () => void
  handleCreateNewAnalysis: () => void
  handleChangeAnalysisModal: () => void
  renderTickets: (tickets: any[]) => any
  createGridAnalyzes: (schedule: any[]) => ReactElement
  handleChangeInputs: (e: SyntheticEvent, field: string, value: any) => void
  handleChangeNewAnalysis: (e: SyntheticEvent, fieldName: string, value: any) => void
  handleChangeNewTicket: (e: SyntheticEvent, fieldName: string, value: any) => void
}

const NeurologistExam = ({
  staff,
  tickets,
  anamnesis,
  newTicket,
  complaints,
  isFetching,
  conclusion,
  newAnalysis,
  analyzesList,
  recommendations,
  scheduleAnalyzes,
  isAddTicketModal,
  isAddAnalysisModal,

  renderTickets,
  handleUpdateExam,
  handleChangeInputs,
  createGridAnalyzes,
  handleCreateNewTicket,
  handleChangeNewTicket,
  handleChangeTicketModal,
  handleCreateNewAnalysis,
  handleChangeNewAnalysis,
  handleChangeAnalysisModal,
}: NeurologistExamProps): ReactElement => {
  return (
    <Segment
      className="neurologist-exam__content"
      onMouseLeave={() => handleUpdateExam()}
    >
      <div className={R.isEmpty(anamnesis) ? 'field-empty' : 'field'}>
        {!R.isEmpty(anamnesis) && <span>Анамнез</span>}
        <Input
          transparent
          fluid
          value={anamnesis}
          placeholder="Анамнез"
          disabled={isFetching}
          icon={!R.isEmpty(anamnesis) && {
            name: 'close',
            color: 'grey',
            link: true,
            onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'anamnesis', ''),
          }}
          onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'anamnesis', value)}
        />
      </div>
      <div className={R.isEmpty(complaints) ? 'field-empty' : 'field'}>
        {!R.isEmpty(complaints) && <span>Жалобы</span>}
        <Input
          transparent
          fluid
          value={complaints}
          placeholder="Жалобы"
          disabled={isFetching}
          icon={!R.isEmpty(complaints) && {
            name: 'close',
            color: 'grey',
            link: true,
            onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'complaints', ''),
          }}
          onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'complaints', value)}
        />
      </div>
      <div className={R.isEmpty(recommendations) ? 'field-empty' : 'field'}>
        {!R.isEmpty(recommendations) && <span>Рекомендации</span>}
        <Input
          transparent
          fluid
          disabled={isFetching}
          value={recommendations}
          placeholder="Рекомендации"
          icon={!R.isEmpty(recommendations) && {
            name: 'close',
            color: 'grey',
            link: true,
            onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'recommendations', ''),
          }}
          onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'recommendations', value)}
        />
      </div>
      <div className={R.isEmpty(conclusion) ? 'field-empty' : 'field'}>
        {!R.isEmpty(conclusion) && <span>Заключение</span>}
        <Input
          transparent
          fluid
          value={conclusion}
          disabled={isFetching}
          placeholder="Заключение"
          icon={!R.isEmpty(conclusion) && {
            name: 'close',
            color: 'grey',
            link: true,
            onClick: (e: SyntheticEvent) => handleChangeInputs(e as never, 'conclusion', ''),
          }}
          onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'conclusion', value)}
        />
      </div>
      <div style={{
        display: 'grid',
        gridGap: '10px',
        gridTemplateColumns: 'repeat(2,max-content)',
      }}
      >
        <div className="tickets">
          <div className="tickets__header">
            <span>Направления к другим специалистам</span>
            <Modal
              size="mini"
              className="tickets__header-modal"
              trigger={(
                <Button
                  basic
                  icon="plus"
                  color="green"
                  content="Создать новое"
                  onClick={() => handleChangeTicketModal()}
                />
              )}
              open={isAddTicketModal}
              onClose={() => handleChangeTicketModal()}
            >
              <Modal.Header className="tickets__header-modal__header">
                Создание направления
              </Modal.Header>
              <Modal.Content className="tickets__header-modal__content">
                <Dropdown
                  fluid
                  search
                  selection
                  options={staff}
                  selectOnBlur={false}
                  value={newTicket.idEmpl}
                  placeholder="Специалист"
                  selectOnNavigation={false}
                  noResultsMessage="Специалист не найден"
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeNewTicket(e as never, 'idEmpl', value)}
                />
                <TextArea
                  value={newTicket.text}
                  className="newTicket-textarea"
                  placeholder="Информация для направления"
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeNewTicket(e as never, 'text', value)}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="green"
                  content="Создать"
                  onClick={(): void => handleCreateNewTicket()}
                />
              </Modal.Actions>
            </Modal>
          </div>
          <Tab
            className="tickets__content"
            panes={renderTickets(tickets)}
            menu={{ vertical: true, secondary: true, pointing: true }}
          />
        </div>
        <div className="analyzes">
          <div className="analyzes__header">
            <span>Анализы</span>
            <Modal
              size="mini"
              className="analyzes__header-modal"
              trigger={(
                <Button
                  basic
                  icon="plus"
                  color="green"
                  content="Назначить"
                  onClick={() => handleChangeAnalysisModal()}
                />
              )}
              open={isAddAnalysisModal}
              onClose={() => handleChangeAnalysisModal()}
            >
              <Modal.Header className="analyzes__header-modal__header">
                Назначенние анализа
              </Modal.Header>
              <Modal.Content className="analyzes__header-modal__content">
                <Dropdown
                  fluid
                  search
                  selection
                  options={R.map((item) => ({
                    key: item._id,
                    value: item._id,
                    text: item.name,
                  }), analyzesList)}
                  selectOnBlur={false}
                  value={newAnalysis.idAnalysis}
                  placeholder="Анализы"
                  selectOnNavigation={false}
                  noResultsMessage="Анализ не найден"
                  onChange={(e: SyntheticEvent, { value }: any): void => handleChangeNewAnalysis(e as never, 'idAnalysis', value)}
                />
                <div style={{
                  display: 'grid',
                  gridGap: '10px',
                  gridTemplateColumns: 'repeat(2,max-content)',
                }}
                >
                  <DatePicker
                    closeOnScroll
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    minDate={new Date()}
                    dateFormat="dd.MM.yyyy HH:mm"
                    placeholderText="Дата анализа"
                    selected={new Date(newAnalysis.date)}
                    onChange={(date: any, e: SyntheticEvent): void => handleChangeNewAnalysis(e as never, 'date', date)}
                  />
                  <Input
                    placeholder="Количество"
                    value={newAnalysis.count}
                    onChange={(e: SyntheticEvent, { value }: any): void => {
                      if (R.isEmpty(R.match(/\D/gi, value))) {
                        handleChangeNewAnalysis(e as never, 'count', value)
                      }
                    }}
                  />
                </div>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  color="green"
                  disabled={R.isEmpty(newAnalysis.count) || R.isEmpty(newAnalysis.idAnalysis)}
                  content="Назначить"
                  onClick={(): void => handleCreateNewAnalysis()}
                />
              </Modal.Actions>
            </Modal>
          </div>
          <Grid columns={2} celled className="analyzes__content">
            {createGridAnalyzes(scheduleAnalyzes)}
          </Grid>
        </div>
      </div>
    </Segment>
  )
}

export default NeurologistExam
