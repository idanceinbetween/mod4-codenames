import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class WordCard extends Component {
  //   state = { revealed: false };

  checkSelect = () => {
    if (!this.props.spymasterView) {
      this.props.handleCardSelect(this.props.word);
    }
  };

  render() {
    const { word } = this.props;
    // const { word, color } = this.props.word;
    return (
      <Card className="cnWord" onClick={this.checkSelect}>
        <Card.Header>{word.word}</Card.Header>
      </Card>
    );
  }
}

export default WordCard;
