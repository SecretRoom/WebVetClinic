import MainAPI from '../main.api';

class UserDataAPI extends MainAPI {
  async getUserData(userID: string): Promise<Response> {
    return this.getData(`/userData/${userID}`)
  }

  async updateUserData(data: any): Promise<Response> {
    return this.getData('/userData/update', data)
  }
}

export default new UserDataAPI();
