import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [{name: "shut up", artist: "simple plan", album: "no idea", id: 12},
                                  {name: "shut up", artist: "blink 182", album: "something", id: 43},
                                  {name: "shut up", artist: "other band", album: "last thing", id: 137}],
                  playlistName: "Playlist1",
                  playlistTracks: [{name: "shut up", artist: "simple plan", album: "no idea", id: 12},
                                  {name: "shut up", artist: "blink 182", album: "something", id: 43},
                                  {name: "shut up", artist: "other band", album: "last thing", id: 137}]};
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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
                      onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
