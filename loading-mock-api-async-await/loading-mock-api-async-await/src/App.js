import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false
    };
  }

  getUsers = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
    return await axios.get("http://localhost:3001/api/users")
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.getUsers()
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        throw err;
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, users } = this.state;
    if (loading) return <p>loading....</p>;
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}> {user.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App;