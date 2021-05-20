/* eslint-disable */
import React from 'react'
import { addParameters } from  '@storybook/react'
import { withData } from './index'
import notes from './notes.md'
import { Segment } from 'semantic-ui-react'

const Component = ({ data }) => {
  return <Segment><h1>{data.text}</h1></Segment>
}

const ComponentWithData = withData(Component)
// Общие свойства раздела
export default {
  id: '3',
  title: 'HOC|Получение данных с сервера',
  component: ComponentWithData,
  // decorators: [ storyFn => (<div style={{ margin: '20px auto' }}>{storyFn()}</div>)],
  parameters: {
    component: ComponentWithData,
    notes
  },
}

addParameters({
  docs: {
    extractDescription: ComponentWithData,
  },
  component: ComponentWithData
})

const mockGetData = (cancelToken) => {
  return Promise.resolve({ text: "Это загруженные данные сервера"})
}

// Первичный компонент
export const withDataHOC = () => (
  <ComponentWithData
    fetchData={mockGetData}
    loading
  />
);
