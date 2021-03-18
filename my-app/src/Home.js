import React from "react";
import { ScatterChart, Scatter, Cell, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import genre_data from "./everynoise-scrape";
// import genre_data from "./test"

function App() {
  const keys = Object.keys(genre_data);
  const data = Object.values(genre_data);
  for (let i=0; i < data.length; i++) {
    data[i].genre = keys[i];
  }

  // console.log(data);

  function previewGenre(value) {

  }

  function playGenre(value) {
    window.open("https://p.scdn.co/mp3-preview/" + value);
  }

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
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Scatter name="data" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell 
                onMouseOver={() => previewGenre(data[index].preview_urls[0])} 
                onClick={() => playGenre(data[index].preview_urls[0])}
                key={`cell-${index}`} 
                fill={data[index].color} 
              />
            ))}
          </Scatter>
        </ScatterChart>
  );
}

export default App;
