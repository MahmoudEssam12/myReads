import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Link, Routes } from "react-router-dom";
import BooksList from './components/BooksList';
import BookSearch from "./components/BookSearch";
import { debounce } from 'throttle-debounce';
import './App.css';

class BooksApp extends React.Component {

  bookshelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Have Read' },
  ];

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchBooks: []
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  };


  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    let updatedBooks = [];
    updatedBooks = this.state.books.filter(b => b.id !== book.id);

    if (shelf !== 'none') {
      book.shelf = shelf;
      updatedBooks = updatedBooks.concat(book);
    }

    this.setState({
      books: updatedBooks
    });
  };

  searchForBooks = debounce(300, false, query => {
    if (query.length > 0) {
      BooksAPI.search(query).then(books => {
        if (books.err) {
          this.setState({ searchBooks: [] });
          console.log("err")
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });


  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };


  render() {
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={
            <BooksList
              bookshelves={this.bookshelves}
              books={this.state.books}
              onMove={this.moveBook}
            />
          }
          />
          <Route path="/search" element={
            <BookSearch
              searchBooks={this.state.searchBooks}
              myBooks={this.state.books}
              onMove={this.moveBook}
              onSearch={this.searchForBooks}
              onResetSearch={this.resetSearch} />
          } />
        </Routes>

        <div className="open-search">
          <Link to="Search">
            <button>Add a book</button>
          </Link>
          {/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
        </div>
      </div>
    )
  }
}

export default BooksApp
