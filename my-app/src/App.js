import React from "react";
import GenreScatterChart from './GenreScatterChart';
import { MapInteractionCSS } from 'react-map-interaction';

export default function App() {
  return (
    <>
      <div className="brand">
        <div className="app-title">EverySound</div>
        <div>by Vincent Tieu</div>
      </div>
      <MapInteractionCSS>
        <GenreScatterChart />
      </MapInteractionCSS>
    </>
  )
}