import MainAPI from '../main.api';

class StaffAPI extends MainAPI {
  /** Получение списка сотрудников */
  getStaff(): Promise<Response> {
    return this.getData('/directories/staff', { idEmpl: [] })
  }
}

export default new StaffAPI();
