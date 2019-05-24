// import React, { Component } from "react";
import React from "react";
import { Card } from "semantic-ui-react";
import WordCard from "./WordCard";

const mapWordsWithColors = words => words.map(word => <WordCard word={word} />);

const mapWordsNoColors = words => {
  const newArray = words.map(word => {
    delete word.color;
    return word;
  });

  return newArray.map(word => <WordCard word={word} />);
};

const GameBoard = props => {
  if (props.spymasterView) {
    return mapWordsWithColors(props.words);
  } else {
    return mapWordsNoColors(props.words);
  }
};

export default GameBoard;

// class GameBoard extends Component {
//   renderWordCards = () =>
//     this.props.words.map(word => {
//       return <WordCard word={word} />;
//     });

//   render() {
//     return <Card.Group itemsPerRow={5}>{this.renderWordCards()}</Card.Group>;
//   }
// }

// export default GameBoard;

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
