import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import GameBoard from "../components/GameBoard";
import Scoreboard from "../components/Scoreboard";
import Timer from "../components/Timer";
import Clue from "../components/Clue";
// import { mixedTypeAnnotation } from "@babel/types";

// const randomWords = require("random-words");
// const baseUrl = "localhost:3007";
// const wordsUrl = baseUrl + "/start";

class GameContainer extends Component {
  state = {
    words: [],
    scores: [{ color: "red", score: 0 }, { color: "blue", score: 0 }],
    spymasterView: true, //as soon as it is false, color key/value pair in each word disappears. Does not come back if switches back on.
    clue: { numberClue: null, textClue: null },
    guesses: 1,
    activeTeam: null
  };

  getWords = () => {
    // const words = randomWords({ exactly: 25, maxLength: 15 });
    const words = [
      { id: 1, word: "phoenix", color: "r" },
      { id: 2, word: "ocean", color: "b" },
      { id: 3, word: "washington", color: "a" },
      { id: 4, word: "wallet", color: "y" },
      { id: 5, word: "slug", color: "b" }
    ];
    this.setState({ words });
    console.log(`get words from server and put in state`);
  };

  componentDidMount() {
    this.getWords();
  }

  handleClueSubmit = event => {
    this.setState({
      clue: {
        ...this.state.clue,
        numberClue: event.target["numberClue"].value,
        textClue: event.target["textClue"].value
      },
      spymasterView: false
    });
  };

  increaseGuesses = () => {
    const guesses = this.state.guesses + 1;
    this.setState({ guesses });
  };

  restoreSpymasterView = () => {
    this.getWords();
    this.setState({
      spymasterView: !this.state.spymasterView,
      guesses: 1,
      clue: { numberClue: null, textClue: null }
    });
    console.log(`Spymaster's View Restored!`);
  };

  addScore = () => {};

  checkHit = word => {
    return console.log(`${word} is being checked on server`);
    //if correct, this.addScore
  };

  handleCardSelect = word => {
    this.increaseGuesses();
    if (this.state.guesses === parseInt(this.state.clue["numberClue"], 10)) {
      this.checkHit(word.word);
      this.restoreSpymasterView();
    } else {
      this.checkHit(word.word);
    }
  };

  render() {
    const { words, scores, spymasterView, clue } = this.state;
    return (
      <Grid columns={4} centered>
        <Grid.Row verticalAlign="top">
          <Grid.Column width={3}>
            <Scoreboard scores={scores} />
          </Grid.Column>
          <Grid.Column width={10}>
            <Clue
              handleClueSubmit={this.handleClueSubmit}
              spymasterView={spymasterView}
              clue={clue}
            />
            <GameBoard
              words={words}
              spymasterView={spymasterView}
              handleCardSelect={word => this.handleCardSelect(word)}
            />
          </Grid.Column>
          <Grid.Column width={3}>
            <Timer />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered columns={16}>
          <Grid.Column width={3}> </Grid.Column>
          <Grid.Column width={10} align="center">
            Placeholder for Spymaster Component
          </Grid.Column>
          <Grid.Column width={3}> </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default GameContainer;
