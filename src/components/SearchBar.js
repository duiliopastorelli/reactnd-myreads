import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import DebounceInput from 'react-debounce-input'

class SearchBar extends Component {

  handleInput = (e) => {
    console.log(e.target.value);

    //TODO: handle empty string case
  };

  render() {
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

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar;