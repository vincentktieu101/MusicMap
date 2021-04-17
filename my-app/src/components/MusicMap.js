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
  const { activeGenreData, triggerAudioPlayer, beastMode } = props;
  let { NGenresList } = props;
  const [tooltipContent, setTooltipContent] = useState("");

  let cells = [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && !beastMode) {
      return (
        <div className="custom-tooltip font-size-24">
          {`Genre: ${printReadableString(tooltipContent)}`}
        </div>
      );
    }
    return null;
  };

  if (!beastMode) {
    for (let i = 0; i < NGenresList.length; i++) {
      cells.push(
        <Cell
          onMouseOver={() => setTooltipContent(NGenresList[i].genre)}
          onClick={() => triggerAudioPlayer(i)}
          onTouchStart={() => triggerAudioPlayer(i)}
          key={`cell-${NGenresList[i].genre}`}
          fill={NGenresList[i].color}
          stroke={NGenresList[i].color}
          strokeWidth={activeGenreData.genre === NGenresList[i].genre ? 25 : 8}
        />
      );
    }
  } else {
    for (let i = 0; i < NGenresList.length; i++) {
      cells.push(
        <Cell
          key={`cell-${NGenresList[i].genre}`}
          fill={NGenresList[i].color}
          stroke={NGenresList[i].color}
          strokeWidth={8}
        />
      );
    }
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
