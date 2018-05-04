import React, { Component } from 'react';
import axios from 'axios';

export default class Projects extends Component {
  render() {
    return (
      <div>
        {this.props.projects.map(project => (
          <div key={project.id}>
            <ul>
              <li>{project.name}</li>
              <li>{project.description}</li>
            </ul>
          </div>
        ))}
      </div>
    )
  }
}