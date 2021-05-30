// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Input, Segment, Loader, Image, Modal, Label, Card } from 'semantic-ui-react'
import * as R from 'ramda'
import './style.sass'
import moment from 'moment';

type PetProps = {
  petInfo: any

  isFetching: boolean
}

const Pet = ({
  petInfo,
  isFetching,
}: PetProps): ReactElement => (
  <>
    {isFetching || R.isNil(petInfo.nickname) ? (
      <div className="pet__loader">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <div className="pet__content">
        <Card
          raised
          key={Math.random()}
          className="pet__content-info"
        >
          <Image
            src={petInfo.photoSrc}
            alt=""
            className="pet-photo"
          />
          <Card.Content className="fields-top">
            <div className="field">
              <span>Кличка</span>
              <span>{petInfo.nickname}</span>
            </div>
            <div className="field">
              <span>Вид</span>
              <span>{petInfo.type}</span>
            </div>
            <div className="field">
              <span>Пол</span>
              <span>{petInfo.sex === 'м' ? 'Мужской' : 'Женский'}</span>
            </div>
          </Card.Content>
          <Card.Content className="field">
            <span>Окрас</span>
            <span>{petInfo.color}</span>
          </Card.Content>
          <Card.Content className="fields-bottom">
            <div className="field">
              <span>Дата рождения</span>
              <span>{moment(petInfo.birthday).format('DD.MM.YYYY').toString()}</span>
            </div>
            <div className="field">
              <span>Вес</span>
              <span>{petInfo.weight} кг</span>
            </div>
            <div className="field">
              <span>Рост</span>
              <span>{petInfo.height} см</span>
            </div>
          </Card.Content>
        </Card>
        <div className="pet__content-data" />
      </div>
    )}
  </>
)

export default Pet
