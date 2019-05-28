import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'

import AbsoluteWrapper from '../components/AbsoluteWrapper'
import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import Clue from '../components/Clue'
import Timer from '../components/Timer'

const baseUrl = 'http://localhost:3007'
const startUrl = baseUrl + '/start'
const gamesUrl = baseUrl + '/games'

const swapTeam = {
  blue: 'red',
  red: 'blue'
}

const rules = {
  timer: 15
}

class GameContainer extends Component {
  state = {
    tiles: [],
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: '', textClue: '' },
    guesses: 0,
    activeTeam: '',
    gameId: null,
    timer: rules.timer,
    runTimer: true
  }

  componentDidMount() {
    this.startGame().then(data => {
      this.setInitialState(data)
    })
  }

  startGame = () => fetch(startUrl).then(resp => resp.json())

  setInitialState = data => {
    let { tiles } = data
    // add a REVEALED_COLOR attribute to tiles so that GameContainer + GameBoard know which ones have been guessed already
    tiles.forEach(tile => (tile.revealedColor = null))
    let activeTeam = ''
    const gameId = data.id

    const blueTiles = tiles.filter(w => w.color === 'blue')
    const redTiles = tiles.filter(w => w.color === 'red')
    blueTiles.length > redTiles.length
      ? (activeTeam = 'blue')
      : (activeTeam = 'red')

    this.setState({ activeTeam, tiles, gameId })
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

  handleTileSelect = tile => {
    return this.findTileOnServer(tile)
      .then(serverTile => {
        // here we have to change the selected tile in state.tiles, without mutating state directly...
        const tiles = [...this.state.tiles]
        const tileToUpdate = tiles.find(t => t.id === tile.id)
        tileToUpdate.revealedColor = serverTile.color
        this.setState({ tiles })
        return this.checkTileColorAndCalculateScore(serverTile)
      })
      .then(result =>
        result
          ? this.increaseGuesses(result)
          : this.triggerGameOver()
      )
  }

  getGame = () =>
    fetch(gamesUrl + `/${this.state.gameId}`)
      .then(resp => resp.json())
      .then(game => {
        const orderedTiles = {
          ...game,
          tiles: game.tiles.sort((a, b) => a.id - b.id)
        }
        return orderedTiles
      })

  findTileOnServer = tile =>
    this.getGame().then(game => game.tiles.find(t => t.id === tile.id))

  checkTileColorAndCalculateScore = selectedTile => {
    switch (selectedTile.color) {
      case this.state.activeTeam:
        console.log('Correct guess!')
        this.addScore(this.state.activeTeam)
        return 'continue' // pass back to handleTileSelect to increaseGuesses etc
      case swapTeam[this.state.activeTeam]:
        console.log('Wrong guess: enemy tile!')
        this.addScore(swapTeam[this.state.activeTeam])
        return 'endTurn'
      case 'yellow':
        //yellow tile
        console.log('Wrong guess: neutral tile')
        return 'endTurn'
      case 'assassin':
        console.log('You picked the assassin.')
        return false
    }
  }

  triggerGameOver = () => {
    console.log("YOU LOSE")
  }

  addScore = team => {
    const score = this.state.scores[team] + 1
    this.setState({
      scores: { ...this.state.scores, [team]: score }
    })
  }

  increaseGuesses = result => {
    const guesses = this.state.guesses + 1
    this.setState({ guesses })
    if (
      result === 'continue' &&
      !(guesses <= parseInt(this.state.clue['numberClue'], 10))
    ) {
      this.endTurn()
    } else if (result === 'endTurn') {
      this.endTurn()
    }
  }

  endTurn = () => {
    this.swapTeam()
    this.getGame().then(game => this.restoreSpymasterView(game))
  }

  swapTeam = () => {
    const team = this.state.activeTeam
    const timer = this.state.timer
    this.setState({ activeTeam: swapTeam[team], timer })
  }

  restoreSpymasterView = game => {
    // instead of overwriting the tiles, we keep their revealedColor property that we added on game start.
    const tiles = [...this.state.tiles]
    tiles.forEach((tile, i) => (tile.color = game.tiles[i].color))

    this.setState({
      tiles,
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

  handleBomb = () => {
    this.swapTeam()
    if (this.state.spymasterView) {
      //spymaster's turn but didn't give clue, swap team and keep spymasterview
      this.setState({ timer: rules.timer })
    } else {
      //players turn, didn't pick card, swap team and change to spymasterview
      this.getGame().then(game => this.restoreSpymasterView(game))
    }
  }

  pauseGame = () => {
    this.setState({ runTimer: !this.state.runTimer })
  }

  render() {
    const { tiles, scores, spymasterView, clue, timer, activeTeam } = this.state
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
              <h5>Game ID: {this.state.gameId}</h5>
              <Clue
                handleClueSubmit={this.handleClueSubmit}
                spymasterView={spymasterView}
                clue={clue}
              />
              <GameBoard
                tiles={tiles}
                // selectedTile={this.state.selectedTile}
                spymasterView={spymasterView}
                handleTileSelect={tile => this.handleTileSelect(tile)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Timer
                timer={timer}
                runTimer={this.state.runTimer}
                bomb={this.handleBomb}
                activeTeam={activeTeam}
              />
              <Button onClick={() => this.pauseGame()}>
                {this.state.runTimer ? 'Pause Game' : 'Resume Game'}
              </Button>
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
