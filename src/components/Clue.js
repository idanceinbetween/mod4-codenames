import React, { Component, Fragment } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

class Clue extends Component {
  state = { numberClue: '', textClue: '' }

  /* possible terrible inputs 
Number field: "a", 0, empty, -4, 1+, 1*91o
Text field: 2, "two words", empty
  */

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = e => {
    const result = this.validateInput(e)
    if (result) {
      this.setState({ numberClue: '', textClue: '' })
      this.props.handleClueSubmit(e)
    } else {
      alert('Please write correct input or complete both clues.')
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

    return checkType && numberValueAndSingleWord && notEmpty
  }

  render() {
    const { numberClue, textClue } = this.state
    const { spymasterView, clue } = this.props

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
          <Segment inverted>
            Number Clue: {clue.numberClue}
            <br />
            Text Clue: {clue.textClue}
            <br />
            PICK YOUR GUESSES NOW!
          </Segment>
        )}
      </Fragment>
    )
  }
}

export default Clue
