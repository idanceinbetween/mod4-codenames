import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

const swapTeam = {
  blue: 'RED',
  red: 'BLUE'
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
        <h1 align='center'>
          Team {props.activeTeam.toUpperCase()}, your turn has ended.
          <br />
          Spymaster of team {swapTeam[props.activeTeam]}
          <br />
          PLEASE SHOW YOURSELF NOW!
        </h1>
      </Modal.Content>
      <Modal.Actions>
        <Button color='white' onClick={props.closeModal} inverted>
          <Icon name='checkmark' /> I'm here!
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default SwapViewModal
