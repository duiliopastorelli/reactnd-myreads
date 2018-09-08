import React, {Component} from 'react';
import {getAll, update} from '../BooksAPI';
import BookShelf from './BookShelf';

/**
 * This Component has the responsibility of handle all the shelves.
 * It retrieves information from the BE API and displays the respective shelves
 * and books.
 */
class Library extends Component {

  //State initialisation that will be updated after the fetch promise will be
  //terminated successfully in componentDidMount()
  state = {
    allBooks: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    //Get all the books for populate the shelves
    getAll()
      .then(
        res => {
          //TODO: remove me
          console.log(res);

          const shelves = this.createShelves(res);

          //Update the state and force re-rendering, as shelf until now were
          //empty and can be populated now
          this.setState(() => ({
            allBooks: res,
            currentlyReading: shelves.currentlyReading,
            wantToRead: shelves.wantToRead,
            read: shelves.read,
          }));
        },

        //Handle rejected promise
        reason => {
          console.warn(`Promise have been rejected: ${reason}`);
        });
  }

  /**
   * Creates different shelves based on an object containing all the books
   *
   * @param books
   * @returns {{currentlyReading: *, wantToRead: *, read: *}}
   */
  createShelves = (books) => {
    return {
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read'),
    }
  };

  /**
   * Changes the position of a book in both UI and BE
   *
   * @param id
   * @param newShelf
   */
  handleBookPosition = (id, newShelf) => {

    //Change the book position in the UI
    this.setState((prevState, pros) => {

      //Variable for internal management
      let oldBooks = prevState.allBooks;

      //Iterate through all the books for find the one to change
      oldBooks.forEach(book => {

        //Find where the book that changed status is positioned
        if (book.id === id) {

          //Assign the new shelf to the current book
          book.shelf = newShelf;

          //Update the BE
          update(book, newShelf)
            .then(res => {
                //TODO: add a UI message for letting the user know that the process went well
              },
              //Handle the rejected promise
              reason => {
                console.warn(`Promise rejected: ${reason}`)
              });
        }
      });

      //State update with the new shelves
      return this.createShelves(oldBooks);
    });
  };

  render() {
    return (
      <div className="list-books-content">
        <div>

          <BookShelf
            shelfName={'Currently Reading'}
            books={this.state.currentlyReading}
            handleBookPosition={this.handleBookPosition}
          />

          <BookShelf
            shelfName={'Want To Read'}
            books={this.state.wantToRead}
            handleBookPosition={this.handleBookPosition}
          />

          <BookShelf
            shelfName={'Read'}
            books={this.state.read}
            handleBookPosition={this.handleBookPosition}
          />

        </div>
      </div>
    )
  }
}

export default Library;