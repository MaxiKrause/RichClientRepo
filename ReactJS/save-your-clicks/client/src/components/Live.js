import React from 'react'
import styled, { css } from 'styled-components'
import * as polished from 'polished'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'


class Live extends React.Component {

 return(){

    <LiveProvider code="<strong>Hello World!</strong>">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  }
}
export default Live