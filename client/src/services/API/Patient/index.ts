import MainAPI from '../main.api';

class PatientAPI extends MainAPI {
  /** Получение пациента */
  getPatient(id: string): Promise<Response> {
    return this.getData(`/patients/${id}`)
  }

  updatePatient(id: string, newData: any): Promise<Response> {
    return this.getData(`/patients/update/${id}`, { newData })
  }
}

export default new PatientAPI();
