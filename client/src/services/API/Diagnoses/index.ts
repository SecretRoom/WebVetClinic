import MainAPI from '../main.api';

class DiagnosesAPI extends MainAPI {
  /** Получение списка диагнозов */
  getDiagnoses(): Promise<Response> {
    return this.getData('/directories/diagnoses')
  }
}

export default new DiagnosesAPI();
