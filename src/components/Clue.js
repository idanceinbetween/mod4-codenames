import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { format } from "util";

class Clue extends Component {
  state = {};

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = e => {
    this.setState({ numberClue: "", textClue: "" });
    this.props.handleClueSubmit(e);
  };

  render() {
    const { numberClue, textClue } = this.state;

    return (
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
    );
  }
}

export default Clue;
