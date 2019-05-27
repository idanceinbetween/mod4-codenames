import React, { Component, Fragment } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

class Clue extends Component {
  state = { numberClue: null, textClue: null };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    if (e.target["numberClue"].value || e.target["textClue"].value) {
      this.setState({ numberClue: "", textClue: "" });
      this.props.handleClueSubmit(e);
    } else {
      alert("Please complete both clues.");
    }
  };

  render() {
    const { numberClue, textClue } = this.state;
    const { spymasterView, clue } = this.props;

    return (
      <Fragment>
        {spymasterView && (
          <Segment inverted>
            <Form inverted onSubmit={this.handleSubmit}>
              <Form.Group widths="equal">
                <Form.Input
                  name="numberClue"
                  placeholder="What's the number clue?"
                  width={4}
                  value={numberClue}
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="textClue"
                  placeholder="What's the word clue?"
                  width={8}
                  value={textClue}
                  onChange={this.handleChange}
                />
                <Button type="submit">Submit</Button>
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
    );
  }
}

export default Clue;
