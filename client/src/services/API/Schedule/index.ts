import MainAPI from '../main.api';

class ScheduleAPI extends MainAPI {
  async getService(petID: string): Promise<Response> {
    return this.getData(`/schedule/service/${petID}`)
  }

  async getAppointment(petID: string): Promise<Response> {
    return this.getData(`/schedule/appointment${petID && `/${petID}`}`)
  }

  async addToSchedule(data: any): Promise<Response> {
    return this.getData('/schedule/appointment/create', data)
  }

  async removeFromSchedule(id: string): Promise<Response> {
    return this.getData('/schedule/appointment/remove', { id })
  }
}

export default new ScheduleAPI();
