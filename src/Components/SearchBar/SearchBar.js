// Import Components, and CSS
import React, { Component } from 'react';
import './SearchBar.css';

// Create and  export Playlist Component
export class SearchBar extends Component {
  constructor(props) {
    super(props);
    // Bind methods to the correct 'this'
    this.handleTermChange = this.handleTermChange.bind(this);
  }
   // handleTermChange Method passes a value to onSearch prop inherited from app.js
  handleTermChange(event) {
    this.props.onSearch(event.target.value);
  }
  // Render the SearchBar component
  render() {
    return (
      <div className="SearchBar">
        <input 
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange} />
      </div>
    );
  }
}
