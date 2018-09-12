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

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                bookDetails.imageLinks ? bookDetails.imageLinks.smallThumbnail : ''
              }")`,
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
          <div className="book-authors">{
            bookDetails.authors ?
              bookDetails.authors.map(author=>author) : 'Unknown'
          }</div>
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