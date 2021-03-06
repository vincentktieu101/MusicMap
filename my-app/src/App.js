import { useState, useEffect, useRef, forwardRef } from "react";

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
  const [beastMode, setBeastMode] = useState(false);
  const [activeGenreData, setActiveGenreData] = useState({
    key: 0,
    genre: "",
    activeUrl: "",
    color: "",
    preview_urls: [],
  });
  const [audioPlayer, setAudioPlayer] = useState({
    ref: useRef(),
    key: 0,
    isShuffle: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (beastMode) {
        setNGenresList(reduceNList(allGenresList, NODES_ON_MAP));
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [beastMode]);

  function refreshMap() {
    setNGenresList(reduceNList(allGenresList, NGenresList.length));
  }
  
  function triggerAudioPlayer(i, absolute = false) {
    if (!absolute && activeGenreData && activeGenreData.genre === NGenresList[i].genre) {
      if (audioPlayer.ref.current.paused) {
        audioPlayer.ref.current.play();
      } else {
        audioPlayer.ref.current.pause();
      }
      return;
    }

    let newActiveGenreData;
    if (absolute) {
      newActiveGenreData = allGenresList[i];
    } else {
      newActiveGenreData = NGenresList[i];
    }
    let j = Math.floor(Math.random() * newActiveGenreData.preview_urls.length);
    setActiveGenreData({ ...newActiveGenreData, activeUrl: `https://p.scdn.co/mp3-preview/${newActiveGenreData.preview_urls[j]}` });
    setAudioPlayer({ ...audioPlayer, key: audioPlayer.key+1 });
  }

  function triggerAudioPlayerOnEnded() {
    let newActiveGenreData;
    if (audioPlayer.isShuffle) {
      const i = Math.floor(Math.random() * NGenresList.length);
      newActiveGenreData = NGenresList[i];
    } else {
      newActiveGenreData = activeGenreData;
    }
    let j = Math.floor(Math.random() * newActiveGenreData.preview_urls.length);
    setActiveGenreData({ ...newActiveGenreData, activeUrl: `https://p.scdn.co/mp3-preview/${newActiveGenreData.preview_urls[j]}`});
    setAudioPlayer({ ...audioPlayer, key: audioPlayer.key+1 });
  }

  function shuffle() {
    if (!audioPlayer.isShuffle) {
      const i = Math.floor(Math.random() * NGenresList.length);
      let j = Math.floor(Math.random() * NGenresList[i].preview_urls.length);
      setActiveGenreData({ ...NGenresList[i], activeUrl: `https://p.scdn.co/mp3-preview/${NGenresList[i].preview_urls[j]}`});
      setAudioPlayer({ ...audioPlayer, key: audioPlayer.key+1, isShuffle: !audioPlayer.isShuffle });
    } else {
      setAudioPlayer({ ...audioPlayer, isShuffle: !audioPlayer.isShuffle });
    }
  }

  function skip() {
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
      <div className={aboutToggle ? "audio-player hidden" : "audio-player"}>
        <AudioPlayerMenu
          activeGenreData={activeGenreData}
          audioPlayer={audioPlayer}
          shuffle={shuffle}
          skip={skip}
          searchToggle={searchToggle}
          setSearchToggle={setSearchToggle}
          beastMode={beastMode}
          setBeastMode={setBeastMode}
          renderedAudioPlayer={renderedAudioPlayer}
        />
      </div>
      <MusicMap
        NGenresList={NGenresList}
        activeGenreData={activeGenreData}
        beastMode={beastMode}
        triggerAudioPlayer={triggerAudioPlayer}
      />
    </div>
  );
}

const AudioPlayer = forwardRef((props, ref) => {
  const { activeGenreData, audioPlayer, triggerAudioPlayerOnEnded } = props;
  useEffect(() => {
    if (ref) {
      ref.current.volume = 0.15;
      ref.current.play();
    }
  }, [ref, activeGenreData, audioPlayer]);
  return (
    <audio
      ref={ref}
      key={audioPlayer.key}
      controls
      onEnded={triggerAudioPlayerOnEnded}
      onError={triggerAudioPlayerOnEnded}
    >
      <source src={activeGenreData.activeUrl} />
    </audio>
  );
});
