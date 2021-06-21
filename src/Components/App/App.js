import React from 'react';
import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    //Calls the super's constructor
    super(props);

    //Creates and sets base values for the states of this component
    this.state = {searchResults: [],
                  playlistName: "",
                  playlistTracks: []};
    
    //Binds these methods to this object
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //Adds tracks to the playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;

    //Checks to see if playlistTracks contains the id on the selected track
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    //Adds the new track to the list and sets the state
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  //Removes tracks from the playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;

    //Removes the track with the matching id from the list
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    //Sets the state with the new list without the specified track
    this.setState({playlistTracks: tracks});
  }

  //Changes the name of the playlist
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  //Saves the playlist to spotify
  savePlaylist() {
    //Maps the URIs to an array and sends it to the Spotify component
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      })
    })
  }

  //Searches for the given term and then saves the results
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  //Renders the following HTML to the screen
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* Passes the search function to the SeachBar component */}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* Passes the searchResults and addTrack method to the SearchResults component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />

            {/* Passes a bunch of stuff to the Playlist component */}
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName} 
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

//Exports the App class
export default App;
