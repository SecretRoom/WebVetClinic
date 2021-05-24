import MainAPI from '../main.api';

class AuthAPI extends MainAPI {
  /** Авторизация */
  async auth(data: { login: string, password: string }): Promise<Response> {
    return this.getData('/auth/login', data)
  }
}

export default new AuthAPI();
