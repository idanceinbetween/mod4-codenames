// import React, { Component } from "react";
import React from "react";
import { Card } from "semantic-ui-react";
import WordCard from "./WordCard";

const mapWordsWithColors = props => {
  return (
    <Card.Group itemsPerRow={5}>
      {props.words.map(word => (
        <WordCard word={word} spymasterView={props.spymasterView} />
      ))}
    </Card.Group>
  );
};

const mapWordsNoColors = props => {
  const newArray = props.words.map(word => {
    delete word.color;
    return word;
  });

  return (
    <Card.Group itemsPerRow={5}>
      {newArray.map(word => (
        <WordCard
          word={word}
          spymasterView={props.spymasterView}
          handleCardSelect={word => props.handleCardSelect(word)}
        />
      ))}
    </Card.Group>
  );
};

const GameBoard = props => {
  if (props.spymasterView) {
    return mapWordsWithColors(props);
  } else {
    return mapWordsNoColors(props);
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
