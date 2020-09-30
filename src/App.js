import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import Player from "./Player";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";
import { ConsoleWriter } from "istanbul-lib-report";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    let _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        dispatch({ type: "SET_USER", user: user });
      });

      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists
        });
      });

      spotify.getPlaylist("37i9dQZEVXcILcAh8xnJCv").then(response =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      );

      //again
      spotify.getMyTopArtists().then(response =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response
        })
      );
      console.log("SET_SPOTIFY: ", spotify);
      dispatch({ type: "SET_SPOTIFY", spotify: spotify });

      // !again
    }
  }, [token, dispatch]);
  // console.log("user: >> ", user);
  // console.log("token: >> ", token);

  return (
    <div className="app">
      {/* {token ? <Player spotify={spotify} /> : <Login />} */}

      {/* again */}
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
