// Import Components, Modules, and CSS
import React, { Component } from 'react';
import './css/App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

// Get access token
Spotify.getAccessToken();

// Create the App Component
class App extends Component {
  constructor(props){
    super(props);
    // Set state properties
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
    // Be sure that all methods are bound to the correct 'this'
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  // If the track is not already in the playlist, add it
  addTrack(track) {
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }
  // Find a track by the id and remove it from the playlistTracks array
  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
      playlistTrack => playlistTrack.id !== track.id)
    });
  }
  // Set the state of playlistName to a new value
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  // Save a playlist to Spotify
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    // Once the playlist is save set the state back to empty
    this.setState({
      playlistName: "Dan's Playlist",
      searchResults: [],
      playlistTracks: []
    });
  }
  // Search for tracks using the Spotify API
  search(term) {
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }
  // Render the App component and pass props to other components
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack}/>
            <PlayList name={this.state.playlistName}
            tracks={this.state.playlistTracks} onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
// Export the App Component
export default App;
