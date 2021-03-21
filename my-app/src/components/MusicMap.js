import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { MapInteractionCSS } from "react-map-interaction";

import { printReadableString } from "../utils";

export default function MusicMap(props) {
  const { NGenresList, activeGenreData, triggerAudioPlayer } = props;
  const [tooltipContent, setTooltipContent] = useState("");

  let cells = [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {`Genre: ${printReadableString(tooltipContent)}`}
        </div>
      );
    }
    return null;
  };

  for (let i = 0; i < NGenresList.length; i++) {
    cells.push(
      <Cell
        onMouseOver={() => setTooltipContent(NGenresList[i].genre)}
        onClick={() => triggerAudioPlayer(i)}
        onTouchStart={() => triggerAudioPlayer(i)}
        key={`cell-${NGenresList[i].genre}`}
        fill={NGenresList[i].color}
        stroke={NGenresList[i].color}
        strokeWidth={
          activeGenreData.url ===
          `https://p.scdn.co/mp3-preview/${NGenresList[i].preview_urls[0]}`
            ? 25
            : 8
        }
      />
    );
  }

  return (
    <MapInteractionCSS>
      <ScatterChart
        width={2200}
        height={1400}
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
        <Scatter name="data" data={NGenresList} fill="#8884d8">
          {cells}
        </Scatter>
      </ScatterChart>
    </MapInteractionCSS>
  );
}
