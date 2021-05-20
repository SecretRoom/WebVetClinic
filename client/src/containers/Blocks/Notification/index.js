import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { notificationReset } from '../../../actions/index.ts';

import Notification from '../../../components/Blocks/Notification';

function NotificationContainer({
  reset,
  timeout,
  notifications,
}) {
  return (
    <Notification
      timeout={timeout}
      notifications={notifications}
      reset={reset}
    />
  );
}

NotificationContainer.propTypes = {
  reset: PropTypes.func,
  timeout: PropTypes.number,
  notifications: PropTypes.array,
}

NotificationContainer.defaultProps = {
  reset: () => { },
  timeout: 5000,
  notifications: [],
}

export default connect(
  (state) => ({
    notifications: state.notification.notifications,
  }),
  (dispatch) => ({
    reset: (id) => dispatch(notificationReset(id)),
  }),
)(NotificationContainer);
