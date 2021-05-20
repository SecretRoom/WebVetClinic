import React from 'react';

/**
 * Компонент высшего порядка AccessCheck
 * @example
 * //С помощью функции compose комбинируем connect и AccessCheck
 *export default compose(
 *  //Получаем список прав из redux store
 *  connect(
 *    state => ({
 *      rights: rightsList(state),
 *    })
 *  ),
 *    //В AccessCheck передаем id права, необходимого для отображения компонента
 *  AccessCheck('ShowComponent', '...', '...')
 *)(Biomaterials);
 *
 * @param  {*} requirement
 * @category HOC
 * @tutorial access-check-guide
 */

const AccessCheck = (...requirement) => (Component) => (props) => {
  if (!props.rights) return null;
  let show = ''
  let edit = ''
  let reservedComponent = null
  if (typeof requirement[0] === 'object') {
    show = requirement[0].show
    edit = requirement[0].edit
    reservedComponent = requirement[0].reservedComponent
  } else {
    show = requirement[0]
    edit = requirement[1]
  }

  function isSatisfied (requirement) {
    if (!requirement) return true;
    return props.rights.find((right) => (
      right.nmrightsokr === requirement))
  }

  const isSatisfiedShow = isSatisfied(show);
  const isSatisfiedEdit = isSatisfied(edit);
  return isSatisfiedShow ? <Component {...props} edit={!!isSatisfiedEdit} /> : reservedComponent;
};
export default AccessCheck;
