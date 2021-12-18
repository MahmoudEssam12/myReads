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
    books: [],
    searchBooks: [],
  };

  async componentDidMount() {
    const newBooks = await BooksAPI.getAll();
    this.setState({ books: newBooks })

  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    if (shelf === 'none') {
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        books: prevState.books.filter(b => b.id !== book.id).concat(book)
      }));
    }

  };

  // clearing the search books array
  clearSearch = () => {
    this.setState({ searchBooks: [] });
  };
  // this function is for searching a book
  searchForBooks = debounce(300, false, q => {
    if (q.length > 0) {
      BooksAPI.search(q).then(books => {
        if (books.error) {
          this.setState({ searchBooks: [] })
        } else {
          books.forEach(book => {
            if (book.hasOwnProperty("shelf")) {
              console.log(book);
            } else {
              book.shelf = "none";
            }
          })

          this.setState({ searchBooks: books });
        }
      }).catch(err => {
        this.clearSearch()
        // this.setState({ searchBooks: [] })
        console.log("it's error", err)
      })

    } else {
      this.setState({ searchBooks: [] });
    }
  });


  render() {

    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={
            <BooksList
              bookshelves={this.bookshelves}
              books={this.state.books}
              onMove={this.changeShelf}
            />
          }
          />
          <Route path="/search" element={
            <BookSearch
              searchBooks={this.state.searchBooks}
              myBooks={this.state.books}
              onMove={this.changeShelf}
              onSearch={this.searchForBooks}
              onResetSearch={this.clearSearch} />
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
