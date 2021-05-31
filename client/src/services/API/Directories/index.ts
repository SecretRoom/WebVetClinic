import MainAPI from '../main.api';

class DirectoriesAPI extends MainAPI {
  async getServices(): Promise<Response> {
    return this.getData('/directories/services')
  }
}

export default new DirectoriesAPI();
