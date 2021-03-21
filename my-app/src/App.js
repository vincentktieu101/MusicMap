import { useState, useEffect, useRef, forwardRef } from "react";

// import allGenresList from "./everynoise/db.json";
import allGenresList from "./everynoise/all-genres-list.json";
import { reduceNList, isTouchDevice } from "./utils";
import About from "./components/About";
import MainMenu from "./components/MainMenu";
import AudioPlayerMenu from "./components/AudioPlayerMenu";
import MusicMap from "./components/MusicMap";

export default function App() {
  const NODES_ON_MAP = 400;
  const [NGenresList, setNGenresList] = useState(
    reduceNList(allGenresList, NODES_ON_MAP)
  );
  const [aboutToggle, setAboutToggle] = useState(false);
  const [activeGenreData, setActiveGenreData] = useState({
    "key": 0,
    "genre": "",
    "url": "",
    "color": "",
    "top": 0,
    "left": 0,
  });
  const [audioPlayer, setAudioPlayer] = useState({
    "ref": useRef(),
    "key": 0,
    "isShuffle": false,
  });

  function triggerAudioPlayer(i, shuffle=false) {
    const url = NGenresList[i].preview_urls[0];
    if (activeGenreData.url === `https://p.scdn.co/mp3-preview/${url}`) {
      if (audioPlayer.ref.current.paused) {
        audioPlayer.ref.current.play();
      } else {
        audioPlayer.ref.current.pause();
      }
    } else {
      let newActiveGenreData = { ...NGenresList[i]};
      newActiveGenreData.url = `https://p.scdn.co/mp3-preview/${url}`;
      setActiveGenreData(newActiveGenreData);
      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.key += 1;
      if (shuffle === true) {
        newAudioPlayer.isShuffle = !newAudioPlayer.isShuffle;
      }
      setAudioPlayer(newAudioPlayer);
    }
  }

  function refreshMap() {
    setNGenresList(
      reduceNList(allGenresList, NGenresList.length)
    );
  }

  function triggerAudioPlayerOnEnded() {
    if (audioPlayer.isShuffle) {
      const i = Math.floor(Math.random() * NGenresList.length);
      triggerAudioPlayer(i);
    }
  }

  function shuffle() {
    // let newAudioPlayer = {...audioPlayer};
    // newAudioPlayer.isShuffle = !newAudioPlayer.isShuffle;
    // setAudioPlayer(newAudioPlayer);
    if (!audioPlayer.isShuffle) {
      const i = Math.floor(Math.random() * NGenresList.length);
      triggerAudioPlayer(i, true);
    }

  }

  function fastForward() {
    audioPlayer.ref.current.currentTime = 9999;
  }

  const renderedAudioPlayer = (
    <AudioPlayer
      ref={audioPlayer.ref}
      activeGenreData={activeGenreData}
      audioPlayer={audioPlayer}
      triggerAudioPlayerOnEnded={triggerAudioPlayerOnEnded}
    />
  );

  return (
    <div>
      {aboutToggle && <About setAboutToggle={setAboutToggle} />}
      {!aboutToggle && <MainMenu setAboutToggle={setAboutToggle} refreshMap={refreshMap} />}
      {/* conditional className because component should remain rendered during aboutToggle */}
      <div className={aboutToggle ? "audio-player hidden" : "audio-player"}>
        <AudioPlayerMenu activeGenreData={activeGenreData} audioPlayer={audioPlayer} shuffle={shuffle} fastForward={fastForward} renderedAudioPlayer={renderedAudioPlayer} />
      </div>
      <MusicMap
        NGenresList={NGenresList}
        activeGenreData={activeGenreData}
        triggerAudioPlayer={triggerAudioPlayer}
      />
    </div>
  );
}

const AudioPlayer = forwardRef((props, ref) => {
  const {
    activeGenreData,
    audioPlayer,
    triggerAudioPlayerOnEnded,
  } = props;
  useEffect(() => {
    if (ref) {
      if (!isTouchDevice() || audioPlayer.isShuffle) {
        ref.current.play();
      }
      ref.current.volume = 0.15;
    }
  }, [ref, activeGenreData, audioPlayer]);
  return (
    <audio ref={ref} key={audioPlayer.key} controls onEnded={triggerAudioPlayerOnEnded}>
      <source src={activeGenreData.url} />
    </audio>
  );
});
