import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RepeatIcon from "@material-ui/icons/Repeat";
import SearchIcon from "@material-ui/icons/Search";
import FastForwardIcon from "@material-ui/icons/FastForward";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import { printReadableString } from "../utils";

export default function AudioPlayerMenu(props) {
  const {
    activeGenreData,
    audioPlayer,
    shuffle,
    skip,
    renderedAudioPlayer,
    searchToggle,
    setSearchToggle,
    beastMode,
    setBeastMode,
  } = props;

  return (
    <div>
      {activeGenreData.genre !== "" ? (
        <div>
          <div className="font-size-20">
            Genre: {printReadableString(activeGenreData.genre)}
          </div>
          <br />
          {renderedAudioPlayer}
          <br />
          <div>
            <Tooltip title={<div className="custom-tooltip-black">Search</div>}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setSearchToggle(true);
                }}
              >
                <SearchIcon style={searchToggle ? {color: "green"} : {color: "white"}} />
              </IconButton>
            </Tooltip>
            <Tooltip title={<div className="custom-tooltip-black">Dance Mode</div>}>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setBeastMode(!beastMode);
                }}
              >
                {beastMode ? <InsertEmoticonIcon style={{ color: "green" }}/> : <EmojiEmotionsIcon style={{ color: "white" }}/>}
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                <div className="custom-tooltip-black">
                  Search for Genre Playlist on Spotify
                </div>
              }
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
                <LibraryMusicIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                <div className="custom-tooltip-black">
                  Shuffle Random Genres
                </div>
              }
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  shuffle();
                }}
              >
                <RepeatIcon style={audioPlayer.isShuffle ? { color: "green" } : {color: "white"}} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                <div className="custom-tooltip-black">Skip</div>
              }
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  skip();
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
  );
}
