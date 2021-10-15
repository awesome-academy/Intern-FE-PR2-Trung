import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dialogContent: {
    padding: 0
  }
}))

DetailModal.propTypes = {
  title: PropTypes.string,
  detailShowing: PropTypes.bool,
  setDetailShowing: PropTypes.func
}

function DetailModal(props) {
  const { title, children, detailShowing, setDetailShowing } = props
  const classes = useStyles()

  const handleCloseModal = () => {
    setDetailShowing(false)
  }

  return (
    <Dialog
      open={detailShowing}
      onClose={handleCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      maxWidth="md"
      className={classes.dialog}
    >
      <DialogTitle
        id="modal-title"
        disableTypography
        className={classes.dialogTitle}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <IconButton onClick={handleCloseModal}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent} dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DetailModal
