import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import Timer from '../components/Timer'
import Clue from '../components/Clue'

const baseUrl = 'http://localhost:3007'
const startUrl = baseUrl + '/start'
const gamesUrl = baseUrl + '/games'

const swapTeam = {
  blue: 'red',
  red: 'blue'
}

class GameContainer extends Component {
  state = {
    words: [],
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: null, textClue: null },
    guesses: 0,
    activeTeam: null,
    gameId: null
  }

  componentDidMount() {
    this.startGame().then(data => {
      this.setInitialState(data)
    })
  }

  startGame = () => fetch(startUrl).then(resp => resp.json())

  setInitialState = data => {
    const blueWords = data.tiles.filter(w => w.color === 'blue')
    const redWords = data.tiles.filter(w => w.color === 'red')
    blueWords.length > redWords.length
      ? this.setState({
          activeTeam: 'blue',
          words: data.tiles,
          gameId: data.id
        })
      : this.setState({
          activeTeam: 'red',
          words: data.tiles,
          gameId: data.id
        })
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
      this.getGame().then(data => this.restoreSpymasterView(data))
    }
  }

  restoreSpymasterView = data => {
    this.setState({
      words: data.tiles,
      spymasterView: !this.state.spymasterView,
      guesses: 0,
      clue: { numberClue: null, textClue: null }
    })
    console.log(`Spymaster's View Restored!`)
  }

  addScore = team => {
    const score = this.state.scores[team] + 1
    this.setState({
      scores: { ...this.state.scores, [team]: score }
    })
  }

  getGame = () =>
    fetch(gamesUrl + `/${this.state.gameId}`).then(resp => resp.json())

  findWordOnServer = word => {
    return this.getGame()
      .then(data => data.tiles.find(w => w.word === word.word))
      .then(foundWord => {
        switch (foundWord.color) {
          case this.state.activeTeam:
            console.log('Correct Guess!')
            this.addScore(this.state.activeTeam)
            return true // pass back to handleCardSelect to increaseGuesses etc
          case swapTeam[this.state.activeTeam]:
            console.log("Other team's word!")
            this.addScore(this.swapTeam[this.state.activeTeam])
            return true
          case 'assassin':
            console.log('You picked the assassin.')
            return false
          default:
            //yellow tile
            console.log('wrong guess')
            return true
        }
      })
  }
  // .catch(err => {
  //   if (err.text) {
  //     err.text().then(errorMessage => {
  //       this.props.dispatch(displayTheError(errorMessage));
  //     });
  //   } else {
  //     this.props.dispatch(displayTheError("There was an error.")); // Hardcoded error here
  //   }
  // });

  // checkHit = word => {
  //   // const result = this.findWordOnServer(word);
  //   debugger;
  //   switch (word.color) {
  //     case this.state.activeTeam:
  //       this.addScore();
  //       return true;
  //     case "assassin":
  //       return false;
  //     default:
  //       this.increaseGuesses();
  //       console.log("wrong guess");
  //       return true;
  //   }
  // };

  swapTeam = () => {
    const team = this.state.activeTeam
    this.setState({ activeTeam: swapTeam[team] })
  }

  handleCardSelect = word => {
    this.findWordOnServer(word).then(result => {
      result ? this.increaseGuesses() : console.log('game ends')
    })
  }

  render() {
    const { words, scores, spymasterView, clue } = this.state
    return (
      <Grid columns={4} centered>
        <Grid.Row verticalAlign='top'>
          <Grid.Column width={3}>
            <Scoreboard scores={scores} />
          </Grid.Column>
          <Grid.Column width={10}>
            <h1>
              {this.state.spymasterView ? 'Spymaster View' : 'Players View'}
            </h1>
            <h2>Game ID: {this.state.gameId}</h2>
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
          <Grid.Column width={3}>{/* <Timer /> */}</Grid.Column>
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
