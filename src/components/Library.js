import React, {Component} from 'react';
import {getAll, update} from '../BooksAPI';
import BookShelf from './BookShelf';

/**
 * This Component has the responsibility of fetch and store all the books
 * information. If they change (as a result of user interaction), this is the
 * place where they get updated.
 */
class Library extends Component {

  //State initialisation that will be updated after the fetch promise will be
  //terminated successfully in componentDidMount()
  state = {
    allBooks: [],
  };

  componentDidMount() {
    //Get all the books for populate the shelves
    getAll()
      .then(
        res => {
          //TODO: remove me
          console.log(res);

          //Update the state and force re-rendering, as shelf until now were
          //empty and can be populated now
          this.setState(() => ({
            allBooks: res,
          }));
        },

        //TODO: handle rejected promise with a message for the user
        reason => {
          console.warn(`Promise have been rejected: ${reason}`);
        });
  }

  //Update the state when the books change
  updateBooks = (newBooks) => {
    this.setState(() => ({allBooks: newBooks}))
  };

  render() {
    return (
      <div className="list-books-content">
        <div>

          <BookShelf
            shelfLabel={'Currently Reading'}
            shelfName={'currentlyReading'}
            books={this.state.allBooks}
            updateBooks={this.updateBooks}
          />

          <BookShelf
            shelfLabel={'Want To Read'}
            shelfName={'wantToRead'}
            books={this.state.allBooks}
            updateBooks={this.updateBooks}
          />

          <BookShelf
            shelfLabel={'Read'}
            shelfName={'read'}
            books={this.state.allBooks}
            updateBooks={this.updateBooks}
          />

        </div>
      </div>
    )
  }
}

export default Library;