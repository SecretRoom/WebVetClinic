/**
 * Точка входа API - сервер API
 */
export const ENTRY_POINTS = process.env.API_BASE_URL
/**
 * Период запросов в бэкграунде для странички ресепшена
 */
export const SYNC_DELAY = 60000
/**
 * Продолжительность отображения уведомления
 */
export const NOTIFICATION_DELAY = 5000
/**
 * Настройки таблицы
 */
export const REACT_TABLE_SETTINGS = {
  previousText: 'Назад',
  nextText: 'Вперед',
  loadingText: 'Загрузка...',
  noDataText: 'Нет данных',
  pageText: 'Страница',
  ofText: 'из',
  rowsText: 'Строк',
  pageJumpText: 'Перейти на страницу',
  rowsSelectorText: 'Строк на странице',
  freezeWhenExpanded: true,
  resizable: true,
  filterable: false,
  showPagination: false,
  style: {
    fontSize: '13px',
    lineHeight: '15px',
  },
  getTheadGroupProps: (): any => ({
    style: {
      background: '#ffffff',
    },
  }),
  getTheadThProps: (): any => ({
    style: {
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: '52px',
      overflow: 'hidden',
    },
  }),
  getTheadTrProps: (): any => ({
    style: {
      fontWeight: 500,
      fontSize: '13px',
      lineHeight: '15px',
      display: 'flex',
      // alignItems: 'center',
      // background: '#dadada',
      // borderBottom: '2px solid #2185d0',
      // color: '#2185d0',
    },
  }),
  getTbodyProps: (): any => ({
    style: {
      borderLeft: '1px solid rgba(0,0,0,0.05)',
      borderRight: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
    },
  }),
}
/**
 * Типы параметров имеющие дерево шаблонов
 */
export const PARAMS_HAVING_PATTERNS = [3, 10, 11]

/**
 * Горячие клавиши
 */
export const HOT_KEYS = {
  openParameterPatterns: 116,
  closeParameterPatterns: [27, 9],
  // Dentition
  addRowToothServiceTable: 40,
  fastPasteServise: 13,
}

/**
 * Название IndexedDB и название DataStore
 */
export const NAME_INDEXED_DB = {
  version: 1,
  nameDB: 'WebVetClinic',
  nameDS: {
    staff: 'staff',
    services: 'services',
  },
}

