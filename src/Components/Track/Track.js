// Import Components, and CSS
import React, { Component } from 'react';
import './css/Track.css';

// Create Track Component
export class Track extends Component {
  constructor(props) {
    super(props);
    // Be sure that all methods are bound to the correct 'this'
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  // If props.onAdd is true render a + with an onClick prop of addTrack
  // Else render a - with an onClick prop of removeTrack
  renderAction() {
    if (this.props.onAdd) {
      return <a className='Track-action' onClick={this.addTrack}>+</a>;
    } else {
      return <a className='Track-action' onClick={this.removeTrack}>-</a>;
    }
  }
  // Add a track to the track array
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  // Remove a track from the track array
  removeTrack() {
    this.props.onRemove(this.props.track);
  }
  // Render the track component with track information
  render() {
    return (
      <div className="Track" key={this.props.track.id}>
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
