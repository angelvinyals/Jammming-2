// Create variables for use in the Spotify Module
//const clientId = '4d8cade346314f16967c997f68279990';
//const redirectUri = 'http://dankincaid.surge.sh';
const clientId = 'ef4013b061ed49d6b107a170fbe84e5c'; // Your client id
const redirectUri = 'http://localhost:3000/callback'; // Your redirect uri
const spotifyUrl = `http://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;
let accessToken = undefined;
let expiresIn = undefined;

// Create Spotify Module
const Spotify = {
  // Check to see if there is an access token
  // if not create one
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = spotifyUrl;
    }
  },
  // Search Spotify for a track
  search(term) {
    // Spotify Search Endpoint
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    // Send request and Authorization
    return fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      // Convert the response to json
      .then(response => response.json())
      .then(jsonResponse => {
        // if the response is empty return an empty array
        if (!jsonResponse.tracks) return [];
        // if not, map the results to the proper format and return them
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      });
  },
  // Save a users playlist
  savePlaylist(name, trackUris) {
    // If arguments are missing or there a no tracks in the playlist
    // do nothing
    if (!name || !trackUris || trackUris.length === 0) return;
    // Spotify user info endpoint
    const userUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId = undefined;
    let playlistId = undefined;
    // Make a request to retrieve user id
    fetch(userUrl, {
      // Pass Authentication
      headers: headers
    })
    // Convert the response to json
    .then(response => response.json())
    // Set the userId variable to the returned Id
    .then(jsonResponse => userId = jsonResponse.id)
    // Create the playlist on Spotify
    .then(() => {
      // Spotify create playlist endpoint
      const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      // Make a post request and create a playlist with the given name
      fetch(createPlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: name
          })
        })
        // convert the response to json
        .then(response => response.json())
        // Set playlistId to the returned playlist Id
        .then(jsonResponse => playlistId = jsonResponse.id)
        // Add tracks to the playlist
        .then(() => {
          // Spotify add tracks to playlist endpoint
          const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          // make a post request with an array of uris to be added
          // to the playlist
          fetch(addPlaylistTracksUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  }
};

export default Spotify;
