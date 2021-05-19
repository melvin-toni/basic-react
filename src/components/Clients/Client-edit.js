import React, { Component } from 'react';
import axios from 'axios';

export default class ClientEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('https://dev.innov.id/bara-mcp/public/api/client/bio-forms/'+this.props.match.params.id)
      .then(response => {
        console.log('CHECK EDIT >>', response.data.data.name)
        this.setState({
          name: response.data.data.name,
          description: response.data.data.description
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    // axios.get('http://localhost:5000/users/')
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.username),
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      name: this.state.name,
      description: this.state.description
    }

    console.log('SUBMIT EDIT >>>', exercise);

    axios.put('https://dev.innov.id/bara-mcp/public/api/client/bios/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/client-list';
  }

  render() {
    return (
    <div>
      <h3>Edit Client</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}