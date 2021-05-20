import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './style.sass'

const GlobalError = ({ data }) => {
  return (
    <Modal className="server-error" open basic size="small" centered>
      <Modal.Header />
      <Modal.Content>
        <h1>Ошибка</h1>
        <b>{data.response.statusText}</b>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => window.location.reload()}>
          <Icon name="refresh" />
          Пробовать снова
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

GlobalError.defaultProps = {
  data: {},
}

GlobalError.propTypes = {
  data: PropTypes.object,
}

export default GlobalError
