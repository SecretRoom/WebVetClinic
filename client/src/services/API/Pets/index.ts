import MainAPI from '../main.api';

class PetsAPI extends MainAPI {
  async getPets(userID: string): Promise<Response> {
    return this.getData('/pets', { userID })
  }

  async createPet(data: any): Promise<Response> {
    return this.getData('/pets/create', data)
  }

  async getPetsPhotos(data: any): Promise<Response> {
    return this.getData('/pets/photos', data)
  }
}

export default new PetsAPI();
