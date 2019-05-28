import React, { Fragment } from 'react'
import { Card } from 'semantic-ui-react'
import Tile from './Tile'
import GameOverModal from './GameOverModal'


const mapTilesWithColors = props => {
  return (
    <Fragment>
      <Card.Group itemsPerRow={5}>
        {props.tiles.map(tile => (
          <Tile
            key={tile.id}
            color={tile.color}
            tile={tile}
            spymasterView={props.spymasterView}
          />
        ))}
      </Card.Group>
      <GameOverModal />
    </Fragment>
  )
}

const mapTilesNoColors = props => {
  const newArray = props.tiles.map(tile => {
    delete tile.color
    return tile
  })

  return (
    <Fragment>
      <Card.Group itemsPerRow={5}>
        {newArray.map(tile => (
          <Tile
            key={tile.id}
            color={tile.revealedColor ? tile.revealedColor : 'wcn'}
            tile={tile}
            spymasterView={props.spymasterView}
            handleTileSelect={tile => props.handleTileSelect(tile)}
          />
        ))}
      </Card.Group>
      <GameOverModal />
    </Fragment>
  )
}

const GameBoard = props =>
  props.spymasterView ? mapTilesWithColors(props) : mapTilesNoColors(props)

export default GameBoard
