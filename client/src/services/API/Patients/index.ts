import MainAPI from '../main.api';

class PatientsAPI extends MainAPI {
  /** Получение списка пациентов */
  getPatients(data: any): Promise<Response> {
    return this.getData('/patients', data || {})
  }
}

export default new PatientsAPI();
