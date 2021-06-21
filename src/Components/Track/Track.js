import React from 'react';
import "./Track.css";

export class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
        //Determines if the button is for removal or addition of the track
        if(this.props.isRemoval) {
            return (<button className="Track-action" onClick={this.removeTrack} >-</button>)
        } else {
            return (<button className="Track-action" onClick={this.addTrack} >+</button>)
        }
    }

    //Wrapper for the add function
    addTrack() {
        this.props.onAdd(this.props.track);
    }

    //Wrapper for the remove function
    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    {/* Displays an individual track */}
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {/* Renders the relevant button */}
                {this.renderAction()}
            </div>
        );
    }
}