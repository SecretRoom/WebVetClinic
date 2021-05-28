// eslint-disable-next-line no-use-before-define
import React, { ReactElement, SyntheticEvent } from 'react'
import { Button, Dropdown, Icon, Input, Segment, Loader, Image, Modal, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import * as R from 'ramda'
import './style.sass'

type PetProps = {
  isFetching: boolean
}

const Pet = ({
  isFetching,
}: PetProps): ReactElement => (
  <>
    {isFetching ? (
      <div className="pet__loader">
        <Loader active size="huge" inline="centered" />
      </div>
    ) : (
      <div className="pet__content" />
    )}
  </>
)

export default Pet
