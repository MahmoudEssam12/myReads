import React from "react";
import Book from "./Book";

class BooksShelf extends React.Component {
  render() {
    const { booksShelf, books, onMove } = this.props;
    const booksOnthisShilf = books.filter(
      (book) => book.shelf === booksShelf.key
    );
    return (
      <>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{booksShelf.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {booksOnthisShilf.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  shelf={booksShelf}
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

export default BooksShelf;
