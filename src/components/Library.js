import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

/**
 * This Component handle the personal library view.
 * Its mainly duty is to define the shelves to display.
 */
class Library extends Component {

  state = {
    shelves: [
      {
        label: "Currently Reading",
        name: "currentlyReading",
      },
      {
        label: "Want To Read",
        name: "wantToRead",
      },
      {
        label: "Read",
        name: "read",
      },
    ],
  };

  render() {
    const {personalBooks, updatePersonalBooks, createNotification} = this.props;

    return (
      <div className="list-books-content">
        <div>
          {this.state.shelves.map(shelf => {
            return <BookShelf key={shelf.name}
                              shelfLabel={shelf.label}
                              shelfName={shelf.name}
                              personalBooks={personalBooks}
                              booksToDisplay={personalBooks.filter(
                                book => book.shelf === shelf.name
                              )}
                              updatePersonalBooks={updatePersonalBooks}
                              createNotification={createNotification}
            />
          })}
        </div>
      </div>
    )
  }
}

Library.propTypes = {
  personalBooks: PropTypes.array, //The personal library
  updatePersonalBooks: PropTypes.func.isRequired, //UI update
  createNotification: PropTypes.func.isRequired, //Notification system
};

export default Library;