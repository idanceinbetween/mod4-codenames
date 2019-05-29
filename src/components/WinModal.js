import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const redBg = {
  'background-color': 'rgba(255,0,0,.5)'
}

const blueBg = {
  'background-color': 'rgba(0,0,255,.5)'
}

const WinModal = props => {
  return (
    <Modal
      open={props.openModal}
      onClose={props.closeModal}
      basic
      size='large'
      centered
      style={props.winner === 'red' ? redBg : blueBg}
    >
      <Modal.Content>
        <h2 align='center'>{props.logMessage}</h2>
        <h1 align='center'>
          All {props.winner} code words found.
          <br />
          TEAM {props.winner.toUpperCase()} WINS! Congratulations!
          <br />
          Ready to start a new game?
        </h1>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.closeModal} inverted>
          <Icon name='user secret' /> View board
        </Button>
        <Button onClick={props.startNewGame} inverted>
          <Icon name='gamepad' /> Start new game
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default WinModal
