import React, { Component } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

class Clue extends Component {
  state = {};
  render() {
    return (
      <Segment inverted>
        <Form inverted>
          <Form.Group widths="equal">
            <Form.Input placeholder="What's the number clue?" width={4} />
            <Form.Input placeholder="What's the word clue?" width={8} />
            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default Clue;
