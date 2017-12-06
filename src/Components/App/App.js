 // Import Components, Modules, and CSS
import React, { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';
import './App.css';

// Get access token
//Spotify.getAccessToken();
//console.log('APP.JS -->  Spotify.getAccessToken');

// Create the App Component
class App extends Component {
  //console.log('APP.JS -->  App component');

  constructor(props){
    console.log('APP.JS -->  constructor');
    super(props);
    // Set state properties
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      accessToken:'',
      expiresIn:''
    }
    // Be sure that all methods are bound to the correct 'this'
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    console.log('APP.JS -->  componentDidMount');
    this.getAccessToken();
  }
    

  async getAccessToken(){
    console.log('APP.JS -->  getAccessToken');
    let res = await Spotify.getAccessToken();
    console.log(`res.accessToken : ${res.accessToken}`);
    console.log(`res.expiresIn : ${res.expiresIn}`);
    this.handleAccessToken(res)
    
    
  }

  handleAccessToken(res){
    console.log(`APP.JS -->  handleAccesToken with ${res.accessToken} and ${res.expiresIn}`);
    this.setState({ accessToken: res.accessToken, expiresIn: res.expiresIn},
      () => { 
        window.setTimeout(this.initAccessToken, res.expiresIn*1000)
      }
    );
  }

  initAccessToken(){
     console.log(`APP.JS -->  initAccessToken`)
     this.setState({accessToken: '',expiresIn:''})
  }

  // If the track is not already in the playlist, add it
  addTrack(track) {
    console.log(`APP.JS -->  addTrack with: ${track}`);
    console.log('playlistTracks: ',this.state.playlistTracks);
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }

  // Find a track by the id and remove it from the playlistTracks array
  removeTrack(track) {
    console.log(`APP.JS -->  removeTrack with: ${track}`);
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
      playlistTrack => playlistTrack.id !== track.id)
    });
  }

  // Set the state of playlistName to a new value
  updatePlaylistName(name){
    console.log(`APP.JS -->  updatePlaylistName with: ${name}`);
    this.setState({playlistName: name});
  }
  // Save a playlist to Spotify
  savePlaylist() {
    console.log(`APP.JS -->  savePlaylist`);
    ///////////////
    if(!this.state.playlistName){return}
    if(!this.state.accessToken){return}
    //////////////
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris, this.state.accessToken);
    //////////////////
    //FALTA CONFIRMACIÓ DE QUE HA ESTAT GRAVAT (if(response.ok))
    ////////////////////////
    // Once the playlist is save set the state back to empty
    this.setState({
      playlistName: "",
      playlistTracks: []
    });
  }
  // Search for tracks using the Spotify API
  search(term) {
    console.log(`APPS.search Entering with: ${term}`);
    let accessToken= this.state.accessToken
    if(accessToken.length<=0){
      console.log(`APPS.search : there in NOT accessToken --> APPS.getAccessToken() `);
      this.getAccessToken()
    }
    if(term){ //if NO TERM ,CALL to spotify.search response with an error bad:response
      Spotify.search(term,this.state.accessToken)
            .then(response => this.setState({
              searchResults: response
            }));
    } 
    //there is no else because it wants than NO UPDATE results when NO TERM   
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
