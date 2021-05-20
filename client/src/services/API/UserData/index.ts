import MainAPI from '../main.api';

class UserDataAPI extends MainAPI {
  /** Получение данных сотрудника */
  async getUserData(idEmpl: string[]): Promise<Response> {
    return this.getData('/directories/staff', { idEmpl })
  }
}

export default new UserDataAPI();
