import React from 'react'
import { Segment } from 'semantic-ui-react'
import AbsoluteWrapper from '../components/AbsoluteWrapper'

const randomWordUrl = 'http://localhost:3007/randomword'
const wordsUrl = 'http://localhost:3007/words'


class WordManager extends React.Component {
  state = { 
    word: ''
  }

  componentDidMount () {
    this.getRandomWord()
      .then(word => this.setState({ word }))
  }

  getRandomWord = () =>
    fetch(randomWordUrl)
      .then(resp => resp.json())
  
  handleKeep = () => {
    this.getRandomWord()
      .then(word => this.setState({ word }))
  }

  deleteWordFromServer = () => {
    fetch(wordsUrl + `/${this.state.word.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log(`${this.state.word.word} is gone!`)
        this.getRandomWord()
          .then(word => this.setState({ word }))
      })
  }

  handleAdd = event => {
    event.preventDefault()
    const input = event.target[0].value
    if (input) {
      const words = input.split(/[ ,]+/)
      words.forEach(word => this.addWordToServer(word))
      console.log(`ADDED: ${words}`)
    } else {
      console.log("nothing was added")
    }
    event.target[0].value = ''
  }

  addWordToServer = string => {
    const word = { word: string }
    fetch(wordsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word)
    })
  }

  render() {
    return (
      <AbsoluteWrapper>
        <Segment raised textAlign='left'>
          <h5>Manage the backend word list here. Experts only.</h5>
          <p>
            IMPORTANT: you MUST update the seed file manually after using this feature. Do not erase the database before updating the seed file. The seed file should reflect the current database of words.
          </p>
        </Segment>
        <Segment raised textAlign='left'>
          <h5>Refine word database here. Click keep or delete to get another random word to decide on.</h5>
          <h1>{this.state.word.word}</h1>
          <button className="ui button" onClick={this.handleKeep}>Keep</button>
          <button className="ui button" onClick={this.deleteWordFromServer}>DESTROY</button>

        </Segment>
        <Segment raised textAlign='left'>
          <h1>Add a word</h1>
          <form className="ui form" onSubmit={this.handleAdd}>
            <div className="field">
              <input type="text" name="words" placeholder="words separated by spaces and/or commas" />
            </div>
            <button className="ui button" type="submit">Submit</button>
          </form>

        </Segment>
        
      </AbsoluteWrapper>
    )
  }
}

export default WordManager
