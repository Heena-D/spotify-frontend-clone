import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./DataLayer";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ discover_weekly, token }, dispatch] = useDataLayerValue();

  const playPlaylist = id => {
    console.log("PlayList id: ", id);
    console.log("[Body] token: ", token);
    console.log("[Body]spotify: ", spotify);

    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
        Bearer: token
      })
      .then(res => {
        console.log("[Body]API1 res: ", res);
        spotify.getMyCurrentPlayingTrack().then(r => {
          dispatch({
            type: "SET_ITEM",
            item: r.item
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true
          });
        });
      });

    // spotify
    //   .play({
    //     context_uri:
    //       // `spotify:playlist:37i9dQZEVXcILcAh8xnJCv`
    //       `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`
    //   })
    //   .then(res => {
    //     console.log("APIresponse received: ", res);
    //     spotify.getMyCurrentPlayingTrack().then(r => {
    //       console.log("currentPlaylist: ", r);
    //       dispatch({ type: "SET_ITEM", item: r.item });
    //       dispatch({ type: "SET_PLAYING", playing: true });
    //     });
    //   });
  };

  const playSong = id => {
    console.log("playSong id: ", id);
    spotify.play({ uris: [`spotify:track:${id}`] }).then(res => {
      // console.log("SongAPI response received ");
      spotify.getMyCurrentPlayingTrack().then(r => {
        dispatch({
          type: "SET_ITEM",
          item: r.item
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true
        });
      });
    });
  };

  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon
            className="body__shuffle"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>
        {/* List of songs */}
        {discover_weekly?.tracks.items.map(item => (
          <SongRow track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  );
}

export default Body;
