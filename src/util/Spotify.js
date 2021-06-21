
let userAccessToken;

const clientID = "";
const redirectUri = "http://localhost:3000";

const Spotify = {
    //Returns a user access token for Spotify
    getAccessToken() {
        //If we already have a token use that
        if(userAccessToken) {
            return userAccessToken;
        }

        //Try to get an access token and expire time from the url
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        //If we got the access token and expire time then set their vakues
        if(accessTokenMatch && expiresInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //Wipes the access token and URL parameters
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            //If we did not get an access token and expire time, then redirect to a url that has them
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    //Access the Spotify API with the given search term and get a list of tracks
    search(term) {
        //Gets the access token
        const accessToken = Spotify.getAccessToken();

        //Fetches the list of tracks from the API with a GET
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
            {headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            //After fetching the response, convert it to JSON
            return response.json();
        }).then(jsonResponse => {
            //If the JSON is empty return an empty array
            if(!jsonResponse.tracks) {
                return [];
            }
            //If there is JSON data then map it to an array and return it
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    //POST the created playlist to the Spotify API to be saved
    savePlayList(name, trackUris) {
        //If there is no name or tracks then do nothing
        if(!name || !trackUris.length) {
            return;
        }

        //Gets the access token
        const accessToken = Spotify.getAccessToken();

        //Creates a header object for the POST
        const headers = {Authorization: `Bearers ${accessToken}`};
        let userId;

        //Returns the users Spotify name
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            //Uses the GOTTEN ID to create a new playlist in the user account and get the ID
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                //Use the playlist ID to add tracks to the newly created playlist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}

export default Spotify;