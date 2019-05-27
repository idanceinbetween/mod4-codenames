import React, { Component, Fragment } from 'react'
import { Card } from 'semantic-ui-react'

class WordCard extends Component {
  state = { hit: false }

  checkSelect = () => {
    if (!this.props.spymasterView) {
      this.setState({ hit: true })
      this.props.handleCardSelect(this.props.word)
    }
  }

  render() {
    const { word } = this.props
    // const { word, color } = this.props.word;
    return (
      <Fragment>
        {!this.state.hit ? (
          <Card className='cnWordb tile wcn' onClick={this.checkSelect}>
            <Card.Header>{word.word}</Card.Header>
          </Card>
        ) : (
          <Card className='cnWord rcn'>
            <Card.Header>{''}</Card.Header>
          </Card>
        )}
      </Fragment>
    )
  }
}

export default WordCard
