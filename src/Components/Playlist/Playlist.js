import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    //Wrapper for onNameChange to get onChange event
    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                {/* Creates an input field with a defaultValue and an onChange event */}
                <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
                {/* Creates a TrackList component and passes data to it */}
                <TrackList tracks={this.props.playlistTracks} 
                            onRemove={this.props.onRemove} 
                            isRemoval={true} />
                {/* Creates a button with an onClick event */}
                <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>
        );
    }
}