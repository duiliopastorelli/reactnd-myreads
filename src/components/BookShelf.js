import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookItem from './BookItem';
import LazyLoad from 'react-lazyload';

/**
 * This Component has the responsibility of handle the single shelf.
 * Each shelf is populated with custom data, passed from the parent Component
 * (Library).
 */
class BookShelf extends Component {

  state = {
    shelfMessage: 'Loading...'
  };

  componentDidMount() {
    this.updateShelfMessage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.booksToDisplay !== prevProps.booksToDisplay) {
      this.updateShelfMessage();
    }
  }

  updateShelfMessage = () => {
    //Check if the UI is still awaiting the end of the books fetch promise
    if (this.props.personalBooks.length !== 0) {
      //Display the proper message
      if (
        this.props.booksToDisplay.length === 0
      ) {
        this.setState(() => ({
          shelfMessage: 'This shelf looks like my cookies jar, sadly empty! :(',
        }))
      } else {
        this.setState(() => ({
          shelfMessage: '',
        }))
      }
    }
  };

  render() {
    const {
      personalBooks,
      booksToDisplay,
      shelfLabel,
      updatePersonalBooks,
      createNotification
    } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfLabel}</h2>
        <div className="bookshelf-books">
          <p>{this.state.shelfMessage}</p>
          <ol className="books-grid">

            {/* Loop through all the available books in this shelf */}
            {booksToDisplay.map(book => (
              <LazyLoad key={book.id} height={400} offset={100}>
                <BookItem
                  personalBooks={personalBooks}
                  bookDetails={book}
                  updatePersonalBooks={updatePersonalBooks}
                  createNotification={createNotification}
                />
              </LazyLoad>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  booksToDisplay: PropTypes.array.isRequired, //The books for the specific shelf
  shelfLabel: PropTypes.string.isRequired, //Shelf Label
  updatePersonalBooks: PropTypes.func.isRequired, //UI update
  createNotification: PropTypes.func.isRequired, //Notification system
};

export default BookShelf;