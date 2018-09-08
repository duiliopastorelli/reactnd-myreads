import React, { Component } from 'react';
import BookItem from './BookItem';
import LazyLoad from 'react-lazyload';

//TODO: handle empty shelf
//TODO: force lazyload to refire if a shelf becomes empty

/**
 * This Component has the responsibility of handle the single shelf.
 * Each shelf is populated with custom data, passed from the parent Component
 * (Library).
 */
class BookShelf extends Component {

  render (){
    const {shelfName, books, handleBookPosition} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {/* Loop through all the available books in this shelf */}
            {books.map(book => (
              <LazyLoad key={book.id} height={400} offset={100}>
                <BookItem
                  bookDetails={book}
                  handleBookPosition={handleBookPosition}
                />
              </LazyLoad>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;