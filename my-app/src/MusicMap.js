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

const NODES_ON_MAP = 400;

export default function MusicMap(props) {
  let { data, audioPlayerUrl, togglePlay } = props;
  const [tooltipContent, setTooltipContent] = useState("");

  data = data.slice(0, NODES_ON_MAP);
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

  for (let i = 0; i < data.length; i++) {
    cells.push(
      <Cell
        onMouseOver={() => setTooltipContent(data[i].genre)}
        onClick={() => togglePlay(i)}
        onTouchStart={() => togglePlay(i)}
        key={`cell-${data[i].genre}`}
        fill={data[i].color}
        stroke={data[i].color}
        strokeWidth={
          audioPlayerUrl ===
          `https://p.scdn.co/mp3-preview/${data[i].preview_url}`
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
        <Scatter name="data" data={data} fill="#8884d8">
          {cells}
        </Scatter>
      </ScatterChart>
    </MapInteractionCSS>
  );
}

function printReadableString(str) {
  if (str === "") {
    return "";
  }
  const words = str.split(" ");
  const result = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");

  return result;
}
