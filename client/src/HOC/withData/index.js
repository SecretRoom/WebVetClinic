import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

export const withData = (Component) => {
  return class extends React.Component {
    static propTypes = {
      /** Вызовется при монтировании для получения данных таблицы, вернет токен отмены,
     * перевызывется при передачи свойства, при изменении которого необходимо выполнить повторный вызов и имени этого свойства в props "watch" */
      fetchData: PropTypes.func,
      /** Имя передаваемого свойства на при обновлении которого необходимо повторно запрашивать данные таблицы */
      watch: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      /** Отобразит загрузчик */
      loading: PropTypes.bool,
      loader: PropTypes.element,
    }

    static defaultProps = {
      fetchData: () => Promise.resolve(undefined),
      watch: '',
      loading: false,
      loader: <Segment placeholder loading />,
    }

    constructor(props) {
      super(props)
      this.signal = axios.CancelToken.source()
      this._isMount = false

      this.state = {
        error: false,
        isFetching: true,
        data: undefined,
      }
    }

    componentDidMount() {
      this._isMount = true
      if (this.props.fetchData) {
        this.fetchData()
      }
    }

    componentDidUpdate(prevProps) {
      if (!this.props.watch || !this.props.fetchData) return null
      if (Array.isArray(this.props.watch)) {
        this.props.watch.forEach((propsName) => {
          if (prevProps[propsName] !== this.props[propsName]) {
            if (!this.props[propsName]) return false
            return this.fetchData()
          }
          return false
        });
      }
      if (prevProps[this.props.watch] !== this.props[this.props.watch]) {
        if (!this.props[this.props.watch]) return false
        return this.fetchData()
      }
      return true
    }

    componentWillUnmount() {
      this._isMount = false
      this.signal.cancel()
    }

    fetchData = () => {
      this.props.fetchData(this.signal.token)
        .then(data => {
          this.setState({ data, isFetching: false })
        })
        .catch(() => {
          if (this._isMount) {
            this.setState({ error: true, isFetching: false })
          }
          // throw new Error(error)
        })
    }

    render() {
      const { isFetching, data, error } = this.state
      if (this.props.loading && isFetching) return this.props.loader
      if (error) return <h1>Ошибка загрузки данных</h1>
      return (
        <Component data={data} isFetching={isFetching} onFetch={this.fetchData} {...this.props} />
      )
    }
  }
}

// withData.propTypes = {
//   /** Вызовется при монтировании для получения данных таблицы, вернет токен отмены,
//  * перевызывется при передачи свойства, при изменении которого необходимо выполнить повторный вызов и имени этого свойства в props "watch" */
//   fetchData: PropTypes.func,
//   /** Имя передаваемого свойства на при обновлении которого необходимо повторно запрашивать данные таблицы */
//   watch: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.arrayOf(),
//   ]),
//   /** Отобразит загрузчик */
//   loading: PropTypes.bool,
// }

export default withData
