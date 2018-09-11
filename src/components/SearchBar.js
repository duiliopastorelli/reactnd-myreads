import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import {search} from '../BooksAPI'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import BookItem from "./BookItem";

class SearchBar extends Component {

  state = {
    searchResult: [],
  };

  handleInput = (e) => {
    const query = e.target.value;

    if (query !== '') {
      search(query)
        .then(res => {
          //Handle the error responses from the API
          if (res.error === 'empty query') {

            //Handle the common "no match" error response
            NotificationManager.warning('The search doesn\'t match anything!',
              'Try Again!');
          } else if (res.error) {

            //Handle any other error message that the API could provide
            NotificationManager.error(`Error: ${res.error}`, '', 10000);
          } else {

            //Filter the results for omit the ones that are already in the
            //personal library
            res.map(result => {
              let match = this.props.personalBooks.find(
                personalBook => personalBook.id === result.id);

              match ? result.shelf = match.shelf : result.shelf = 'none';
              return result;
            });

            //Use the State from the API for populate the view
            this.setState(() => ({
              searchResult: res,
            }));
          }
        }, reason => {
          //Handle if the promise have been rejected
          NotificationManager.error(`There has been an error in the request: 
          "${reason}". Check your internet connection and try again later.`,
            'Error!', 10000);
        });
    } else {
      //Input field is empty, send a suggestion to the user
      NotificationManager.info('Try to type something', '', 2000);

      //Force the UI to update
      this.setState(() => ({
        searchResult: [],
      }))
    }
  };

  componentDidMount() {
    //Display a notification that explains the user what to do
    NotificationManager.info('Try to type something', '', 2000);

    //Check if the personal Library is populated, if not fetch the books
    if(this.props.personalBooks.length === 0) {
      this.props.fetchPersonalLibrary();
    }
  };

  render() {
    const {personalBooks, updatePersonalBooks} = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={"/"} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <DebounceInput
              autoFocus={'autofocus'}
              minLength={3}
              debounceTimeout={800}
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleInput}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResult.map(book => {
              if (book.shelf === 'none') {
                return <BookItem
                  key={book.id}
                  personalBooks={personalBooks}
                  bookDetails={book}
                  updatePersonalBooks={updatePersonalBooks}
                />
              }
              return null;
            })}
          </ol>
        </div>

        <NotificationContainer/>
      </div>
    )
  }
}

export default SearchBar;