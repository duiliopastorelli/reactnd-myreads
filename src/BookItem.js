import React, { Component } from 'react';

//TODO: handle selected option
//TODO: handle options functionality

class BookItem extends Component {

  render() {
    const {bookDetails} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookDetails.imageLinks.smallThumbnail}")`,
            }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookDetails.title}</div>
          <div className="book-authors">{bookDetails.authors}</div>
        </div>
      </li>
    )
  };
}

export default BookItem;