import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useToken from '../App/useToken';

const Exercise = props => (
  <tr>
    <td>{props.exercise.name}</td>
    <td>{JSON.stringify(JSON.parse(props.exercise.description).description).replace(/\"/g, '')}</td>
    <td>
      <Link to={"/client-edit/"+props.exercise.id}>edit</Link>
    </td>
  </tr>
)

export default class ClientList extends Component {

  constructor(props) {
    super(props);

    // this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('https://dev.innov.id/bara-mcp/public/api/client/bio-forms').then(response => {
        console.log('JX >>', response.data.data.list);
        this.setState({ exercises: response.data.data.list })
    }).catch((error) => {
      console.log(error);
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      console.log('currentexercise >>', currentexercise);
      return <Exercise exercise={currentexercise} key={currentexercise.id}/>;
    });
  }

  render() {
    return(
      <div>
        <h3>Client List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    );
  }
}