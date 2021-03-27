import React from 'react';
import { StyledButton } from 'components/common/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function EmailPasswordModal({ email, password, open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          User created successfully
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Here is the email and password of the user
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Email:</b> {email}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Password:</b> {password}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={handleClose}
            color="primary"
            submitBtn
            autoFocus
          >
            Close
          </StyledButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmailPasswordModal;
