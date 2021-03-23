import React from "react";
import { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import allGenresList from "../everynoise/all-genres-list.json";

const filterOptions = createFilterOptions({
  limit: 100,
});

export default function SearchBar(props) {
  const { setSearchToggle, triggerAudioPlayer } = props;
  const [searchValue, setSearchValue] = useState("");
  const background = useRef();

  let genreDict = {};
  for (let i = 0; i < allGenresList.length; i++) {
    genreDict[allGenresList[i].genre] = allGenresList[i].key;
  }

  return (
    <div
      className="search"
      onClick={(e) => {
        if (e.target === background.current) {
          setSearchToggle(false);
        }
      }}
    >
      <div className="background" ref={background} />
      <div
        style={{
          backgroundColor: "white",
          width: "400px",
          padding: "4px",
          margin: "4px",
          marginTop: "30px"
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (genreDict[searchValue] !== undefined) {
              triggerAudioPlayer(genreDict[searchValue], true);
            }
          }}
        >
          <Autocomplete
            filterOptions={filterOptions}
            options={allGenresList}
            disableCloseOnSelect
            getOptionLabel={(option) => option.genre}
            renderOption={(option) => (
              <div
                style={{ width: "100%", height: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  triggerAudioPlayer(option.key, true);
                }}
              >
                {option.genre}
              </div>
            )}
            style={{ padding: "4px", margin: "4px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                style={{
                  backgroundColor: "white",
                  marginRight: "4px",
                  padding: "4px",
                  fontSize: "32px",
                }}
                label="Genre"
                onKeyDown={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            )}
          />
        </form>
      </div>
    </div>
  );
}
