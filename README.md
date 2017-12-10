This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# JAMMMING

## CHALLENGE

Below is a list of the DESIRED website's features:

Spotify Login — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account. You will need to follow the steps in the Spotify Developer Guide to register your application.

Search by Song, Album, or Artist — a user can type the name of a song, artist, or album into the search bar and click the SEARCH button. The app will request song data about the user's input from the Spotify library (find Spotify endpoints here).

Populate Results List — Jammming displays the list of returned tracks from the user's query.

Add Song to a Custom Playlist — users can add a track to their playlist by selecting a + sign on the right side of the track's display container.

Remove Song from Custom Playlist — users can remove a track from their playlist by selecting a - sign on the right side of the track's display container.

Change Playlist Title — users can change the title of their custom playlist.

Save Playlist to Account — users can save their custom playlist by clicking a button called SAVE TO SPOTIFY.


FIRTS SUBMIT, don't have many of DESIRED website's features:

## Folder Structure


```bash
my-app/
  .gitignore
  package.json
  README.md 
  yarn.lock
  node_modules/  
  public/
    index.html
    favicon.ico
    manifest.json
    reset.css
  src/
    index.css
    index.js
    logo.svg
    components/
      App/
        App.css
        App.js
        App.html ( parcial static version of the website)
      Playlist/
        Playlist.css
        Playlist.js
        Playlist.html ( parcial static version of the website)
      SearchBar/
        SearchBar.css
        SearchBar.js
        SearchBar.html ( parcial static version of the website)
      SearchResult/
        SearchResults.css
        SearchResults.js
        SearchResults.html ( parcial static version of the website)
      Track/
        Track.css
        Track.js
        Track.html ( parcial static version of the website)
      TrackList/
        TrackList.css
        TrackList.js
        TrackList.html ( parcial static version of the website)
      util/
        Spotify.js
        track.item.json
```
    
For the project to build, these files must exist with exact filenames:

TO FIX
  -I get a token to SPOTIFY.API, but i can use it...
  -I have no result 
  -I cannot save to SPOTIGY LIST..
