import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import PropTypes from 'prop-types'
import Error from '../../components/Blocks/ErrorIndicator';

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.shape().isRequired,
    state: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  componentDidCatch(error, info) {
    const type = this.props.children.type;
    const componentName = typeof type === 'object' ? this.props.children.type.WrappedComponent.name : type;
    axios.post('/front_log/', JSON.stringify({
      url: window.location.href,
      err: `${error.name} ${error.message}`,
      functionName: componentName,
      errName: error.name,
      errMessage: error.message,
      errStack: error.stack,
      info,
      state: this.props.state,
    }));
    this.setState({ hasError: true, message: info.componentStack.slice(0, 50) });
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <Error message={this.state.message} />;
    }

    return this.props.children;
  }
}

export default connect(
  (state) => ({ state }),
  () => ({}),
)(ErrorBoundary);
