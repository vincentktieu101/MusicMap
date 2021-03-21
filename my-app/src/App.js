import React, { useState, useEffect, useRef, forwardRef } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import RepeatIcon from "@material-ui/icons/Repeat";
import SearchIcon from "@material-ui/icons/Search";
import FastForwardIcon from "@material-ui/icons/FastForward";

import MusicMap from "./MusicMap";
import About from "./About";
import initialData from "./scrapes/db.json";

const NODES_ON_MAP = 400;

export default function App() {
  const audioPlayer = useRef();
  const [aboutToggle, setAboutToggle] = useState(false);
  const [audioPlayerKey, setAudioPlayerKey] = useState(0);
  const [audioPlayerUrl, setAudioPlayerUrl] = useState("");
  const [audioPlayerGenre, setAudioPlayerGenre] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [onShuffle, setOnShuffle] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(getNewMusicMap(initialData));
  }, []);

  function togglePlay(i) {
    const url = data[i].preview_url;
    const genre = data[i].genre;
    if (audioPlayerUrl === `https://p.scdn.co/mp3-preview/${url}`) {
      if (isPlaying) {
        audioPlayer.current.pause();
      } else {
        audioPlayer.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setAudioPlayerUrl(`https://p.scdn.co/mp3-preview/${url}`);
      setAudioPlayerKey(audioPlayerKey + 1);
      setIsPlaying(true);
      setAudioPlayerGenre(genre);
    }
  }

  function checkOnShuffle() {
    if (onShuffle) {
      const i = Math.floor(Math.random() * NODES_ON_MAP);
      togglePlay(i);
    }
  }

  return (
    <div>
      {aboutToggle && <About setAboutToggle={setAboutToggle} />}
      {!aboutToggle && (
        <div className="brand">
          <div className="app-title">
            MusicMap
            <Tooltip
              title={<div className="custom-tooltip-black">Refresh Map</div>}
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setData(getNewMusicMap(initialData));
                }}
              >
                <RefreshIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
          by Vincent Tieu
          <Tooltip
            title={<div className="custom-tooltip-black">Read Details</div>}
          >
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                setAboutToggle(!aboutToggle);
              }}
            >
              <MenuBookIcon fontSize="small" style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <div className={aboutToggle ? "audio-player hidden" : "audio-player"}>
        {audioPlayerGenre !== "" ? (
          <div>
            <div>Genre Playing: {printReadableString(audioPlayerGenre)}</div>
            <br />
            <AudioPlayer
              ref={audioPlayer}
              audioPlayerKey={audioPlayerKey}
              audioPlayerGenre={audioPlayerGenre}
              audioPlayerUrl={audioPlayerUrl}
              checkOnShuffle={checkOnShuffle}
            />
            <br />
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
                      `https://open.spotify.com/search/the%20sound%20of%20${audioPlayerGenre.replace(
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
                    if (!onShuffle) {
                      const i = Math.floor(Math.random() * NODES_ON_MAP);
                      togglePlay(i);
                    }
                    setOnShuffle(!onShuffle);
                  }}
                >
                  {onShuffle ? (
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
                    audioPlayer.current.currentTime = 30;
                  }}
                >
                  <FastForwardIcon style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div>Drag to Navigate and Click to Listen!</div>
        )}
      </div>
      <MusicMap
        data={data}
        audioPlayerUrl={audioPlayerUrl}
        togglePlay={togglePlay}
      />
    </div>
  );
}

const AudioPlayer = forwardRef((props, ref) => {
  const {
    audioPlayerKey,
    audioPlayerGenre,
    audioPlayerUrl,
    checkOnShuffle,
  } = props;
  useEffect(() => {
    if (ref) {
      if (!isTouchDevice()) {
        ref.current.play();
      }
      ref.current.volume = 0.15;
    }
  }, [ref, audioPlayerGenre]);

  return (
    <audio ref={ref} key={audioPlayerKey} controls onEnded={checkOnShuffle}>
      <source src={audioPlayerUrl} />
    </audio>
  );
});

function getNewMusicMap(arr) {
  var n = NODES_ON_MAP,
    result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function printReadableString(str) {
  const words = str.split(" ");
  const result = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return result;
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
