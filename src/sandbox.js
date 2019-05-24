// GameContainer.js
// Receive selected 25 words from server including their colours

state = {words: [], spymasterView: true}

fetch(wordsUrl)
.then(resp=>resp.json())
.then(words => this.setState(words))

this.state.words = [
  { word: "phoenix", color: "r" },
  { word: "ocean", color: "b" },
  { word: "washington", color: "a" },
  { word: "wallet", color: "y" },
  { word: "slug", color: "b" }
];

// this.state.words get passed down as props to GameBoard, then WordCard.
<GameBoard words={this.state.words} spymasterView={this.state.spymasterView}/>

// GameBoard.js (SFC)
const mapWordsWithColors = words => words.map(word => <WordCard word={word}/>)
const mapWordsNoColors = words => {
    const newArray = words.map(word=> {
        delete word.color
        return word})

    newArray.map(word => <WordCard word={word}/>)}

if (props.spymasterView) {
    mapWordsWithColors(props.words)
} else {
    mapWordsNoColors(props.words)
}

// WordCard.js (Component)
state = {  }
componentDidMount() {
    this.setState ({ this.props.word })
}
