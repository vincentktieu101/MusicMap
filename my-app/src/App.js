import React, { useState, useEffect, useRef, forwardRef } from "react";
import GenreScatterChart from './GenreScatterChart';

export default function App() {
  const audioPlayer = useRef();
  const [audioPlayerKey, setAudioPlayerKey] = useState(0);
  const [audioPlayerUrl, setAudioPlayerUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayerGenre, setAudioPlayerGenre] = useState("");

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
  };

  return (
    <div>
      <div className="brand">
        <div className="app-title">MusicMap</div>
        <div>by Vincent Tieu</div>
      </div>
      <GenreScatterChart audioPlayerUrl={audioPlayerUrl} togglePlay={togglePlay} />
      <div className="audio-player">
        {audioPlayerGenre !== "" 
          ? <AudioPlayer ref={audioPlayer} audioPlayerKey={audioPlayerKey} audioPlayerGenre={audioPlayerGenre} audioPlayerUrl={audioPlayerUrl} />
          : <div>Drag to Navigate and Click to Listen!</div>
        }
      </div>
    </div>
  )
}

const AudioPlayer = forwardRef((props, ref) => {
  const { audioPlayerKey, audioPlayerGenre, audioPlayerUrl } = props;
  useEffect(() => {
    if (ref) {
      console.log(`genre: ${audioPlayerGenre}`);
      ref.current.play();
      ref.current.volume = 0.15;
    }
  }, [ref, audioPlayerGenre]);

  return (
    <div>
      <div>Genre Playing: {audioPlayerGenre}</div>
      <br/>
      <audio ref={ref} key={audioPlayerKey} controls>
        <source src={audioPlayerUrl} />
      </audio>
    </div>
  )
})