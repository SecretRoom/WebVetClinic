import MainAPI from '../main.api';

class UserDataAPI extends MainAPI {
  /** Получение данных сотрудника */
  async getUserData(userID: string): Promise<Response> {
    return this.getData(`/userData/${userID}`)
  }
}

export default new UserDataAPI();
