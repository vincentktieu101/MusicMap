import { useState, useEffect, useRef, forwardRef } from "react";

// import allGenresList from "./everynoise/db.json";
import allGenresList from "./everynoise/all-genres-list.json";
import { reduceNList } from "./utils";
import About from "./components/About";
import MainMenu from "./components/MainMenu";
import AudioPlayerMenu from "./components/AudioPlayerMenu";
import MusicMap from "./components/MusicMap";
import SearchBar from "./components/SearchBar";

export default function App() {
  const NODES_ON_MAP = 400;
  const [NGenresList, setNGenresList] = useState(
    reduceNList(allGenresList, NODES_ON_MAP)
  );
  const [aboutToggle, setAboutToggle] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [activeGenreData, setActiveGenreData] = useState({
    key: 0,
    genre: "",
    activeUrl: "",
    color: "",
    top: 0,
    left: 0,
    preview_urls: [],
  });
  const [audioPlayer, setAudioPlayer] = useState({
    ref: useRef(),
    key: 0,
    isShuffle: false,
  });

  function triggerAudioPlayer(i, absolute=false) {
    if (absolute) {
      let newActiveGenreData = { ...allGenresList[i] };
      let j = Math.floor(Math.random() * activeGenreData.preview_urls.length);
      newActiveGenreData.activeUrl = `https://p.scdn.co/mp3-preview/${newActiveGenreData.preview_urls[j]}`;
      setActiveGenreData(newActiveGenreData);
      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.key += 1;
      setAudioPlayer(newAudioPlayer);
      return;
    }
    
    if (activeGenreData.genre === NGenresList[i].genre) {
      if (audioPlayer.ref.current.paused) {
        audioPlayer.ref.current.play();
      } else {
        audioPlayer.ref.current.pause();
      }
    } else {
      let newActiveGenreData = { ...NGenresList[i] };
      let j = Math.floor(Math.random() * activeGenreData.preview_urls.length);
      newActiveGenreData.activeUrl = `https://p.scdn.co/mp3-preview/${newActiveGenreData.preview_urls[j]}`;
      setActiveGenreData(newActiveGenreData);
      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.key += 1;
      setAudioPlayer(newAudioPlayer);
    }
  }

  function refreshMap() {
    setNGenresList(reduceNList(allGenresList, NGenresList.length));
  }

  function triggerAudioPlayerOnEnded() {
    if (audioPlayer.isShuffle) {
      const i = Math.floor(Math.random() * NGenresList.length);
      let newActiveGenreData = { ...NGenresList[i] };
      let j = Math.floor(Math.random() * activeGenreData.preview_urls.length);
      newActiveGenreData.activeUrl = `https://p.scdn.co/mp3-preview/${NGenresList[i].preview_urls[j]}`;
      setActiveGenreData(newActiveGenreData);

      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.key += 1;
      setAudioPlayer(newAudioPlayer);
    } else {
      let newActiveGenreData = { ...activeGenreData };
      let j = Math.floor(Math.random() * activeGenreData.preview_urls.length);
      newActiveGenreData.activeUrl = `https://p.scdn.co/mp3-preview/${activeGenreData.preview_urls[j]}`;
      setActiveGenreData(newActiveGenreData);

      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.key += 1;
      setAudioPlayer(newAudioPlayer);
    }
  }

  function shuffle() {
    if (!audioPlayer.isShuffle) {
      const i = Math.floor(Math.random() * NGenresList.length);
      let newActiveGenreData = { ...NGenresList[i] };
      let j = Math.floor(Math.random() * activeGenreData.preview_urls.length);
      newActiveGenreData.activeUrl = `https://p.scdn.co/mp3-preview/${NGenresList[i].preview_urls[j]}`;
      setActiveGenreData(newActiveGenreData);

      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.key += 1;
      newAudioPlayer.isShuffle = !newAudioPlayer.isShuffle;
      setAudioPlayer(newAudioPlayer);
    } else {
      let newAudioPlayer = { ...audioPlayer };
      newAudioPlayer.isShuffle = !newAudioPlayer.isShuffle;
      setAudioPlayer(newAudioPlayer);
    }
  }

  function fastForward() {
    triggerAudioPlayerOnEnded();
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
      {searchToggle && (
        <SearchBar
          className="hidden"
          setSearchToggle={setSearchToggle}
          triggerAudioPlayer={triggerAudioPlayer}
        />
      )}
      {!(aboutToggle || searchToggle) && (
        <MainMenu setAboutToggle={setAboutToggle} refreshMap={refreshMap} />
      )}
      {/* conditional className because component should remain rendered during aboutToggle */}
      <div
        className={
          aboutToggle ? "audio-player hidden" : "audio-player"
        }
      >
        <AudioPlayerMenu
          activeGenreData={activeGenreData}
          audioPlayer={audioPlayer}
          shuffle={shuffle}
          fastForward={fastForward}
          setSearchToggle={setSearchToggle}
          renderedAudioPlayer={renderedAudioPlayer}
        />
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
  const { activeGenreData, audioPlayer, triggerAudioPlayerOnEnded } = props;
  useEffect(() => {
    if (ref) {
      ref.current.play();
      ref.current.volume = 0.15;
    }
  }, [ref, activeGenreData, audioPlayer]);
  return (
    <audio
      ref={ref}
      key={audioPlayer.key}
      controls
      onEnded={triggerAudioPlayerOnEnded}
    >
      <source src={activeGenreData.activeUrl} />
    </audio>
  );
});
