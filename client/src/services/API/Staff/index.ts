import MainAPI from '../main.api';

class StaffAPI extends MainAPI {
  /** Авторизация */
  async getStaff(data: any): Promise<Response> {
    return this.getData('/directories/staff', data)
  }
}

export default new StaffAPI();
