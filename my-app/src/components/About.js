import { useRef } from "react";

export default function About(props) {
  const { setAboutToggle } = props;
  const background = useRef();
  return (
    <div
      className="about"
      onClick={(e) => {
        if (e.target === background.current) {
          setAboutToggle(false);
        }
      }}
    >
      <div className="background" ref={background} />
      <div className="about-description">
        <div className="width-500-less">
          <div className="font-size-64">MusicMap</div>
          <div>by Vincent Tieu</div>
          <br />
          <a
            href="https://github.com/vincentktieu101/MusicMap"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/vincentktieu101/ MusicMap
          </a>
          <br />
          <br />
          <div>
            MusicMap is a visual way to explore 5,000+ genres and over 500,000
            songs! Scroll to zoom and click to drag across the map. Once you're
            ready, select a genre and listen to 30 second samples of that genre.
          </div>
          <br />
          <div>
            Generally, the type of genres are organized by color and location.
            Blue describes instrumentals. Pink describes electronic music/EDM.
            Orange genres are rock. Red genres are metal. Green and Yellow
            genres describe everything from indie to pop. Genres closer together
            sound similar while genres further away sound less similar.
          </div>
          <br />
          <div>Some other features...</div>
          <div>Refresh Map: Get a new map of 400 genres of the pool 5000+</div>
          <div>Search: Look for a specific genre within app</div>
          <div>Dance Mode: Makes the genre nodes dance!</div>
          <div>Spotify Search: Searches for specific genre on Spotify</div>
          <div>Shuffle Random Genre: Changes the genre after each sample</div>
          <div>Skip: Skips current sample</div>
          <br />
          <div>
            MusicMap is built in ReactJS, Material-UI, Recharts, and
            React-Map-Interaction. The data was gathered by using a scrapping
            tool on{" "}
            <a href="https://everynoise.com/" target="_blank" rel="noreferrer">
              https://everynoise.com/.
            </a>{" "}
            This app was designed primarily for desktop but also works well on
            mobile.
          </div>
          <br />
          <div>
            Thanks so much for visiting my app! I hope you find this app as fun
            as I did making it. I really can not understate how much I
            appreciate it, especially as a budding web/software developer :)
          </div>
          <br />
          <div>App last updated 3/24/21</div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
