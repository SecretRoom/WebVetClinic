import MainAPI from '../main.api';

class DirectoriesAPI extends MainAPI {
  async getServices(): Promise<Response> {
    return this.getData('/directories/services')
  }

  async getCategory(): Promise<Response> {
    return this.getData('/directories/category')
  }

  async getProfile(): Promise<Response> {
    return this.getData('/directories/profile')
  }
}

export default new DirectoriesAPI();
