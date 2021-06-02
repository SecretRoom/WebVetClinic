/* eslint-disable class-methods-use-this */
import * as R from 'ramda'
import { NAME_INDEXED_DB } from '../../config';
import IndexedDB from './index'

let list: any[]
class GetStore {
  async staff(id: string | undefined): Promise<any> {
    await IndexedDB.getDS(
      NAME_INDEXED_DB.nameDS.staff,
    ).then(res => {
      const sort = R.sortBy(R.prop('fioEmpl'))
      list = sort(res)
    })
    if (R.isNil(id)) { return list }
    return JSON.parse(JSON.stringify(
      R.find(R.propEq('id', id))(list),
    ))
  }

  async services(id: string | undefined): Promise<any> {
    await IndexedDB.getDS(
      NAME_INDEXED_DB.nameDS.services,
    ).then(res => {
      const sort = R.sortBy(R.prop('name'))
      list = sort(res)
    })
    if (R.isNil(id)) { return list }
    return JSON.parse(JSON.stringify(
      R.find(R.propEq('id', id))(list),
    ))
  }
}

export default new GetStore();
