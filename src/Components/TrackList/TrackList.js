// Import Components, and CSS
import React, { Component } from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

// Create the TrackList Component
export class TrackList extends Component {
  // Render the TrackList component and map all tracks
  // from the tracks array to a Track component 
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track =>
            <Track key={track.id} track={track}
            onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
          )
        }
      </div>
    );
  }
}
