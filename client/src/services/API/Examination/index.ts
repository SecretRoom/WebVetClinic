import MainAPI from '../main.api';

class ExaminationAPI extends MainAPI {
  /** Получение осмотров пациента */
  getExamList(id: string): Promise<Response> {
    return this.getData('/examination', { idPat: id })
  }

  createExam(data: any): Promise<Response> {
    return this.getData('/examination/create', data)
  }

  updateExam(data: any): Promise<Response> {
    return this.getData('/examination/update', data)
  }

  getExamTypeList(): Promise<Response> {
    return this.getData('/directories/examTypes')
  }
}

export default new ExaminationAPI();
