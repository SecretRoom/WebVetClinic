import MainAPI from '../main.api';

class ScheduleAppointmentAPI extends MainAPI {
  getScheduleAppointment(data: any): Promise<Response> {
    return this.getData('/schedule_appointment', data)
  }

  removeAppointment(id: string): Promise<Response> {
    return this.getData(`/schedule_appointment/remove/${id}`)
  }

  addAppointment(data: {
    date: Date,
    idPat: string,
    idEmpl: string,
  }): Promise<Response> {
    return this.getData('/schedule_appointment/create', data)
  }
}

export default new ScheduleAppointmentAPI();
