import React, {Component} from 'react';
import {getAll} from './BooksAPI';
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
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    //Get all the books for populate the shelves
    getAll()
      .then(
        res => {
          console.log(res);

          const currentlyReading =
            res.filter(book => book.shelf === 'currentlyReading');
          const wantToRead =
            res.filter(book => book.shelf === 'wantToRead');
          const read =
            res.filter(book => book.shelf === 'read');

          //Update the state and force re-rendering, as shelf until now were
          //empty and can be populated now
          this.setState(() => ({
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read,
          }));
        },

        //Handle rejected promise
        reason => {
          console.warn(`Promise have been rejected: ${reason}`);
        });
  }

  render() {
    return (
      <div className="list-books-content">
        <div>

          <BookShelf
            shelfName={'Currently Reading'}
            books={this.state.currentlyReading}
          />

          <BookShelf
            shelfName={'Want To Read'}
            books={this.state.wantToRead}
          />

          <BookShelf
            shelfName={'Read'}
            books={this.state.read}
          />

        </div>
      </div>
    )
  }
}

export default Library;