/* eslint-disable class-methods-use-this */
import * as R from 'ramda'
import { NAME_INDEXED_DB } from '../../config';
import IndexedDB from './index'

let list: any[]
class GetStore {
  async omsCopanies(id: string | undefined): Promise<any> {
    await IndexedDB.getDS(
      NAME_INDEXED_DB.nameDS.omsCompanies,
    ).then(res => {
      const sort = R.sortBy(R.prop('name'))
      list = sort(res)
    })
    if (R.isNil(id)) { return list }
    const name = JSON.parse(JSON.stringify(
      R.find(R.propEq('id', id))(list),
    )).name
    return name
  }

  async examTypes(id: string | undefined): Promise<any> {
    await IndexedDB.getDS(
      NAME_INDEXED_DB.nameDS.examTypes,
    ).then(res => {
      const sort = R.sortBy(R.prop('name'))
      list = sort(res)
    })
    if (R.isNil(id)) { return list }
    const name = JSON.parse(JSON.stringify(
      R.find(R.propEq('id', id))(list),
    )).name
    return name
  }

  async diagnoses(id: string | undefined): Promise<any> {
    await IndexedDB.getDS(
      NAME_INDEXED_DB.nameDS.diagnoses,
    ).then(res => {
      const sort = R.sortBy(R.prop('grpname'))
      list = sort(res)
    })
    if (R.isNil(id)) { return list }
    list = R.flatten(R.map((item) => item.diagnlist, list))
    const name = JSON.parse(JSON.stringify(
      R.find(R.propEq('id', id))(list),
    )).fullname
    return name
  }

  async staff(id: string | undefined): Promise<any> {
    await IndexedDB.getDS(
      NAME_INDEXED_DB.nameDS.staff,
    ).then(res => {
      const sort = R.sortBy(R.prop('fioEmpl'))
      list = sort(res)
    })
    if (R.isNil(id)) { return list }
    return JSON.parse(JSON.stringify(
      R.find(R.propEq('idEmpl', id))(list),
    ))
  }
}

export default new GetStore();
