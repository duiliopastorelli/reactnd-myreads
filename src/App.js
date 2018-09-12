import React from 'react';
import './App.css';
import {Route, Link} from "react-router-dom";
import Library from './components/Library';
import SearchBar from "./components/SearchBar";
import {getAll} from "./BooksAPI";
import {NotificationContainer, NotificationManager} from "react-notifications";

class BooksApp extends React.Component {

  //State initialisation that will be updated after the fetch promise will be
  //terminated successfully in componentDidMount()
  state = {
    personalBooks: [],
  };

  //Handle the notifications app-wide with
  // https://www.npmjs.com/package/react-notifications
  //Type = String ['success'|'warning'|'error'|'info'] - required
  //message = String - required
  //title = String - optional
  //timeout = Int - optional
  //cb = func - optional
  createNotification = (type, message, title = '', timeout = 5000, cb = null) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, title, timeout, cb);
        break;
      case 'warning':
        NotificationManager.warning(message, title, timeout, cb);
        break;
      case 'error':
        NotificationManager.error(message, title, timeout, cb);
        break;
      case 'info':
      default:
        NotificationManager.info(message, title, timeout, cb);
        break;
    }
  };

  //Handle the fetch of the personal Library
  fetchPersonalLibrary = (() => {
    //Get all the books for populate the shelves
    getAll()
      .then(
        res => {
          //Update the state and force re-rendering, as shelves until now were
          //empty and can be populated now
          this.setState(() => ({
            personalBooks: res,
          }));
        },

        //Handle rejected promise with a message for the user
        reason => {
          console.warn(`Promise have been rejected: ${reason}`, '', 10000);
        });
  });

  componentDidMount() {
    //Initial fetch for populate the shelves
    this.fetchPersonalLibrary();
  }

  //Update the state when the books change
  //newBooks is a completely new collection, that has to be created by the child
  updatePersonalBooks = (newBooks) => {
    this.setState(({personalBooks: newBooks}));
  };

  render() {
    return (
      <div className="app">

        {/* Route for handle the search bar */}
        <Route exact path="/search" render={() => (
          <SearchBar
            personalBooks={this.state.personalBooks}
            updatePersonalBooks={this.updatePersonalBooks}
            createNotification={this.createNotification}
          />
        )}
        />

        {/* Route for handle the main page containing the Library*/}
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            {/* Library Component that wrap all the shelves */}
            <Library
              personalBooks={this.state.personalBooks}
              updatePersonalBooks={this.updatePersonalBooks}
              createNotification={this.createNotification}
            />

            {/* Button that route to the search functionality */}
            <div className="open-search">
              <Link to={"/search"}>Add a book</Link>
            </div>
          </div>
        )}/>

        {/* Notification flash messages */}
        <NotificationContainer/>
      </div>
    )
  }
}

export default BooksApp;