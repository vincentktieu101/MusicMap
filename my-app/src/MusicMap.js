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

export default function MusicMap(props) {
  let { data, audioPlayerUrl, togglePlay } = props;
  const [tooltipContent, setTooltipContent] = useState("");

  data = data.slice(0, 400);
  let cells = [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return <div className="custom-tooltip">{tooltipContent}</div>;
    }
    return null;
  };

  for (let i = 0; i < data.length; i++) {
    cells.push(
      <Cell
        onMouseOver={() => setTooltipContent(data[i].genre)}
        onClick={() => togglePlay(data[i].preview_url, data[i].genre)}
        onTouchStart={() => togglePlay(data[i].preview_url, data[i].genre)}
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
        width={3200}
        height={2000}
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
