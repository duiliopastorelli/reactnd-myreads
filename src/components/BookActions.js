import React, {Component} from 'react';
import {update} from "../BooksAPI";

class BookActions extends Component {

  state = {
    shelfValue: this.props.shelf,
    handleBookPosition: this.props.handleBookPosition,
  };

  /**
   * Invokes a function that reside in the parent component (Library) that
   * updates both the UI and the BE
   * 'event' is the event emitted on the onChange from the select element
   *
   * @param event
   */
  handleChange = (event) => {

    //Iterate through all the books for find the one to change
    const actualBooks = this.props.books;

    actualBooks.forEach(book => {

      //Find where the book that changed status is positioned
      if (book.id === this.props.bookId) {

        //Assign the new shelf to the current book
        book.shelf = event.target.value;

        //Update the BE
        update(book, event.target.value)
          .then(res => {
              //TODO: add a UI message for letting the user know that the process went well
            },
            //Handle the rejected promise
            reason => {
              console.warn(`Promise rejected: ${reason}`)
            });
      }

      return book;
    });

    //Change the status of the UI forcing a re-rendering
    this.props.updateBooks(actualBooks);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={this.state.shelfValue}
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

export default BookActions;