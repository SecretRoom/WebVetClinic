import MainAPI from '../main.api';

class ReportsAPI extends MainAPI {
  getReport(data: any): Promise<Response> {
    return this.getData('/reports', data)
  }
}

export default new ReportsAPI();
