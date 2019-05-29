import React, { Fragment } from 'react'
import { Segment, Grid, Form } from 'semantic-ui-react'
import AbsoluteWrapper from '../components/AbsoluteWrapper'

const randomWordUrl = 'http://localhost:3007/randomword'
const wordsUrl = 'http://localhost:3007/words'

class WordManager extends React.Component {
  state = {
    word: '',
    editedWordStr: '',
    showEditForm: false
  }

  componentDidMount() {
    this.getRandomWord().then(word => this.setState({ word }))
    this.props.deactivateBlock()
  }

  getRandomWord = () => fetch(randomWordUrl).then(resp => resp.json())

  handleKeep = () => {
    this.getRandomWord().then(word => this.setState({ word }))
  }

  deleteWordFromServer = () => {
    fetch(wordsUrl + `/${this.state.word.id}`, {
      method: 'DELETE'
    }).then(() => {
      console.log(`${this.state.word.word} is gone!`)
      this.getRandomWord().then(word => this.setState({ word }))
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
      console.log('nothing was added')
    }
    event.target[0].value = ''
  }

  saveEdit = () => {
    this.editWordInServer(this.state.editedWordStr)
  }

  handleEdit = () => {
    this.setState({
      showEditForm: !this.state.showEditForm,
      editedWordStr: this.state.word.word
    })
  }

  editWordInServer = string => {
    const word = { word: string }
    fetch(wordsUrl + `/${this.state.word.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    })
      .then(resp => resp.json())
      .then(
        this.setState(
          {
            showEditForm: !this.state.showEditForm,
            word: { ...this.state.word, word: `${this.state.editedWordStr}` }
          },
          () => this.setState({ editedWordStr: '' })
        )
      )
  }

  addWordToServer = string => {
    const word = { word: string }
    fetch(wordsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
    })
  }

  handleTypingChange = event => {
    this.setState({ editedWordStr: event.target.value })
  }

  render() {
    return (
      <AbsoluteWrapper>
        <Grid columns={3} textAlign='center' verticalAlign='top'>
          <Grid.Row verticalAlign='top'>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Segment inverted color='blue' raised textAlign='left'>
                <h5>Manage the backend word list here. Experts only.</h5>
                <p>
                  IMPORTANT: you MUST update the seed file manually after using
                  this feature. Do not erase the database before updating the
                  seed file. The seed file should reflect the current database
                  of words.
                </p>
              </Segment>
              <Segment raised textAlign='left'>
                <h4>Refine Existing Database</h4>
                <p>
                  Click keep or delete to get another random word to decide on.
                </p>

                {!this.state.showEditForm && <h1>{this.state.word.word}</h1>}

                {this.state.showEditForm && (
                  <Form>
                    <Form.Field>
                      <input
                        value={this.state.editedWordStr}
                        onChange={event => this.handleTypingChange(event)}
                      />
                    </Form.Field>
                  </Form>
                )}

                {!this.state.showEditForm && (
                  <Fragment>
                    <button className='ui button' onClick={this.handleKeep}>
                      Keep
                    </button>
                    <button className='ui button' onClick={this.handleEdit}>
                      Edit
                    </button>
                    <button
                      className='ui button'
                      onClick={this.deleteWordFromServer}
                    >
                      Delete
                    </button>
                  </Fragment>
                )}

                {this.state.showEditForm && (
                  <Fragment>
                    <button className='ui button' onClick={this.saveEdit}>
                      Save Changes
                    </button>
                    <button className='ui button' onClick={this.handleEdit}>
                      Cancel Edit
                    </button>
                  </Fragment>
                )}
              </Segment>
              <Segment raised textAlign='left'>
                <h3>Add Word/Words</h3>
                <p>
                  If entering more than 1 word, separate by spaces and/or
                  commas.
                </p>
                <form className='ui form' onSubmit={this.handleAdd}>
                  <div className='field'>
                    <input
                      type='text'
                      name='words'
                      placeholder='words separated by spaces and/or commas'
                    />
                  </div>
                  <button className='ui button' type='submit'>
                    Submit
                  </button>
                </form>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3} />
          </Grid.Row>
        </Grid>
      </AbsoluteWrapper>
    )
  }
}

export default WordManager
