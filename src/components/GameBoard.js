// import _ from "lodash";
import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import WordCard from "./WordCard";

const randomWords = require("random-words");

class GameBoard extends Component {
  state = { words: [] };

  componentDidMount() {
    const words = randomWords({ exactly: 25, maxLength: 15 });
    this.setState({ words });
  }

  renderWordCards = () =>
    this.state.words.map(word => {
      return <WordCard word={word} />;
    });

  render() {
    return <Card.Group itemsPerRow={5}>{this.renderWordCards()}</Card.Group>;
  }
}

export default GameBoard;

// {this.colors.map(color => (
//   <Grid.Column color={color} key={color}>
//     {_.capitalize(color)}
//   </Grid.Column>
// ))}

// colors = [
//   "red",
//   "orange",
//   "yellow",
//   "olive",
//   "green",
//   "teal",
//   "blue",
//   "violet",
//   "purple",
//   "pink",
//   "brown",
//   "grey",
//   "black",
//   "red",
//   "orange",
//   "yellow",
//   "olive",
//   "green",
//   "teal",
//   "blue",
//   "violet",
//   "purple",
//   "pink",
//   "brown",
//   "grey"
// ];
