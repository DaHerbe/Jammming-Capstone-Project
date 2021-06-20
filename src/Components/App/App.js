import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [{name: "track1", artist: "artist1", album: "album1", id: 1},
                                  {name: "track2", artist: "artist2", album: "album2", id: 2},
                                  {name: "track3", artist: "artist3", album: "album3", id: 3}],
                  playlistName: "Playlist1",
                  playlistTracks: [{name: "track4", artist: "artist4", album: "album4", id: 4},
                                  {name: "track5", artist: "artist5", album: "album5", id: 5},
                                  {name: "track6", artist: "artist6", album: "album6", id: 6}]};
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

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

  removeTrack(track) {
    let tracks = this.state.playlistTracks;

    //Removes the track with the matching id from the list
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    //Sets the state with the new list without the specified track
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
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

export default App;
