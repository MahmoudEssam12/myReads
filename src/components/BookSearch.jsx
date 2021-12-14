import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";

class BookSearch extends React.Component {
  state = {
    value: "",
  };
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value: value }, () => {
      this.props.onSearch(value);
    });
  };

  render() {
    const {
      myBooks,
      onMove,
      searchBooks, // eslint-disable-next-line
      onSearch,
      onResetSearch,
    } = this.props;

    const updatedBooks = searchBooks.map((book) => {
      myBooks.map((b) => {
        if (b.id === book.id) {
          book.shelf = b.shelf;
          console.log("test");
        }
        return b;
      });
      return book;
    });
    return (
      <>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search" onClick={onResetSearch}>
                Close
              </button>
            </Link>

            <div className="search-books-input-wrapper">
              {/*
      NOTES: The search from BooksAPI is limited to a particular set of search terms.
      You can find these search terms here:
      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
      you don't find a specific author or title. Every search is limited by search terms.
    */}
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {updatedBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  shelf={book.shelf ? book.shelf : "none"}
                  onMove={onMove}
                />
              ))}
            </ol>
          </div>
        </div>
      </>
    );
  }
}

export default BookSearch;
