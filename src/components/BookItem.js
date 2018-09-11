import React, {Component} from 'react';
import BookActions from './BookActions'

class BookItem extends Component {

  render() {
    const {
      personalBooks,
      bookDetails,
      updatePersonalBooks
    } = this.props;

    //Handle missing thumbnail using a grey background as fallback
    let bookImage = '';
    if (bookDetails.imageLinks) {
      bookImage = bookDetails.imageLinks.smallThumbnail || '';
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookImage}")`,
            }}></div>

            {/* Component for handle the book actions */}
            <BookActions
              personalBooks={personalBooks}
              bookDetails={bookDetails}
              updatePersonalBooks={updatePersonalBooks}
            />

          </div>
          <div className="book-title">{bookDetails.title}</div>
          {bookDetails.authors && bookDetails.authors.map(author => {
            return <div key={author}
                        className="book-authors">{author || 'Unknow'}</div>;
          })}
        </div>
      </li>
    )
  };
}

export default BookItem;