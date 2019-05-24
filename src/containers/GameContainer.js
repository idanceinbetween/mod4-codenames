import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import GameBoard from "../components/GameBoard";
import Scoreboard from "../components/Scoreboard";
import Timer from "../components/Timer";
import Clue from "../components/Clue";

// const randomWords = require("random-words");
// const baseUrl = "localhost:3007";
// const wordsUrl = baseUrl + "/start";

const DATA = [
  { id: 1, word: "phoenix", color: "r" },
  { id: 2, word: "ocean", color: "b" },
  { id: 3, word: "washington", color: "a" },
  { id: 4, word: "wallet", color: "y" },
  { id: 5, word: "slug", color: "b" }
];

const SERVERDATA = [
  { id: 1, word: "phoenix", color: "r" },
  { id: 2, word: "ocean", color: "b" },
  { id: 3, word: "washington", color: "a" },
  { id: 4, word: "wallet", color: "y" },
  { id: 5, word: "slug", color: "b" }
];

const colorCodes = {
  b: "blue",
  r: "red",
  y: "yellow",
  a: "assassin"
};

const swapTeam = {
  blue: "red",
  red: "blue"
};

class GameContainer extends Component {
  state = {
    words: [],
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: null, textClue: null },
    guesses: 1,
    activeTeam: "blue"
  };

  getWords = () => {
    // const words = randomWords({ exactly: 25, maxLength: 15 });
    this.setState({ words: DATA });
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

  addScore = () => {
    const score = this.state.scores[this.state.activeTeam] + 1;
    this.setState({
      scores: { ...this.state.scores, [this.state.activeTeam]: score }
    });
  };

  findWordOnServer = word => SERVERDATA.find(w => w.id === word.id);

  checkHit = word => {
    const result = this.findWordOnServer(word);

    switch (colorCodes[result.color]) {
      case this.state.activeTeam:
        this.addScore();
        break;
      case "assassin":
        console.log("you've hit assassin");
        break;
      default:
        console.log("wrong guess");
    }
  };

  swapTeam = () => {
    const team = this.state.activeTeam;
    this.setState({ activeTeam: swapTeam[team] });
  };

  handleCardSelect = word => {
    this.increaseGuesses();
    if (this.state.guesses === parseInt(this.state.clue["numberClue"], 10)) {
      this.checkHit(word);
      this.swapTeam();
      this.restoreSpymasterView();
    } else {
      this.checkHit(word);
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
