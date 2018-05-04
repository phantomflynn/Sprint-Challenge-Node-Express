import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Projects from './components/projects';

class App extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/projects')
      .then(response => this.setState({ projects: response.data }))
      .catch(error => console.log('encountered an error fetching projects'))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Projects projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;
