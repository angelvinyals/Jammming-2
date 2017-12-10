// Import Components, and CSS
import React, { Component } from 'react';
import './PlayList.css';
import { TrackList } from '../TrackList/TrackList';

// Create and  export Playlist Component
export class PlayList extends Component {
  constructor(props) {
    super(props);
    // Bind methods to the proper 'this'
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  // Return value from an event target and update the name state
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
  // Render the Playlist Component and pass props to <TrackList />
  render() {
    return (
      <div className="Playlist">
        <input 
          placeholder="Insert Play List name"
          value={this.props.name} 
          onChange={this.handleNameChange} />
        <TrackList 
          tracks={this.props.tracks} 
          onRemove={this.props.onRemove} />
        <a 
          className="Playlist-save" 
          onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}
