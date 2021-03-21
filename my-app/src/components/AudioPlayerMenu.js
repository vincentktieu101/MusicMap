import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RepeatIcon from "@material-ui/icons/Repeat";
import SearchIcon from "@material-ui/icons/Search";
import FastForwardIcon from "@material-ui/icons/FastForward";

import { printReadableString } from "../utils";

export default function AudioPlayerMenu(props) {
  const { activeGenreData, audioPlayer, shuffle, fastForward, renderedAudioPlayer } = props;
  
  return (
    <div>
    {activeGenreData.genre !== "" ? (
      <div>
        <div className="font-size-20">
          Genre: {printReadableString(activeGenreData.genre)}
        </div>
        <br />
        {renderedAudioPlayer}
        <br/>
        <div>
          <Tooltip
            title={
              <div className="custom-tooltip-black">
                Search for Playlist on Spotify
              </div>
            }
            style={{ marginTop: "3px" }}
          >
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  `https://open.spotify.com/search/the%20sound%20of%20${activeGenreData.genre.replace(
                    / /g,
                    "%20"
                  )}`,
                  "_blank" // <- This is what makes it open in a new window.
                );
              }}
            >
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={<div className="custom-tooltip-black">Shuffle</div>}
          >
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                shuffle();
              }}
            >
              {audioPlayer.isShuffle ? (
                <RepeatIcon style={{ color: "green" }} />
              ) : (
                <RepeatIcon style={{ color: "white" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={<div className="custom-tooltip-black">Forward</div>}
          >
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                fastForward();
              }}
            >
              <FastForwardIcon style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
  ) : (
          <div className="font-size-32">
            <div>Drag/Zoom to Navigate</div>
            <div>Click to Listen!</div>
          </div>
        )}
  </div>
  )
}