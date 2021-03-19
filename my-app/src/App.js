import React from "react";
import GenreScatterChart from './GenreScatterChart';

export default function App() {
  return (
    <div>
      <div className="brand">
        <div className="app-title">EverySound</div>
        <div>by Vincent Tieu</div>
      </div>
      <GenreScatterChart />
    </div>
  )
}