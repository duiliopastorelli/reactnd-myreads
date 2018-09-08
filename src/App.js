import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import { Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Library from './components/Library';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">

        {/* Route for handle the search bar */}
        <Route exact path="/search" component={SearchBar}/>

        {/* Route for handle the main page containing the Library*/}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            {/* Library Component that wrap all the shelves */}
            <Library/>

            {/* Button that route to the search functionality */}
            <div className="open-search">
              <Link to={"/search"}>Add a book</Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp;