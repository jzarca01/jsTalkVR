import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton
} from 'react-vr';


class jsTalk extends React.Component {

  constructor(props) {
    super();
    this.state = {
            counter: -1,
            color: "red",
            displayAnswer: true,
            movies: []
        };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.getButtonTitle = this.getButtonTitle.bind(this);
  }

  componentDidMount() {
    this.getMovies().then(data =>
          //this.setState({movies:data})
          this.state.movies = data
    )
  }

  getMovies() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  incrementCounter() {
    this.setState({counter: this.state.counter + 1});
  }
  
  getButtonTitle () {
      if (this.state.counter === -1) {
        return "Start the Movie Quizz";
      } else  if(this.state.counter >= this.state.movies.length){
        return "End of quiz";
      } else {
        return `When did ${this.state.movies[this.state.counter].title} went out ?`;
      }
  }

  _quiz() {
    return (
      (this.state.counter < this.state.movies.length) ?
        <Text 
          style={ {
            transform: [{translate: [-0.2, 1, -3]}],
            fontSize: 0.20,
            color: "white"
          }}>
          {this.state.movies[this.state.counter] && this.state.movies[this.state.counter].releaseYear}
        </Text>
      : <Text 
          style={ {
            transform: [{translate: [-0.2, 1, -3]}],
            color: "red"
          }}>
          Thank you. </Text>
      );
  }
 
  render() {
    return (
      <View>
        <Pano source={asset('columbia.jpg')}/>
        
        <VrButton
          style={{width: 3, borderRadius: 15}}
          onClick={this.incrementCounter} >
        
          <Text
            style={{
              backgroundColor: this.state.color,
              padding: 0.02,
              textAlign:'center',
              textAlignVertical:'center',
              fontSize: 0.2,
              layoutOrigin: [0.5, 0.5],
              transform: [{translate: [0, 1, -3]}],
            }}
            onEnter={() => this.setState({displayAnswer:false}) }
            onExit={() => this.setState({displayAnswer:true}) }
            >
            {this.getButtonTitle()}
          </Text>

        </VrButton>

        <View>
           {this.state.displayAnswer === true && this._quiz()}
        </View>
      </View>
    );
  }

};

AppRegistry.registerComponent('jsTalk', () => jsTalk);
