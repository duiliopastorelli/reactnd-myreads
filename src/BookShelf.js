import React, { Component } from 'react';
import BookItem from './BookItem';
import LazyLoad from 'react-lazyload';
import Library from "./Library";

//TODO: handle empty shelf

/**
 * This Component has the responsibility of handle the single shelf.
 * Each shelf is populated with custom data, passed from the parent Component
 * (Library).
 */
class BookShelf extends Component {

  render (){
    const {shelfName, books} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {/* Loop through all the available books in this shelf */}
            {books.map(book => (
              <LazyLoad height={400} offset={100}>
                <BookItem key={book.id} bookDetails={book} />
              </LazyLoad>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;