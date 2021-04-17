import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    overflowY: "auto",
  }
}))

export default function CustomModal(props) {
  const { modal, setModal } = props;
  const classes = useStyles();
  
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modal.open}
      onClose={() => setModal({ content: null, open: false })}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {modal.content ? modal.content : <div></div>}
    </Modal>
  )
}