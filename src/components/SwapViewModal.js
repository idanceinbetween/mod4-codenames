import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const swapTeam = {
  blue: 'RED',
  red: 'BLUE'
}

const swapColor = {
  blue: 'red',
  red: 'blue'
}

const SwapViewModal = props => {

  return (
    <Modal
      open={props.openModal}
      onClose={props.closeModal}
      basic
      size='large'
      centered
    >
      <Modal.Content>
        <h2 align='center'>{props.logMessage}</h2>
        <h1 align='center'>
          {`Team ${props.activeTeam.toUpperCase()}, your turn has ended.`}
          <br />
          Spymaster of team {swapTeam[props.activeTeam]}
          <br />
          PLEASE SHOW YOURSELF NOW!
        </h1>
      </Modal.Content>
      <Modal.Actions>
        <br/>
        <Button onClick={props.closeModal} color={swapColor[props.activeTeam]}>
          <Icon name='checkmark' /> I'm here!
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default SwapViewModal
