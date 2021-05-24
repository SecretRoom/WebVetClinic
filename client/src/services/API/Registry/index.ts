import MainAPI from '../main.api';

class RegistryAPI extends MainAPI {
  async registry(data: { login: string, password: string }): Promise<Response> {
    return this.getData('/auth/register', data)
  }
}

export default new RegistryAPI();
