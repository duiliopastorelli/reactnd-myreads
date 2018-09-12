import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookActions from './BookActions';

class BookItem extends Component {

  render() {
    const {
      personalBooks,
      bookDetails,
      updatePersonalBooks,
      createNotification
    } = this.props;

    //Handle missing thumbnail using a grey background as fallback
    let bookImage = '';
    if (bookDetails.imageLinks) {
      bookImage = bookDetails.imageLinks.smallThumbnail || '';
    }

    //Handle the missing author
    let author = <div className="book-authors">Unknown</div>;
    if (bookDetails.authors) {
      author = bookDetails.authors.map(author => {
        return <div key={author} className="book-authors">{author}</div>;
      })
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
              createNotification={createNotification}
            />

          </div>

          <div className="book-title">{bookDetails.title}</div>
          {author}
        </div>
      </li>
    )
  };
}

BookItem.propTypes = {
  personalBooks: PropTypes.array, //The personal library
  bookDetails: PropTypes.object.isRequired, //Book details
  updatePersonalBooks: PropTypes.func.isRequired, //UI update
  createNotification: PropTypes.func.isRequired, //Notification system
};

export default BookItem;