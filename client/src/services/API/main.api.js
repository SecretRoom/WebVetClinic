import axios from 'axios';
import eventEmitter from '../Events/Global/eventEmitter';
import { APIError } from './APIError';

window.ee = (event) => eventEmitter.emit(event, { message: 'Пример сообщения' })
/**
 * Класс для работы с API сервера
 *
 * @class mainAPI
 * @example
 * class AuthAPI extends mainAPI {
 *    auth(username, password) {
 *      return this.getData('/auth/login', { username, password });
 *    }
 * }
 * export default new AuthAPI();
 *
 * @example
 * import API from '../pathToAuthAPI';
 *
 * API.getData('/auth/login', { username, password })
 *  .then(data => data)
 *  .catch(error => error)
 */
class MainAPI {
  constructor() {
    this.status = {
      1: (data) => { throw new APIError(data); },
      2: (data) => eventEmitter.emit('SHOW_MESSAGE', data),
      3: (data) => eventEmitter.emit('SHOW_WARNING', data),
      DEFAULT: (data) => data,
    };
    this._axios = axios
    this.sentRequests = {}

    MainAPI._init();
  }

  // Получить объект axios
  get axios() {
    return this._axios;
  }

  abortRequests = () => {
    const cancels = Object.keys(this.sentRequests)
    cancels.forEach(key => this.sentRequests[key]())
    this.sentRequests = {}
  };

  // Прервать запрос
  abort() {
    this.abortRequests();
  }

  /**
   * запись данных авторизации в локальное хранилище, установка токена в заголовок
   *
   * @param {object} data - объекст с данными авторизации
   * @memberof MainAPI
   */
  static setAuthData(data) {
    localStorage.setItem('expires_at', data.expires_at);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('origin', Date.now());
    localStorage.setItem('refresh_token', data.refresh_token);
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
      'access_token',
    )}`;
  }

  responseHandler(data) {
    if (Object.prototype.hasOwnProperty.call(data, 'status')) {
      const { status } = data;
      if (Object.prototype.hasOwnProperty.call(this.status, status)) {
        this.status[status](data);
      }
    }
  }

  /**
   * Получение данных с сервера
   *
   * @param {string} url - адрес
   * @param {object} data - данные для отправки POST
   * @returns Promise с данными возращенными сервером
   * @memberof mainAPI
   */
  async getData(url, ...rest) {
    let signal = null
    let point = url
    let reqData = rest[0]
    let config = rest[1] || {}
    if (typeof url === 'object') {
      point = url.url
      reqData = url.data
      config = url.params || {}
    }
    try {
      if (!point) throw new Error(`Для выполнения запроса необходимо передать URL в метод '${this.getData.name}'!`);
      if (!navigator.onLine) throw new Error('Соединение разорвано');

      // eslint-disable-next-line no-prototype-builtins
      if (!config.hasOwnProperty('cancelToken')) {
        signal = axios.CancelToken.source();
        config = { cancelToken: signal.token, origin: true }
        // window.sentRequests.push((message = 'Запрос отменен') => signal.cancel(message))
        this.sentRequests[url] = (message = 'Запрос отменен') => signal.cancel(message)
      }
      let response = {};
      if (reqData) {
        response = await axios.post(point, reqData, config);
      } else {
        response = await axios.get(point, config);
      }
      if (response.status === 200
        && Object.prototype.hasOwnProperty.call(response, 'data')
        && response.data) {
        this.responseHandler(response.data);
        return response.data;
      }
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        eventEmitter.emit('REQUEST_CANCELED', error);
      } else {
        eventEmitter.emit('REQUEST_ERROR', error);
        return Promise.reject(error);
      }
    }
    return true
  }

  static _init() {
    window.sentRequests = []
    window.abortRequests = () => {
      const cancels = Object.keys(window.sentRequests)
      cancels.forEach(key => window.sentRequests[key]())
      window.sentRequests = {}
    }
    window.addEventListener('storage', (event) => {
      if (event.storageArea.length === 0) window.location.reload()
    });
    MainAPI._setHeders();
    MainAPI._requestInterceptors();
    MainAPI._responseInterceptors();
  }

  static _requestInterceptors() {
    axios.interceptors.request.use(
      (request) => {
        // XMLHttpRequest.withCredentials определяет,
        // должны ли создаваться кросс-доменные запросы с
        // использованием таких идентификационных данных,
        // как cookie, авторизационные заголовки или TLS сертификаты.
        // request.withCredentials = true;

        if (!localStorage.getItem('origin')) return request;
        const origin = localStorage.getItem('origin');
        const expiresAt = localStorage.getItem('expires_at');
        const accessToken = localStorage.getItem('access_token');

        if (Math.floor((Date.now() - origin) / 1000) >= expiresAt - 60) {
          return MainAPI._updateToken(request).then(() => {
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
              'access_token',
            )}`;
            return request;
          });
        }
        request.headers.Authorization = `Bearer ${accessToken}`;
        return request;
      },
      (error) => Promise.reject(error),
    );
  }

  static _responseInterceptors() {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response) return false
        const status = error.response.data.sub_status;
        if ((status === 2) || (status === 42)) {
          MainAPI._updateToken(error.response.config);
          return Promise.reject(error.response.config);
        }
        return Promise.reject(error);
      },
    );
  }

  static _setHeders() {
    // axios.defaults.baseURL = process.env.API_BASE_URL;
    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  static _updateToken(request) {
    const refreshToken = localStorage.getItem('refresh_token');
    const refresh = axios.create({
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });

    return refresh
      .post('/auth/refresh')
      .then((res) => {
        localStorage.setItem('origin', Date.now());
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        localStorage.setItem('expires_at', res.data.expires_at);

        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
          'access_token',
        )}`;

        request.headers = {
          Authorization: `Bearer ${res.data.access_token}`,
          'Content-Type': 'application/json',
        };
        return request;
      })
      .catch((err) => {
        localStorage.clear();
        return err;
      })
      .finally(() => window.location.reload());
  }
}

export default MainAPI;
