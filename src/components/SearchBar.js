import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DebounceInput from 'react-debounce-input';
import {search} from '../BooksAPI';
import 'react-notifications/lib/notifications.css';
import BookItem from "./BookItem";

/**
 * This Component handle the search view UI
 * See propTypes at the bottom for more info on props needed
 *
 */
class SearchBar extends Component {

  state = {
    searchResult: [],
  };

  //This function handle the changes in the input field and performs the query
  //to the BE API
  handleInput = (e) => {
    const query = e.target.value;

    //Check if the query is at least not empty
    if (query !== '') {
      //Perform a search using BooksAPI.js
      search(query)
        .then(res => {
          //Handle the error responses from the API
          if (res.error === 'empty query') {
            //Handle the common "no match" error response
            this.props.createNotification(
              'warning',
              `The search doesn't match anything! Try again!`,
              '',
              3000
            );

            // Clear the results, just in case another search has been
            // performed before
            this.setState({searchResult: []});

          } else if (res.error) {

            //Handle any other error message that the API could provide
            this.props.createNotification(
              'error',
              `Error: ${res.error}`,
              '',
              10000
            );
          } else {

            //Assign the shelf value consistently with the personal library
            res.map(result => {
              //Checks if the book is present in the personal Library
              let match = this.props.personalBooks.find(
                personalBook => personalBook.id === result.id);

              //Assign the proper shelf value
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
          this.props.createNotification(
            'error',
            `There has been an error in the request: "${reason}". Check your 
            internet connection and try again later.`,
            'Error!',
            10000
          );
        });
    } else {
      //Input field is empty, send a suggestion to the user
      this.props.createNotification(
        'info',
        `Try to type something...`,
        '',
        2000
      );

      //Force the UI to update
      this.setState(() => ({
        searchResult: [],
      }))
    }
  };

  componentDidMount() {
    //Display a notification that explains the user what to do
    this.props.createNotification(
      'info',
      `Try to type something...`,
      '',
      2000
    );
  };

  render() {
    const {personalBooks, updatePersonalBooks, createNotification} = this.props;

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
              return <BookItem
                key={book.id}
                personalBooks={personalBooks}
                bookDetails={book}
                updatePersonalBooks={updatePersonalBooks}
                createNotification={createNotification}
              />
            })}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  personalBooks: PropTypes.array.isRequired, //The personal library
  updatePersonalBooks: PropTypes.func.isRequired, //UI update
  createNotification: PropTypes.func.isRequired, //Notification system
};

export default SearchBar;