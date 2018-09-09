import React, {Component} from 'react';
import BookItem from './BookItem';
import LazyLoad from 'react-lazyload';

//TODO: handle empty shelf
//TODO: force lazyload to refire if a shelf becomes empty

/**
 * This Component has the responsibility of handle the single shelf.
 * Each shelf is populated with custom data, passed from the parent Component
 * (Library).
 */
class BookShelf extends Component {

  state = {
    shelf: [],
  };

  //Creates a shelf based on the books available and the specific shelf name
  createShelf = (books, shelfName) => {
    this.setState(() => ({
      shelf: books.filter(book => book.shelf === shelfName),
    }))
  };

  componentDidUpdate(prevProps) {
    //Handle the 1st rendering of the shelf after the API fetch
    if (this.props.books !== prevProps.books) {
      console.log('did update');
      //Create a new shelf if the books have changed
      this.createShelf(this.props.books, this.props.shelfName)
    }
  }

  shouldComponentUpdate(prevProps) {
    //Re-render the shelf if the user changed a book value
    if (prevProps !== this.props) {
      //Create a new shelf if the books have changed
      this.createShelf(this.props.books, this.props.shelfName);
    }

    return true;
  }

  render() {
    const {books, shelfLabel, updateBooks} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfLabel}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {/* Loop through all the available books in this shelf */}
            {this.state.shelf.map(book => (
              <LazyLoad key={book.id} height={400} offset={100}>
                <BookItem
                  books={books}
                  bookDetails={book}
                  updateBooks={updateBooks}
                />
              </LazyLoad>
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;