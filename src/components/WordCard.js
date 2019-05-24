import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class WordCard extends Component {
  //   state = { revealed: false };

  render() {
    const { word } = this.props;
    // const { word, color } = this.props.word;
    return (
      <Card
        className="cnWord"
        onClick={() =>
          console.log(`WordCard ${word.word} of ${word.color} clicked`)
        }
      >
        <Card.Header>{word.word}</Card.Header>
      </Card>
    );
  }
}

export default WordCard;
