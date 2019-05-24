import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class WordCard extends Component {
  //   state = { revealed: false };

  checkSelect = () => {
    if (!this.props.spymasterView) {
      this.props.handleCardSelect(this.props.word);
    } else {
      console.log(
        `WordCard ${this.props.word.word} of ${
          this.props.word.color
        } clicked but nothing should happen because it's gamemasters turn`
      );
    }
  };

  render() {
    const { word, handleSelect } = this.props;
    // const { word, color } = this.props.word;
    return (
      <Card className="cnWord" onClick={this.checkSelect}>
        <Card.Header>{word.word}</Card.Header>
      </Card>
    );
  }
}

export default WordCard;
