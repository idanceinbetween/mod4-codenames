import React, { Fragment } from 'react'
import { Segment } from 'semantic-ui-react'

const LogPanel = props => {
  return (
    <Fragment>
      <Segment.Group>
        {props.activeTeam === 'blue' && (
          <Segment inverted color='blue'>
            Team <b>{props.activeTeam}</b>, you're up!
          </Segment>
        )}
        {props.activeTeam === 'red' && (
          <Segment inverted color='red'>
            Team <b>{props.activeTeam}</b>, you're up!
          </Segment>
        )}
      </Segment.Group>
      <Segment.Group>
        <Segment color='violet'>
          Log Message: <b>{props.logMessage}</b>
        </Segment>
      </Segment.Group>
    </Fragment>
  )
}

export default LogPanel
