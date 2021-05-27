// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Input, Segment, Loader, Image, Modal } from 'semantic-ui-react'
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

  openModal: boolean
  isFetching: boolean

  photo: File | undefined

  birthday: Date | null

  pets: any[]

  handleChangeOpenModal: () => void
  handleCreateCard: (card: any) => ReactElement
  handleChangeInputs: (e: SyntheticEvent, field: string, { value }: any) => void
}

const PetsCard = ({
  sex,
  pets,
  type,
  photo,
  color,
  weight,
  height,
  nickname,
  birthday,
  openModal,
  isFetching,

  handleCreateCard,
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
          open={openModal}
          className="pet-modal"
          onClose={handleChangeOpenModal}
          trigger={(
            <Icon
              link
              inverted
              circular
              size="big"
              name="plus"
              color="orange"
              className="add-button"
              onClick={handleChangeOpenModal}
            />
          )}
        >
          <Modal.Header content="Добавление питомца" />
          <Modal.Content content={(
            <>
              <div className="download-photo">
                <Image />
                <Button />
              </div>
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
                    style={{ width: '191px' }}
                    transparent
                    value={color}
                    placeholder="Окрас"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'color', value)}
                  />
                </div>
                <div className={R.isEmpty(sex) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(sex) && <span>Пол</span>}
                  <Dropdown
                    basic
                    compact
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
                <div className={R.isEmpty(weight) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(weight) && <span>Вес</span>}
                  <Input
                    transparent
                    style={{ width: '70px' }}
                    value={weight}
                    placeholder="Вес"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'weight', value)}
                  />
                </div>
                <div className={R.isEmpty(height) ? 'field-empty' : 'field'}>
                  {!R.isEmpty(height) && <span>Рост</span>}
                  <Input
                    transparent
                    style={{ width: '70px' }}
                    value={height}
                    placeholder="Рост"
                    onChange={(e: SyntheticEvent, { value }: any): void => handleChangeInputs(e as never, 'height', value)}
                  />
                </div>
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
