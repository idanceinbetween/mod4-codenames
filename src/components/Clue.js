import React, { Component, Fragment } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

class Clue extends Component {
  state = { numberClue: '', textClue: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    const result = this.validateInput(e)

    switch (result) {
      case 'checkType':
        this.props.handleLogMessage(
          'Please check your input: Is number clue a number? Is text clue a word?'
        )
        break
      case 'numberValueAndSingleWord':
        this.props.handleLogMessage(
          'Please ensure number clue is a number between 1 and 9, and text clue is a single word!'
        )
        break
      case 'notEmpty':
        this.props.handleLogMessage('Please do not leave fields empty.')
        break
      case 'true':
        this.setState({ numberClue: '', textClue: '' })
        this.props.handleClueSubmit(e)
        break
    }
  }

  validateInput = e => {
    const numberClue = parseInt(e.target['numberClue'].value)
    const textClue = e.target['textClue'].value

    const checkType =
      Number.isInteger(numberClue) && textClue.constructor === String
    const numberValueAndSingleWord =
      numberClue > 0 && numberClue <= 9 && !textClue.includes(' ')
    const notEmpty = textClue.length > 0

    if (!checkType) {
      return 'checkType'
    } else if (!numberValueAndSingleWord) {
      return 'numberValueAndSingleWord'
    } else if (!notEmpty) {
      return 'notEmpty'
    } else {
      return 'true'
    }
  }

  render() {
    const { numberClue, textClue } = this.state
    const { spymasterView, clue, canGuess, guesses } = this.props

    return (
      <Fragment>
        {spymasterView && (
          <Segment inverted>
            <Form inverted onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.Input
                  name='numberClue'
                  placeholder="What's the number clue?"
                  width={4}
                  value={numberClue}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name='textClue'
                  placeholder="What's the word clue?"
                  width={8}
                  value={textClue}
                  onChange={this.handleChange}
                />
                <Button type='submit'>Submit</Button>
              </Form.Group>
            </Form>
          </Segment>
        )}
        {!spymasterView && (
          <Segment.Group horizontal>
            <Segment inverted color='olive'>
              <b>Number Clue:</b> {clue.numberClue}
              <br />
              <b>Text Clue:</b> {clue.textClue}
            </Segment>

            {!isNaN(canGuess) && (
              <Segment inverted color='teal'>
                Current guesses left: <b>{canGuess - guesses}</b>
              </Segment>
            )}
          </Segment.Group>
        )}
      </Fragment>
    )
  }
}

export default Clue
