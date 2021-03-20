export default function About(props) {
  const { aboutToggle, setAboutToggle } = props;
  return (
    <div className={aboutToggle ? "" : "hidden"}>
      <div className="about-background" />
      <div
        className="about"
        onClick={() => {
          setAboutToggle(!aboutToggle);
        }}
      >
        <div className="font-size-64">MusicMap</div>
        <div>by Vincent Tieu</div>
        <br />
        <a href="https://github.com/vincentktieu101/MusicMap" target="_blank">
          https://github.com/vincentktieu101/MusicMap
        </a>
        <div className="width-500-less">
          <br />
          <br />
          <br />
          <div>
            MusicMap is a visual way to explore 5000+ genres! Scroll to zoom and
            click to drag across the map. Once you're ready, select a genre and
            listen to a 30 second sample. Refreshing the map repicks 400 genres
            of the 5000+!
          </div>
          <br />
          <br />
          <div>
            Generally, the type of genres are organized by color and location.
            Blue genres are typically instrumentals. Pink genres describe
            electronic music/EDM. Orange genres are mainly Rock 'n' Roll. Red
            genres are metal. Green and Yellow genres describe everything from
            indie to pop. Genres closer together sound similar while genres
            further away sound less similar.
          </div>
          <br />
          <br />
          <div>
            When you find a genre you really like, you can lookup "The Sound of
            ______" on Spotify, where there's an awesome playlist ready for you.
          </div>
          <br />
          <br />
          <div>
            MusicMap is built in ReactJS, Recharts, and Material-UI. The data
            was gathered by using a scrapping tool on{" "}
            <a href="https://everynoise.com/" target="_blank">
              https://everynoise.com/.
            </a>{" "}
            This app was designed primarily for desktop but also works well on
            mobile :)
          </div>
        </div>
      </div>
    </div>
  );
}
