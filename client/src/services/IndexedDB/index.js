import * as idb from 'idb'
import * as R from 'ramda'
import { NAME_INDEXED_DB } from '../../config/index.ts'

let dataBase = null
let allList = null

class IndexedDB {
  // Создание базы данных и хранилища

  async createDB(nameDB, stores, version) {
    try {
      let create = false
      await this.deleteDB(nameDB).then(async () => {
        dataBase = await idb.openDB(nameDB, version, {
          upgrade(db) {
            R.forEachObjIndexed((list, nameDS) => {
              db.createObjectStore(nameDS, { keyPath: 'id', autoIncrement: true })
            }, stores)
            create = true
          },
        })
        if (create) {
          await R.forEachObjIndexed(async (list, nameDS) => {
            this.tx = await dataBase.transaction(nameDS, 'readwrite')
            list.forEach(async (item) => {
              await this.tx.store.add({
                ...item,
                id: item._id || item.id || item.idEmpl,
              })
            })
            await this.tx.done
          }, stores)
        }
      })
      // if (dataBase.objectStoreNames.contains(nameDS)) {
      //   create = true
      // }
      return create
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: index.js ~ line 48 ~ IndexedDB ~ createDB ~ err', err)
      return false
    }
  }

  // удаление базы данных
  async deleteDB(nameDB) {
    try {
      this.delete = await idb.deleteDB(nameDB, {
        blocked() {
          dataBase.close()
        },
      });
      return true
    } catch {
      return false
    }
  }

  /* Получение store */
  async getDS(nameDS) {
    try {
      if (!dataBase) {
        dataBase = await idb.openDB(NAME_INDEXED_DB.nameDB, NAME_INDEXED_DB.version)
      }
      this.tx = await dataBase.transaction(nameDS, 'readonly')
      const store = await this.tx.objectStore(nameDS)
      allList = await store.getAll().then(res => res)
      return allList
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ file: index.js ~ line 74 ~ IndexedDB ~ getDS ~ err', err)
      return []
    }
  }
}

export default new IndexedDB();
