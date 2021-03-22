import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import MenuBookIcon from "@material-ui/icons/MenuBook";

export default function MainMenu(props) {
  const { setAboutToggle, refreshMap } = props;
  return (
    <div className="brand">
      <div className="font-size-48">
        MusicMap
        <Tooltip
          title={<div className="custom-tooltip-black">Refresh Map</div>}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              refreshMap();
            }}
          >
            <RefreshIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
      by Vincent Tieu
      <Tooltip title={<div className="custom-tooltip-black">Read Details</div>}>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            setAboutToggle(true);
          }}
        >
          <MenuBookIcon fontSize="small" style={{ color: "white" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
