import React, { Fragment } from 'react'
import { Segment } from 'semantic-ui-react'

const LogPanel = props => {
  debugger
  return (
    <Fragment>
      <Segment.Group horizontal>
        <Segment>Whose turn?: {props.activeTeam} </Segment>
        {!isNaN(props.canGuess) && (
          <Segment>
            Current guesses left: {props.canGuess - props.guesses}
          </Segment>
        )}
      </Segment.Group>
      <Segment.Group>
        {props.errorMessage.length > 1 && (
          <Segment>Error Message: {props.errorMessage}</Segment>
        )}
      </Segment.Group>
    </Fragment>
  )
}

export default LogPanel
