export default function About(props) {
  const { setAboutToggle } = props;
  return (
    <div>
      <div className="about-background" />
      <div
        className="about"
        onClick={(e) => {
          if (!e.target.href) {
            setAboutToggle(false);
          }
        }}
      >
        <div className="font-size-64">MusicMap</div>
        <div>by Vincent Tieu</div>
        <br />
        <a
          href="https://github.com/vincentktieu101/MusicMap"
          target="_blank"
          rel="noreferrer"
        >
          https://github.com/vincentktieu101/MusicMap
        </a>
        <div className="width-500-less">
          <br />
          <br />
          <br />
          <div>
            MusicMap is a visual way to explore 5000+ genres and over 500,000
            songs! Scroll to zoom and click to drag across the map. Once you're
            ready, select a genre and listen to 30 second samples of that genre.
          </div>
          <br />
          <br />
          <div>
            Generally, the type of genres are organized by color and location.
            Blue genres are typically instrumentals. Pink genres describe
            electronic music/EDM. Orange genres are mainly rock. Red genres are
            metal. Green and Yellow genres describe everything from indie to
            pop. Genres closer together sound similar while genres further away
            sound less similar.
          </div>
          <br />
          <br />
          <div>
            Other actions you can perform are to refresh the map, search for
            genre playlist on Spotify, shuffle random genres, and skip 
            current sample. Refreshing provides 400 new genres on your map.
            Shuffle random genre changes the genre after each sample. There are
            100+ unique samples for each genre.
          </div>
          <br />
          <br />
          <div>
            MusicMap is built in ReactJS, Material-UI, Recharts, and
            React-Map-Interaction. The data was gathered by using a scrapping
            tool on{" "}
            <a href="https://everynoise.com/" target="_blank" rel="noreferrer">
              https://everynoise.com/.
            </a>{" "}
            This app was designed primarily for desktop but also works well on
            mobile :)
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
