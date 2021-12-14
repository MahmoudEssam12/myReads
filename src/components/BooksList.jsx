import React from "react";
import BooksShelf from "./BooksShelf";

class BooksList extends React.Component {
  render() {
    const { bookshelves, books, onMove } = this.props;
    return (
      <>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookshelves.map((shelf) => (
                <BooksShelf
                  key={shelf.key}
                  booksShelf={shelf}
                  books={books}
                  onMove={onMove}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BooksList;
