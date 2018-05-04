import React, { Component } from 'react';
import axios from 'axios';

export default class Projects extends Component {
  state = {
    showActions: false,
    actions: [],
    actionStatus: false,
    actionInput: false,
    description: "",
    notes: "",
    id: this.props.id
  };

  componentDidMount() { this.fetchActions() }

  fetchActions = () => {
    axios.get(`http://localhost:5000/projects/${this.props.project.id}/actions`)
      .then(actions => this.setState({ actions: actions.data }))
      .catch(error => console.log(error))
  }

  handleFinishedAction = id => {
    this.setState({ actionStatus: !this.state.actionStatus })
    axios.put(`http://localhost:5000/actions/${id}`, { completed: this.state.actionStatus })
      .then(response => this.fetchActions())
      .catch(error => console.log(error))
  }

  handleProjectDelete = id => {
    axios.delete(`http://localhost:5000/projects/${id}`)
      .then(response => this.props.fetchProjects())
      .catch(error => console.log(error))
  }

  render() {
    const { project } = this.props;
    return (
      <div>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <button onClick={() => this.setState({ showActions: !this.state.showActions })}>project actions</button>
        <button onClick={() => this.handleProjectDelete(project.id)}>delete project</button>
        {this.state.showActions ? (
          <div>
            <div>
              {this.state.actions.length === 0 ? (
                <div>
                  <div>there are no actions here</div>
                  <button onClick={() => this.setState({ actionInput: !this.state.actionInput })}>add an action</button>
                </div>
              ) : (
                this.state.actions.map(action => (
                <div className="projectAction" key={action.id}>
                  <div className="subAction">
                    <p className="subAction-header">description: </p>
                    <p>{action.description}</p>
                  </div>
                  <div className="subAction">
                    <p className="subAction-header">notes: </p>
                    <p>{action.notes}</p>
                  </div>
                  <div className="ActionStatus subAction">
                    <div className="subAction">
                      <p className="subAction-header">status: </p>
                      <p>{action.completed ? "completed" : "pending"}</p>
                    </div>
                    <div className="ActionStatus__button">
                      <button onClick={() => this.handleFinishedAction(action.id)}>
                        toggle status
                      </button>
                    </div>
                  </div>
                </div>
              )))}
            </div>
            <div>
              {this.state.actionInput ? (
                <div>
                  <input 
                    placeholder="description"
                    value={this.state.description}
                    onChange={event => this.setState({ description: event.target.value })}
                  />
                  <input 
                    placeholder="notes"
                    value={this.state.notes}
                    onChange={event => this.setState({ notes: event.target.value })}
                  />
                  <input 
                    placeholder="completed"
                    value={this.state.completed}
                    onChange={event => this.setState({ completed: event.target.value })}
                    type="bool"
                  />
                  <input 
                    placeholder={this.state.id}
                    value={project.id}
                    onChange={event => this.setState({ id: event.target.value })}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}