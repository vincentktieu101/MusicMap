import React, { useState } from "react";
import { ScatterChart, Scatter, Cell, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import genre_data from "./everynoise-scrape.json"; // last added data-2
// import genre_data from "./test"

export default function GenreScatterChart() {
  const [tooltipContent, setTooltipContent] = useState("");

  let keys = Object.keys(genre_data);
  let data = Object.values(genre_data);

  let cells = [];
  for (let i = 0; i < data.length; i++) {
    cells.push(
      <Cell 
        onMouseOver={() => setTooltipContent(keys[i])} 
        onClick={() => playGenre(data[i].preview_urls[0])}
        key={`cell-${data[i].genre}`} 
        fill={data[i].color} 
      />
    )
  }

  function playGenre(value) {
    window.open("https://p.scdn.co/mp3-preview/" + value);
  }

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

  return (
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
  );
}