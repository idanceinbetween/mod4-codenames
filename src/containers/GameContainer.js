import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import Timer from '../components/Timer'
import Clue from '../components/Clue'
// import { thisTypeAnnotation } from "@babel/types";

// const baseUrl = "localhost:3007";
// const wordsUrl = baseUrl + "/start";

const DATA = [
  { id: 1, word: 'phoenix', color: 'r' },
  { id: 2, word: 'ocean', color: 'b' },
  { id: 3, word: 'washington', color: 'a' },
  { id: 4, word: 'wallet', color: 'y' },
  { id: 5, word: 'slug', color: 'b' }
]

const SERVERDATA = [
  { id: 1, word: 'phoenix', color: 'r' },
  { id: 2, word: 'ocean', color: 'b' },
  { id: 3, word: 'washington', color: 'a' },
  { id: 4, word: 'wallet', color: 'y' },
  { id: 5, word: 'slug', color: 'b' }
]

const colorCodes = {
  b: 'blue',
  r: 'red',
  y: 'yellow',
  a: 'assassin'
}

const swapTeam = {
  blue: 'red',
  red: 'blue'
}

class GameContainer extends Component {
  state = {
    words: [],
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: '', textClue: '' },
    guesses: 0,
    activeTeam: '',
    timer: 5,
    runTimer: true
  }

  getWords = () => {
    this.setState({ words: DATA })
  }

  setTeam = () => {
    const blueWords = DATA.filter(w => w.color === 'b')
    const redWords = DATA.filter(w => w.color === 'r')
    blueWords.length > redWords.length
      ? this.setState({ activeTeam: 'blue' })
      : this.setState({ activeTeam: 'red' })
  }

  componentDidMount() {
    this.getWords()
    this.setTeam()
  }

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
    this.getWords()
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

  findWordOnServer = word => SERVERDATA.find(w => w.id === word.id)

  checkHit = word => {
    const result = this.findWordOnServer(word)
    switch (colorCodes[result.color]) {
      case this.state.activeTeam:
        this.addScore()
        return true
      case 'assassin':
        return false
      default:
        this.increaseGuesses()
        console.log('wrong guess')
        return true
    }
  }

  swapTeam = () => {
    const team = this.state.activeTeam
    this.setState({ activeTeam: swapTeam[team] })
  }

  handleCardSelect = word => {
    const result = this.checkHit(word)
    result ? this.increaseGuesses() : console.log('game ends')
  }

  handleBomb = () => {
    console.log("Time's up! Next view.")
    this.swapTeam()
    if (this.state.spymasterView) {
      //spymaster's turn but didn't give clue, swap team and keep spymasterview
      this.setState({ timer: 5 })
    } else {
      //players turn, didn't pick card, swap team and change to spymasterview
      this.setState({ spymasterView: !this.state.spymasterView, timer: 5 })
    }
  }

  render() {
    const { words, scores, spymasterView, clue, timer, activeTeam } = this.state
    return (
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
            <Timer
              timer={timer}
              runTimer={this.state.runTimer}
              bomb={this.handleBomb}
              activeTeam={activeTeam}
            />
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
    )
  }
}

export default GameContainer
