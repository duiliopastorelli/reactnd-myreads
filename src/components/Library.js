import React, {Component} from 'react';
import BookShelf from './BookShelf';

/**
 * This Component has the responsibility of fetch and store all the books
 * information. If they change (as a result of user interaction), this is the
 * place where they get updated.
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

export default Library;