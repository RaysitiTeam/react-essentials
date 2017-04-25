import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    title:'',
    message:''
  };

  getJson=()=>{
    // Axios.get(`https://api.github.com/users/${this.state.userName}`)
    Axios.get(`json/simple.json`)
    .then(response => {
    	//console.log('Returned response is: ', response);      
      this.setState({title:response.data.title});
      this.setState({message:response.data.message});
    });
  };//end:getJson
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {this.state.title}</h2>
          <button onClick = {this.getJson}>click Me !</button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );//end:return
  }//end:render
}//end-class:App

export default App;