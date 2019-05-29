import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'

import AbsoluteWrapper from '../components/AbsoluteWrapper'
import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import Clue from '../components/Clue'
import Timer from '../components/Timer'
import LogPanel from '../components/LogPanel'
import SwapViewModal from '../components/SwapViewModal'

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
    runTimer: true,
    logMessage: '',
    openModal: false
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
          : console.log('game ends, you found the assassin!')
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
        this.handleLogMessage('Hit!')
        this.addScore(this.state.activeTeam)
        return 'continue' // pass back to handleTileSelect to increaseGuesses etc
      case swapTeam[this.state.activeTeam]:
        this.handleLogMessage('Wrong guess: enemy tile!')
        this.addScore(swapTeam[this.state.activeTeam])
        return 'endTurn'
      case 'yellow':
        //yellow tile
        this.handleLogMessage('Wrong guess: neutral tile.')
        return 'endTurn'
      case 'assassin':
        this.handleLogMessage('You picked the assassin. Game over!')
        return false
    }
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
    this.setState({ openModal: true, runTimer: false })
  }

  closeModal = () => {
    this.setState({ openModal: false, runTimer: true })
    this.swapTeam()
    this.getGame().then(game => this.restoreSpymasterView(game))
  }

  swapTeam = () => {
    const team = this.state.activeTeam
    this.setState({ activeTeam: swapTeam[team] })
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
  //       this.props.dispatch(displayTheError(logMessage));
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

  handleLogMessage = message => {
    const a = new Date()
    const logMessage = message + ` [${a.toLocaleTimeString()}]`
    this.setState({ logMessage })
  }

  render() {
    const {
      tiles,
      scores,
      spymasterView,
      clue,
      timer,
      activeTeam,
      gameId,
      logMessage,
      guesses
    } = this.state

    return (
      <AbsoluteWrapper>
        <Grid columns={3} textAlign='center' verticalAlign='top'>
          <Grid.Row verticalAlign='top'>
            <Grid.Column width={3}>
              <Scoreboard scores={scores} />
            </Grid.Column>
            <Grid.Column width={10}>
              <LogPanel
                spymasterView={spymasterView}
                gameId={gameId}
                activeTeam={activeTeam}
                logMessage={logMessage}
              />
              <Clue
                handleClueSubmit={this.handleClueSubmit}
                spymasterView={spymasterView}
                clue={clue}
                canGuess={parseInt(clue['numberClue'], 10) + 1}
                guesses={guesses}
                handleLogMessage={str => this.handleLogMessage(str)}
              />
              <GameBoard
                tiles={tiles}
                spymasterView={spymasterView}
                handleTileSelect={tile => this.handleTileSelect(tile)}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Timer
                timer={timer}
                runTimer={this.state.runTimer}
                activeTeam={activeTeam}
                bomb={this.handleBomb}
              />
              <br />
              <Button onClick={() => this.pauseGame()}>
                {this.state.runTimer ? 'Pause Game' : 'Resume Game'}
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={16}>
            <Grid.Column width={3}> </Grid.Column>
            <Grid.Column width={10} align='center' />
            <Grid.Column width={3}> </Grid.Column>
          </Grid.Row>
        </Grid>

        <SwapViewModal
          activeTeam={activeTeam}
          openModal={this.state.openModal}
          closeModal={this.closeModal}
          logMessage={logMessage}
        />
      </AbsoluteWrapper>
    )
  }
}

export default GameContainer
