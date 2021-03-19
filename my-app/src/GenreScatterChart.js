import React, { useState, useRef } from "react";
import { ScatterChart, Scatter, Cell, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import { MapInteractionCSS } from 'react-map-interaction';
import genre_data from "./everynoise-scrape.json"; // last added data-2
// import genre_data from "./og-everynoise-scrape"; // complete
// import genre_data from "./test"

export default function GenreScatterChart() {
  const audioPlayer = useRef();
  const [audioPlayerKey, setAudioPlayerKey] = useState(0);
  const [audioPlayerUrl, setAudioPlayerUrl] = useState("");
  const [audioPlayerGenre, setAudioPlayerGenre] = useState("Nothing");
  const [tooltipContent, setTooltipContent] = useState("");

  let isPlaying = false;
  let keys = Object.keys(genre_data);
  let data = Object.values(genre_data);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {tooltipContent}
        </div>
      );
    }
    return null;
  };

  function togglePlay(url, genre) {
    if (audioPlayerUrl === `https://p.scdn.co/mp3-preview/${url}`) {
      if (isPlaying) {
        audioPlayer.current.pause();
      } else {
        audioPlayer.current.play();
      }
      isPlaying = !isPlaying;
    } else {
      setAudioPlayerUrl(`https://p.scdn.co/mp3-preview/${url}`);
      setAudioPlayerKey(audioPlayerKey + 1);
      isPlaying = true;
      setAudioPlayerGenre(genre);
    }
  };

  let cells = [];
  for (let i = 0; i < data.length; i++) {
    cells.push(
      <Cell
        onMouseOver={() => setTooltipContent(keys[i])} 
        onClick={() => togglePlay(data[i].preview_urls[0], keys[i])}
        key={`cell-${data[i].genre}`} 
        fill={data[i].color} 
      />
    )
  }

  return (
    <>
      <div className="audio-player">
        <div>Currently Playing: {audioPlayerGenre}</div>
        <br/>
        <audio ref={audioPlayer} key={audioPlayerKey} controls autoPlay>
          <source src={audioPlayerUrl} />
        </audio>
      </div>
      <MapInteractionCSS>
        <ScatterChart
          width={1600}
          height={1600}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis hide={true} type="number" dataKey="left" />
          <YAxis hide={true} type="number" dataKey="top" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter name="data" data={data} fill="#8884d8">
            {cells}
          </Scatter>
        </ScatterChart>
      </MapInteractionCSS>
    </>
  );
}