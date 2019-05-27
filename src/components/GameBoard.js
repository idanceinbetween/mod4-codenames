// import React, { Component } from "react";
import React from 'react'
import { Card } from 'semantic-ui-react'
import Tile from './Tile'

const mapTilesWithColors = props => {
  return (
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
  )
}

const mapTilesWithSelectedColors = props => {
  return (
    <Card.Group itemsPerRow={5}>
      {props.tiles.map(tile => (
        <Tile
          key={tile.id}
          tile={tile.id === props.selectedTile.id ? props.selectedTile : tile}
          color={
            tile.id === props.selectedTile.id ? props.selectedTile.color : 'wcn'
          }
          spymasterView={props.spymasterView}
        />
      ))}
    </Card.Group>
  )
}

const mapTilesNoColors = props => {
  const newArray = props.tiles.map(tile => {
    delete tile.color
    return tile
  })

  return (
    <Card.Group itemsPerRow={5}>
      {newArray.map(tile => (
        <Tile
          key={tile.id}
          color='wcn'
          tile={tile}
          spymasterView={props.spymasterView}
          handleTileSelect={tile => props.handleTileSelect(tile)}
        />
      ))}
    </Card.Group>
  )
}

const GameBoard = props => {
  if (props.spymasterView && !props.selectedTile.color) {
    return mapTilesWithColors(props)
  } else if (!props.spymasterView && props.selectedTile.color) {
    mapTilesWithSelectedColors(props)
  } else {
    return mapTilesNoColors(props)
  }
}

export default GameBoard
