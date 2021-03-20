import React, { useState, useEffect, useRef, forwardRef } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RepeatIcon from '@material-ui/icons/Repeat';

import MusicMap from "./MusicMap";
import About from "./About";
import initialData from "./scrapes/db.json";

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

  function togglePlay(url, genre) {
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
      const i = Math.floor(Math.random() * 400);
      togglePlay(data[i].preview_url, data[i].genre);
    }
  }

  return (
    <>
      <About aboutToggle={aboutToggle} setAboutToggle={setAboutToggle} />
      <div className={aboutToggle ? "brand hidden" : "brand"}>
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
      <div className={aboutToggle ? "audio-player hidden" : "audio-player"}>
        {audioPlayerGenre !== "" ? (
          <div>
            <AudioPlayer
              ref={audioPlayer}
              audioPlayerKey={audioPlayerKey}
              audioPlayerGenre={audioPlayerGenre}
              audioPlayerUrl={audioPlayerUrl}
              checkOnShuffle={checkOnShuffle}
            />
            <Tooltip
              title={<div className="custom-tooltip-black">Shuffle</div>}
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  if (!onShuffle) {
                    const i = Math.floor(Math.random() * 400);
                    togglePlay(data[i].preview_url, data[i].genre);
                  }
                  setOnShuffle(!onShuffle);
                }}
              >
                {onShuffle ? <RepeatIcon color="primary" /> : <RepeatIcon style={{ color: "white" }} />}
              </IconButton>
            </Tooltip>
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
    </>
  );
}

const AudioPlayer = forwardRef((props, ref) => {
  const { audioPlayerKey, audioPlayerGenre, audioPlayerUrl, checkOnShuffle } = props;
  useEffect(() => {
    if (ref) {
      ref.current.play();
      ref.current.volume = 0.15;
    }
  }, [ref, audioPlayerGenre]);

  return (
    <div>
      <div>Genre Playing: {printReadableString(audioPlayerGenre)}</div>
      <br />
      <audio ref={ref} key={audioPlayerKey} controls onEnded={checkOnShuffle}>
        <source src={audioPlayerUrl} />
      </audio>
    </div>
  );
});

function getNewMusicMap(arr) {
  var n = arr.length,
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
  const result = words.map((word) => { 
    return word[0].toUpperCase() + word.substring(1); 
  }).join(" ");

  return result
}