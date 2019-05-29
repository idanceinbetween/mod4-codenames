import React, { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'

class Tile extends Component {
  state = { hit: false, color: this.props.color }

  checkSelect = () => {
    if (!this.props.spymasterView) {
      this.setState({ hit: true })
      this.props.handleTileSelect(this.props.tile)
    }
  }

  render() {
    const { tile, frozen } = this.props
    return (
      <Fragment>
        {!this.state.hit && !frozen ? ( //check if card is not hit yet
          <Card
            className={`cnWord tile ${this.props.color} blackText`}
            onClick={this.checkSelect}
          >
            <Card.Header>
              <p>{tile.word}</p>
            </Card.Header>
          </Card>
        ) : (
          //if card is hit
          <Card className={`cnWord tile revealed ${this.props.color}`}>
            <Card.Header>{''}</Card.Header>
          </Card>
        )}
      </Fragment>
    )
  }
}

export default Tile
