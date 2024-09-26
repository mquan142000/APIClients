import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: {
        name: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        this.setState({ todos: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
    }));
  }

  handleSubmit() {
    const { todo } = this.state;
    axios
      .post('https://jsonplaceholder.typicode.com/todos', todo)
      .then((res) => {
        alert(`Created todo ${JSON.stringify(res.data)} successfully!!!`);
        this.setState((prevState) => ({
          todos: [...prevState.todos, res.data], 
          todo: { name: '' }, 
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { todos, todo } = this.state;

    return (
      <div>
        <h1>Todo List</h1>
        <input
          name="name"
          value={todo.name}
          onChange={this.handleChange}
          placeholder="Enter todo name"
        />
        <button type="button" onClick={this.handleSubmit}>
          Submit
        </button>
        {todos.map((todo) => (
          <div key={todo.id}>
            <a href={`/todo/${todo.id}`}>{todo.title}</a> 
          </div>
        ))}
      </div>
    );
  }
}

export default App;
