import React, {Component} from 'react';
import {update} from "../BooksAPI";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class BookActions extends Component {

  /**
   * Invokes a function that reside in the parent component (Library) that
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
    actualBooks.find(book => book.id === this.props.bookDetails.id) ||
    actualBooks.push(currentBook);

    //Update the BE
    update(currentBook, event.target.value)
      .then(() => {
          NotificationManager.info(`The remote library has been successfully
               updated.`, currentBook.title, 2000);
        },
        //Handle the rejected promise
        reason => {
          NotificationManager.error(`The remote library has NOT been successfully
               updated. The error was: ${reason}`, `Failed!`);
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

        <NotificationContainer/>
      </div>
    )
  }
}

export default BookActions;