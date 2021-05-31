import MainAPI from '../main.api';

class ScheduleAPI extends MainAPI {
  async getService(petID: string): Promise<Response> {
    return this.getData(`/schedule/service/${petID}`)
  }

  async getAppointment(petID: string): Promise<Response> {
    return this.getData(`/schedule/appointment/${petID}`)
  }

  async addToSchedule(data: any): Promise<Response> {
    return this.getData('/schedule/appointment/create', data)
  }
}

export default new ScheduleAPI();
