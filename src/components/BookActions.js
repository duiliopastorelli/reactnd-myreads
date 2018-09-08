import React, {Component} from 'react';

class BookActions extends Component {

  state = {
    shelfValue: this.props.shelf,
    handleBookPosition: this.props.handleBookPosition,
  };

  /**
   * Invokes a function that reside in the parent component (Library) that
   * updates both the UI and the BE
   * 'event' is the event emitted on the onChange from the select element
   *
   * @param event
   */
  handleChange = (event) => {
    //Change the status of the UI forcing a re-rendering
    this.props.handleBookPosition(this.props.bookId, event.target.value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          defaultValue={this.state.shelfValue}
          onChange={(e) => this.handleChange(e)}
        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading
          </option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookActions;