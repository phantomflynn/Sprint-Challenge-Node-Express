import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Projects from './components/projects';

class App extends Component {
  state = {
    projects: [],
    displayNewProjectInput: false,
    projectName: "",
    projectDescription: ""
  };

  componentDidMount() { this.fetchProjects() }

  fetchProjects = () => {
    axios.get('http://localhost:5000/projects')
      .then(response => this.setState({ projects: response.data }))
      .catch(error => console.log('encountered an error fetching projects'))
  }

  handleNewProject = () => {
    const { projectName, projectDescription } = this.state;
    if (projectName !== "" && projectDescription !== "") 
      axios.post('http://localhost:5000/projects', { name: projectName, description: projectDescription })
        .then(response => this.fetchProjects())
        .catch(error => console.log(error))
    this.setState({ projectName: "", projectDescription: "", displayNewProjectInput: false })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button 
          onClick={() => this.setState({ displayNewProjectInput: !this.state.displayNewProjectInput })}
          >add project
        </button>
        
        {this.state.displayNewProjectInput ? (
          <div>
            <input 
              placeholder="project name"
              value={this.state.projectName}
              onChange={event => this.setState({ projectName: event.target.value })}
            />
            <input 
              placeholder="project descriptions"
              value={this.state.projectDescription}
              onChange={event => this.setState({ projectDescription: event.target.value })}
            />
            <button onClick={() => this.handleNewProject()}>submit</button>
          </div>
        ) : null}

        {this.state.projects.map(project => (
          <Projects 
            key={project.id}
            project={project} 
            fetchProjects={() => this.fetchProjects()}
          />
        ))}

      </div>
    );
  }
}

export default App;
