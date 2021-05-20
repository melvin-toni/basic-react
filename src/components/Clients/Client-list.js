import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Client = props => (
  <tr>
    <td>{props.cl.name}</td>
    <td>{JSON.stringify(JSON.parse(props.cl.description).description).replace(/\"/g, '')}</td>
    <td>
      <Link to={"/client-edit/" + props.cl.id}>edit</Link>
    </td>
  </tr>
)

export default class ClientList extends Component {

  constructor(props) {
    super(props);

    this.state = { cl: [] };
  }

  componentDidMount() {
    axios.get('https://dev.innov.id/bara-mcp/public/api/client/bio-forms').then(response => {
      this.setState({ cl: response.data.data.list })
    }).catch((error) => {
      console.log(error);
    })
  }

  clientList() {
    return this.state.cl.map(c => {
      return <Client cl={c} key={c.id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Client List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.clientList()}
          </tbody>
        </table>
      </div>
    );
  }
}