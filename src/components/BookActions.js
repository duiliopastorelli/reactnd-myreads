import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {update} from "../BooksAPI";
import 'react-notifications/lib/notifications.css';

class BookActions extends Component {

  /**
   * Invokes a function that resides in the parent component (Library) that
   * updates both the UI and the BE
   * 'event' is the event emitted on the onChange from the select element
   *
   * @param event
   */
  handleChange = (event) => {

    const actualBooks = this.props.personalBooks;
    const currentBook = this.props.bookDetails;

    //Assign the new shelf to the current book
    currentBook.shelf = event.target.value;

    //Update the object for populate the UI
    //Search for the current book in the personal library
    let isBookAlreadyInLibrary = false;
    actualBooks.map(book => {
      if (book.id === currentBook.id) {
        isBookAlreadyInLibrary = true;
        book.shelf = currentBook.shelf;
      }
      return book;
    });

    //If the map above didn't change the array, it means that the book needs to
    //be added to the personal library
    isBookAlreadyInLibrary || actualBooks.push(currentBook);

    //Update the BE
    update(currentBook, event.target.value)
      .then(() => {
          this.props.createNotification(
            'info',
            `The remote library has been successfully updated.`,
            currentBook.title,
            4000
          );
        },
        //Handle the rejected promise
        reason => {
          this.props.createNotification(
            'error',
            `The remote library has NOT been successfully updated. The error 
            was: ${reason}`,
            `Failed!`,
            10000
          );
        });

    //Change the status of the UI forcing a re-rendering
    this.props.updatePersonalBooks(actualBooks);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={this.props.bookDetails.shelf || 'none'}
          onChange={(e) => this.handleChange(e)}
        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading
          </option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

BookActions.propTypes = {
  personalBooks: PropTypes.array, //The personal library
  bookDetails: PropTypes.object.isRequired, //Book details
  updatePersonalBooks: PropTypes.func.isRequired, //UI update
  createNotification: PropTypes.func.isRequired, //Notification system
};

export default BookActions;