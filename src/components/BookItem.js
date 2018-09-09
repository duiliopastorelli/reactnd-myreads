import React, {Component} from 'react';
import BookActions from './BookActions'

class BookItem extends Component {

  render() {
    const {books, bookDetails, updateBooks} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookDetails.imageLinks.smallThumbnail}")`,
            }}></div>

            {/* Component for handle the book actions */}
            <BookActions
              books={books}
              shelf={bookDetails.shelf}
              bookId={bookDetails.id}
              updateBooks={updateBooks}
            />

          </div>
          <div className="book-title">{bookDetails.title}</div>
          {bookDetails.authors.map(author => {
            return <div key={author} className="book-authors">{author}</div>;
          })}
        </div>
      </li>
    )
  };
}

export default BookItem;