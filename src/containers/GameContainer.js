import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import AbsoluteWrapper from '../components/AbsoluteWrapper'

import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import Timer from '../components/Timer'
import Clue from '../components/Clue'

const baseUrl = "http://localhost:3007";
const wordsUrl = baseUrl + "/start";
const gamesUrl = baseUrl + "/games";

const swapTeam = {
  blue: 'red',
  red: 'blue'
}

class GameContainer extends Component {
  state = {
    gameId: null,
    words: [],
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: null, textClue: null },
    guesses: 0,
    activeTeam: null
  }

  getWords = () =>
    fetch(wordsUrl)
      .then(resp => resp.json())
      .then(game => this.setState({
        gameId: game.id,
        words: game.tiles
      }))

  setTeam = () => {
    const blueWords = this.state.words.filter(w => w.color === "blue");
    const redWords = this.state.words.filter(w => w.color === "red");
    blueWords.length > redWords.length
      ? this.setState({ activeTeam: "blue" })
      : this.setState({ activeTeam: "red" })
  };

  componentDidMount() {
    this.getWords().then(() => this.setTeam())

  handleClueSubmit = event => {
    this.setState({
      clue: {
        ...this.state.clue,
        numberClue: event.target['numberClue'].value,
        textClue: event.target['textClue'].value
      },
      spymasterView: false
    })
  }

  increaseGuesses = () => {
    const guesses = this.state.guesses + 1
    this.setState({ guesses })
    if (!(guesses < parseInt(this.state.clue['numberClue'], 10))) {
      this.swapTeam()
      this.restoreSpymasterView()
    }
  }

  restoreSpymasterView = () => {
    this.setState({
      spymasterView: !this.state.spymasterView,
      guesses: 0,
      clue: { numberClue: null, textClue: null }
    })
    console.log(`Spymaster's View Restored!`)
  }

  addScore = () => {
    const score = this.state.scores[this.state.activeTeam] + 1
    this.setState({
      scores: { ...this.state.scores, [this.state.activeTeam]: score }
    })
  }

  findWordOnServer = word => {
    return fetch(gamesUrl + `/${this.state.gameId}`)
            .then(resp => resp.json())
            .then(game => 
              game.tiles.find(tile => tile.word === word.word)
            )
  }

  checkHit = word => {
    return this.findWordOnServer(word)
      .then(tile => {
        switch (tile.color) {
          case this.state.activeTeam:
            console.log("correct")
            this.addScore();
            return true;
          case swapTeam[this.state.activeTeam]:
            console.log("other team's word!");
            this.swapTeam();
            this.restoreSpymasterView();
            return true
          case "assassin":
            console.log("the assassin appears.")
            return false;
          case "yellow":
            console.log("neutral tile");
            this.swapTeam();
            this.restoreSpymasterView();
            return true
          default:
            console.log("wrong guess");
            return true;
        }
      })
  };


  swapTeam = () => {
    const team = this.state.activeTeam
    this.setState({ activeTeam: swapTeam[team] })
  }

  handleCardSelect = word => {
    this.checkHit(word).then(hit => {
      hit ? this.increaseGuesses() : console.log(`game over for ${this.state.activeTeam} team!`)
    })
  };


  render() {
    const { words, scores, spymasterView, clue } = this.state
    return (
      <AbsoluteWrapper>
        <Grid columns={4} centered>
          <Grid.Row verticalAlign='top'>
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
            <Grid.Column width={10} align='center'>
              Placeholder for Spymaster Component
            </Grid.Column>
            <Grid.Column width={3}> </Grid.Column>
          </Grid.Row>
        </Grid>
      </AbsoluteWrapper>
    )
  }
}

export default GameContainer
