import React from "react";

class Book extends React.Component {
  state = {
    value: this.props.shelf.key,
  };
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onMove(this.props.book, e.target.value);

  };
  render() {
    const {
      book, // eslint-disable-next-line
      shelf, // eslint-disable-next-line
      onMove,
    } = this.props;
    return (
      <>
        <li>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 192,
                  backgroundImage: `url(${book.imageLinks &&
                    book.imageLinks.thumbnail})`,
                }}
              />
              <div className="book-shelf-changer">
                <select value={book.shelf} onChange={this.handleChange}>
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
              {book.authors && book.authors.join(", ")}
            </div>
          </div>
        </li>
      </>
    );
  }
}

export default Book;
