import React, { Component } from 'react';
import axios from 'axios';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://my-json-server.typicode.com/codegym-vn/mock-api-books/books')
      .then((res) => {
        this.setState({ books: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleCreate = () => {
    window.location.href = '/book/add';
  };

  render() {
    const { books } = this.state;
    return (
      <div>
        <h1>Library</h1>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <a href={`/book/${book.id}`}>{book.title}</a>
                </td>
                <td>{book.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={this.handleCreate} style={{ marginTop: '20px' }}>
          Add a new Book
        </button>
      </div>
    );
  }
}

export default Books;
