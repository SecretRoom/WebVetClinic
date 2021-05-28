/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Input, Segment, Loader, Image, Modal, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import * as R from 'ramda'
import './style.sass'

type PetsCardProps = {
  sex: string
  type: string
  color: string
  weight: string
  height: string
  nickname: string

  isEdit: boolean
  isIdent: boolean
  openModal: boolean
  isFetching: boolean
  isDisSaveButton: boolean

  photo: File | undefined

  birthday: Date | null

  pets: any[]

  handleClickSave: () => void
  handleChangeOpenModal: () => void
  handleCreateCard: (card: any) => ReactElement
  handleChangePhoto: (e: SyntheticEvent) => void
  handleChangeInputs: (e: SyntheticEvent, field: string, { value }: any) => void
}

const PetsCard = ({
  sex,
  pets,
  type,
  photo,
  color,
  isEdit,
  weight,
  height,
  isIdent,
  nickname,
  birthday,
  openModal,
  isFetching,
  isDisSaveButton,

  handleClickSave,
  handleCreateCard,
  handleChangePhoto,
  handleChangeInputs,
  handleChangeOpenModal,
}: PetsCardProps): ReactElement => (
  <>
    {isFetching ? (
      <div className="pets-cards__loader">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <div className="pets-cards__content">
        {R.map(handleCreateCard, pets)}
        <Modal
          size="tiny"
          open={openModal}
          className="pet-modal"
          onClose={(e: SyntheticEvent): void => {
            e.stopPropagation()
            handleChangeOpenModal()
          }}
          trigger={(
            <Button
              animated
              color="orange"
              className="add-button"
              onClick={handleChangeOpenModal}
            >
              <Button.Content
                hidden
                color="orange"
              >
                <span>Добавить питомца</span>
              </Button.Content>
              <Button.Content
                visible
              >
                <Icon
                  name="plus"
                  size="big"
                />
              </Button.Content>
            </Button>
          )}
        >
          <Modal.Header content={`${isEdit ? 'Редактирование' : 'Добавление'} питомца`} />
          <Modal.Content content={(
            <>
              {R.isNil(photo) && !isEdit ? (
                <>
                  <label htmlFor="photo" className="photo-label__upload">
                    <div
                      style={{
                        display: 'grid',
                        gridGap: '5px',
                        gridTemplateColumns: 'repeat(2, max-content)',
                        alignItems: 'center',
                      }}
                    >
                      <span>Выберите файл</span>
                      <Icon name="search" size="big" color="grey" />
                    </div>
                  </label>
                </>
              ) : (
                <Image id="upload-photo" />
              )}
              <div className="fields">
                <div className={R.isEmpty(nickname) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(nickname) && <span>Кличка</span>}
                  <Input
                    transparent
                    value={nickname}
                    placeholder="Кличка"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'nickname', value)}
                  />
                </div>
                <div className={R.isEmpty(type) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(type) && <span>Вид</span>}
                  <Input
                    transparent
                    value={type}
                    placeholder="Вид"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'type', value)}
                  />
                </div>
                <div className={R.isEmpty(color) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(color) && <span>Окрас</span>}
                  <Input
                    transparent
                    value={color}
                    placeholder="Окрас"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'color', value)}
                  />
                </div>
                <div className={R.isNil(birthday) ? 'field-empty' : 'field'}>
                  {!R.isNil(birthday) && <span>Дата рождения</span>}
                  <DatePicker
                    closeOnScroll
                    selected={birthday}
                    maxDate={new Date()}
                    customInput={(
                      <Input
                        transparent
                      />
                    )}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Дата рождения"
                    onChange={(date: any, e: SyntheticEvent): void => handleChangeInputs(e as never, 'birthday', date)}
                  />
                </div>
                <div className={R.isEmpty(sex) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(sex) && <span>Пол</span>}
                  <Dropdown
                    basic
                    fluid
                    style={{ paddingRight: '5px' }}
                    value={sex}
                    placeholder="Пол"
                    selectOnBlur={false}
                    selectOnNavigation={false}
                    onChange={(e: SyntheticEvent, { value }: any) => handleChangeInputs(e as never, 'sex', value)}
                    options={[
                      { key: 'м', value: 'м', text: 'мужской' },
                      { key: 'ж', value: 'ж', text: 'женский' },
                    ]}
                  />
                </div>
                <div className={R.isEmpty(weight) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(weight) && <span>Вес</span>}
                  <Input
                    transparent
                    value={weight}
                    placeholder="Вес"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'weight', value)}
                  />
                </div>
                <div className={R.isEmpty(height) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(height) && <span>Рост</span>}
                  <Input
                    transparent
                    value={height}
                    placeholder="Рост"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'height', value)}
                  />
                </div>
                <div className="buttons">
                  <label
                    htmlFor="photo"
                    className="upload-other"
                  >
                    <Icon
                      link={!R.isNil(photo) || isEdit}
                      size="big"
                      color="orange"
                      name="upload"
                      disabled={R.isNil(photo) && !isEdit}
                    />
                  </label>
                  <Button
                    fluid
                    style={{ height: 'max-content' }}
                    icon="save"
                    positive
                    content="Сохранить"
                    disabled={isDisSaveButton || isIdent}
                    onClick={(): void => handleClickSave()}
                  />
                </div>
                <Input
                  id="photo"
                  type="file"
                  name="photo"
                  className="photo"
                  onChange={(e: any): void => handleChangePhoto(e)}
                />
              </div>
            </>
          )}
          />
        </Modal>
      </div>
    )}
  </>
)

export default PetsCard
