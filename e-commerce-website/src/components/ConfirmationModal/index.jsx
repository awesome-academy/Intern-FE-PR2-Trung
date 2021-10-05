import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'

const Confirmation = props => {
  const { title, content, confirmActions, showConfirmation, handleClose } =
    props

  const onConfirm = () => {
    handleClose()
    confirmActions()
  }

  return (
    <Dialog
      open={showConfirmation}
      onClose={handleClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <DialogTitle
        id="confirmation-modal-title"
        disableTypography
        style={{ fontSize: '18px' }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="confirmation-modal-description"
          style={{ fontSize: '14px' }}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ fontSize: '12px' }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          autoFocus
          onClick={onConfirm}
          style={{ fontSize: '12px' }}
        >
          Tiếp tục
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation
