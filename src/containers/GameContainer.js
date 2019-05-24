import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import GameBoard from "../components/GameBoard";
import Scoreboard from "../components/Scoreboard";
import Timer from "../components/Timer";
import Clue from "../components/Clue";

// const randomWords = require("random-words");
const baseUrl = "localhost:3007";
const wordsUrl = baseUrl + "/start";

class GameContainer extends Component {
  state = {
    words: [],
    scores: [{ color: "red", score: 0 }, { color: "blue", score: 0 }],
    spymasterView: true, //as soon as it is false, color key/value pair in each word disappears. Does not come back if switches back on.
    clue: { numberClue: null, textClue: null }
  };

  getWords = () => {
    // const words = randomWords({ exactly: 25, maxLength: 15 });
    const words = [
      { word: "phoenix", color: "r" },
      { word: "ocean", color: "b" },
      { word: "washington", color: "a" },
      { word: "wallet", color: "y" },
      { word: "slug", color: "b" }
    ];
    this.setState({ words });
    //fetch from 'wordsUrl'
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
            <GameBoard words={words} spymasterView={spymasterView} />
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
