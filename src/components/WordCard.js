import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class WordCard extends Component {
  state = { revealed: false };

  render() {
    const { word } = this.props;
    return (
      <Card
        header={word}
        className="cnWord"
        onClick={() => console.log(`WordCard ${word} clicked`)}
      />
    );
  }
}

export default WordCard;
