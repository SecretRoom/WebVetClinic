// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Icon, Menu, Modal, Popup, Segment, Sidebar } from 'semantic-ui-react'

import './style.sass'

type PatientExaminationsProps = {
  selectedExamType: string

  openPortal: boolean
  hiddenSidebar: boolean

  examList: any[]
  createExamDataContent: (id: string) => ReactElement
  handleChangeHidden: () => void
  handleChangeOpenPortal: () => void
  createExamTypeList: () => ReactElement[]
  createMenuItem: (list: any[]) => ReactElement
}

const PatientExaminations = ({
  examList,
  openPortal,
  hiddenSidebar,
  selectedExamType,

  createExamDataContent,
  createMenuItem,
  handleChangeHidden,
  createExamTypeList,
  handleChangeOpenPortal,
}: PatientExaminationsProps): ReactElement => (
  <Sidebar.Pushable
    as={Segment}
    className="patient-content"
  >
    <Sidebar
      vertical
      as={Menu}
      width="wide"
      icon="labeled"
      className="patient-content__sidebar"
      direction="right"
      animation="overlay"
      visible={!hiddenSidebar}
    >
      {createMenuItem(examList)}
    </Sidebar>
    <Sidebar.Pusher
      style={{ height: '100%' }}
      onClick={(): void | null => (!hiddenSidebar ? handleChangeHidden() : (null))}
    >
      {hiddenSidebar && (
        <Popup
          position="left center"
          content="Список осмотров пациента"
          trigger={(
            <Icon
              link
              bordered
              inverted
              size="big"
              name="list"
              color="green"
              aria-label="Список осмотров"
              onClick={(): void => handleChangeHidden()}
              className="patient-content__sidebar-trigger"
            />
          )}
        />
      )}
      <div
        className="patient-content__content"
      >
        {createExamDataContent(selectedExamType)}
        <Modal
          size="mini"
          open={openPortal}
          className="patient-content__content-modal"
          onClick={(e: SyntheticEvent) => e.stopPropagation()}
          onClose={(e: SyntheticEvent): void => {
            e.stopPropagation()
            handleChangeOpenPortal()
          }}
        >
          <Modal.Header
            content="Выбор типа осмотра"
            className="patient-content__content-modal__header"
          />
          <Modal.Content
            content={(
              <Menu
                vertical
              >
                {createExamTypeList()}
              </Menu>
            )}
            className="patient-content__content-modal__content"
          />
        </Modal>
      </div>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
)

export default PatientExaminations
