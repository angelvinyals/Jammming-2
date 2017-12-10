 // Import Components, Modules, and CSS
import React, { Component } from 'react';
import {generateRandomString} from '../../util/generateRandomString'
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlayList } from '../PlayList/PlayList';
import Modal from '../Modal/Modal'
import Spotify from '../../util/Spotify';
import './App.css';


// Create the App Component
class App extends Component {  

  constructor(props){
    console.log('APP.JS -->  constructor');
    super(props);
    // Set state properties
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: [],
      accessToken:'',
      expiresIn:'',
      isOpen: false,
      message:'',
    }
    // Be sure that all methods are bound to the correct 'this'
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  } 

  //before compoennt is mounted it gets authorization
  componentWillMount() {
    console.log(`APP.JS -->  componentWillMount`);
    this.GetAccessToken()
    
  }  

  //get accessToken second time when url callback match
  GetAccessToken(){
    console.log(`APP.JS -->  GetAccessToken`);
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    console.log(urlAccessToken)
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    
    if (urlAccessToken && urlExpiresIn) {
      this.SetAccessToken(urlAccessToken[1],urlExpiresIn[1])
      
    } else {
      const scope = 'playlist-modify-public';
      const state= generateRandomString(8);      
      const accessUrl= Spotify.accessUrl(scope,state)      
      window.location = accessUrl;
    }
  }

  //after GetAccessToken updates state.accesstoken and state.expiresIn
  SetAccessToken(accessToken, expiresIn){
    this.setState({accessToken: accessToken, expiresIn: expiresIn})
    window.setTimeout(() => this.setState({accessToken :'', expiresIn:''}), expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
  }

  toggleModal = () => {
    console.log(`APP.JS -->  toggleModal`);
      this.setState({
        isOpen: !this.state.isOpen
      });
  }

  isStateAtrribute(attributeName, message){
    if(this.state[attributeName]){
      return this.state[attributeName]
    } else {
      this.setState({message: message})
      this.toggleModal()
      return
    }
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
    if(!this.state.playlistName){this.isStateAtrribute('playlistName', 'Give a NAME to PLAY list, please.')}
    //////////////
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    //////////////////
    //FALTA CONFIRMACIÓ DE QUE HA ESTAT GRAVAT (if(response.ok))
    ////////////////////////
    // Once the playlist is save set the state back to empty
    this.setState({
      playlistName: "Dan's Playlist",
      searchResults: [],
      playlistTracks: []
    });
  }
  // Search for tracks using the Spotify API
  search(term) {
    console.log(`APP.JS -->  search : ${term}`);
    if(!this.state.accessToken){this.GetAccessToken()}
    console.log(`APPS.search Entering with: ${term}`);
    if(term){ //if NO TERM ,CALL to spotify.search response with an error bad:response
      Spotify.search(term, this.state.accessToken)
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
          <Modal
            show={this.state.isOpen}
                onClose={this.toggleModal}
                
            >
              <p>{this.state.message}</p>
            </Modal>
        </div>
      </div>
    );
  }
}
// Export the App Component
export default App;
