import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import AbsoluteWrapper from '../components/AbsoluteWrapper'
import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
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
    tiles: [],
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: null, textClue: null },
    guesses: 0,
    activeTeam: null,
    gameId: null,
    selectedTile: {}
  }

  componentDidMount() {
    this.startGame().then(data => {
      this.setInitialState(data)
    })
  }

  startGame = () => fetch(startUrl).then(resp => resp.json())

  setInitialState = data => {
    const blueTiles = data.tiles.filter(w => w.color === 'blue')
    const redTiles = data.tiles.filter(w => w.color === 'red')
    blueTiles.length > redTiles.length
      ? this.setState({
          activeTeam: 'blue',
          tiles: data.tiles,
          gameId: data.id
        })
      : this.setState({
          activeTeam: 'red',
          tiles: data.tiles,
          gameId: data.id
        })
  }

  handleClueSubmit = event =
    this.setState({
      clue: {
        ...this.state.clue,
        numberClue: event.target['numberClue'].value,
        textClue: event.target['textClue'].value
      },
      spymasterView: false
    })
  }

  handleTileSelect = tile => {
    return this.getGame()
      .then(() => this.findTileOnServer(tile))
      .then(selectedTile => this.checkTileStatus(selectedTile))
      .then(result =>
        result ? this.increaseGuesses() : console.log('game ends, you found the assassin!')
      )
  }

  getGame = () =>
    fetch(gamesUrl + `/${this.state.gameId}`).then(resp => resp.json())

  findTileOnServer = tile => {
    return this.getGame().then(data => data.tiles.find(t => t.id === tile.id))
  }

  checkTileStatus = selectedTile => {
    switch (selectedTile.color) {
      case this.state.activeTeam:
        this.addScore(this.state.activeTeam)
        return true // pass back to handleTileSelect to increaseGuesses etc
      case swapTeam[this.state.activeTeam]:
        console.log("Other team's tile!")
        this.addScore(this.swapTeam[this.state.activeTeam])
        return true
      case 'assassin':
        console.log('You picked the assassin.')
        return false
      default:
        //yellow tile
        console.log('Wrong guess, move on')
        return true
    }
  }

  addScore = team => {
    const score = this.state.scores[team] + 1
    this.setState({
      scores: { ...this.state.scores, [team]: score }
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

  swapTeam = () => {
    const team = this.state.activeTeam
    this.setState({ activeTeam: swapTeam[team] })
  }

  restoreSpymasterView = data => {
    this.setState({
      tiles: data.tiles,
      spymasterView: !this.state.spymasterView,
      guesses: 0,
      clue: { numberClue: null, textClue: null }
    })
    console.log(`Spymaster's View Restored!`)
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



  render() {

    const { tiles, scores, spymasterView, clue } = this.state
    return (
            <AbsoluteWrapper>
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
            <h2>{this.state.activeTeam}</h2>
            <Clue
              handleClueSubmit={this.handleClueSubmit}
              spymasterView={spymasterView}
              clue={clue}
            />
            <GameBoard
              tiles={tiles}
              selectedTile={this.state.selectedTile}
              spymasterView={spymasterView}
              handleTileSelect={tile => this.handleTileSelect(tile)}
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
          </AbsoluteWrapper>
    )
  }
}

export default GameContainer
