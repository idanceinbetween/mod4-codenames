import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'

import Sound from 'react-sound'
import goodHitSound from '../sound/codecopen.wav'
import badHitSound from '../sound/doorbuzz.wav'
import assassinSound from '../sound/gameover.wav'
import victorySound from '../sound/levelcomplete.mp3'
import ambientSound from '../sound/ambient.mp3'

import AbsoluteWrapper from '../components/AbsoluteWrapper'
import GameBoard from '../components/GameBoard'
import Scoreboard from '../components/Scoreboard'
import Clue from '../components/Clue'
import Timer from '../components/Timer'
import LogPanel from '../components/LogPanel'
import SwapViewModal from '../components/SwapViewModal'
import WinModal from '../components/WinModal'
import GameOverModal from '../components/GameOverModal'

const baseUrl = 'http://localhost:3007'
const startUrl = baseUrl + '/start'
const gamesUrl = baseUrl + '/games'

const swapTeam = {
  blue: 'red',
  red: 'blue'
}

const rules = {
  timer: 120
}

class GameContainer extends Component {
  state = {
    tiles: [],
    first: '',
    scores: { red: 0, blue: 0 },
    spymasterView: true,
    clue: { numberClue: '', textClue: '' },
    guesses: 0,
    activeTeam: '',
    gameId: null,
    timer: rules.timer,
    runTimer: true,
    frozen: false,
    logMessage: '',
    openModal: false,
    winner: '',
    assassin: false,
    goodHitSound: false,
    badHitSound: false,
    assassinSound: false,
    victorySound: false,
    ambientSound: false
  }

  componentDidMount() {
    this.startNewGame()
    this.props.activateBlock()
  }

  startNewGame = () => {
    this.createGame().then(game => {
      this.setInitialState(game)
    })
  }

  createGame = () => fetch(startUrl).then(resp => resp.json())

  setInitialState = game => {
    let { tiles } = game
    // add a REVEALED_COLOR attribute to tiles so that GameContainer + GameBoard know which ones have been guessed already
    tiles.forEach(tile => (tile.revealedColor = null))
    let activeTeam = ''
    const gameId = game.id

    const blueTiles = tiles.filter(w => w.color === 'blue')
    const redTiles = tiles.filter(w => w.color === 'red')
    blueTiles.length > redTiles.length
      ? (activeTeam = 'blue')
      : (activeTeam = 'red')
    const first = activeTeam
    this.setState({
      tiles,
      first,
      activeTeam,
      gameId,
      scores: { red: 0, blue: 0 },
      spymasterView: true,
      clue: { numberClue: '', textClue: '' },
      guesses: 0,
      timer: rules.timer,
      runTimer: true,
      frozen: false,
      logMessage: 'A new game is under way!',
      openModal: false,
      winner: '',
      assassin: false,
      ambientSound: true
    })
  }

  getGame = () => {
    return fetch(gamesUrl + `/${this.state.gameId}`)
      .then(resp => resp.json())
      .then(game => {
        const orderedTiles = {
          ...game,
          tiles: game.tiles.sort((a, b) => a.id - b.id)
        }
        return orderedTiles
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
      .then(result => {
        if (result) {
          this.increaseGuesses(result)
          this.checkWinner()
        } else {
          this.handleAssassin()
        }
      })
  }

  handleAssassin = () => {
    this.toggleFrozen()
    this.setState({ openModal: true, assassin: true, runTimer: false })
  }

  findTileOnServer = tile =>
    this.getGame().then(game => game.tiles.find(t => t.id === tile.id))

  checkTileColorAndCalculateScore = selectedTile => {
    switch (selectedTile.color) {
      case this.state.activeTeam:
        !this.state.winner && this.setState({ goodHitSound: true })
        this.handleLogMessage('Hit!')
        this.addScore(this.state.activeTeam)
        return 'continue' // pass back to handleTileSelect to increaseGuesses etc
      case swapTeam[this.state.activeTeam]:
        this.setState({ badHitSound: true })
        this.handleLogMessage('Wrong guess: enemy tile!')
        this.addScore(swapTeam[this.state.activeTeam])
        return 'endTurn'
      case 'yellow':
        this.setState({ badHitSound: true })
        this.handleLogMessage('Wrong guess: neutral tile.')
        return 'endTurn'
      case 'assassin':
        this.setState({ assassinSound: true, ambientSound: false })
        this.handleLogMessage('You picked the assassin. Game over!')
        return false
      default:
        this.handleLogMessage('Congratulations, you broke the game.')
        return null
    }
  }

  addScore = team => {
    const score = this.state.scores[team] + 1
    this.setState(
      {
        scores: { ...this.state.scores, [team]: score }
      },
      () => {
        this.checkWinner()
      }
    )
  }

  checkWinner = () => {
    const { scores, first, winner } = this.state
    // check if red won
    if (scores.red > 8) {
      this.setState({ winner: 'red' })
    } else if (scores.red > 7) {
      first !== 'red' && this.setState({ winner: 'red' })
    }
    // check if blue won
    if (scores.blue > 8) {
      this.setState({ winner: 'blue' })
    } else if (scores.blue > 7) {
      first !== 'blue' && this.setState({ winner: 'blue' })
    }

    if (winner) {
      this.setState({ victorySound: true, ambientSound: false })
      console.log(`The ${winner} team won the game!`)
      this.setState({ openModal: true, runTimer: false }, this.toggleFrozen)
    } else {
      console.log(`No team has won yet.`)
    }
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
    this.setState({ openModal: false })
    if (!this.state.frozen) {
      this.setState({ runTimer: true })
      this.swapTeam()
    }
    this.getGame().then(game => this.restoreSpymasterView(game))
  }

  swapTeam = () => {
    const team = this.state.activeTeam
    this.setState({ activeTeam: swapTeam[team] })
  }

  restoreSpymasterView = game => {
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
      this.setState({
        timer: rules.timer,
        logMessage: 'Time up, team swapped!'
      })
    } else {
      //players turn, didn't pick card, swap team and change to spymasterview
      this.getGame().then(game => this.restoreSpymasterView(game))
    }
  }

  togglePause = () => {
    !this.state.frozen && this.setState({ runTimer: !this.state.runTimer })
  }

  toggleFrozen = () => {
    this.setState({ frozen: !this.state.frozen })
  }

  handleLogMessage = message => {
    const a = new Date()
    const logMessage = message + ` [${a.toLocaleTimeString()}]`
    this.setState({ logMessage })
  }

  handleGoodHitSoundEnd = () => {
    this.setState({ goodHitSound: false })
  }

  handleBadHitSoundEnd = () => {
    this.setState({ badHitSound: false })
  }

  handleAssassinSoundEnd = () => {
    this.setState({ assassinSound: false })
  }

  handleVictorySoundEnd = () => {
    this.setState({ victorySound: false })
  }

  render() {
    const {
      tiles,
      scores,
      spymasterView,
      clue,
      timer,
      runTimer,
      frozen,
      activeTeam,
      gameId,
      logMessage,
      guesses,
      openModal,
      winner,
      assassin
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
                frozen={frozen}
                startNewGame={this.startNewGame}
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
                runTimer={runTimer}
                activeTeam={activeTeam}
                bomb={this.handleBomb}
              />
              <br />
              <Button onClick={() => this.togglePause()}>
                {runTimer ? 'Pause Game' : 'Resume Game'}
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered columns={16}>
            <Grid.Column width={3}> </Grid.Column>
            <Grid.Column width={10} align='center' />
            <Grid.Column width={3}> </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* Modals below */}
        {winner ? (
          <WinModal
            winner={winner}
            openModal={openModal}
            closeModal={this.closeModal}
            logMessage={logMessage}
            startNewGame={this.startNewGame}
          />
        ) : assassin ? (
          <GameOverModal
            activeTeam={activeTeam}
            openModal={openModal}
            closeModal={this.closeModal}
            logMessage={logMessage}
            startNewGame={this.startNewGame}
          />
        ) : (
          <SwapViewModal
            activeTeam={activeTeam}
            openModal={openModal}
            closeModal={this.closeModal}
            logMessage={logMessage}
          />
        )}
        {/* Sounds below */}
        <Sound
          url={goodHitSound}
          playStatus={this.state.goodHitSound ? Sound.status.PLAYING : Sound.status.STOPPED}
          onFinishedPlaying={this.handleGoodHitSoundEnd}
        />
        <Sound
          url={badHitSound}
          playStatus={this.state.badHitSound ? Sound.status.PLAYING : Sound.status.STOPPED}
          onFinishedPlaying={this.handleBadHitSoundEnd}
        />
        <Sound
          url={assassinSound}
          playStatus={this.state.assassinSound ? Sound.status.PLAYING : Sound.status.STOPPED}
          onFinishedPlaying={this.handleAssassinSoundEnd}
        />
        <Sound
          url={victorySound}
          playStatus={this.state.victorySound ? Sound.status.PLAYING : Sound.status.STOPPED}
          onFinishedPlaying={this.handleVictorySoundEnd}
        />
        <Sound
          url={ambientSound}
          playStatus={this.state.ambientSound ? Sound.status.PLAYING : Sound.status.STOPPED}
          onPlaying={this.handleSongPlaying}
          loop={true}
          volume={10}
        />

      </AbsoluteWrapper>
    )
  }
}

export default GameContainer
