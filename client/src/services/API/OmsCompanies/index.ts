import MainAPI from '../main.api';

class OmsCompaniesAPI extends MainAPI {
  /** Получение списка страховых компаний */
  getOmsCompanies(): Promise<Response> {
    return this.getData('/directories/omsCompanies')
  }
}

export default new OmsCompaniesAPI();
